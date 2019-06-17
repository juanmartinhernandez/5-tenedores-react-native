import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default class TopFive extends Component {
  constructor() {
    super();

    this.state = {
      restaurants: null
    };
  }

  componentDidMount = () => {
    this.loadTopFiveRestaurants();
  };

  loadTopFiveRestaurants = async () => {
    const restaurants = db
      .collection("restaurants")
      .orderBy("rating", "desc")
      .limit(5);

    let restaurantsArray = [];

    await restaurants.get().then(response => {
      response.forEach(doc => {
        const restaurant = doc.data();
        restaurantsArray.push(restaurant);
      });
    });

    this.setState({
      restaurants: restaurantsArray
    });
  };

  render() {
    return (
      <View style={styles.viewBody}>
        <Text>Top Five Screen...</Text>
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
