import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
} from "react-native";
import RNBounceable, {
  IRNBounceableProps,
} from "@freakycoder/react-native-bounceable";
/**
 * ? Local Imports
 */
import styles from "./RNVoteItem.style";
import { convertPercentageString } from "../utils/RNVote.utils";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

const calculateProgressBarAnimation = ({
  percentage,
  hasBeenVoted,
}: Pick<IRNVoteItemProps, "percentage" | "hasBeenVoted">) => {
  const initialPercentage = hasBeenVoted ? percentage : 0;
  const progress = React.useRef(new Animated.Value(initialPercentage)).current;
  React.useEffect(() => {
    Animated.timing(progress, {
      duration: 1250,
      toValue: percentage,
      useNativeDriver: false, // nativeDriver does not support animating width unfortunately
    }).start();
  }, [percentage]);

  const width = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return { width };
};

export interface IRNVoteItemProps extends IRNBounceableProps {
  text: string;
  disabled?: boolean;
  percentage: number;
  isChosen?: boolean;
  hasBeenVoted: boolean;
  style?: CustomStyleProp;
  children?: React.ReactNode;
  renderIcon?(): JSX.Element;
  ImageComponent?: any;
  VoteItemContainer?: any;
}

const RNVoteItem: React.FC<IRNVoteItemProps> = ({
  text,
  onPress,
  isChosen,
  disabled,
  percentage,
  hasBeenVoted,
  ImageComponent = Image,
  VoteItemContainer = View,
}) => {
  const { width } = calculateProgressBarAnimation({
    percentage,
    hasBeenVoted,
  });

  const _borderWidth = hasBeenVoted ? 0 : 1;

  return (
    <RNBounceable bounceEffect={0.97} onPress={onPress} disabled={disabled}>
      <View
        style={{
          flex: 1,
          opacity: 1,
          marginTop: 10,
          borderRadius: 6,
          overflow: "hidden",
          paddingVertical: 20,
          alignItems: "center",
          flexDirection: "row",
          borderWidth: _borderWidth,
          justifyContent: "space-between",
          borderColor: "rgb(134,129,163)",
        }}
      >
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "rgb(134,129,163)", width },
          ]}
        />
        <Text
          style={{
            flexShrink: 1,
            flexWrap: "wrap",
            paddingHorizontal: 20,
          }}
        >
          {text}
        </Text>
        {hasBeenVoted && (
          <VoteItemContainer
            style={{
              marginRight: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
            appearFrom="left"
          >
            {isChosen && (
              <ImageComponent
                source={require("../local-assets/checkMark.png")}
                style={{
                  width: 18,
                  height: 18,
                  marginRight: 12,
                  tintColor: "#19191a",
                }}
              />
            )}
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                fontWeight: "bold",
              }}
            >
              {convertPercentageString(percentage)}
            </Text>
          </VoteItemContainer>
        )}
      </View>
    </RNBounceable>
  );
};

export default RNVoteItem;
