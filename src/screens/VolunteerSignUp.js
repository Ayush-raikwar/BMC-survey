import React,{useState} from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Switch,
    ActivityIndicator,
    ScrollView,
    Dimensions,
  } from "react-native";
import { sendOtp } from '../api/otp';
import { volunteerRegister } from '../api/user';

const { width, height } = Dimensions.get('window');


const VolunteerSignUp = ({ navigation }) => {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [appLanguage,setAppLanguage] = useState('Marathi')
    const [showRegisterLoader,setShowRegisterLoader] = useState(false);

    const languageSwitch = () => {
        if(appLanguage === 'English'){
            setAppLanguage('Marathi')
        }else{
            setAppLanguage('English')
        }

    };

    const  onPressVolunteerRegister = async () => {
        if(checkValidation()){
            setShowRegisterLoader(true);
            showErrorTimeout();
            const res = await volunteerRegister(
                {
                    first_name: firstName,
                    last_name: lastName,
                    mobile: phoneNumber,
                    email: email,
                    password: password,
                }
            );
            if(res.status == 200){
                // console.log('res: ',res)
                setShowRegisterLoader(false);
                if(res.data.message && res.data.message == 'volunteer already registered'){
                    displayAlert('Alert!!','volunteer already registered with this number');
                }else{
                    displayAlert('Success!!','Registration successfull');
                    navigation.replace('VolunteerLogin')
                }

            }
        }
    }

    const displayAlert = (title,Message) => {
        Alert.alert(
            title,
            Message,
            [
              { text: appLanguage == 'Marathi' ? 'ठीक आहे' : 'OK'
                , onPress: () => {
              } }
            ],
            { cancelable: false }
        );
    }


    const showErrorTimeout = () => {
        setTimeout(function(){
            if(showRegisterLoader == true){
                setShowRegisterLoader(false);
                displayAlert('Alert!','Something went wrong, please try again')
            }
        }, 4000);
    }

    const navigateToVolunteerLogin = () => {
        navigation.replace('VolunteerLogin')
    }

    const checkValidation = () => {
        if(firstName == ''){
            if(appLanguage === 'Marathi'){
                displayAlert('Alert!','कृपया नाव प्रविष्ट करा');
            }else{
                displayAlert('Alert!!','Please enter first name');
            }
            return false;
        }else if(lastName == ''){
            if(appLanguage === 'Marathi'){
                displayAlert('Alert!','कृपया आडनाव प्रविष्ट करा');
            }else{
                displayAlert('Alert!!','Please enter last name');
            }
            return false;
        }else if(email == ''){
            if(appLanguage === 'Marathi'){
                displayAlert('Alert!','कृपया ईमेल प्रविष्ट करा');
            }else{
                displayAlert('Alert!!','Please enter email');
            }
            return false;
        }else if(phoneNumber == '' || phoneNumber.length < 10){
            if(appLanguage === 'Marathi'){
                displayAlert('Alert!','कृपया योग्य फोन नंबर प्रविष्ट करा');
            }else{
                displayAlert('Alert!!','Please enter correct phone number');
            }
            return false;
        }else if(password == '' || password.length < 6){
            if(appLanguage === 'Marathi'){
                displayAlert('Alert!','कृपया योग्य पासवर्ड एंटर करा, पासवर्ड किमान ६ वर्णांचा असावा');
            }else{
                displayAlert('Alert!!','Please enter correct password, password should be atleast 6 characters.');
            }
            return false;
        }else if(password !== confirmPassword){
            if(appLanguage === 'Marathi'){
                displayAlert('Alert!','पासवर्ड जुळत नाही याची खात्री करा');
            }else{
                displayAlert('Alert!!','Confirm password does not match');
            }
            return false;
        }
        return true;
    }


    return (

        // <ScrollView>
            <View style={styles.container}>

                <Text style={styles.mothersOfGoaText}>
                    {/* Mothers of Goa */}
                    {appLanguage === 'Marathi' ? (<>
                        स्वयंसेवक नोंदणी
                    </>):(<>
                        Volunteer Registration
                    </>)}
                </Text>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder={`${appLanguage === 'Marathi' ? 'पहिले नाव टाका' : 'Enter First Name'}`}
                        placeholderTextColor="#003f5c"
                        onChangeText={(text) => setFirstName(text)}
                        maxLength={25}
                        // keyboardType="numeric"
                        value={firstName}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder={`${appLanguage === 'Marathi' ? 'आडनाव टाका' : 'Enter Last Name'}`}
                        placeholderTextColor="#003f5c"
                        onChangeText={(text) => setLastName(text)}
                        maxLength={25}
                        // keyboardType="numeric"
                        value={lastName}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder={`${appLanguage === 'Marathi' ? 'फोन नंबर टाका' : 'Enter Phone Number'}`}
                        placeholderTextColor="#003f5c"
                        onChangeText={(text) => setPhoneNumber(text)}
                        maxLength={10}
                        keyboardType="numeric"
                        value={phoneNumber}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder={`${appLanguage === 'Marathi' ? 'ईमेल टाका' : 'Enter email'}`}
                        placeholderTextColor="#003f5c"
                        onChangeText={(text) => setEmail(text)}
                        maxLength={30}
                        // keyboardType="numeric"
                        value={email}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder={`${appLanguage === 'Marathi' ? 'पासवर्ड टाका' : 'Enter Password'}`}
                        placeholderTextColor="#003f5c"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={password.length > 0 ? true : false}
                        value={password}
                    />
                </View>
                {password.length > 0 ? (<>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder={`${appLanguage === 'Marathi' ? 'पासवर्डची पुष्टी करा' : 'Confirm password'}`}
                            placeholderTextColor="#003f5c"
                            onChangeText={(text) => setConfirmPassword(text)}
                            maxLength={35}
                            secureTextEntry={confirmPassword.length > 0 ? true : false}
                            value={confirmPassword}
                        />
                    </View>
                </>):(<>

                </>)}



                <TouchableOpacity
                    style={styles.registerBtn}
                    onPress={onPressVolunteerRegister}
                >
                    {showRegisterLoader ? (<>
                        <ActivityIndicator color="#fff" size="large"/>
                    </>):(<>
                        <Text style={styles.sendCodeText}>
                            {/* Send verification code */}
                            {appLanguage === 'Marathi' ? (<>
                                नोंदणी करा
                            </>):(<>
                                Register
                            </>)}
                        </Text>
                    </>)}

                </TouchableOpacity>

                <View style={styles.loginTextConatiner} >
                    <Text style={styles.languageText} onPress={navigateToVolunteerLogin}>
                        {appLanguage === 'Marathi' ? (<>
                            आधीच नोंदणी झाली आहे ? लॉगिन करा
                        </>):(<>
                            Already registered ? Login
                        </>)}
                    </Text>
                </View>

                
            </View>

    )
}

