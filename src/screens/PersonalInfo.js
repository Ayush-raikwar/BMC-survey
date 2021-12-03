import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { getEducationList, getOccupationList } from "../api/userData";
import { Picker } from "@react-native-picker/picker";
import EducationData from "../data/Education";
import OccupationData from "../data/Occupation";
import AsyncWriter from "../utils/AsyncWriter";
import theme from "../styles/theme";
const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
    />
  );
};

const PersonalInfo = ({
  registerObj,
  setRegisterObj,
  appLanguage,
  setSectionCompletionPercent,
  navigation,
}) => {
  const [selectedEducation, setSelectedEducation] = useState(
    "Please Select Education"
  );

  const [selectedGender, setSelectedGender] = useState("Female");

  const [selectedOccupation, setSelectedOccupation] = useState(
    "Please Select Taluka"
  );
  const [educationOptions, setEducationOptions] = useState([]);
  const [occupationOptions, setOccupationOptions] = useState([]);

  useEffect(() => {
    (async () => {
      //   fetchEducationList();
      await fetchStorageOrApi(
        "education-list",
        setEducationOptions,
        getEducationList
      );

      fetchOccupationList();
    })();
  }, []);

  useEffect(() => {
    computePercent();
  }, [
    registerObj.name,
    registerObj.age,
    registerObj.address,
    registerObj.mobileNumber,
    registerObj.gender,
    registerObj.education,
    registerObj.occupation,
    registerObj.noOfFamilyMembers,
  ]);

  const computePercent = () => {
    let answered = 0;
    if (registerObj.name != "") {
      answered = answered + 1;
    }
    if (registerObj.age != "") {
      answered = answered + 1;
    }
    if (registerObj.address != "") {
      answered = answered + 1;
    }
    if (registerObj.mobileNumber != "") {
      answered = answered + 1;
    }
    if (registerObj.education != "") {
      answered = answered + 1;
    }
    if (registerObj.occupation != "") {
      answered = answered + 1;
    }
    if (registerObj.noOfFamilyMembers != "") {
      answered = answered + 1;
    }

    let percent = Math.floor((answered / 7) * 100);
    setSectionCompletionPercent(percent);
  };

  const navigateToMobileOtp = () => {
    navigation.replace("MobileOtp");
  };

  /**
   *
   * @param {String} type Location in AsyncStorage for your data
   * @param {Function} setState SetState callback to set your data in state
   * @param {Function} apiCall api call function to retrieve data from api
   */
  const fetchStorageOrApi = async (type, setState, apiCall) => {
    let fetchDataFromStorage = await AsyncWriter.getData(type);
    if (fetchDataFromStorage) {
      console.log("[Storage]: Fetching ", type);
      setState(fetchDataFromStorage);
    } else {
      const res = await apiCall();
      if (res.data && res.data != null) {
        let data = res.data;
        console.log("[API]: Fetching ", type);
        setState(data);
        await AsyncWriter.writeData(type, data);
      }
    }
  };

  const fetchEducationList = async () => {
    const type = "education-list";
    const setState = setEducationOptions;
    const apiCall = getEducationList;
    await fetchStorageOrApi(type, setState, apiCall);
  };

  const fetchOccupationList = async () => {
    const res = await getOccupationList();
    if (res.data && res.data != null) {
      let Opts = res.data;
      setOccupationOptions(Opts);
    }
  };

  const onSelectEducation = async (itemValue) => {
    setSelectedEducation(itemValue);
    if (itemValue !== "" && itemValue !== "Please Select....") {
      setRegisterObj({ ...registerObj, education: itemValue });
    } else if (itemValue === "Please Select....") {
    }
  };

  const onSelectGender = async (itemValue) => {
    setSelectedGender(itemValue);
    setRegisterObj({ ...registerObj, gender: itemValue });
  };

  const onSelectOccupation = async (itemValue) => {
    setSelectedOccupation(itemValue);
    if (itemValue !== "" && itemValue !== "Please Select....") {
      setRegisterObj({ ...registerObj, occupation: itemValue });
    } else if (itemValue === "Please Select....") {
    }
  };

  return (
    <>
      {/* personal information container */}
      <View style={styles.formSectionContainer}>
        {/* Name field  */}
        <Text style={styles.inputTextLabel}>
          {appLanguage === "Marathi" ? <>नाव</> : <>Name</>}
        </Text>
        <TextInput
          style={styles.input}
          placeholderTextColor='black'
          onChangeText={(text) =>
            setRegisterObj({
              ...registerObj,
              name: text,
            })
          }
          value={registerObj.name}
          placeholder={`${appLanguage === "Marathi" ? "नाव" : "Enter Name"}`}
        />

        {/* Age field  */}
        <Text style={styles.inputTextLabel}>
          {appLanguage === "Marathi" ? <>वय</> : <>Age</>}
        </Text>
        <TextInput
             placeholderTextColor='black'
          style={styles.input}
          onChangeText={(text) =>
            setRegisterObj({
              ...registerObj,
              age: text,
            })
          }
          value={registerObj.age}
          placeholder={`${appLanguage === "Marathi" ? "वय" : "Enter Age"}`}
          keyboardType="numeric"
          maxLength={3}
        />
        {/* Address field  */}
        <Text style={styles.inputTextLabel}>
          {appLanguage === "Marathi" ? <>पत्ता</> : <>Address</>}
        </Text>
        <UselessTextInput
            placeholderTextColor='black'
          multiline
          numberOfLines={4}
          onChangeText={(text) =>
            setRegisterObj({
              ...registerObj,
              address: text,
            })
          }
          value={registerObj.address}
          placeholder={`${
            appLanguage === "Marathi" ? "पत्ता" : "Enter Address"
          }`}
          style={styles.inputTextArea}
        />

        {/* Mobile Number field  */}
        <View style={styles.mobileNumberHeaderContainer}>
          <Text style={styles.inputTextLabel}>
            {appLanguage === "Marathi" ? <>मोबाईल नंबर</> : <>Mobile Number</>}
          </Text>
        </View>
        <TextInput
             placeholderTextColor='black'
          style={styles.input}
          onChangeText={(text) =>
            setRegisterObj({
              ...registerObj,
              mobileNumber: text,
            })
          }
          value={registerObj.mobileNumber}
          placeholder={`${
            appLanguage === "Marathi" ? "मोबाईल नंबर" : "Enter Mobile Number"
          }`}
          keyboardType="numeric"
          maxLength={10}
        />

        <Text style={styles.inputTextLabel}>
          {/* Education */}
          {appLanguage === "Marathi" ? <>लिंग</> : <>Gender</>}
        </Text>
        <View style={styles.modalDropDown}>
          <Picker
            selectedValue={selectedGender}
            onValueChange={(itemValue, itemIndex) => {
              onSelectGender(itemValue);
            }}
            style={{color:'#000'}}>
            <Picker.Item
              label={`${appLanguage === "Marathi" ? "स्त्री" : "Female"}`}
              value="Female"
            />

            <Picker.Item
              label={`${appLanguage === "Marathi" ? "पुरुष" : "Male"}`}
              value="Male"
            />
          </Picker>
        </View>

        <Text style={styles.inputTextLabel}>
          {/* Education */}
          {appLanguage === "Marathi" ? <>शिक्षण</> : <>Education</>}
        </Text>
        <View style={styles.modalDropDown}>
          <Picker
            selectedValue={selectedEducation}
            onValueChange={(itemValue, itemIndex) => {
              onSelectEducation(itemValue);
            }}
            style={{color:'#000'}}
            >
            <Picker.Item
              label={`${
                appLanguage === "Marathi"
                  ? "कृपया निवडा...."
                  : "Please Select...."
              }`}
              value="Please Select...."
            />
            {EducationData.map((item, i) => {
              return (
                <Picker.Item
                  key={i}
                  label={`${
                    appLanguage === "Marathi"
                      ? `${item.education_marathi_text}`
                      : `${item.education_name}`
                  }`}
                  value={`${item.education_name}`}
                />
              );
            })}
          </Picker>
        </View>

        {registerObj.education === "Other" ? (
          <TextInput
               placeholderTextColor='black'
            style={styles.input}
            onChangeText={(text) =>
              setRegisterObj({
                ...registerObj,
                otherEducation: text,
              })
            }
            value={registerObj.otherEducation}
            placeholder={`${
              appLanguage === "Marathi" ? "शिक्षण" : "Enter Education"
            }`}
          />
        ) : (
          <></>
        )}

        {/* Occupation field  */}
        <Text style={styles.inputTextLabel}>
          {appLanguage === "Marathi" ? (
            <>व्यवसाय निवडा</>
          ) : (
            <>Select Occupation</>
          )}
        </Text>
        <View style={styles.modalDropDown}>
          <Picker
          style={{color:'#000'}}
              dropdownIconColor="black"
              selectedValue={selectedOccupation}
            onValueChange={(itemValue, itemIndex) => {
              onSelectOccupation(itemValue);
            }}>
            <Picker.Item
              label={`${
                appLanguage === "Marathi"
                  ? "कृपया निवडा...."
                  : "Please Select...."
              }`}
              value="Please Select...."
            />
            {OccupationData.map((item, i) => {
              return (
                <Picker.Item
                  key={i}
                  label={`${
                    appLanguage === "Marathi"
                      ? `${item.occupation_marathi_text}`
                      : `${item.occupation_name}`
                  }`}
                  value={`${item.occupation_name}`}
                />
              );
            })}
          </Picker>
        </View>

        {registerObj.occupation === "Other" ? (
          <TextInput
               placeholderTextColor='black'
            style={styles.input}
            onChangeText={(text) =>
              setRegisterObj({
                ...registerObj,
                otherOccupation: text,
              })
            }
            value={registerObj.otherOccupation}
            placeholder={`${
              appLanguage === "Marathi" ? "व्यवसाय" : "Enter Occupation"
            }`}
          />
        ) : (
          <></>
        )}

        {/* No of family members field  */}
        <Text style={styles.inputTextLabel}>
          {appLanguage === "Marathi" ? (
            <>कुटुंबातील सदस्यांची संख्या</>
          ) : (
            <>No of family members</>
          )}
        </Text>
        <TextInput
             placeholderTextColor='black'
          style={styles.input}
          onChangeText={(text) =>
            setRegisterObj({
              ...registerObj,
              noOfFamilyMembers: text,
            })
          }
          value={registerObj.noOfFamilyMembers}
          placeholder={`${
            appLanguage === "Marathi"
              ? "सदस्यांची संख्या"
              : "Enter No of family members"
          }`}
          keyboardType="numeric"
          maxLength={2}
        />
      </View>
    </>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#26176b',
    alignItems: "center",
    justifyContent: "center",
  },
  registerText: {
    fontSize: 25,
  },
  headerTextContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
  },
  inputTextLabel: {
    color: theme.colors.black,
    marginTop: 15,
    fontSize: 18,
    marginLeft: 10,
  },
  input: {
    color: theme.colors.black,
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  inputTextArea: {
    color: theme.colors.black,
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
    fontSize: 25,
    marginLeft: 10,
  },
  modalDropDown: {
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  modalDropDownText: {
    fontSize: 15,
    color: "black",
  },
  navButtonContainer: {
    margin: 10,
    padding: 10,
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
    marginRight: 5,
  },
  mobileNumberHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  verifyAgainLabel: {
    fontWeight: "700",
    fontSize: 18,
    marginTop: 15,
    marginRight: 10,
    color: "green",
  },
});
