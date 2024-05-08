import React from "react";
import Markdown from "react-native-markdown-display";
import { useQuery } from "@tanstack/react-query";

import ScrollView from "~/components/ScrollView";
import { fetchFile } from "~/utils/storage";

function PrivacyPolicy() {
  const { data } = useQuery(["privacy-policy"], () =>
    fetchFile(
      "https://gist.githubusercontent.com/danielkrux/ebc331b3d4eef4a459a703d8afdcd71e/raw/64c2aad539a213de81970d4847ac1d9b4c647ff0/dish-it-up-privacy-policy.md"
    )
  );

  return (
    <ScrollView contentContainerClassName="mx-4 pb-12">
      <Markdown>{data ?? ""}</Markdown>
    </ScrollView>
  );
}

export default PrivacyPolicy;
