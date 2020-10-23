import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
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

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

export interface ISource {
  source: string | { uri: string };
}

export interface IRNPollItemProps extends IRNBounceableProps {
  id: number;
  text: string;
  disabled?: boolean;
  percentage: number;
  borderColor?: string;
  hasBeenVoted: boolean;
  votedChoiceByID?: number;
  fillBackgroundColor?: string;
  checkMarkIconImageSource?: ISource;
  choiceTextStyle?: TextStyle;
  percentageTextStyle?: TextStyle;
  checkMarkImageStyle?: ImageStyle;
  style?: CustomStyleProp;
  children?: React.ReactNode;
  renderIcon?(): JSX.Element;
  ImageComponent?: any;
  PollItemContainer?: any;
  onPress: () => void;
}

const RNPollItem: React.FC<IRNPollItemProps> = ({
  id,
  text,
  onPress,
  disabled,
  percentage,
  hasBeenVoted,
  votedChoiceByID,
  choiceTextStyle,
  percentageTextStyle,
  checkMarkImageStyle,
  borderColor = "#aabee3",
  fillBackgroundColor = "#aabee3",
  checkMarkIconImageSource = defaultCheckMarkImage,
  ImageComponent = Image,
  PollItemContainer = View,
  ...rest
}) => {
  const { width } = calculateProgressBarAnimation({
    percentage,
    hasBeenVoted,
  });

  let _borderWidth = 0.5;
  const isChoiceSelected = votedChoiceByID === id;
  if (hasBeenVoted) {
    _borderWidth = isChoiceSelected ? 0.5 : 0.1;
  }

  return (
    <RNBounceable bounceEffect={0.97} onPress={onPress} disabled={disabled}>
      <View style={_container(borderColor, _borderWidth)}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            _animatedViewStyle(fillBackgroundColor, width),
          ]}
        />
        <Text style={[styles.choiceTextStyle, choiceTextStyle]}>{text}</Text>
        {hasBeenVoted && (
          <PollItemContainer style={styles.pollItemContainer} {...rest}>
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
      </View>
    </RNBounceable>
  );
};

export default RNPollItem;
