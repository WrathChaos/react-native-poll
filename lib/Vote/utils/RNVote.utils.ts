import * as React from "react";
import { Animated } from "react-native";
import { IRNVoteItemProps } from "../components/RNVoteItem";

export const countPercentage = (value: number, sum: number) => {
  if (!sum || !value) {
    return 0;
  }
  return (value / sum) * 100;
};

export const convertPercentageString = (percentage: number) =>
  " " + Math.round(percentage) + "%";

export const calculateProgressBarAnimation = ({
  percentage,
  hasBeenVoted,
}: Pick<IRNVoteItemProps, "percentage" | "hasBeenVoted">) => {
  const initialPercentage = hasBeenVoted ? percentage : 0;
  const progress = React.useRef(new Animated.Value(initialPercentage)).current;
  React.useEffect(() => {
    Animated.timing(progress, {
      duration: 1250,
      toValue: percentage,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const width = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return { width };
};
