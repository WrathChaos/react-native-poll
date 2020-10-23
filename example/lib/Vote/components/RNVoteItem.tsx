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
  id: number;
  text: string;
  disabled?: boolean;
  percentage: number;
  votedChoiceByID?: number;
  hasBeenVoted: boolean;
  style?: CustomStyleProp;
  children?: React.ReactNode;
  renderIcon?(): JSX.Element;
  ImageComponent?: any;
  VoteItemContainer?: any;
}

const RNVoteItem: React.FC<IRNVoteItemProps> = ({
  id,
  text,
  onPress,
  disabled,
  percentage,
  hasBeenVoted,
  votedChoiceByID,
  ImageComponent = Image,
  VoteItemContainer = View,
}) => {
  const { width } = calculateProgressBarAnimation({
    percentage,
    hasBeenVoted,
  });

  console.log("votedChoiceByID: ", votedChoiceByID);

  let _borderWidth = 0.5;
  const isChoiceSelected = votedChoiceByID === id;
  if (hasBeenVoted) {
    _borderWidth = isChoiceSelected ? 0.5 : 0.1;
  }

  return (
    <RNBounceable bounceEffect={0.97} onPress={onPress} disabled={disabled}>
      <View
        style={{
          flex: 1,
          opacity: 1,
          marginTop: 10,
          borderRadius: 12,
          overflow: "hidden",
          paddingVertical: 16,
          alignItems: "center",
          flexDirection: "row",
          borderColor: "#aabee3",
          borderWidth: _borderWidth,
          justifyContent: "space-between",
        }}
      >
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "#aabee3", width },
          ]}
        />
        <Text
          style={{
            flexShrink: 1,
            flexWrap: "wrap",
            color: "#19191a",
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
            animationDuration={750}
          >
            {isChoiceSelected && (
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
                color: "#19191a",
                fontWeight: "700",
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
