import { Button, Host, Menu } from "@expo/ui/swift-ui";
import { GlassContainer, GlassView } from "expo-glass-effect";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  TextInput,
  type TextInputInstance,
} from "react-native";

import Icon from "~/components/Icon";
import { colors } from "~/theme";

import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import useFilterRecipes from "~/features/home/hooks/useFilterRecipes";
import useSortRecipes from "~/features/home/hooks/useSortRecipes";
import { cn } from "~/utils/tailwind";

type GlassIconButtonProps = {
  icon: string;
  rotation?: number;
};

function GlassIconButton({ icon, rotation = 0 }: GlassIconButtonProps) {
  return (
    <GlassView
      className="p-3 rounded-full"
      style={{
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
      }}
      isInteractive
    >
      <Image
        source={icon}
        style={{
          height: 20,
          width: 20,
          color: "black",
          ...(rotation && { transform: [{ rotate: `${rotation}deg` }] }),
        }}
      />
    </GlassView>
  );
}

function SeachAndFilter({ className }: { className?: string }) {
  const router = useRouter();

  const ref = useRef<TextInputInstance>(null);
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
      className={cn(className)}
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
            className="pr-5 py-4 text-base font-body w-full "
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
            <GlassIconButton icon="sf:xmark" />
          </Pressable>
        )}
        {!isSearching && (
          <Host
            style={{
              width: 48,
              height: 48,
            }}
          >
            <Menu label={<GlassIconButton icon="sf:ellipsis" rotation={90} />}>
              <Menu label="Sort..." systemImage="arrow.up.arrow.down">
                {sortOptions.map((option) => (
                  <Button
                    key={option.value}
                    systemImage={isSelected(option) ? "checkmark" : undefined}
                    onPress={() => handleSort(option.value)}
                    label={option.label}
                  />
                ))}
              </Menu>
              <Menu label="Filter..." systemImage="line.horizontal.3.decrease">
                {filter.data?.map((category) => (
                  <Button
                    key={category.value}
                    onPress={() => filter.onFilter(category)}
                    systemImage={
                      filter.isSelected(category) ? "checkmark" : undefined
                    }
                    label={category.label}
                  />
                ))}
              </Menu>
            </Menu>
          </Host>
        )}
      </GlassContainer>
    </KeyboardAvoidingView>
  );
}

export default SeachAndFilter;
