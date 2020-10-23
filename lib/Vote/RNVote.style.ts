import { ViewStyle, ImageStyle, TextStyle, StyleSheet } from "react-native";

interface Style {
  voteContainer: ViewStyle;
  scrollViewStyle: ViewStyle;
}

export default StyleSheet.create<Style>({
  scrollViewStyle: {
    flexGrow: 1,
  },
  voteContainer: {
    marginTop: 32,
  },
});
