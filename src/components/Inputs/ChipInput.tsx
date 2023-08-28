import { useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import theme, { pallettes } from "../../theme";
import Chip, { ChipData } from "../Chip";
import Text from "../Text";
import { InputBaseProps } from "./TextInputBase";
import { styles as inputBaseStyles } from "./TextInputBase";

type ChipInputProps = InputBaseProps & {
  onAdd?: (value: ChipData) => void;
  onRemove?: (vaue: ChipData) => void;
  data?: ChipData[];
  label: string;
};

export function ChipInput({ onAdd, onRemove, data, label }: ChipInputProps) {
  const inputRef = useRef<TextInput>(null);
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

  function handleAddCategory(
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) {
    inputRef.current?.clear();
    setSelected([...selected, { value: "0", label: e.nativeEvent.text }]);
  }

  return (
    <View>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View style={[inputBaseStyles.container, styles.inputContainer]}>
        {selected.map((item, i) => (
          <Chip
            key={`${item.value}-${i}`}
            style={styles.firstChip}
            {...item}
            onPress={handleChipPress}
            isSelected
          />
        ))}
        <TextInput
          ref={inputRef}
          onBlur={handleBlur}
          onFocus={handleFocus}
          blurOnSubmit={false}
          onSubmitEditing={handleAddCategory}
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
      <Animated.View entering={FadeIn} style={styles.suggestions}>
        {data?.map((item) => {
          if (selected.find((i) => i.value === item.value)) return;

          return <Chip {...item} onPress={handleChipPress} />;
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
  },
});
