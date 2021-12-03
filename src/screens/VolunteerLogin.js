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
    Dimensions
  } from "react-native";
import { volunteerSignIn } from '../api/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { submitUserData, getUserDataByMobileNo, getAllDistricts, getTalukaListByDistrict, getVillageListByTaluka, getConstituencyListByDistrict, getFormRegStatus } from '../api/userData';
import theme from "../styles/theme";
const { width, height } = Dimensions.get('window');


const VolunteerLogin = ({ navigation }) => {
    const [phoneNumber,setPhoneNumber] = useState('');
    const [password,setPassword] = useState('');
    const [appLanguage,setAppLanguage] = useState('Marathi')
    const [showLoginLoader,setShowLoginLoader] = useState(false);
    const [districtOptions,setDistrictOptions] = useState([]);

    const languageSwitch = () => {
        if(appLanguage === 'English'){
            setAppLanguage('Marathi')
        }else{
            setAppLanguage('English')
        }

    };

    const  onPressVolunteerLogin = async () => {
        if(checkValidation()){
            setShowLoginLoader(true);
            showErrorTimeout();
            try {
                const res = await volunteerSignIn(
                    {
                        mobile: phoneNumber,
                        password: password,
                    }
                );
                if(res.status === 200){
                    // console.log('res: ',res)
                    setShowLoginLoader(false);
                    let data = res.data
                    storeData(data);
                    console.log("login data", data);
                    fetchAllDistricts();

                    // displayAlert('Success!!','Login successfull');
                    // navigation.replace('MobileOtp')
                }
            } catch (error) {
                alert("Sorry, Please check your credentials");
                setShowLoginLoader(false);
            }
        }
    }

    const fetchAllDistricts = async () => {
        const res = await getAllDistricts();
        if(res.data && res.data != null){
            let districtOpts = res.data
            console.log("District Data Coming from....",districtOpts);
            setDistrictOptions(districtOpts)
        }
    }

    const onSelectDistrict = async (itemValue) => {
        setSelectedDistrict(itemValue)
        if(itemValue !== '' && itemValue !== 'Please Select....'){
            const res = await getTalukaListByDistrict(itemValue);
            if(res.data && res.data != null){
                let Opts = res.data
                setTalukaOptions(Opts)
            }
            const cosnti = await getConstituencyListByDistrict(itemValue);
            if(cosnti.data && cosnti.data != null){
                let Opts = cosnti.data
                setConstituencyOptions(Opts)
            }
            setRegisterObj({...registerObj,district:itemValue})
        }else if(itemValue === 'Please Select....'){
            setTalukaOptions([])
            setConstituencyOptions([])
        }
        setVillageOptions([])
    }


    const onSelectTaluka = async (itemValue) => {
        setSelectedTaluka(itemValue)
        if(itemValue !== '' && itemValue !== 'Please Select....'){
            const res = await getVillageListByTaluka(itemValue);
            if(res.data && res.data != null){
                let Opts = res.data
                setVillageOptions(Opts)
            }
            setRegisterObj({...registerObj,taluka:itemValue})
        }else if(itemValue === 'Please Select....'){
            setVillageOptions([])
        }
    }

    const onSelectVillage = async (itemValue) => {
        setSelectedVillage(itemValue)
        if(itemValue !== '' && itemValue !== 'Please Select....'){
            setRegisterObj({...registerObj,cityOrVillage:itemValue})
        }
    }

    const onSelectConstituency = async (itemValue) => {
        setSelectedConstituency(itemValue)
        if(itemValue !== '' && itemValue !== 'Please Select....'){
            setRegisterObj({...registerObj,constituencyName:itemValue})
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
        console.log('in showErrorTimeout')
        setTimeout(function(){
            console.log('in setTimeout function')
            console.log('showLoginLoader: ',showLoginLoader)
            if(showLoginLoader == true){
                setShowLoginLoader(false);
                displayAlert('Alert!','Something went wrong, please try again')
            }
        }, 4000);
    }

    const navigateToVolunteerRegister = () => {
        navigation.replace('VolunteerSignUp')
    }

    const checkValidation = () => {
        if(phoneNumber == '' || phoneNumber.length < 10){
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
        }
        return true;
    }

    const storeData = async (data) => {
        try {
            let token = data.token
            let tokenRes = await AsyncStorage.setItem('token', token)

            const userJsonValue = JSON.stringify(data.user)
            let volunteerRes =  await AsyncStorage.setItem('volunteer', userJsonValue)

            // if(tokenRes && volunteerRes){
                displayAlert('Success!!','Login successfull');
                // navigation.replace('Register')
                navigation.replace('Register',{
                    appLanguage:appLanguage,
                })
            // }
            // reading
            // const val = await AsyncStorage.getItem('token')
            // if(val !== null) {
                // value previously stored
                // console.log('val: ',val)
            // }

            // const jsonValue = await AsyncStorage.getItem('volunteer')
            // if(jsonValue != null){
                // console.log('volunteer: ',JSON.parse(jsonValue))
            // }
            // return jsonValue != null ? JSON.parse(jsonValue) : null;


        } catch (e) {

        }
    };


    return (

         <View style={styles.container}>
                {/* <ScrollView> */}
                {/*<StatusBar style="auto" />*/}
                <Text style={styles.mothersOfGoaText}>
                    {/* Mothers of Goa */}
                    {appLanguage === 'Marathi' ? (<>
                        स्वयंसेवक लॉगिन
                    </>):(<>
                        Volunteer Login
                    </>)}
                </Text>

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
                        placeholder={`${appLanguage === 'Marathi' ? 'पासवर्ड टाका' : 'Enter Password'}`}
                        placeholderTextColor="#003f5c"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={password.length > 0 ? true : false}
                        value={password}
                    />
                </View>

                <TouchableOpacity
                    style={styles.registerBtn}
                    onPress={onPressVolunteerLogin}
                >
                    {showLoginLoader ? (<>
                        <ActivityIndicator color="#fff" size="large"/>
                    </>):(<>
                        <Text style={styles.sendCodeText}>
                            {/* Send verification code */}
                            {appLanguage === 'Marathi' ? (<>
                                लॉगिन करा
                            </>):(<>
                                Login
                            </>)}
                        </Text>
                    </>)}

                </TouchableOpacity>

                <View style={styles.registerTextConatiner} >
                    <Text style={styles.languageText} onPress={navigateToVolunteerRegister}>
                        {appLanguage === 'Marathi' ? (<>
                            अद्याप नोंदणी केलेली नाही ? साइन अप
                        </>):(<>
                            Not yet registered? Signup
                        </>)}
                    </Text>
                </View>

                
            </View>

    )
}

export default VolunteerLogin

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
        color: theme.colors.black,
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
    },
    languageText:{
        color:'black',
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
    registerTextConatiner:{
        // flexWrap:'wrap'
        marginTop:20
    }

});
