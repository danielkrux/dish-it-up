import { Image } from "expo-image";
import { ReactNode } from "react";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import clsx from "clsx";

import ChipList from "~/components/ChipList";
import ScrollView from "~/components/ScrollView";
import StarRating from "~/components/StarRating";
import Text from "~/components/Text";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";
import useContainerBreakpoint from "~/hooks/useContainerBreakpoint";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import Meta from "./Meta";

export default function RecipeDetail({
  id,
  header,
  logRecipeRef,
}: {
  id: number;
  header?: ReactNode;
  logRecipeRef?: React.RefObject<BottomSheetModalMethods>;
}) {
  const { data } = useFetchRecipe(id);
  const { containerSize, onLayout, isLoading } = useContainerBreakpoint();

  if (containerSize === "lg") {
    return (
      <View className="px-4 flex-1">
        <View className="flex-1 flex-row gap-10 mb-10">
          <ScrollView contentContainerClassName="pt-5" className="flex-1">
            <Image
              source={data?.images?.[0]}
              className="aspect-square rounded-2xl mb-4"
            />
            <ChipList
              className="mb-2"
              data={data?.categories.map((c) => ({
                value: String(c.id),
                label: c.name,
              }))}
            />
            {data?.description && (
              <Text className="mb-4 max-w-screen-sm">{data?.description}</Text>
            )}
            <Meta recipe={data} className="mb-4" />
          </ScrollView>
          <ScrollView contentContainerClassName="pt-5" className="flex-1">
            <Instructions recipe={data} className="mx-4 mb-5" />
          </ScrollView>
          <ScrollView contentContainerClassName="pt-5" className="flex-1">
            <Ingredients recipe={data} className="mb-2 mx-4" />
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      onLayout={onLayout}
      contentInsetAdjustmentBehavior="automatic"
      className={twMerge(
        clsx("flex-1 pt-4 px-4 opacity-0", {
          "opacity-1": !isLoading,
        })
      )}
      contentContainerClassName="pb-40"
    >
      {header}
      <View className="mb-4">
        <View className="flex-row justify-between items-end mb-4 gap-4 hidden native:flex native:md:hidden">
          <Text className="font-display text-4xl">{data?.name}</Text>
          <StarRating
            onPress={() => logRecipeRef?.current?.present()}
            initialValue={data?.rating}
            short
            className="mb-1.5"
          />
        </View>

        <Image
          source={data?.images?.[0]}
          className="aspect-video rounded-2xl"
        />
      </View>
      {data?.description && (
        <Text className="mb-4 max-w-3xl">{data?.description}</Text>
      )}
      <Meta recipe={data} className="mb-5" />
      <ChipList
        className="mb-5"
        data={data?.categories.map((c) => ({
          value: String(c.id),
          label: c.name,
        }))}
      />
      <Ingredients recipe={data} className="mb-7" />
      <Instructions recipe={data} className="mb-5" />
    </ScrollView>
  );
}
