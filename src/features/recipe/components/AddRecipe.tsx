import BottomSheet from "@gorhom/bottom-sheet";
import EnterUrl from "./EnterUrl";
import EditRecipe from "./EditRecipe";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { isValidUrl } from "../../../app/utils/url";
import { Recipe } from "../../../../types/Recipe";
import { parseRecipe } from "../recipe.service";

export function AddRecipe({
  step,
  setStep,
}: {
  step?: "enterUrl" | "editRecipe";
  setStep: (step?: "enterUrl" | "editRecipe") => void;
}) {
  const [url, setUrl] = useState("");
  const [recipe, setRecipe] = useState<Recipe | undefined>();

  useQuery(["parse-recipe", url], () => parseRecipe(url), {
    enabled: isValidUrl(url),
    onSuccess: (data) => {
      if (!data) return;
      setRecipe(data);
    },
  });

  const snapPoints = useMemo(
    () => (step === "enterUrl" ? ["20%"] : ["99%"]),
    [step]
  );

  if (!step) return null;

  return (
    <BottomSheet
      onClose={() => setStep(undefined)}
      snapPoints={snapPoints}
      keyboardBlurBehavior="restore"
      enablePanDownToClose
    >
      {step === "enterUrl" && (
        <EnterUrl
          value={url}
          onChangeText={setUrl}
          onSubmit={() => setStep("editRecipe")}
        />
      )}
      {step === "editRecipe" && <EditRecipe recipe={recipe} />}
    </BottomSheet>
  );
}
