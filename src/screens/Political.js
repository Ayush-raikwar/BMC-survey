import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet, TextInput  } from 'react-native'
import { RadioButton } from 'react-native-paper';


const Political = ({ registerObj,setRegisterObj,appLanguage, setSectionCompletionPercent }) => {

    useEffect(() => {
        computePercent();
    },[
        registerObj.culturedPeopleOrFamiliesInGoa1,
        registerObj.culturedPeopleOrFamiliesInGoa2,
        registerObj.culturedPersonInGoaPolitics,
        registerObj.idealCandidateToMeetExpectation,
        registerObj.otherPersonRightCandidateForElection,
        registerObj.politicalPartyToFulfilExpectation,
        registerObj.likeToBecomeMemberOfForum,
        registerObj.culturedPersonInGoaPoliticsName1,

    ]);

    const computePercent = () => {
        let answered = 0
        if(registerObj.culturedPeopleOrFamiliesInGoa1 != '' || registerObj.culturedPeopleOrFamiliesInGoa2 != ''){
            answered = answered + 1;
        }
        if(registerObj.culturedPersonInGoaPolitics != '' || registerObj.culturedPersonInGoaPoliticsName1 != '' ){
            answered = answered + 1;
        }
        if(registerObj.idealCandidateToMeetExpectation != ''){
            answered = answered + 1;
        }
        if(registerObj.otherPersonRightCandidateForElection != ''){
            answered = answered + 1;
        }
        if(registerObj.politicalPartyToFulfilExpectation != ''){
            answered = answered + 1;
        }
        if(registerObj.likeToBecomeMemberOfForum != ''){
            answered = answered + 1;
        }

        let percent = Math.floor(answered / 6 * 100)
        setSectionCompletionPercent(percent)
    }

    const economicSectionQ1 = (val) => {
        // console.log('value in q2.......',val)
        let tempArray = registerObj.politicalPartyToFulfilExpectation;
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
            politicalPartyToFulfilExpectation:tempArray
        })
    }

    return (
        <>
        {/* Political container */}
        <View style={styles.formSectionContainer}>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        आपल्या गावात, गोव्यात सुसंस्कृत व्यक्ती / कुटुंबांची नावे
                    </>):(<>
                        Name of cultured individuals / families in your village, in Goa
                    </>)}
                </Text>
                <TextInput
                    placeholderTextColor='black'
                    style={styles.input}
                    onChangeText={text => setRegisterObj({
                        ...registerObj,
                        culturedPeopleOrFamiliesInGoa1:text
                    })}
                    value={registerObj.culturedPeopleOrFamiliesInGoa1}
                    placeholder="1."
                    placeholder={`${appLanguage === 'Marathi' ? '१.' : '1.'}`}
                />
                <TextInput
                    placeholderTextColor='black'
                    style={styles.input}
                    onChangeText={text => setRegisterObj({
                        ...registerObj,
                        culturedPeopleOrFamiliesInGoa2:text
                    })}
                    value={registerObj.culturedPeopleOrFamiliesInGoa2}
                    placeholder="2."
                    placeholder={`${appLanguage === 'Marathi' ? '२.' : '2.'}`}
                />

            </View>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        अशी सुसंस्कृत व्यक्ती गोव्याच्या राजकारणात दिसते का?
                    </>):(<>
                        Does such a cultured person appear in Goan politics?
                    </>)}
                </Text>
                <View style={styles.radioButtonContainer}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Yes"
                            status={ registerObj.culturedPersonInGoaPolitics === 'Yes' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                culturedPersonInGoaPolitics:'Yes'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Yes */}
                            {appLanguage === 'Marathi' ? (<>
                                हो
                            </>):(<>
                                Yes
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="No"
                            status={ registerObj.culturedPersonInGoaPolitics === 'No' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                culturedPersonInGoaPolitics:'No'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* No */}
                            {appLanguage === 'Marathi' ? (<>
                                नाही
                            </>):(<>
                                No
                            </>)}
                        </Text>
                    </View>
                </View>
                {registerObj.culturedPersonInGoaPolitics === 'Yes' ? (<>

                <Text style={styles.inputTextLabel}>
                    {/* If yes, name ? */}
                    {appLanguage === 'Marathi' ? (<>
                        असल्यास त्याचे नाव -
                    </>):(<>
                        If yes, name ?
                    </>)}
                </Text>
                <View style={{margin:5,marginTop:10}}>
                    <TextInput  placeholderTextColor='black'
                        style={styles.input}
                        onChangeText={text => setRegisterObj({
                            ...registerObj,
                            culturedPersonInGoaPoliticsName1:text
                        })}
                        value={registerObj.culturedPersonInGoaPoliticsName1}
                        placeholder="1."
                        placeholder={`${appLanguage === 'Marathi' ? '१.' : '1.'}`}
                    />

                </View>

                </>):(<></>)}

            </View>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        तुमच्या अपेक्षा पूर्ण करण्यासाठी तुमच्या मतदारसंघात आदर्श उमेदवार कोण आहे?
                    </>):(<>
                        Who is the ideal candidate in your constituency to fulfil your expectations?
                    </>)}
                </Text>
                <TextInput
                    placeholderTextColor='black'
                    style={styles.input}
                    onChangeText={text => setRegisterObj({
                        ...registerObj,
                        idealCandidateToMeetExpectation:text
                    })}
                    value={registerObj.idealCandidateToMeetExpectation}
                    placeholder={`${appLanguage === 'Marathi' ? 'उमेदवाराचे नाव' : 'Enter candidate name'}`}
                />
            </View>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        आपल्या मतदारसंघाच्या आमदारांव्यतिरिक्त, इतर कोणत्या व्यक्तीला निवडणुकीसाठी संभाव्य योग्य उमेदवार वाटते?
                    </>):(<>
                        Apart from MLAs of your constituency, which other person do you think is potentially the right candidate for the election?
                    </>)}
                </Text>
                <TextInput   placeholderTextColor='black'
                    style={styles.input}
                    onChangeText={text => setRegisterObj({
                        ...registerObj,
                        otherPersonRightCandidateForElection:text
                    })}
                    value={registerObj.otherPersonRightCandidateForElection}
                    placeholder={`${appLanguage === 'Marathi' ? 'उमेदवाराचे नाव' : 'Enter candidate name'}`}
                />
            </View>

            <View style={{marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        आरोग्य आणि आर्थिक विकासासाठी कोणता पक्ष अधिक चांगले काम करू शकतो असे तुम्हाला वाटते?
                    </>):(<>
                        Which party do you think fulfil your expectations?
                    </>)}
                </Text>
                <View style={styles.radioButtonContainer}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="BJP"
                            status={ registerObj.politicalPartyToFulfilExpectation.indexOf('BJP') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ1('BJP')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* BJP */}
                            {appLanguage === 'Marathi' ? (<>
                                भाजप
                            </>):(<>
                                BJP
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Congress"
                            status={ registerObj.politicalPartyToFulfilExpectation.indexOf('Congress') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ1('Congress')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Congress */}
                            {appLanguage === 'Marathi' ? (<>
                                काँग्रेस
                            </>):(<>
                                CONG
                            </>)}
                        </Text>
                    </View>
                </View>
                <View style={styles.radioButtonContainer}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="MGP"
                            status={ registerObj.politicalPartyToFulfilExpectation.indexOf('MGP') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ1('MGP')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* MGP */}
                            {appLanguage === 'Marathi' ? (<>
                                एमजीपी
                            </>):(<>
                                MGP
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="GFP"
                            status={ registerObj.politicalPartyToFulfilExpectation.indexOf('GFP') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ1('GFP')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* GFP */}
                            {appLanguage === 'Marathi' ? (<>
                                जीएफपी
                            </>):(<>
                                GFP
                            </>)}
                        </Text>
                    </View>

                </View>
                <View style={styles.radioButtonContainer}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="RG"
                            status={ registerObj.politicalPartyToFulfilExpectation.indexOf('RG') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ1('RG')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* RG */}
                            {appLanguage === 'Marathi' ? (<>
                                आरजी
                            </>):(<>
                                RG
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="AAP"
                            status={ registerObj.politicalPartyToFulfilExpectation.indexOf('AAP') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ1('AAP')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* AAP */}
                            {appLanguage === 'Marathi' ? (<>
                                आप
                            </>):(<>
                                AAP
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="TMC"
                            status={ registerObj.politicalPartyToFulfilExpectation.indexOf('TMC') != -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ1('TMC')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* TMC */}
                            {appLanguage === 'Marathi' ? (<>
                                TMC
                            </>):(<>
                                TMC
                            </>)}
                        </Text>
                    </View>

                </View>
            </View>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        तुम्हाला या फोरमचे सदस्य व्हायला आवडेल का?
                    </>):(<>
                        Would you like to become a member of this forum?
                    </>)}
                </Text>
                <View style={styles.radioButtonContainer}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Yes"
                            status={ registerObj.likeToBecomeMemberOfForum === 'Yes' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                likeToBecomeMemberOfForum:'Yes'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Yes */}
                            {appLanguage === 'Marathi' ? (<>
                                हो
                            </>):(<>
                                Yes
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="No"
                            status={ registerObj.likeToBecomeMemberOfForum === 'No' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                likeToBecomeMemberOfForum:'No'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* No */}
                            {appLanguage === 'Marathi' ? (<>
                                नाही
                            </>):(<>
                                No
                            </>)}
                        </Text>
                    </View>
                </View>


            </View>

        </View>
        </>
    )
}

export default Political

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
          margin:10,
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
          width:'30%'
      },
      radioButtonRow:{
          flexDirection:'row',
          display:'flex',
          alignItems:'center',
          width:'30%'
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
