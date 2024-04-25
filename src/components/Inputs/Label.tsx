import { styled } from "nativewind";
import React from "react";
import Text from "../Text";

export type LabelProps = { children?: string };

function Label({ children, ...props }: LabelProps) {
  if (!children) return null;

  return (
    <Text className="mb-1.5 ml-0.5 text-sm font-body text-gray-400" {...props}>
      {children}
    </Text>
  );
}

export default styled(Label);
