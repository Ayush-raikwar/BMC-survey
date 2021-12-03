import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TextInput,
  Button,
  Alert,
  Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PersonalInfo from "./PersonalInfo";
import Culture from "./Culture";
import Financial from "./Financial";
import HealthRelated from "./HealthRelated";
import Political from "./Political";
import { Dimensions } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import Spinner from "react-native-loading-spinner-overlay";
import {
  submitUserData,
  getUserDataByMobileNo,
  getAllDistricts,
  getTalukaListByDistrict,
  getVillageListByTaluka,
  getConstituencyListByDistrict,
  getFormRegStatus,
} from "../api/userData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import DistrictData from "../data/District";
import TalukaData from "../data/Taluka";
import ConstituencyData from "../data/Constituency";
import VillageData from "../data/Village";
import EducationData from "../data/Education";
import OccupationData from "../data/Occupation";
import AsyncWriter from "../utils/AsyncWriter";
import * as Form from "../api/FormController";
import { CustomerCall } from "./CustomerCall";


const screenWidth = Dimensions.get("window").width - 50;
const regObjInitialState = {
  district: "",
  taluka: "",
  cityOrVillage: "",
  boothNo: "",
  constituencyName: "",
  name: "",
  age: "",
  address: "",
  addressLatitude: "",
  addressLongitude: "",
  mobileNumber: "",
  education: "",
  otherEducation: "",
  occupation: "",
  otherOccupation: "",
  noOfFamilyMembers: "",
  cultureOfGoaIsChanging: "",
  positiveEffectOfMigrationOnGoanCulture: [],
  negativeEffectOfMigrationOnGoanCulture: [],
  cultureAndEnvrmntOfGoaHarmedByTourists: "",
  cultureAndEnvrmntHarmedByTouristsSolution: [],
  cultureAndEnvrmntHarmedByTouristsOtherSolution: "",
  cultureOfGoa: [],
  otherCultureOfGoa: "",
  thingsForNextGenToBecomeMoralScienceOrValues: [],
  otherThingsForNextGenToBecomeMoralScienceOrValues: "",
  affectedPeopleHealthOfGoa: [],
  otherReasonAffectedPeopleHealthOfGoa: "",
  villageWasteDisposedOffProperly: "",
  noProperVillageWasteDisposalReason: [],
  noProperVillageWasteDisposalOtherReason: "",
  toStayHealthy: [],
  otherWayToStayHealthy: "",
  organicFoodInDailyLife: "",
  sourceOfIncomeOfFamily: [],
  noOfEarnersInFamily: "",
  monthlyFamilyExpenditure: "",
  minimumMonthlyIncomeToLiveHappyLife: "",
  skillsToMatchTheIncome: [],
  financialPlannerAtHome: "",
  howDoYouDoFinancialPlanningAtHome: [],
  participateInTrainingProgOrGroupsToSaveOrEarnMoney: "",
  howDoYouSave: [],
  likeToHelpFinanciallyAtHome: "",
  activityLikeToParticipate: [],
  skillsAwareOf: [],
  otherSkillsAwareOf: "",
  culturedPeopleOrFamiliesInGoa1: "",
  culturedPeopleOrFamiliesInGoa2: "",
  culturedPersonInGoaPolitics: "",
  culturedPersonInGoaPoliticsName1: "",
  idealCandidateToMeetExpectation: "",
  otherPersonRightCandidateForElection: "",
  politicalPartyToFulfilExpectation: [],
  likeToBecomeMemberOfForum: "",
  responseRegistered: "No",
  formRegisteredById: "",
  gender: '',
  changeInFamilyLife:'',
  impactOnDevelopmentIssues:'',
  cultureOfOurCountry: '',
  shopOnlineCheck:'',
  maktinyaOnlineShoppingCheck: '',
  realOnlineTrend: '',
  stayingHealthyCheck: '',
  healthyFoodDailyCheck: '',
};

