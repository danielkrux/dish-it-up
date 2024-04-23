import React from "react";
import Markdown from "react-native-markdown-display";
import { useQuery } from "@tanstack/react-query";

import ScrollView from "~/components/ScrollView";
import { fetchLocalFile } from "~/utils/storage";

function PrivacyPolicy() {
  const { data } = useQuery(["privacy-policy"], () =>
    fetchLocalFile(require("../../../assets/privacy-policy.md"))
  );

  return (
    <ScrollView contentContainerStyle="mx-4 pb-12">
      <Markdown>{data ?? ""}</Markdown>
    </ScrollView>
  );
}

export default PrivacyPolicy;
