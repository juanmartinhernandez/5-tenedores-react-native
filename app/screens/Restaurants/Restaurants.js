import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import ActionButton from "react-native-action-button";

import * as firebase from "firebase";

export default class Restaurants extends Component {
  constructor() {
    super();

    this.state = {
      login: false
    };
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          login: true
        });
      } else {
        this.setState({
          login: false
        });
      }
    });
  };

  goToScreen = nameScreen => {
    this.props.navigation.navigate(nameScreen);
  };

  loadActionButton = () => {
    const { login } = this.state;

    if (login) {
      return (
        <ActionButton
          buttonColor="#00a680"
          onPress={() => this.goToScreen("AddRestaurant")}
        />
      );
    }

    return null;
  };

  render() {
    return (
      <View style={styles.viewBody}>
        <Text>Restaurants Screen...</Text>
        {/* {this.loadActionButton()} */}
        <ActionButton
          buttonColor="#00a680"
          onPress={() => this.goToScreen("AddRestaurant")}
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
