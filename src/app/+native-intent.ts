export async function redirectSystemPath({
  path,
}: {
  path: string;
  initial: boolean;
}) {
  try {
    const url = new URL(path);

    if (url.hostname === "expo-sharing") {
      return "/handle-share";
    }
    return path;
  } catch {
    return "/";
  }
}
