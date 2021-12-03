import React,{useEffect} from 'react'
import { View, Text, StyleSheet, TextInput  } from 'react-native'
import { RadioButton } from 'react-native-paper';


const HealthRelated = ({ registerObj, setRegisterObj, appLanguage, setSectionCompletionPercent }) => {

    useEffect(() => {
        computePercent();
    },[
        registerObj.affectedPeopleHealthOfGoa,
        registerObj.villageWasteDisposedOffProperly,
        registerObj.toStayHealthy,
        registerObj.organicFoodInDailyLife,
    ]);

    const computePercent = () => {
        let answered = 0
        if(registerObj.affectedPeopleHealthOfGoa != ''){
            answered = answered + 1;
        }
        if(registerObj.villageWasteDisposedOffProperly != ''){
            answered = answered + 1;
        }
        if(registerObj.toStayHealthy != '' ){
            answered = answered + 1;
        }
        if(registerObj.organicFoodInDailyLife != ''){
            answered = answered + 1;
        }

        let percent = Math.floor(answered / 4 * 100)
        setSectionCompletionPercent(percent)
    }

    const healthSectionQ1 = (val) => {
        let tempArray = registerObj.affectedPeopleHealthOfGoa;
        if(tempArray.indexOf(val) == -1){
            tempArray.push(val)
        }else{
            const index = tempArray.indexOf(val);
            if (index > -1) {
                tempArray.splice(index, 1);
            }
        }
        setRegisterObj({
            ...registerObj,
            affectedPeopleHealthOfGoa:tempArray
        })
    }

    const healthSectionQ2 = (val) => {
        let tempArray = registerObj.noProperVillageWasteDisposalReason;
        if(tempArray.indexOf(val) == -1){
            tempArray.push(val)
        }else{
            const index = tempArray.indexOf(val);
            if (index > -1) {
                tempArray.splice(index, 1);
            }
        }
        setRegisterObj({
            ...registerObj,
            noProperVillageWasteDisposalReason:tempArray
        })
    }

    const healthSectionQ3 = (val) => {
        let tempArray = registerObj.toStayHealthy;
        if(tempArray.indexOf(val) == -1){
            tempArray.push(val)
        }else{
            const index = tempArray.indexOf(val);
            if (index > -1) {
                tempArray.splice(index, 1);
            }
        }
        setRegisterObj({
            ...registerObj,
            toStayHealthy:tempArray
        })
    }

    return (
        <>
        {/* Health Related container */}
        <View style={styles.formSectionContainer}>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        32) गोव्यातील लोकांच्या आरोग्यावर कोणत्या गोष्टीचा परिणाम होत आहे असे तुम्हाला वाटते?
                    </>):(<>
                        32) What do you think has affected the health of the people of Goa?
                    </>)}
                </Text>

                <View style={{margin:5,marginTop:10}}>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Addiction"
                            status={ registerObj.affectedPeopleHealthOfGoa.indexOf('Addiction') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                healthSectionQ1('Addiction')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Addiction */}
                            {appLanguage === 'Marathi' ? (<>
                                a) व्यसन
                            </>):(<>
                                a) Addiction
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Chemically processed substances"
                            status={ registerObj.affectedPeopleHealthOfGoa.indexOf('Chemically processed substances') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                healthSectionQ1('Chemically processed substances')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                b) रासायनिक प्रक्रिया के लेले अन्न
                            </>):(<>
                                b) Chemically processed substances
                            </>)}
                        </Text>
                    </View>

                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Contaminated water"
                            status={ registerObj.affectedPeopleHealthOfGoa.indexOf('Contaminated water') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                healthSectionQ1('Contaminated water')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                c) दूषित पाणी
                            </>):(<>
                                c) Contaminated water
                            </>)}
                        </Text>
                    </View>

                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Garbage"
                            status={ registerObj.affectedPeopleHealthOfGoa.indexOf('Garbage') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                healthSectionQ1('Garbage')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                d) कचरा
                            </>):(<>
                                d) Garbage
                            </>)}
                        </Text>
                    </View>

                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Farming done using chemical fertilizers"
                            status={ registerObj.affectedPeopleHealthOfGoa.indexOf('Farming done using chemical fertilizers') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                healthSectionQ1('Farming done using chemical fertilizers')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                e) रासायनिक खत वापरून के लेली शेती
                            </>):(<>
                                e) Farming done using chemical fertilizers
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="pollution"
                            status={ registerObj.affectedPeopleHealthOfGoa.indexOf('pollution') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                healthSectionQ1('pollution')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                f) प्रदषण
                            </>):(<>
                                f) pollution
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Others"
                            status={ registerObj.affectedPeopleHealthOfGoa.indexOf('Others') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                healthSectionQ1('Others')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                g) अन्य
                            </>):(<>
                                g) Others
                            </>)}
                        </Text>
                    </View>
                    {registerObj.affectedPeopleHealthOfGoa.indexOf('Others') != -1 ? (<TextInput
                        placeholderTextColor='black'
                        style={styles.input}
                        onChangeText={text => setRegisterObj({
                            ...registerObj,
                            otherReasonAffectedPeopleHealthOfGoa:text
                        })}
                        value={registerObj.otherReasonAffectedPeopleHealthOfGoa}
                        placeholder={`${appLanguage === 'Marathi' ? 'अन्य' : 'Other'}`}
                    />): (<></>)}
                </View>
            </View>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        33) तुमच्या गावातील कचऱ्याची नीट विल्हेवाट लावली जाते का?
                    </>):(<>
                        33) Is your village's waste disposed of properly?
                    </>)}
                </Text>
                <View style={styles.radioButtonContainer}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Yes"
                            status={ registerObj.villageWasteDisposedOffProperly === 'Yes' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                villageWasteDisposedOffProperly:'Yes'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                a) हो
                            </>):(<>
                                a) Yes
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="No"
                            status={ registerObj.villageWasteDisposedOffProperly === 'No' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                villageWasteDisposedOffProperly:'No'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* No */}
                            {appLanguage === 'Marathi' ? (<>
                                b) नाही
                            </>):(<>
                                b) No
                            </>)}
                        </Text>
                    </View>
                </View>
                {registerObj.villageWasteDisposedOffProperly === 'No' ? (<>

                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        I) नसेल तर का नाही
                    </>):(<>
                        I) If not, why not
                    </>)}
                </Text>
                <View style={{margin:5,marginTop:10}}>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="People throw trash everywhere"
                            status={ registerObj.noProperVillageWasteDisposalReason.indexOf('People throw trash everywhere') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                healthSectionQ2('People throw trash everywhere')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                a) लोक कसेही कचरा टाकतात
                            </>):(<>
                                a) People throw trash everywhere
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Garbage pickers dont come regularly"
                            status={ registerObj.noProperVillageWasteDisposalReason.indexOf('Garbage pickers dont come regularly') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                healthSectionQ2('Garbage pickers dont come regularly')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                b) कचरा उचलणाऱ्या व्यक्ती नियमित येत नाहीत
                            </>):(<>
                                b) Garbage pickers dont come regularly
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Waste management is not done properly by the government"
                            status={ registerObj.noProperVillageWasteDisposalReason.indexOf('Waste management is not done properly by the government') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                healthSectionQ2('Waste management is not done properly by the government')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                c) शासनाकडून कचऱ्याचे व्यवस्थापन नीट पद्धतीने होत नाही
                            </>):(<>
                                c) Waste management is not done properly by the government
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="People are not used to waste management"
                            status={ registerObj.noProperVillageWasteDisposalReason.indexOf('People are not used to waste management') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                healthSectionQ2('People are not used to waste management')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                d) लोकांना कचरा व्यवस्थापनाची सवय नाही
                            </>):(<>
                                d) People are not used to waste management
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Other"
                            status={ registerObj.noProperVillageWasteDisposalReason.indexOf('Other') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                healthSectionQ2('Other')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                e) अन्य
                            </>):(<>
                                e) Other
                            </>)}
                        </Text>
                    </View>
                    {registerObj.noProperVillageWasteDisposalReason.indexOf('Other') != -1 ? (<TextInput
                        placeholderTextColor='black' style={styles.input}
                        onChangeText={text => setRegisterObj({
                            ...registerObj,
                            noProperVillageWasteDisposalOtherReason:text
                        })}
                        value={registerObj.noProperVillageWasteDisposalOtherReason}
                        placeholder={`${appLanguage === 'Marathi' ? 'अन्य' : 'Other'}`}
                    />): (<></>)}
                </View>
                </>):(<></>)}
            </View>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        34) निरोगी राहण्यासाठी तुम्ही काय करता?
                    </>):(<>
                        34) What do you do to stay healthy?
                    </>)}
                </Text>
                <View style={{margin:5}}>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Brisk walking"
                            status={ registerObj.toStayHealthy.indexOf('Brisk walking') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                healthSectionQ3('Brisk walking')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Goes for a walk every day */}
                            {appLanguage === 'Marathi' ? (<>
                                a) चालणे
                            </>):(<>
                                a) Brisk walking
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Exercises regularly"
                            status={ registerObj.toStayHealthy.indexOf('Exercises regularly') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                healthSectionQ3('Exercises regularly')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Exercises  */}
                            {appLanguage === 'Marathi' ? (<>
                                b) नियमित व्यायाम करा
                            </>):(<>
                                b) Exercise regularly
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Going to the gym"
                            status={ registerObj.toStayHealthy.indexOf('Going to the gym') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                healthSectionQ3('Going to the gym')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Go to the gym */}
                            {appLanguage === 'Marathi' ? (<>
                                c) व्यायाम शाळेत जाणे
                            </>):(<>
                                c) Going to the gym
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Eat organic food"
                            status={ registerObj.toStayHealthy.indexOf('Eat organic food') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                healthSectionQ3('Eat organic food')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Use organic grainss */}
                            {appLanguage === 'Marathi' ? (<>
                                d) सेंद्रिय अन्न खा
                            </>):(<>
                                d) Eat organic food
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Others"
                            status={ registerObj.toStayHealthy.indexOf('Others') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                healthSectionQ3('Others')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Use organic grainss */}
                            {appLanguage === 'Marathi' ? (<>
                                e) इतर
                            </>):(<>
                                e) Others
                            </>)}
                        </Text>
                    </View>
                    {registerObj.toStayHealthy.indexOf('Others') != -1 ? (<TextInput
                        placeholderTextColor='black'  style={styles.input}
                        onChangeText={text => setRegisterObj({
                            ...registerObj,
                            otherWayToStayHealthy:text
                        })}
                        value={registerObj.otherWayToStayHealthy}
                        placeholder={`${appLanguage === 'Marathi' ? 'अन्य' : 'Other'}`}
                    />): (<></>)}
                </View>
            </View>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        34) सहज उपलब्ध झाल्यास तुम्ही दर्जेदार सेंद्रिय अन्न पसंत कराल का?
                    </>):(<>
                        34) Would you prefer quality organic food, if made available easily?
                    </>)}
                 </Text>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:5}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Yes"
                            status={ registerObj.organicFoodInDailyLife === 'Yes' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                organicFoodInDailyLife:'Yes'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Yes */}
                            {appLanguage === 'Marathi' ? (<>
                                a) हो
                            </>):(<>
                                a) Yes
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="No"
                            status={ registerObj.organicFoodInDailyLife === 'No' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                organicFoodInDailyLife:'No'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* No */}
                            {appLanguage === 'Marathi' ? (<>
                                b) नाही
                            </>):(<>
                                b) No
                            </>)}
                        </Text>
                    </View>
                </View>
            </View>

        </View>
        </>
    )
}

