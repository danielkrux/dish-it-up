import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Keyboard, Pressable, TextInput, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import InputBase from "~/components/Inputs/TextInputBase";
import RecipeQuickFilter from "./RecipeFilters";

import type { HomeSearchParams } from "../types";
import SortRecipes from "./SortRecipes";
import { GlassContainer, GlassView } from "expo-glass-effect";
import { colors } from "~/theme";
import Icon from "~/components/Icon";
import { ContextMenu, Host, Image, Button } from "@expo/ui/swift-ui";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

function SeachAndFilter() {
  const ref = useRef<TextInput>(null);
  const sortSheetRef = useRef<BottomSheetModalMethods>(null);
  const router = useRouter();
  const { q } = useLocalSearchParams<HomeSearchParams>();
  const [isSearching, setIsSearching] = useState(false);

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
          <Pressable onPress={sortSheetRef.current?.present}>
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
                <Button
                  systemImage="arrow.up.arrow.down"
                  onPress={() => {
                    console.log("here");
                    sortSheetRef.current?.present();
                  }}
                >
                  Sort
                </Button>
                <Button
                  systemImage="line.horizontal.3.decrease"
                  // onPress={sortSheetRef.current?.present}
                >
                  Filter
                </Button>
              </ContextMenu.Items>
            </ContextMenu>
          </Host>
        )}
      </GlassContainer>
      <SortRecipes ref={sortSheetRef} />
      {/* <View className="flex-row items-center gap-4 mt-1 ">
        <RecipeQuickFilter />
      </View> */}
    </View>
  );
}

export default SeachAndFilter;
