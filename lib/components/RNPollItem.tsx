import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from "react-native";
import RNBounceable, {
  IRNBounceableProps,
} from "@freakycoder/react-native-bounceable";
/**
 * ? Local Imports
 */
import styles, { _container, _animatedViewStyle } from "./RNPollItem.style";
import {
  convertPercentageString,
  calculateProgressBarAnimation,
} from "../utils/RNPoll.utils";

const defaultCheckMarkImage = require("../local-assets/checkmark.png");

export interface IRNPollItemProps extends IRNBounceableProps {
  pollId: number;
  text: string;
  onPress: () => void;
  percentage: number;
  hasBeenVoted: boolean;
  disabled?: boolean;
  borderColor?: string;
  votedChoiceByID?: number;
  fillBackgroundColor?: string;
  checkMarkIconImageSource?: ImageSourcePropType;
  pollItemContainerStyle?: StyleProp<ViewStyle>;
  choiceTextStyle?: StyleProp<TextStyle>;
  percentageTextStyle?: StyleProp<TextStyle>;
  checkMarkImageStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  selectedChoiceBorderWidth?: number;
  defaultChoiceBorderWidth?: number;
  ImageComponent?: any;
  PollItemContainer?: any;
  renderIcon?(): JSX.Element;
}

const RNPollItem: React.FC<IRNPollItemProps> = ({
  pollId,
  text,
  onPress,
  disabled,
  percentage,
  hasBeenVoted,
  votedChoiceByID,
  choiceTextStyle,
  percentageTextStyle,
  checkMarkImageStyle,
  pollItemContainerStyle,
  borderColor = "#aabee3",
  fillBackgroundColor = "#aabee3",
  selectedChoiceBorderWidth = 1,
  defaultChoiceBorderWidth = 0.5,
  checkMarkIconImageSource = defaultCheckMarkImage,
  ImageComponent = Image,
  PollItemContainer = View,
  ...rest
}) => {
  const { width } = calculateProgressBarAnimation({
    percentage,
    hasBeenVoted,
  });

  let _borderWidth = defaultChoiceBorderWidth;
  const isChoiceSelected = votedChoiceByID === pollId;
  if (hasBeenVoted) {
    _borderWidth = isChoiceSelected
      ? selectedChoiceBorderWidth
      : defaultChoiceBorderWidth;
  }

  return (
    <RNBounceable
      style={_container(borderColor, _borderWidth)}
      bounceEffectIn={0.97}
      onPress={onPress}
      disabled={disabled}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          _animatedViewStyle(fillBackgroundColor, width),
        ]}
      />
      <Text style={[styles.choiceTextStyle, choiceTextStyle]}>{text}</Text>
      {hasBeenVoted && (
        <PollItemContainer
          style={[styles.pollItemContainer, pollItemContainerStyle]}
          {...rest}
        >
          {isChoiceSelected && (
            <ImageComponent
              source={checkMarkIconImageSource}
              style={[styles.checkMarkImageStyle, checkMarkImageStyle]}
            />
          )}
          <Text style={[styles.percentageTextStyle, percentageTextStyle]}>
            {convertPercentageString(percentage)}
          </Text>
        </PollItemContainer>
      )}
    </RNBounceable>
  );
};

export default RNPollItem;
