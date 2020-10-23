import React from "react";
import { View, StatusBar, Dimensions, SafeAreaView } from "react-native";
import RNPoll, { IChoice } from "./build/dist/RNPoll";
import RNAnimated from "react-native-animated-component";

const { width: ScreenWidth } = Dimensions.get("window");

const choices: Array<IChoice> = [
  { id: 1, choice: "Nike", votes: 12 },
  { id: 2, choice: "Adidas", votes: 1 },
  { id: 3, choice: "Nike Extra", votes: 3 },
  { id: 4, choice: "Boom", votes: 5 },
  { id: 5, choice: "Hello", votes: 9 },
];

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{
            width: ScreenWidth * 0.9,
          }}
        >
          <RNPoll
            appearFrom="left"
            animationDuration={750}
            totalVotes={30}
            choices={choices}
            PollContainer={RNAnimated}
            PollItemContainer={RNAnimated}
            onChoicePress={(selectedChoice: IChoice) =>
              console.log("SelectedChoice: ", selectedChoice)
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
