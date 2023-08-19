import React from "react";

// This wrapper makes it possible to create Animated components from functional components
// https://github.com/software-mansion/react-native-reanimated/discussions/1527
const createClassComponent = <TProps,>(
  Component: React.FC<TProps>
): React.ComponentClass<TProps> => {
  return class extends React.Component<TProps> {
    constructor(props: TProps) {
      super(props);
    }

    render() {
      return <Component {...this.props} />;
    }
  };
};

export default createClassComponent;
