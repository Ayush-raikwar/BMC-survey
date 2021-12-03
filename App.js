import React, { useState, useEffect } from "react";
import MainStackScreens from "./src/navigation/routes";
import { StyleSheet } from "react-native";
// import { Provider } from 'react-redux'
import NetInfo from "@react-native-community/netinfo";
import { Dimensions, View, Text } from "react-native";
import * as Form from "./src/api/FormController";
import { submitUserData } from "./src/api/userData";
// import { getApiUrlConfig } from './api/config.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");

export default function App() {
  const [networkConnected, setNetworkConnected] = useState(false);

  useEffect(() => {
    (async () => {
      setInterval(async () => {
        NetInfo.addEventListener(async (state) => {
          if (state.isConnected === true) {
            console.log("Network Available");
            let formList = await Form.get();
            if (formList) {
              Object.keys(formList).forEach(async (mobile) => {
                console.log("...uploading form for", mobile);
                let singleForm = formList[mobile];
                // console.log('SingleForm', singleForm);
                if (singleForm.uploaded) {
                  console.log("[INFO]: This form is uploaded already");
                  return;
                } else {
                  if (singleForm.isformComplete) {
                    await submitUserData(singleForm.data); // Sorry I forgot this line :)
                    await Form.update(mobile, { uploaded: true });
                  } else {
                    console.log("this form is not complete yet", ...mobile);
                  }
                }
              });
            }
          } else {
            console.log("Network Unvailable");
          }
          return () => {
            NetInfo.removeListener();
          };
        });
      }, 10000);
    })();
  }, []);

  return (
      <>
        <MainStackScreens />
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  networkText: {
    fontSize: 15,
    textAlign: "center",
    margin: 10,
    zIndex: 2,
    color: "#fff",
    // backgroundColor:"#fff",
    opacity: 1,
    justifyContent: "center",
  },
  // Flex to fill, position absolute,
  // Fixed left/top, and the width set to the window width
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.3,
    backgroundColor: "black",
    width: width,
    height: height,
    justifyContent: "center",
  },
  networkContainer: {
    backgroundColor: "#e50000",
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 25,
    // height: 50,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
});
