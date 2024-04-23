import React from "react";
import Markdown from "react-native-markdown-display";
import { useQuery } from "@tanstack/react-query";

import ScrollView from "~/components/ScrollView";
import { fetchLocalFile } from "~/utils/storage";

function TermsConditions() {
  const { data } = useQuery(["terms-conditions"], () =>
    fetchLocalFile(require("../../../assets/terms-conditions.md"))
  );

  return (
    <ScrollView contentContainerStyle="mx-4 pb-12">
      <Markdown>{data ?? ""}</Markdown>
    </ScrollView>
  );
}

export default TermsConditions;
