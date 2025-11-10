import { Button, ContextMenu, Host, Image } from "@expo/ui/swift-ui";
import { GlassContainer, GlassView } from "expo-glass-effect";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Keyboard, Pressable, TextInput } from "react-native";

import Icon from "~/components/Icon";
import { colors } from "~/theme";

import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import useFilterRecipes from "~/features/home/hooks/useFilterRecipes";
import useSortRecipes from "~/features/home/hooks/useSortRecipes";

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
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={10}
      className="absolute bottom-[95px] w-screen px-6"
    >
      <GlassContainer className="flex-row items-center gap-1" spacing={10}>
        <GlassView
          className="flex-1 rounded-full flex-row gap-6 items-center"
          isInteractive
        >
          <Pressable onPress={() => ref.current?.focus()} className="pl-5">
            <Icon name="Search" className=" text-black" />
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
            <GlassView className="p-3 rounded-full" isInteractive>
              <Host
                style={{
                  width: 35,
                  height: 35,
                  left: -15,
                  transform: [{ rotate: "90deg" }],
                }}
              >
                <Image systemName="xmark" color="black" />
              </Host>
            </GlassView>
          </Pressable>
        )}
        {!isSearching && (
          <Host>
            <ContextMenu>
              <ContextMenu.Trigger>
                <GlassView className="p-3 rounded-full" isInteractive>
                  <Host
                    style={{
                      width: 35,
                      height: 35,
                      transform: [{ rotate: "90deg" }],
                    }}
                  >
                    <Image systemName="ellipsis" color="black" />
                  </Host>
                </GlassView>
              </ContextMenu.Trigger>
              <ContextMenu.Items>
                <ContextMenu>
                  <ContextMenu.Trigger>
                    <Button systemImage="arrow.up.arrow.down">Sort...</Button>
                  </ContextMenu.Trigger>
                  <ContextMenu.Items>
                    {sortOptions.map((option) => (
                      <Button
                        key={option.value}
                        systemImage={
                          isSelected(option) ? "checkmark" : undefined
                        }
                        onPress={() => handleSort(option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </ContextMenu.Items>
                </ContextMenu>
                <ContextMenu>
                  <ContextMenu.Trigger>
                    <Button systemImage="line.horizontal.3.decrease">
                      Filter...
                    </Button>
                  </ContextMenu.Trigger>
                  <ContextMenu.Items>
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
                  </ContextMenu.Items>
                </ContextMenu>
              </ContextMenu.Items>
            </ContextMenu>
          </Host>
        )}
      </GlassContainer>
    </KeyboardAvoidingView>
  );
}

export default SeachAndFilter;
