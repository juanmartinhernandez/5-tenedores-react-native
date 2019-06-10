import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { AirbnbRating, Button } from "react-native-elements";

import t from "tcomb-form-native";
const Form = t.form.Form;
import {
  AddReviewRestaurantStruct,
  AddReviewRestaurantOptions
} from "../../forms/AddReviewRestaurant";

export default class AddReviewRestaurant extends Component {
  constructor(props) {
    super(props);
  }

  sendReview = () => {
    console.log("Has enviado el formulario de review.");

    const ratingValue = this.refs.rating.state.position;
    console.log(ratingValue);
  };

  render() {
    return (
      <View style={styles.viewBody}>
        <View style={styles.viewRating}>
          <AirbnbRating
            ref="rating"
            count={5}
            reviews={[
              "Pésimo",
              "Deficiente",
              "Normal",
              "Muy Bueno",
              "Excelente"
            ]}
            defaultRating={0}
            size={35}
          />
        </View>

        <View style={styles.formReview}>
          <Form
            ref="addReviewRestaurantForm"
            type={AddReviewRestaurantStruct}
            options={AddReviewRestaurantOptions}
          />
        </View>

        <View style={styles.viewSendReview}>
          <Button
            title="Enviar"
            onPress={() => this.sendReview()}
            buttonStyle={styles.sendBtnReview}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewRating: {
    height: 110,
    backgroundColor: "#f2f2f2"
  },
  formReview: {
    margin: 10,
    marginTop: 40
  },
  viewSendReview: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20
  },
  sendBtnReview: {
    backgroundColor: "#00a680"
  }
});
