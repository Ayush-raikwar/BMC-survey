import React,{useState, useEffect} from 'react'
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Switch,
    ActivityIndicator,
  } from "react-native";
import { sendOtp } from '../api/otp';
import { getFormRegStatus } from '../api/userData';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';


const MobileOtp = ({ navigation }) => {
    const [mobileNumber,setMobileNumber] = useState('');
    const [enteredOtp,setEnteredOtp] = useState('');
    const [section, setSection] = useState('sendOtp')
    const [volunteerObj,setVolunteerObj] = useState(null)
    const [fetchedOtp,setFetchedOtp] = useState('')
    const [appLanguage,setAppLanguage] = useState('English')
    const [showSendCodeLoader,setShowSendCodeLoader] = useState(false);

    useEffect(()=>{
        fetchVolunteerDetails()
    },[])

    const fetchVolunteerDetails = async () => {
        let jsonValue = await AsyncStorage.getItem('volunteer')
        let obj = JSON.parse(jsonValue)
        // console.log('obj......',obj)
        setVolunteerObj(obj)
    }

    const languageSwitch = () => {
        if(appLanguage === 'English'){
            setAppLanguage('Marathi')
        }else{
            setAppLanguage('English')
        }

    };

    const  onPressSendCode = async () => {
        // actual code
        if(checkMobileNumber() && showSendCodeLoader === false){
            setShowSendCodeLoader(true);
            sendOtpToMobile()
            showErrorTimeout()
        }

        // test code
        // setShowSendCodeLoader(true);
        // showErrorTimeout()
        // setSection('confirmCode');
    }

    const onPressVerifyCode = () => {
        if(fetchedOtp == '' ){
            if(appLanguage == 'English'){
                displayAlert('Alert!','Enter Otp');
            }else if(appLanguage == 'Marathi'){
                displayAlert('Alert','ओटीपी टाका ');
            }
        }else if(fetchedOtp != enteredOtp){
            if(appLanguage == 'English'){
                displayAlert('Alert!','Entered Otp is incorrect.');
            }else if(appLanguage == 'Marathi'){
                displayAlert('Alert','ओटीपी चुकीचे आहे.');
            }
        }else if(fetchedOtp == enteredOtp){
            if(appLanguage == 'English'){
                displayAlert('Success!','Phone number is successfully verified');
            }else if(appLanguage == 'Marathi'){
                displayAlert('यश!','फोन नंबर यशस्वीरित्या सत्यापित केला आहे.');
            }
            navigateToRegister();
        }
    }

    const onPressResendOtp = () => {
        setSection('sendOtp');
    }

    const navigateToRegister = () => {
        navigation.replace('Register',{
            mobileNumber:mobileNumber,
            appLanguage:appLanguage,
        })
    }

    const checkMobileNumber = () => {
        if(mobileNumber.length < 10){
            if(appLanguage == 'English'){
                displayAlert('Alert!','Enter valid mobile number');
            }else if(appLanguage == 'Marathi'){
                displayAlert('Alert','वैध फोन नंबर प्रविष्ट करा.');
            }
            return false
        }else{
            return true;
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

    const sendOtpToMobile = async () =>{
        // check data registration status
        const regStatus = await getFormRegStatus(mobileNumber);
        if(regStatus && regStatus.data === 'Not Registered'){
            const res = await sendOtp(mobileNumber);
            if(res){
                var login_otp = res.data.login_otp;
                setShowSendCodeLoader(false);
                if(!(typeof login_otp === 'undefined') && login_otp !== ''){
                    setSection('confirmCode');
                    setFetchedOtp(login_otp);
                }
            }
        }else{
            setShowSendCodeLoader(false);
            if(appLanguage == 'English'){
                displayAlert('Alert!','Mobile number already been registered');
            }else if(appLanguage == 'Marathi'){
                displayAlert('Alert','मोबाईल नंबर आधीच नोंदणीकृत आहे');
            }
        }
    }

    const showErrorTimeout = () => {
        setTimeout(function(){
            if(showSendCodeLoader == true){
                setShowSendCodeLoader(false);
                displayAlert('Alert!','Something went wrong, please try again')
            }
        }, 4000);
    }

    const navigateToVolunteerLogin = async () => {
        // console.log('navigateToVolunteerLogin')
        let token = await AsyncStorage.getItem('token')
        let volunteer = await AsyncStorage.getItem('volunteer')
        if(token != null && volunteer != null){
            let tokenRes = await AsyncStorage.removeItem('token')
            let volunteerRes = await AsyncStorage.removeItem('volunteer')
            console.log("after removing from async storage......")
            console.log("tokenRes: ",tokenRes)
            console.log("volunteerRes: ",volunteerRes)
            navigation.replace('VolunteerLogin')
        }

    }


    return (
            <>
            <View style={styles.mobileOtpHeader}>
                <View style={{justifyContent:'space-between',flexDirection:'row',width:'100%'}}>
                    <Text style={styles.volunteerName} onPress={navigateToVolunteerLogin}>
                        {volunteerObj != null ? (
                            'Hello, '+ volunteerObj.first_name + ' ' + volunteerObj.last_name
                        ):(<></>)}

                    </Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.signOutText} onPress={navigateToVolunteerLogin}>
                            Sign out
                        </Text>
                        <FontAwesome name="sign-out" size={24} color="#26176b" style={styles.signOutIcon} onPress={navigateToVolunteerLogin}/>
                    </View>
                </View>

            </View>
            <View style={styles.container}>

                {section === 'sendOtp' ? (<>
                    <Text style={styles.mothersOfGoaText}>
                        {/* Mothers of Goa */}
                        {appLanguage === 'Marathi' ? (<>
                            गोव्याच्या माता
                        </>):(<>
                            Mothers of Goa
                        </>)}
                    </Text>


                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder={`${appLanguage === 'Marathi' ? 'मोबाईल नंबर टाका' : 'Enter Mobile Number'}`}
                            placeholderTextColor="#003f5c"
                            onChangeText={(text) => setMobileNumber(text)}
                            maxLength={10}
                            keyboardType="numeric"
                            value={mobileNumber}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.sendCodeBtn}
                        onPress={onPressSendCode}
                    >
                        {showSendCodeLoader ? (<>
                            <ActivityIndicator color="#fff" size="large"/>
                        </>):(<>
                            <Text style={styles.sendCodeText}>
                                {/* Send verification code */}
                                {appLanguage === 'Marathi' ? (<>
                                    पडताळणी कोड पाठवा
                                </>):(<>
                                    Send verification code
                                </>)}
                            </Text>
                        </>)}

                    </TouchableOpacity>

                    <View style={styles.languageContainer}>

                        <Text style={styles.languageText}>
                            {/* Preferred Language: */}
                            {appLanguage === 'Marathi' ? (<>
                                पसंतीची भाषा:
                            </>):(<>
                                Preferred Language:
                            </>)}
                        </Text>

                        <View style={styles.toggleContainer}>

                            <View style={appLanguage == 'English' ? styles.selectedLanguage : styles.languageTextContainer}>
                                <Text style={styles.languageSelectedText}>English</Text>
                            </View>

                            <Switch
                                style={{ marginRight: 15, marginLeft:15 }}
                                onValueChange={languageSwitch}
                                value={appLanguage == 'Marathi'}
                            />

                            <View style={appLanguage == 'Marathi' ? styles.selectedLanguage : styles.languageTextContainer}>
                                <Text style={styles.languageSelectedText}>मराठी</Text>
                            </View>

                        </View>

                    </View>

                </>):(<></>)}

                {section === 'confirmCode' ? (<>
                    <Text style={styles.mothersOfGoaText}>
                        {/* What's your verification code? */}
                        {appLanguage === 'Marathi' ? (<>
                            तुमचा पडताळणी कोड काय आहे?
                        </>):(<>
                            What's your verification code?
                        </>)}
                    </Text>


                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            // placeholder="Enter Code"
                            placeholder={`${appLanguage === 'Marathi' ? 'कोड टाका' : 'Enter Code'}`}
                            placeholderTextColor="#003f5c"
                            onChangeText={(text) => setEnteredOtp(text)}
                            keyboardType="numeric"
                            value={enteredOtp}
                            maxLength = {6}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.sendCodeBtn}
                        onPress={onPressVerifyCode}
                    >
                        <Text style={styles.sendCodeText}>
                            {/* Verify code */}
                            {appLanguage === 'Marathi' ? (<>
                                कोड सत्यापित करा
                            </>):(<>
                                Verify code
                            </>)}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onPressResendOtp}
                    >
                        <Text style={styles.resendOtpBtnTxt}>
                            {/* Resend Otp */}
                            {appLanguage === 'Marathi' ? (<>
                                ओठीपी पुन्हा पाठवा
                            </>):(<>
                                Resend Otp
                            </>)}
                        </Text>
                    </TouchableOpacity>
                </>):(<></>)}
            </View>
        </>
    )
}

export default MobileOtp

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    mobileOtpHeader:{
        marginTop:25,
        backgroundColor: "#fff",
        padding:10,
        // justifyContent:'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0,
        shadowRadius: 3.65,
        elevation: 2,
        display:'flex',
        flexDirection:'row',
        textAlign:'center',
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
        width: "80%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        justifyContent:'center'
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        textAlign:'center'
    },

    resendOtpBtnTxt: {
        height: 30,
        marginBottom: 10,
        marginTop:15,
        fontWeight:'bold',
        fontSize:16,
        // textAlign:'right'
    },

    sendCodeBtn: {
        width: "80%",
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
    },
    languageContainer:{
        display:"flex",
        flexDirection:'column',
        alignItems:'center',
        marginTop:50,
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
    signOutIcon:{
        // marginLeft:'auto',
        marginRight:25
    },
    signOutText:{
        fontWeight:'700',
        fontSize:16,
        marginLeft:20,
        marginRight:10,
        marginTop:2
    },
    volunteerName:{
        textAlign:'center',
        marginTop:2,
        fontWeight:'700',
        fontSize:16,
        marginLeft:20,
    }

});
