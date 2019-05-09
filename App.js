import React from "react";
import { StyleSheet, Text, View } from "react-native";

import BottomNavigation from "./app/components/BottomNavigation";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerBody}>
          <Text>Hello World!</Text>
        </View>
        <BottomNavigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerBody: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
