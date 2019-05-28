import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import ActionButton from "react-native-action-button";

export default class Restaurants extends Component {
  render() {
    return (
      <View style={styles.viewBody}>
        <Text>Restaurants Screen...</Text>

        <ActionButton
          buttonColor="#00a680"
          onPress={() => console.log("Open Add Restaurant")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});
