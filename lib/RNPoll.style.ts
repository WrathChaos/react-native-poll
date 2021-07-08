import { ViewStyle, StyleSheet } from "react-native";

interface Style {
  pollContainer: ViewStyle;
  scrollViewStyle: ViewStyle;
}

export default StyleSheet.create<Style>({
  scrollViewStyle: {
    flexGrow: 1,
  },
  pollContainer: {
    marginTop: 16,
  },
});
