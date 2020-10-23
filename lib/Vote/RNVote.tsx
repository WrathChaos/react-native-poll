import * as React from "react";
import { View, ScrollView, StyleProp, ViewStyle } from "react-native";
/**
 * ? Local Imports
 */
import styles from "./RNVote.style";
import RNVoteItem from "./components/RNVoteItem";
import { countPercentage } from "./utils/RNVote.utils";

export type CustomStyleProp =
  | StyleProp<ViewStyle>
  | Array<StyleProp<ViewStyle>>;

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
  VoteContainer?: any;
}

const RNVote: React.FC<IRNVoteProps> = ({
  style,
  choices,
  totalVotes,
  hasBeenVoted = false,
  votedChoiceByID = undefined,
  VoteItemContainer = View,
  VoteContainer = View,
  ...rest
}) => {
  const [_hasBeenVoted, setHasBeenVoted] = React.useState(hasBeenVoted);
  const [votedChoice, setVotedChoice] = React.useState(votedChoiceByID);

  return (
    <View style={style}>
      <ScrollView
        style={styles.scrollViewStyle}
        showsVerticalScrollIndicator={false}
      >
        <VoteContainer style={styles.voteContainer} {...rest}>
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
        </VoteContainer>
      </ScrollView>
    </View>
  );
};

export default RNVote;
