import React from "react";
import { View, StatusBar, Dimensions, SafeAreaView } from "react-native";
import RNVote, { IChoice } from "./lib/Vote/RNVote";

const { width: ScreenWidth } = Dimensions.get("window");

const choices: Array<IChoice> = [
  { id: 1, choice: "Nike", votes: 12 },
  { id: 2, choice: "Adidas", votes: 1 },
  { id: 3, choice: "Nike Extra", votes: 3 },
  { id: 4, choice: "Boom", votes: 5 },
  { id: 5, choice: "Hello", votes: 67 },
  { id: 6, choice: "Nike", votes: 7 },
  { id: 7, choice: "Nike", votes: 0 },
];

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ width: ScreenWidth, padding: 16 }}>
          <RNVote
            question="First Vote Question?"
            sumOfVotes={30}
            choices={choices}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
