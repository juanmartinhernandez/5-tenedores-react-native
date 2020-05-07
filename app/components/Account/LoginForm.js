import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { validateEmail } from "../../utils/validations";
import Loading from "../Loading";

export default function LoginForm(props) {
  const { toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      setLoading(true);
      axios
        .get("https://demos-calidad.iwebjbs.com.ar/modules.php?name=iwf_offline&file=get_login&username="+formData.email+"&password="+formData.password)
        .then(function(response){
          setLoading(false);
          console.log(response.data);
          if(response.data[0].rta_login=="OK"){
            //navigation.navigate("account");
            //toastRef.current.show("Usuario OK");
          }else{
            toastRef.current.show("Usuario o contraseña incorrecta");
          }
          // console.log('DATAAA :) '+response.data);
          // console.log('STATUSSSSS :) '+response.status);
          // console.log('STATUS TEXT :) '+response.statusText);
          // console.log('HEADERS  :) '+response.headers);
          // console.log('CONFIGG :) '+response.config);
          //navigation.navigate("account");
        })
        .catch(function(error){
          setLoading(false);
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            //toastRef.current.show(error.request._response);
            toastRef.current.show("Problemas al conectar. Vuelva a intentarlo");
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            //console.log(error.request);
            //console.log(error.request._response);
            toastRef.current.show("Problemas de conexión. Vuelva a intentarlo");
          } else {
            // Something happened in setting up the request that triggered an Error
            //console.log('Error:  ', error.message);
            toastRef.current.show("Problemas al autenticar. Vuelva a intentarlo");
          }
          //console.log(error.toJSON());
          //console.log('PROBLEMA  '+ error.config);
          
        }
        );
    }
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Nombre de usuario"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Iniciando sesión" />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "black",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
