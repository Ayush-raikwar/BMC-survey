import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Form from "../api/FormController";
import AsyncWriter from "../utils/AsyncWriter";
import VolunteerLogin from "./VolunteerLogin";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d3d3d3",
  },
  mobile: {
    padding: 20,
    backgroundColor: "white",
    elevation: 2,
    margin: 10,
  },
  heading: {
    padding: 20,
    fontSize: 24,
  },
});

const FormsViewer =({ navigation })=> {
  const [formlist, setFormlist] = React.useState([]);

  const getForm = async () => {
    let formListFromStorage = await Form.get();
    setFormlist(formListFromStorage);
  };

  React.useEffect(() => {
    (async () => await getForm())();
  }, []);

  const open = (i) => {
    navigation.navigate("view-single-form", { mobile: i });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.heading}>View Forms</Text>
        <Button
          onPress={async () => {
            console.log('reloading forms');
            await getForm();
          }}>
          Reload
        </Button>
        <Button
          onPress={() => {
            Form.removeall();
            console.log('removing forms');
            setFormlist([]);
          }}>
          Remove All
        </Button>
        <Button
          onPress={async () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Register" }],
            });
            // navigation.navigate("Register");
          }}>
          Go Home
        </Button>
        {formlist &&
          Object.keys(formlist).map((i) => (
            <TouchableOpacity
              onPress={() => open(i)}
              key={Math.floor(Math.random() * 999999999)}>
              <Text style={styles.mobile}>
                {`${i}\nUploaded: ${formlist[i].uploaded}`}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </SafeAreaView>
  );
};

export default FormsViewer
