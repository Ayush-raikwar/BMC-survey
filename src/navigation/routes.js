import * as React from "react";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import { Text } from "react-native";
import VolunteerLogin from "../screens/VolunteerLogin";
import VolunteerSignUp from "../screens/VolunteerSignUp";
import MobileOtp from "../screens/MobileOtp";
import FormsViewer from "../screens/formsViewer";
import ViewSingleForm from "../screens/ViewSingleForm";
import Register from "../screens/Register";


const Stack = createNativeStackNavigator();

// const MainStackScreens = async () => {
export default function MainStackScreens() {
    const [initialRouteScreen, setInitialRouteScreen] = useState(null);

    useEffect(() => {
        (async () => {
            console.log("Checking if user logged in");
            await checkUserLoggedIn();
        })();
    }, []);

    const checkUserLoggedIn = async () => {
        // const res = await getApiUrlConfig();
        // if(res.data[0] && res.data[0] != null){
        //   let configObj = res.data[0]
        //   if(configObj.config_name == 'api_url'){
        //     let res = await AsyncStorage.setItem('api_url', configObj.config_value)

        //     // const val = await AsyncStorage.getItem('api_url')
        //     // console.log('api_url..........',val)

        //   }
        // }

        // reading
        const token = await AsyncStorage.getItem("token");
        console.log("tokens", token);
        if (token !== null) {
            console.log("token is not null");
            console.log("Going to form");
            setInitialRouteScreen("Register");
            // setInitialRouteScreen("FormsViewer");
        } else {
            console.log("Going to register");
            setInitialRouteScreen("VolunteerLogin");
        }
    };

    return (
        <>
            {initialRouteScreen != null ? (
                <NavigationContainer>
                    <Stack.Navigator
                        // initialRouteName="VolunteerLogin"
                        initialRouteName={`${initialRouteScreen}`}
                        screenOptions={{
                            headerShown: false,
                        }}>
                        <Stack.Screen name="FormsViewer" component={FormsViewer} />
                        <Stack.Screen
                            name="view-single-form"
                            component={ViewSingleForm}
                        />
                        <Stack.Screen name="VolunteerLogin" component={VolunteerLogin} />
                        <Stack.Screen name="VolunteerSignUp" component={VolunteerSignUp} />
                        <Stack.Screen name="MobileOtp" component={MobileOtp} />
                        <Stack.Screen name="Register" component={Register} />
                    </Stack.Navigator>
                </NavigationContainer>
            ) : (
                <>
                    <ActivityIndicator />
                </>
            )}
        </>
    );
}