export default VolunteerSignUp

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        textAlign:'center',
        paddingBottom:100
    },

    image: {
        // marginBottom: 40,
        width: 305,
        height: 159,
        marginBottom: 20,
    },

    inputView: {
        backgroundColor: "#dad5ed",
        borderRadius: 30,
        width: (width - (width * 20/100)),
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        justifyContent:'center'
    },

    TextInput: {
        height: 50,
        // flex: 1,
        padding: 10,
        textAlign:'center',
        width:"100%",
        justifyContent:'center'
    },

    resendOtpBtnTxt: {
        height: 30,
        marginBottom: 10,
        marginTop:15,
        fontWeight:'bold',
        fontSize:16,
        // textAlign:'right'
    },

    registerBtn: {
        width: (width - (width * 20/100)),
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#26176b",
    },

    sendCodeText:{
        color: '#fff',
    },

    mothersOfGoaText:{
        fontSize:30,
        marginBottom: 30,
        marginTop:50,
        textAlign:'center'
    },
    languageContainer:{
        display:"flex",
        flexDirection:'column',
        alignItems:'center',
        marginTop:50,
        marginBottom:50
    },
    languageText:{
        fontWeight:'700'
    },
    selectedLanguage:{
        borderRadius: 25,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#dad5ed",
        padding:10
    },
    languageTextContainer:{
        padding:10
    },
    toggleContainer:{
        display:"flex",
        flexDirection:'row',
        alignItems:'center',
        marginTop:25
    },
    loginTextConatiner:{
        marginTop:20
    }

});