export default HealthRelated

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      registerText:{
          fontSize: 25,
      },
      headerTextContainer:{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 40,
      },
      inputTextLabel:{
          color:'black',
          marginTop:15,
          fontSize: 18,
          marginLeft:10
      },
      input: {
          color:'black',
          height: 40,
          margin: 10,
          borderWidth: 1,
          padding: 10,
          borderRadius:5
      },
      inputTextArea:{
          color:'black',
          margin: 10,
          borderWidth: 1,
          padding: 10,
          borderRadius:5
      },
      formSectionContainer:{
          color:'black',
          marginLeft:15,
          marginRight:15,
          padding:10,
      },
      formSectionHeader:{
          color:'#000000',
          fontSize: 25,
          marginLeft:10
      },
      navButtonContainer:{
          margin:10,
          padding:10,
          flexDirection:'row',
          display:'flex',
          justifyContent:'space-evenly',
      },
      radioButton:{
          flexDirection:'row',
          display:'flex',
          alignItems:'center',
          width:'50%'
      },
      radioButtonRow:{
          flexDirection:'row',
          display:'flex',
          alignItems:'center',
      },
      radioButtonContainer:{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
          marginTop:15
      },
      radioButtonText:{
          color:'black',
          fontSize:15,
          display:'flex',
          flexWrap:'wrap',
          width:'90%'
      },
      sectionHeaderContianer:{
        flexWrap:'wrap',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginRight:10,
        marginBottom:20
    }

});
