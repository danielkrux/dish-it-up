import React from "react";
import clsx from "clsx";

import Text from "../Text";

export type LabelProps = { children?: string; className?: string };

function Label({ children, className, ...props }: LabelProps) {
  if (!children) return null;

  return (
    <Text
      className={clsx(
        "mb-1.5 ml-0.5 text-sm font-body text-gray-600 dark:text-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </Text>
  );
}

export default Label;
