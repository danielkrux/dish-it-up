import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Keyboard, Pressable, TextInput, View } from "react-native";
import { GlassContainer, GlassView } from "expo-glass-effect";
import { ContextMenu, Host, Button, Submenu } from "@expo/ui/swift-ui";

import { colors } from "~/theme";
import Icon from "~/components/Icon";

import useSortRecipes from "~/features/home/hooks/useSortRecipes";
import useFilterRecipes from "~/features/home/hooks/useFilterRecipes";

function SeachAndFilter() {
  const router = useRouter();

  const ref = useRef<TextInput>(null);
  const [isSearching, setIsSearching] = useState(false);

  const { sortOptions, handleSort, isSelected } = useSortRecipes();
  const filter = useFilterRecipes();

  function cancelSearch() {
    setIsSearching(false);
    Keyboard.dismiss();
  }

  return (
    <View className="absolute bottom-[95px] w-screen px-6">
      <GlassContainer className="flex-row items-center gap-1" spacing={10}>
        <GlassView
          className="flex-1 rounded-full flex-row gap-6 items-center"
          isInteractive
        >
          <Pressable onPress={() => ref.current?.focus()} className="pl-5">
            <Icon name="Search" className=" text-gray-900" />
          </Pressable>
          <TextInput
            ref={ref}
            placeholder="Search recipes"
            className="pr-5 py-4 text-base font-body"
            onFocus={() => setIsSearching(true)}
            onBlur={() => setIsSearching(false)}
            placeholderTextColor={colors.gray[900]}
            cursorColor={colors.primary[500]}
            selectionColor={colors.primary[500]}
            onChangeText={(text) => {
              router.setParams({ q: text });
            }}
          />
        </GlassView>
        {isSearching && (
          <Pressable onPress={cancelSearch}>
            <GlassView className="p-4 rounded-full" isInteractive>
              <Icon name="X" />
            </GlassView>
          </Pressable>
        )}
        {!isSearching && (
          <Host>
            <ContextMenu>
              <ContextMenu.Trigger>
                <GlassView className="p-4 rounded-full" isInteractive>
                  <Icon name="List" />
                </GlassView>
              </ContextMenu.Trigger>
              <ContextMenu.Items>
                <Submenu
                  button={
                    <Button systemImage="arrow.up.arrow.down">Sort...</Button>
                  }
                >
                  {sortOptions.map((option) => (
                    <Button
                      key={option.value}
                      systemImage={isSelected(option) ? "checkmark" : undefined}
                      onPress={() => handleSort(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </Submenu>
                <Submenu
                  button={
                    <Button systemImage="line.horizontal.3.decrease">
                      Filter...
                    </Button>
                  }
                >
                  {filter.data?.map((category) => (
                    <Button
                      key={category.value}
                      onPress={() => filter.onFilter(category)}
                      systemImage={
                        filter.isSelected(category) ? "checkmark" : undefined
                      }
                    >
                      {category.label}
                    </Button>
                  ))}
                </Submenu>
              </ContextMenu.Items>
            </ContextMenu>
          </Host>
        )}
      </GlassContainer>
    </View>
  );
}

export default SeachAndFilter;
