import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class Restaurant extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      name,
      city,
      address
    } = this.props.navigation.state.params.restaurant.item.restaurant;
    return (
      <View style={StyleSheet.viewBody}>
        <Text>
          Estamos en la screen del restaurante {name} de la ciudad de {city} con
          la direccion {address}{" "}
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  viewBody: {
    flex: 1
  }
});
