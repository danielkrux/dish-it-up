import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, View } from "react-native";

import Text from "~/components/Text";
import recipeKeys from "~/features/recipe/recipe.queryKeys";
import { getLastMadeRecipes } from "~/features/recipe/recipe.service";
import useAuth from "~/hooks/useAuth";
import { formatDistanceToNowInDays } from "~/utils/date";

function Account() {
  const router = useRouter();
  const { session } = useAuth();
  const { data } = useQuery(recipeKeys.lastMade(), getLastMadeRecipes);

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon="gearshape"
          onPress={() => router.push("/settings")}
        />
      </Stack.Toolbar>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="mx-4 md:mx-8"
      >
        <Text className="mb-8">{session?.user.email}</Text>

        <View className="flex-row justify-between">
          <Text className="font-display text-xl mb-2">Last Made</Text>
        </View>
        <View className=" bg-gray-100 dark:bg-gray-900 rounded-xl p-4 gap-4">
          {data?.map((r) => (
            <Pressable
              onPress={() => router.push(`/recipes/${r.id}/`)}
              className="flex-row gap-3"
              key={r.id}
            >
              {r.images?.length ? (
                <Image className="w-20 h-20 rounded-xl" source={r.images[0]} />
              ) : null}
              <View className="flex-1">
                <Text numberOfLines={2} className="font-display text-base">
                  {r?.name}
                </Text>
                <Text
                  numberOfLines={1}
                  className="font-body text-gray-500 dark:text-gray-300 text-sm"
                >
                  {formatDistanceToNowInDays(new Date(r?.last_cooked ?? ""))}
                </Text>
              </View>
            </Pressable>
          ))}
          {data?.length === 0 && (
            <Text className="text-gray-500 dark:text-gray-300 text-center">
              You haven&apos;t made any recipes yet!
            </Text>
          )}
        </View>
      </ScrollView>
    </>
  );
}

export default Account;
