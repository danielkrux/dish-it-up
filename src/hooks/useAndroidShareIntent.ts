import Constants from "expo-constants";
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

import ReceiveSharingIntent from "react-native-receive-sharing-intent";

export type RecievedFilesItem = {
  contentUri?: string;
  extension?: string;
  fileName?: string;
  filePath?: string;
  mimeType?: string;
  subject?: string;
  text?: string;
  weblink?: string;
};

type ShareIntent = {
  text?: string;
  uri?: string;
  mimeType?: string;
  fileName?: string;
};

export const getShareIntentAsync = async () => {
  return new Promise<ShareIntent>((resolve, reject) => {
    ReceiveSharingIntent.getReceivedFiles(
      (data: RecievedFilesItem[]) => {
        const intent = data[0];
        if (intent.weblink || intent.text) {
          const link = intent.weblink || intent.text || "";
          resolve({ text: link });
        } else if (intent.filePath) {
          resolve({
            uri: intent.contentUri || intent.filePath,
            mimeType: intent.mimeType,
            fileName: intent.fileName,
          });
        }
      },
      (err: { message: string }) => {
        console.error("useShareIntent[get] error", err);
        reject(err);
      },
      Constants.expoConfig?.scheme
    );
  });
};

export const clearShareIntent = () => {
  ReceiveSharingIntent?.clearReceivedFiles();
};

export default function useAndroidShareIntent() {
  const appState = useRef(AppState.currentState);
  const [shareIntent, setShareIntent] = useState<RecievedFilesItem | null>(
    null
  );
  const [error, setError] = useState<string | undefined>();

  const refreshShareIntent = async () => {
    try {
      const result = await getShareIntentAsync();
      setShareIntent(result);
    } catch (err) {
      // @ts-ignore
      setError(`shareIntent error : ${err?.message}`);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        refreshShareIntent();
      } else if (
        appState.current === "active" &&
        ["inactive", "background"].includes(nextAppState)
      ) {
        setShareIntent(null);
      }

      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    refreshShareIntent();

    return () => {
      clearShareIntent();
    };
  }, []);

  return {
    shareIntent,
    resetShareIntent: () => setShareIntent(null),
    error,
  };
}
