import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

import theme, { pallettes } from "../../theme";
import Chip, { ChipData } from "../Chip";
import Text from "../Text";
import { InputBaseProps } from "./TextInputBase";
import { styles as inputBaseStyles } from "./TextInputBase";

type ChipInputProps = InputBaseProps & {
  onAdd?: (value: ChipData) => void;
  onRemove?: (vaue: ChipData) => void;
  data?: ChipData[];
  labelKey: string;
  label: string;
};

export function ChipInput({
  onAdd,
  onRemove,
  data,
  label,
  labelKey,
}: ChipInputProps) {
  const [selected, setSelected] = useState<ChipData[]>([]);
  const [active, setActive] = useState(false);

  function handleBlur() {
    setActive(false);
  }

  function handleFocus() {
    setActive(true);
  }

  function handleChipPress(value: string) {
    const item = data?.find((item) => item.value === value);
    if (!item) return;

    if (selected.find((i) => i.value === item.value)) {
      setSelected(selected.filter((i) => i !== item));
      onRemove?.(item);
    } else {
      setSelected([...selected, item]);
      onAdd?.(item);
    }
  }

  return (
    <View>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View style={[inputBaseStyles.container, styles.inputContainer]}>
        {selected.map((item) => (
          <Chip
            style={styles.firstChip}
            {...item}
            onPress={handleChipPress}
            isSelected
          />
        ))}
        <TextInput
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholderTextColor={pallettes.black[600]}
          cursorColor={theme.colors.secondary}
          selectionColor={theme.colors.secondary}
          style={[
            inputBaseStyles.input,
            active && inputBaseStyles.inputActive,
            Boolean(selected.length) && styles.inputHasChip,
          ]}
        />
      </View>
      {/* {active && ( */}
      <Animated.View entering={FadeIn} style={styles.suggestions}>
        {data?.map((item) => {
          if (selected.find((i) => i.value === item.value)) return;

          return <Chip {...item} onPress={handleChipPress} />;
        })}
      </Animated.View>
      {/* )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    marginBottom: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  inputHasChip: {
    paddingLeft: theme.spacing.xs,
  },
  firstChip: {
    marginLeft: 4,
  },
  suggestions: {
    marginTop: 4,
    alignItems: "flex-start",
  },
});
