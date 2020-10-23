import * as React from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleProp,
  ViewStyle,
} from "react-native";
/**
 * ? Local Imports
 */
import styles from "./RNVote.style";
import RNVoteItem from "./components/RNVoteItem";
import { countPercentage } from "./utils/RNVote.utils";

const { width: ScreenWidth } = Dimensions.get("window");
type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

export interface IChoice {
  id: number;
  votes: number;
  choice: string;
}

interface IRNVoteProps {
  question: string;
  sumOfVotes: number;
  votedChoice?: number;
  hasBeenVoted?: boolean;
  choices: Array<IChoice>;
  style?: CustomStyleProp;
  children?: React.ReactNode;
  renderIcon?(): JSX.Element;
  VoteItemContainer?: any;
  QuestionsContainer?: any;
}

const RNVote: React.FC<IRNVoteProps> = ({
  style,
  question,
  choices,
  sumOfVotes,
  votedChoice = false,
  hasBeenVoted = false,
  VoteItemContainer = View,
  QuestionsContainer = View,
  ...rest
}) => {
  const [_hasBeenVoted, setHasBeenVoted] = React.useState(hasBeenVoted);

  return (
    <View style={[style]}>
      <Text
        style={{
          fontWeight: "400",
          textAlign: "center",
        }}
      >
        {question}
      </Text>
      <ScrollView
        style={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <QuestionsContainer style={{ marginTop: 32 }} {...rest}>
          {choices.map((eachChoice: IChoice) => {
            const { choice, id, votes } = eachChoice;
            const isChosen = _hasBeenVoted && votedChoice === id;
            const percentage = _hasBeenVoted
              ? countPercentage(votes, sumOfVotes)
              : 0;

            return (
              <RNVoteItem
                {...rest}
                key={id}
                text={choice}
                isChosen={isChosen}
                disabled={_hasBeenVoted}
                percentage={percentage}
                hasBeenVoted={_hasBeenVoted}
                VoteItemContainer={VoteItemContainer}
                onPress={() => {
                  setHasBeenVoted(true);
                }}
              />
            );
          })}
        </QuestionsContainer>
      </ScrollView>
    </View>
  );
};

export default RNVote;
