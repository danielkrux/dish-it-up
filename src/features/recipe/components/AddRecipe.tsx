import { useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import Animated, { FadeIn } from "react-native-reanimated";

import { isValidUrl } from "../../../app/utils/url";
import { Recipe } from "../../../../types/Recipe";
import { parseRecipe } from "../recipe.service";

import EnterUrl from "./EnterUrl";
import EditRecipe from "./EditRecipe";
import { hexToRGBA } from "../../../utils/color";
import { Pressable, StyleSheet } from "react-native";
import theme from "../../../theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function AddRecipe({ onClose }: { onClose: () => void }) {
  const [url, setUrl] = useState("");
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const sheetRef = useRef<BottomSheet>(null);

  useQuery(["parse-recipe", url], () => parseRecipe(url), {
    enabled: isValidUrl(url),
    onSuccess: (data) => {
      if (!data) return;
      setRecipe(data);
    },
  });

  const snapPoints = useMemo(() => ["20%", "99%"], []);

  const handleClose = () => {
    sheetRef.current?.close();
    onClose();
    setUrl("");
    setRecipe(undefined);
  };

  return (
    <BottomSheet
      ref={sheetRef}
      onClose={() => setUrl("")}
      backdropComponent={() => (
        <AnimatedPressable
          entering={FadeIn}
          // exiting={FadeOut}
          onPress={handleClose}
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: hexToRGBA(theme.colors.black, 0.5),
          }}
        />
      )}
      snapPoints={snapPoints}
      keyboardBlurBehavior="restore"
      enablePanDownToClose
    >
      {!url && (
        <EnterUrl
          value={url}
          onChangeText={setUrl}
          onSubmit={() => setUrl("")}
        />
      )}
      {url && <EditRecipe recipe={recipe} onAddRecipe={handleClose} />}
    </BottomSheet>
  );
}
