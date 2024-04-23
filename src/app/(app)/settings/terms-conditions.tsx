import React from "react";
import Markdown from "react-native-markdown-display";
import { useQuery } from "@tanstack/react-query";

import ScrollView from "~/components/ScrollView";
import { fetchFile } from "~/utils/storage";

function TermsConditions() {
  const { data } = useQuery(["terms-conditions"], () =>
    fetchFile(
      "https://gist.githubusercontent.com/danielkrux/2835898ee8431ab1b71f54e96f901a1d/raw/e4b8c0963b8e274e97c8cf78ca3b8cd0a1c0aed7/dish-it-up-terms-conditions.md"
    )
  );

  return (
    <ScrollView contentContainerStyle="mx-4 pb-12">
      <Markdown>{data ?? ""}</Markdown>
    </ScrollView>
  );
}

export default TermsConditions;