const  Register =({ route, navigation })=> {
  const routeAppLanguage = route.params;
  const [formSection, setFormSection] = React.useState("A");
  const [circularProgressColor, setCircularProgressColor] =
    React.useState("#3399FF");
  const [sectionCompletionPercent, setSectionCompletionPercent] =
    React.useState(0);
  const [showLoader, setShowLoader] = React.useState(false);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [talukaOptions, setTalukaOptions] = useState([]);
  const [villageOptions, setVillageOptions] = useState([]);
  const [constituencyOptions, setConstituencyOptions] = useState([]);
  const [selectedTalukaFromDistrict, setSelectedTalukaFromDistrict] = useState(
    []
  );

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [appLanguage, setAppLanguage] = useState("Marathi");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const [registerObj, setRegisterObj] = useState(regObjInitialState);

  useEffect(() => {
    if (registerObj.mobileNumber && registerObj.mobileNumber !== "") {
      fetchUserData();
    }
    getVolunteerDetails();
    getPermissionAndGeoCode();
    fetchAllDistricts();
    if (
      !(typeof routeAppLanguage === "undefined") &&
      routeAppLanguage.appLanguage !== null &&
      routeAppLanguage.appLanguage !== ""
    ) {
      setAppLanguage(routeAppLanguage.appLanguage);
    } else {
      setAppLanguage("Marathi");
    }
  }, []);

  useEffect(() => {
    if (
      registerObj.addressLatitude !== "" &&
      registerObj.addressLongitude !== ""
    ) {
      getAddressFromGeoCode(
        registerObj.addressLatitude,
        registerObj.addressLongitude
      );
    }
  }, [registerObj.addressLatitude, registerObj.addressLongitude]);

  //functions

  const onPressNext = async () => {
    if (
      registerObj.mobileNumber !== "" &&
      registerObj.mobileNumber.length == 10
    ) {
      if (formSection === "A") {
        // const regStatus = await getFormRegStatus(registerObj.mobileNumber);
        // if (regStatus && regStatus.data === "Not Registered") {
          setFormSection("B");
          setCircularProgressColor("#DC143C");
          await saveUserDataState();
        // } else {
        //   if (appLanguage == "English") {
        //     displayAlert("Alert!", "Mobile number already Registered");
        //   } else if (appLanguage == "Marathi") {
        //     displayAlert("Alert", "मोबाईल नंबर आधीच नोंदणीकृत आहे");
        //   }
        // }
      } else if (formSection === "B") {
        setFormSection("C");
        setCircularProgressColor("#DA70D6"); //remove comment only for testing
        await saveUserDataState();
      } else if (formSection === "C") {
        setFormSection("D");
        setCircularProgressColor("#FF8C00");
        await saveUserDataState();
      } else if (formSection === "D") {
        setFormSection("E");
        setCircularProgressColor("#32CD32");
        await saveUserDataState();
      }

    } else {
      if (appLanguage == "English") {
        displayAlert("Alert!", "Enter Correct Phone Number");
      } else if (appLanguage == "Marathi") {
        displayAlert("Alert", "योग्य फोन नंबर प्रविष्ट करा");
      }
    }

    // console.log("registerObj........... ",registerObj)
  };

  const onPressPrevious = () => {
    if (formSection === "E") {
      setFormSection("D");
      setCircularProgressColor("#FF8C00");
    } else if (formSection === "D") {
      setFormSection("C");
      setCircularProgressColor("#DA70D6");
    } else if (formSection === "C") {
      setFormSection("B");
      setCircularProgressColor("#DC143C");
    } else if (formSection === "B") {
      setFormSection("A");
      setCircularProgressColor("#3399FF");
    }
  };

  const onPressRegister = async () => {
    registerObj.responseRegistered = "Yes";
    console.log("registerObj................", registerObj);
    setShowLoader(true);
    console.log("saving user data");
    await saveUserDataState();
    console.log("saved user data");
    setShowLoader(false);
    if (appLanguage == "English") {
      await Form.update(registerObj.mobileNumber, { isformComplete: true });
      displayAlert("Success!", "Your response has been saved.");
    } else if (appLanguage == "Marathi") {
      displayAlert("यश!", "तुमचा प्रतिसाद नोंदवला गेला आहे.");
    }
    setFormSection("A");
    showErrorTimeout();
  };

  const displayAlert = (title, Message) => {
    Alert.alert(
      title,
      Message,
      [
        {
          text: appLanguage == "Marathi" ? "ठीक आहे" : "OK",
          onPress: () => {
            if (
              Message === "Your response has been registered." ||
              Message === "तुमचा प्रतिसाद नोंदवला गेला आहे."
            ) {
              setFormSection("A");
              setCircularProgressColor("#3399FF");
              setRegisterObj({ ...regObjInitialState });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const saveUserDataState = async () => await Form.save(registerObj);

  const fetchUserData = async () => {
    const res = await getUserDataByMobileNo(registerObj.mobileNumber);
    if (res.data && res.data !== null) {
      setRegisterObj(res.data);
      if (res.data.district !== "") {
        let response = await onSelectDistrict(res.data.district);
        if (res.data.taluka !== "") {
          let response = await onSelectTaluka(res.data.taluka);
          if (res.data.cityOrVillage !== "") {
            let response = await onSelectVillage(res.data.cityOrVillage);
          }
        }
      }
      if (res.data.constituencyName !== "") {
        onSelectConstituency(res.data.constituencyName);
      }
    }
  };

  const getPermissionAndGeoCode = async () => {
    try {
      // if(Platform.OS === 'android'){
      let gpsServiceStatus = await Location.hasServicesEnabledAsync();
      if (gpsServiceStatus) {
        console.log("gpsServiceStatus: ", gpsServiceStatus);
      }
      let hasServicesEnabledAsync = await Location.hasServicesEnabledAsync();
      // console.log("hasServicesEnabledAsync: ",hasServicesEnabledAsync)
      let requestForegroundPermissionsAsync =
        await Location.requestForegroundPermissionsAsync();
      let requestBackgroundPermissionsAsync =
        await Location.requestBackgroundPermissionsAsync();
      let getForegroundPermissionsAsync =
        await Location.getForegroundPermissionsAsync();
      let getBackgroundPermissionsAsync =
        await Location.getBackgroundPermissionsAsync();
      let enableNetworkProviderAsync =
        await Location.enableNetworkProviderAsync();
      let getProviderStatusAsync = await Location.getProviderStatusAsync();
      // let location = await Location.getLastKnownPositionAsync({ accuracy: Location.Accuracy.Highest });
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      if (location) {
        if (location.coords) {
          registerObj.addressLatitude = location.coords.latitude;
          registerObj.addressLongitude = location.coords.longitude;
          // console.log("location: ",location)
        }
      }
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const getAddressFromGeoCode = async (addressLatitude, addressLongitude) => {
    //reverse geocode
    let revGeoCodeAddr = await Location.reverseGeocodeAsync({
      latitude: addressLatitude,
      longitude: addressLongitude,
    });
    setFetchedAddr(revGeoCodeAddr[0]);
  };

  const setFetchedAddr = (addrObj) => {
    let addr =
      addrObj.street +
      ", " +
      addrObj.region +
      ", " +
      addrObj.city +
      " - " +
      addrObj.postalCode;
    setRegisterObj({
      ...registerObj,
      address: addr,
    });
  };

  const showErrorTimeout = () => {
    setTimeout(function () {
      if (showLoader == true) {
        setShowLoader(false);
        displayAlert("Alert!", "Something went wrong, please try again");
      }
    }, 10000);
  };

  const navigateToVolunteerLogin = async () => {
    let token = await AsyncStorage.getItem("token");
    let volunteer = await AsyncStorage.getItem("volunteer");
    if (token !== null && volunteer !== null) {
      let tokenRes = await AsyncStorage.removeItem("token");
      let volunteerRes = await AsyncStorage.removeItem("volunteer");
      navigation.replace("VolunteerLogin");
    }
  };

  const getVolunteerDetails = async () => {
    // reading
    const volunteer = await AsyncStorage.getItem("volunteer");
    if (volunteer !== null) {
      const volunteerObj = JSON.parse(volunteer);
      registerObj.formRegisteredById = volunteerObj._id.toString();
    }
  };

  const displaySignOutAlert = () => {
    Alert.alert(
      appLanguage == "Marathi" ? "इशारा" : "Alert!!",
      appLanguage == "Marathi"
        ? "तुम्हाला साइन आउट करायचे आहे का?"
        : "Do you want to Sign out ?",
      [
        {
          text: appLanguage == "Marathi" ? "रद्द करा" : "Cancel",
          onPress: () => {},
        },
        {
          text: appLanguage == "Marathi" ? "ठीक आहे" : "OK",
          onPress: () => {
            navigateToVolunteerLogin();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const fetchAllDistricts = async () => {
    const res = await getAllDistricts();
    if (res.data && res.data !== null) {
      let districtOpts = res.data;
      setDistrictOptions(districtOpts);
    }
  };

  const onSelectDistrict = async (itemValue) => {
    setSelectedDistrict(itemValue);
    if (itemValue !== "" && itemValue !== "Please Select....") {
      const res = await getTalukaListByDistrict(itemValue);
      if (res.data && res.data !== null) {
        let Opts = res.data;
        setTalukaOptions(Opts);
      }
      const cosnti = await getConstituencyListByDistrict(itemValue);
      if (cosnti.data && cosnti.data !== null) {
        let Opts = cosnti.data;
        setConstituencyOptions(Opts);
      }
      setRegisterObj({ ...registerObj, district: itemValue });
    } else if (itemValue === "Please Select....") {
      setTalukaOptions([]);
      setConstituencyOptions([]);
    }
    setVillageOptions([]);
  };

  const onSelectTaluka = async (itemValue) => {
    setSelectedTaluka(itemValue);
    if (itemValue !== "" && itemValue !== "Please Select....") {
      const res = await getVillageListByTaluka(itemValue);
      if (res && res.data !== null) {
        let Opts = res.data;
        setVillageOptions(Opts);
      }
      setRegisterObj({ ...registerObj, taluka: itemValue });
    } else if (itemValue === "Please Select....") {
      setVillageOptions([]);
    }
  };

  const onSelectVillage = async (itemValue) => {
    setSelectedVillage(itemValue);
    if (itemValue !== "" && itemValue !== "Please Select....") {
      setRegisterObj({ ...registerObj, cityOrVillage: itemValue });
    }
  };

  const onSelectConstituency = async (itemValue) => {
    setSelectedConstituency(itemValue);
    if (itemValue !== "" && itemValue !== "Please Select....") {
      setRegisterObj({ ...registerObj, constituencyName: itemValue });
    }
  };

  const onClickChangeLanguage = async () => {
    if (appLanguage === "English") {
      setAppLanguage("Marathi");
    } else {
      setAppLanguage("English");
    }
  };

  const onDistrictSelectTaluka = (data) => {
    if (data === "North Goa") {
      let dataNorthGoa = TalukaData.filter((x) => x.district === "North Goa");
      setSelectedTalukaFromDistrict(dataNorthGoa);
    } else {
      let dataSouthGoa = TalukaData.filter((x) => x.district === "South Goa");
      setSelectedTalukaFromDistrict(dataSouthGoa);
    }
  };

  // console.log("district data coming ...........", DistrictData);
  // console.log("taluka data coming ...........", TalukaData);
  // console.log("constituency data coming ...........", ConstituencyData);
  // console.log("village data coming ...........", VillageData);
  // console.log("education data coming ...........", EducationData);
  // console.log("occupation data coming ...........", OccupationData);
  // let data = TalukaData.filter((x) => x.district == "North Goa");
  // console.log("Filter data ...........", data);
  // let data1 = VillageData.filter((x) => x.taluka == "Bardez");
  // console.log("Filter data ...........", data1);

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.sectionHeaderContianer}>
        {formSection === "A" ? (
          <>
            <Text style={styles.formSectionHeader}>
              {appLanguage === "Marathi" ? (
                <>अ) वैयक्तिक माहिती</>
              ) : (
                <>A) Personal Information</>
              )}
            </Text>
          </>
        ) : (
          <></>
        )}
        {formSection === "B" ? (
          <>
            <Text style={styles.formSectionHeader}>
              {appLanguage === "Marathi" ? <>ब) ग्राहक कल</> : <>B) Customer Call</>}
            </Text>
          </>
        ) : (
          <></>
        )}
        {formSection === "C" ? (
          <>
            <Text style={styles.formSectionHeader}>
              {appLanguage === "Marathi" ? <>स) आर्थिक</> : <>C) Financial</>}
            </Text>
          </>
        ) : (
          <></>
        )}
        {formSection === "D" ? (
          <>
            <Text style={styles.formSectionHeader}>
              {appLanguage === "Marathi" ? <>ड) सांस्कृतिक</> : <>D) Cultural</>}
            </Text>
          </>
        ) : (
          <></>
        )}
        {formSection === "E" ? (
          <>
            <Text style={styles.formSectionHeader}>
              {appLanguage === "Marathi" ? <>इ) स्वास्थ्य</> : <>E) Health</>}
            </Text>
          </>
        ) : (
          <></>
        )}

        <View style={styles.headerIconsContainer}>
          {/* <View
            style={
              appLanguage === "English"
                ? styles.languageIconContainer
                : styles.languageIconContainerSelected
            }>
            <Text onPress={onClickChangeLanguage} style={styles.languageIcon}>
              म
            </Text>
          </View> */}
          <ProgressCircle
            percent={sectionCompletionPercent}
            radius={20}
            borderWidth={5}
            color={circularProgressColor}
            shadowColor="#999"
            bgColor="#fff">
            <Text
              style={{
                fontSize: 12,
                color: "#000",
              }}>{`${sectionCompletionPercent}%`}</Text>
          </ProgressCircle>
          <FontAwesome
            name="sign-out"
            size={24}
            color="#26176b"
            style={styles.signOutIcon}
            onPress={displaySignOutAlert}
          />
        </View>
      </View>
      <ScrollView>
        <Spinner visible={showLoader} textStyle={styles.spinnerTextStyle} />
        {formSection === "A" ? (
          <>
            
            {/* personal information container */}
            <PersonalInfo
              setRegisterObj={setRegisterObj}
              registerObj={registerObj}
              appLanguage={appLanguage}
              setSectionCompletionPercent={setSectionCompletionPercent}
              navigation={navigation}
            />
          </>
        ) : (
          <></>
        )}

      {formSection === "B" ? (
          <>
            {/* Customer Call */}
            <CustomerCall
              setRegisterObj={setRegisterObj}
              registerObj={registerObj}
              appLanguage={appLanguage}
              setSectionCompletionPercent={setSectionCompletionPercent}
            />
          </>
        ) : (
          <></>
        )}

        {formSection === "C" ? (
          <>
            {/* Financial container */}
            <Financial
              setRegisterObj={setRegisterObj}
              registerObj={registerObj}
              appLanguage={appLanguage}
              setSectionCompletionPercent={setSectionCompletionPercent}
            />
          </>
        ) : (
          <></>
        )}
   
        {formSection === "D" ? (
          <>
            {/* Culture container */}
            <Culture
              setRegisterObj={setRegisterObj}
              registerObj={registerObj}
              appLanguage={appLanguage}
              setSectionCompletionPercent={setSectionCompletionPercent}
            />
          </>
        ) : (
          <></>
        )}


        

        
        {formSection === "E" ? (
          <>
         
            <HealthRelated
              setRegisterObj={setRegisterObj}
              registerObj={registerObj}
              appLanguage={appLanguage}
              setSectionCompletionPercent={setSectionCompletionPercent}
            />
          </>
        ) : (
          <></>
        )}

        {formSection === "F" ? (
          <>
            {/* Political Section  */}
            <Political
              setRegisterObj={setRegisterObj}
              registerObj={registerObj}
              appLanguage={appLanguage}
              setSectionCompletionPercent={setSectionCompletionPercent}
            />
          </>
        ) : (
          <></>
        )}
      </ScrollView>
      <View style={styles.navButtonContainer}>
        {formSection !== "A" ? (
          <View style={{ width: "40%" }}>
            <Button
              onPress={onPressPrevious}
              title={`${appLanguage === "Marathi" ? "मागील" : "Previous"}`}
              color="#6495ed"
            />
          </View>
        ) : (
          <></>
        )}

        {formSection !== "E" ? (
          <>
            <View style={{ width: "40%" }}>
              <Button
                onPress={onPressNext}
                title={`${appLanguage === "Marathi" ? "पुढे" : "Next"}`}
                color="#6495ed"
              />
            </View>
          </>
        ) : (
          <>
            <View style={{ width: "40%" }}>
              <Button
                onPress={onPressRegister}
                title={`${
                  appLanguage === "Marathi" ? "नोंदणी करा" : "Register"
                }`}
                color="#32CD32"
              />
            </View>
          </>
        )}
      </View>
    </>
  );
};
export default Register
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  registerText: {
    fontSize: 25,
  },
  headerTextContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  inputTextLabel: {
    color:'black',
    marginTop: 15,
    fontSize: 18,
    marginLeft: 10,
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  inputTextArea: {
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  formSectionContainer: {
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
  },
  formSectionHeader: {
    color: "#000000",
    fontSize: 22,
    margin: 10,
  },
  modalDropDown: {
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#000",
  },
  modalDropDownText: {
    fontSize: 15,
    color: "black",
  },
  navButtonContainer: {
    margin: 10,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-evenly",
  },
  radioButton: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    width: "50%",
  },
  radioButtonRow: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  radioButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  radioButtonText: {
    fontSize: 15,
    display: "flex",
    flexWrap: "wrap",
    width: "90%",
  },
  sectionHeaderContianer: {
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    marginBottom: 10,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  signOutIcon: {
    marginRight: 15,
    marginLeft: 10,
  },
  headerIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageIcon: {
    color:'black',
    fontSize: 20,
  },
  languageIconContainer: {
    marginLeft: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 20,
    height: 38,
    width: 38,
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  languageIconContainerSelected: {
    marginLeft: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 20,
    height: 38,
    width: 38,
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3399FF",
  },
});
