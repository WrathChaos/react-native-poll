import React from "react";
import { View, StatusBar, Dimensions, SafeAreaView } from "react-native";
import RNPoll, { IChoice } from "./build/dist/RNPoll";
import RNAnimated from "react-native-animated-component";

const { width: ScreenWidth } = Dimensions.get("window");

const choices: Array<IChoice> = [
  { id: 1, choice: "Nike", votes: 17 },
  { id: 2, choice: "Adidas", votes: 7 },
  { id: 3, choice: "Puma", votes: 1 },
  { id: 4, choice: "Reebok", votes: 5 },
  { id: 5, choice: "Under Armour", votes: 9 },
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
            appearFrom="top"
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
