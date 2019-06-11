import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Image, Icon, ListItem, Button, Text } from "react-native-elements";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default class Restaurant extends Component {
  constructor(props) {
    super(props);
  }

  checkUserLogin = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      return true;
    }
    return false;
  };

  loadButtonAddReview = () => {
    if (!this.checkUserLogin()) {
      return (
        <Text>
          Para escribir una review tienes que iniciar sesión, puedes hacer{" "}
          <Text
            onPress={() => this.props.navigation.navigate("Login")}
            style={styles.textLinkLogin}
          >
            AQUÍ.
          </Text>
        </Text>
      );
    } else {
      const {
        id,
        name
      } = this.props.navigation.state.params.restaurant.item.restaurant;

      return (
        <Button
          title="Añadir Comentario"
          onPress={() =>
            this.props.navigation.navigate("AddReviewRestaurant", {
              id,
              name
            })
          }
          buttonStyle={styles.btnAddReview}
        />
      );
    }
  };

  render() {
    const {
      id,
      name,
      city,
      address,
      description,
      image
    } = this.props.navigation.state.params.restaurant.item.restaurant;

    const listExtraInfo = [
      {
        text: `${city}, ${address}`,
        iconName: "map-marker",
        iconType: "material-community",
        action: null
      }
    ];

    return (
      <View style={styles.viewBody}>
        <View style={styles.viewImage}>
          <Image
            source={{ uri: image }}
            PlaceholderContent={<ActivityIndicator />}
            style={styles.imageRestaurant}
          />
        </View>

        <View style={styles.viewRestaurantBasicInfo}>
          <Text style={styles.nameRestaurant}>{name}</Text>
          <Text style={styles.descriptionRestaurant}>{description}</Text>
        </View>

        <View style={styles.viewRestaurantExtraInfo}>
          <Text style={styles.restaurantExtraInfoTitle}>
            Informacion sobre el restaurante
          </Text>
          {listExtraInfo.map((item, index) => (
            <ListItem
              key={index}
              title={item.text}
              leftIcon={<Icon name={item.iconName} type={item.iconType} />}
            />
          ))}
        </View>

        <View style={styles.viewBtnAddReview}>
          {this.loadButtonAddReview()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewImage: {
    width: "100%"
  },
  imageRestaurant: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  },
  viewRestaurantBasicInfo: {
    margin: 15
  },
  nameRestaurant: {
    fontSize: 20,
    fontWeight: "bold"
  },
  descriptionRestaurant: {
    marginTop: 5,
    color: "grey"
  },
  viewRestaurantExtraInfo: {
    margin: 15,
    marginTop: 25
  },
  restaurantExtraInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  viewBtnAddReview: {
    margin: 20
  },
  btnAddReview: {
    backgroundColor: "#00a680"
  },
  textLinkLogin: {
    color: "#00a680",
    fontWeight: "bold"
  }
});
