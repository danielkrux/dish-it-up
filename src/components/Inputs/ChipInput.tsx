import { useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import theme, { pallettes } from "../../theme";
import { nanoid } from "../../utils/random";
import Chip, { ChipData } from "../Chip";
import Text from "../Text";
import { InputBaseProps } from "./TextInputBase";
import { styles as inputBaseStyles } from "./TextInputBase";

type ChipInputProps = Omit<InputBaseProps, "value"> & {
  onAdd?: (value: ChipData) => void;
  onRemove?: (vaue: ChipData) => void;
  data?: ChipData[];
  label: string;
  value?: ChipData[];
};

export function ChipInput({
  onAdd,
  onRemove,
  data,
  value = [],
  label,
}: ChipInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [active, setActive] = useState(false);

  function handleBlur() {
    setActive(false);
  }

  function handleFocus() {
    setActive(true);
  }

  function handleSuggestionPress(chipValue: string) {
    const item = data?.find((item) => item.value === chipValue);
    if (!item) return;

    if (value.find((i) => i.value === item.value)) {
      onRemove?.(item);
    } else {
      onAdd?.(item);
    }
  }

  function handleSelectChipPress(chipValue: string) {
    const item = value?.find((item) => item.value === chipValue);
    if (!item) return;

    onRemove?.(item);
  }

  function handleAddChip(
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) {
    const value = e.nativeEvent.text;
    onAdd?.({ label: value, value: nanoid() });
    setInputValue("");
  }

  function handleKeyPress(e: NativeSyntheticEvent<TextInputKeyPressEventData>) {
    if (e.nativeEvent.key === Key.Backspace && inputValue?.length === 0) {
      const lastItem = value[value.length - 1];
      onRemove?.(lastItem);
    }
  }

  return (
    <View>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View style={[inputBaseStyles.container, styles.inputContainer]}>
        {value?.map((item, i) => (
          <Chip
            key={`${item}-${i}`}
            style={styles.firstChip}
            {...item}
            onPress={handleSelectChipPress}
            isSelected />
        ))}
        <TextInput
          onBlur={handleBlur}
          onFocus={handleFocus}
          blurOnSubmit={false}
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleAddChip}
          onKeyPress={handleKeyPress}
          placeholderTextColor={pallettes.black[600]}
          cursorColor={theme.colors.secondary}
          selectionColor={theme.colors.secondary}
          style={[
            inputBaseStyles.input,
            active && inputBaseStyles.inputActive,
            Boolean(value.length) && styles.inputHasChip,
          ]}
        />
      </View>
      <Animated.View entering={FadeIn} style={styles.suggestions}>
        {data?.map((item) => {
          if (value.find((i) => i.value === item.value)) return;

          return <Chip {...item} onPress={handleSuggestionPress} />;
        })}
      </Animated.View>
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
    flexDirection: "row",
    gap: theme.spacing.xs / 2,
  },
});

export enum Key {
  Backspace = "Backspace",
}
