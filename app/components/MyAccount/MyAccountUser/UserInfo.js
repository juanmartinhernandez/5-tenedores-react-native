import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";

import UpdateUserInfo from "./UpdateUserInfo";

import * as firebase from "firebase";

import { Permissions, ImagePicker } from "expo";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      userInfo: {}
    };
  }

  componentDidMount = async () => {
    await this.getUserInfo();
  };

  getUserInfo = () => {
    const user = firebase.auth().currentUser;
    user.providerData.forEach(userInfo => {
      this.setState({
        userInfo
      });
    });
  };

  reauthenticate = currentPassword => {
    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(credentials);
  };

  checkUserAvatar = photoURL => {
    return photoURL
      ? photoURL
      : "https://api.adorable.io/avatars/285/abott@adorable.png";
  };

  updateUserDisplayName = async newDisplayName => {
    const update = {
      displayName: newDisplayName
    };
    await firebase.auth().currentUser.updateProfile(update);

    this.getUserInfo();
  };

  updateUserEmail = async (newEmail, password) => {
    this.reauthenticate(password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updateEmail(newEmail)
          .then(() => {
            this.refs.toast.show(
              "Email actualizado, vuelve a iniciar sesión",
              50,
              () => {
                firebase.auth().signOut();
              }
            );
          })
          .catch(err => {
            this.refs.toast.show(err, 1500);
          });
      })
      .catch(err => {
        this.refs.toast.show("Tu contraseña no es correcta", 1500);
      });
  };

  returnUpdateUserInfoComponent = userInfoData => {
    if (userInfoData.hasOwnProperty("uid")) {
      return (
        <UpdateUserInfo
          userInfo={this.state.userInfo}
          updateUserDisplayName={this.updateUserDisplayName}
          updateUserEmail={this.updateUserEmail}
        />
      );
    }
  };

  changeAvatarUser = async () => {
    const resultPermision = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (resultPermision.status === "denied") {
      this.refs.toast.show(
        "Es necesario aceptar los permisos de la galeria",
        1500
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (result.cancelled) {
        this.refs.toast.show("Has cerrado la galeria de imagenes", 1500);
      } else {
        console.log(result);
      }
    }
  };

  render() {
    const { displayName, email, photoURL } = this.state.userInfo;

    return (
      <View>
        <View style={styles.viewUserInfo}>
          <Avatar
            rounded
            size="large"
            showEditButton
            onEditPress={() => this.changeAvatarUser()}
            source={{
              uri: this.checkUserAvatar(photoURL)
            }}
            containerStyle={styles.userInfoAvatar}
          />
          <View>
            <Text style={styles.displayName}>{displayName}</Text>
            <Text>{email}</Text>
          </View>
        </View>
        {this.returnUpdateUserInfoComponent(this.state.userInfo)}

        <Toast
          ref="toast"
          position="bottom"
          positionValue={250}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30
  },
  userInfoAvatar: {
    marginRight: 20
  },
  displayName: {
    fontWeight: "bold"
  }
});
