import { addEventListener, getInitialURL, parse } from "expo-linking";
import { router, useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";
import useAndroidShareIntent from "~/hooks/useAndroidShareIntent";

export async function useHandleUrlShare() {
  const rootNavigationState = useRootNavigationState();
  const [url, setUrl] = useState<string | null>(null);
  const { shareIntent, resetShareIntent } = useAndroidShareIntent();

  function onChange(event: { url: string }) {
    setUrl(event.url);
  }

  useEffect(() => {
    getInitialURL().then((url) => setUrl(url));
    const subscription = addEventListener("url", onChange);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (!url || !rootNavigationState.key) return;

    const { queryParams } = parse(url);

    setTimeout(() => {
      if (queryParams?.url && typeof queryParams.url === "string") {
        router.push(`/(app)/recipe/add/${encodeURIComponent(queryParams.url)}`);
        setUrl(null);
      }
    }, 1);
  }, [url, rootNavigationState.key]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (shareIntent?.text) {
      router.push(`/(app)/recipe/add/${encodeURIComponent(shareIntent.text)}`);
      resetShareIntent();
    }
  }, [shareIntent]);
}
