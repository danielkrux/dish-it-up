import { BlurView } from "expo-blur";
import { Pressable, StyleSheet } from "react-native";
import Icon, { IconName } from "./Icon";
import Text from "./Text";
import theme from "../theme";

function BlurButton({
  label,
  icon,
  onPress,
}: {
  label?: string;
  icon?: IconName;
  onPress?: () => void;
}) {
  const iconOnly = icon && !label;

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <BlurView
        intensity={100}
        tint="light"
        style={[
          styles.blur,
          iconOnly && { paddingVertical: 4, paddingHorizontal: 4 },
        ]}
      >
        {icon && <Icon name={icon} size={18} color={theme.colors.text} />}
        {label && <Text size="m">{label}</Text>}
      </BlurView>
    </Pressable>
  );
}

export default BlurButton;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 100,
    alignSelf: "flex-start",
  },
  blur: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
});
