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
  totalVotes: number;
  votedChoiceByID?: number;
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
  choices,
  totalVotes,
  hasBeenVoted = false,
  votedChoiceByID = undefined,
  VoteItemContainer = View,
  QuestionsContainer = View,
  ...rest
}) => {
  const [_hasBeenVoted, setHasBeenVoted] = React.useState(hasBeenVoted);
  const [votedChoice, setVotedChoice] = React.useState(votedChoiceByID);

  return (
    <View style={[style]}>
      <ScrollView
        style={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <QuestionsContainer style={{ marginTop: 32 }} {...rest}>
          {choices.map((eachChoice: IChoice) => {
            const { choice, id, votes } = eachChoice;
            const percentage = _hasBeenVoted
              ? countPercentage(votes, totalVotes)
              : 0;

            return (
              <RNVoteItem
                {...rest}
                id={id}
                key={id}
                text={choice}
                disabled={_hasBeenVoted}
                percentage={percentage}
                hasBeenVoted={_hasBeenVoted}
                votedChoiceByID={votedChoice}
                VoteItemContainer={VoteItemContainer}
                onPress={() => {
                  setHasBeenVoted(true);
                  setVotedChoice(id);
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
