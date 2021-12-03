import React,{useEffect, useState} from 'react'
import { View, Text, StyleSheet, TextInput, TextInputComponent  } from 'react-native'
import { RadioButton } from 'react-native-paper';


const Culture = ({ registerObj,setRegisterObj,appLanguage, setSectionCompletionPercent }) => {

    const [text, onChangeText] = React.useState("");

    useEffect(() => {
        computePercent();
    },[
        registerObj.cultureOfGoaIsChanging,
        registerObj.cultureAndEnvrmntOfGoaHarmedByTourists,
        registerObj.cultureOfGoa,
        registerObj.thingsForNextGenToBecomeMoralScienceOrValues,
    ]);

    const computePercent = () => {
        let answered = 0;
        if(registerObj.cultureOfGoaIsChanging !== ''){
            answered = answered + 1;
        }
        if(registerObj.cultureAndEnvrmntOfGoaHarmedByTourists !== ''){
            answered = answered + 1;
        }
        if(registerObj.cultureOfGoa !== ''){
            answered = answered + 1;
        }
        if(registerObj.thingsForNextGenToBecomeMoralScienceOrValues !== ''){
            answered = answered + 1;
        }
        if(registerObj.positiveEffectOfMigrationOnGoanCulture !== '' || registerObj.negativeEffectOfMigrationOnGoanCulture !== ''){
            answered = answered + 1;
        }

        let percent = Math.floor(answered / 5 * 100);
        setSectionCompletionPercent(percent)
    };

    const cultureSectionQ2 = (val) => {
        let tempArray = registerObj.positiveEffectOfMigrationOnGoanCulture;
        if(tempArray.indexOf(val) === -1){
            tempArray.push(val)
        }else{
            const index = tempArray.indexOf(val);
            if (index > -1) {
                tempArray.splice(index, 1);
            }
        }
        setRegisterObj({
            ...registerObj,
            positiveEffectOfMigrationOnGoanCulture:tempArray
        })
    };
    const cultureSectionQ2_2 = (val) => {
        let tempArray = registerObj.negativeEffectOfMigrationOnGoanCulture;
        if(tempArray.indexOf(val) === -1){
            tempArray.push(val)
        }else{
            const index = tempArray.indexOf(val);
            if (index > -1) {
                tempArray.splice(index, 1);
            }
        }
        setRegisterObj({
            ...registerObj,
            negativeEffectOfMigrationOnGoanCulture:tempArray
        })
    }
    const cultureSectionQ3 = (val) => {
        let tempArray = registerObj.cultureAndEnvrmntHarmedByTouristsSolution;
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
            cultureAndEnvrmntHarmedByTouristsSolution:tempArray
        })
    }
    const cultureSectionQ4 = (val) => {
        let tempArray = registerObj.cultureOfGoa;
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
            cultureOfGoa:tempArray
        })
    }
    const cultureSectionQ5 = (val) => {
        let tempArray = registerObj.thingsForNextGenToBecomeMoralScienceOrValues;
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
            thingsForNextGenToBecomeMoralScienceOrValues:tempArray
        })
    }

    return (
        <>
        {/* Culture container */}
        <View style={styles.formSectionContainer}>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        27) आपल्या ििराच्या क्तवकासात कािी बदल घडतोय असे आपल्याला वाटते का? 
                    </>):(<>
                        27) Do you feel any change is taking place in your family life? 
                    </>)}
                </Text>
                <View style={styles.radioButtonContainer}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Yes"
                            status={ registerObj.changeInFamilyLife === 'Yes' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                changeInFamilyLife:'Yes'
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
                            status={ registerObj.changeInFamilyLife === 'No' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                changeInFamilyLife:'No'
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

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                       28)  ििराच्या क्तवकासाच्या मुद््ाांवर सवााक्तधक पररणाम कसला िोतोय?
                    </>):(<>
                        28) What is the most significant impact on the development issues of the country? 
                    </>)}
                </Text>
                <View style={{marginLeft:10,marginRight:10,marginTop:20, flexDirection:'row'}}>
                    <RadioButton
                        value="Yes"
                        status={ registerObj.impactOnDevelopmentIssues === 'Positive' ? 'checked' : 'unchecked' }
                        onPress={() => setRegisterObj({
                            ...registerObj,
                            impactOnDevelopmentIssues:'Positive'
                        })}
                    />
                    <Text style={{...styles.radioButtonText, alignSelf:'center'}}>
                        {/* Positive: */}
                        {appLanguage === 'Marathi' ? (<>
                            अ) सकारात्मक:
                        </>):(<>
                           a) Positive:
                        </>)}
                    </Text>
                </View>

                

                <View style={{marginLeft:10,marginRight:10,marginTop:10, flexDirection:'row'}}>
                    <RadioButton
                        value="Yes"
                        status={ registerObj.impactOnDevelopmentIssues === 'Negative' ? 'checked' : 'unchecked' }
                        onPress={() => setRegisterObj({
                            ...registerObj,
                            impactOnDevelopmentIssues:'Negative'
                        })}
                    />
                    <Text style={{...styles.radioButtonText, alignSelf:'center'}}>
                        {/* Negative: */}
                        {appLanguage === 'Marathi' ? (<>
                            ब) नकारात्मक:
                        </>):(<>
                           b) Negative:
                        </>)}
                    </Text>
                </View>
                
            </View>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        29) आपल्या ििराची सांसकृती कोणकोणत्या गोष्टींवर क्तटकून आिे ?
                    </>):(<>
                        29) What is the culture of our country?
                    </>)}
                </Text>
                <View style={{...styles.radioButtonContainer, flexDirection:'column'}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="1"
                            status={ registerObj.cultureOfOurCountry === '1' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setRegisterObj({
                                ...registerObj,
                                cultureOfOurCountry:'1'
                                })
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Yes */}
                            {appLanguage === 'Marathi' ? (<>
                                a) शहराचा इनतहास
                            </>):(<>
                                a) The history of the city
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="2"
                            status={ registerObj.cultureOfOurCountry === '2' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                cultureOfOurCountry:'2'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* No */}
                            {appLanguage === 'Marathi' ? (<>
                                b) सा स् ां कृ नतक परांपरा
                            </>):(<>
                                b) Traditional tradition
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="3"
                            status={ registerObj.cultureOfOurCountry === '3' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                cultureOfOurCountry:'3'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* No */}
                            {appLanguage === 'Marathi' ? (<>
                                c) सणवार उत्सव
                            </>):(<>
                                c) Sanwar Utsav
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="4"
                            status={ registerObj.cultureOfOurCountry === '4' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                cultureOfOurCountry:'4'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* No */}
                            {appLanguage === 'Marathi' ? (<>
                                d) स ग ां ीत कला सानहत्य
                            </>):(<>
                                d) Assassin's Creed
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="5"
                            status={ registerObj.cultureOfOurCountry === 'No' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                cultureOfOurCountry:'5'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* No */}
                            {appLanguage === 'Marathi' ? (<>
                                e) अन्य
                            </>):(<>
                                e) Other
                            </>)}
                        </Text>
                    </View>
                </View>
                
                <View>
                    <Text style={{...styles.inputTextLabel, marginVertical:15}}>

                        {appLanguage === 'Marathi' ? (<>
                            30) तुमच्या भागातील पाच सुसांसकृत (cultured) व्यिींची/कुटुांबाांची नावां साांगा.
                        </>):(<>
                            30) Name five cultured people / families in your area.
                        </>)}
                    </Text>
                    <TextInput
                        onChangeText={onChangeText}
                        value={text}
                        style={{
                            borderColor:'#aaa', 
                            borderWidth:1, 
                            paddingHorizontal:10
                        }}
                    />
                </View>
            

            </View>

           

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        31) a) पुढची पिढी संस्कारक्षम (Moral Science/Values) होण्यासाठी काय केले पाहिजे?
                    </>):(<>
                        31) a) What should be done for the next generation to become Moral Science / Values?
                    </>)}
                </Text>

                <View style={{margin:5,marginTop:10}}>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="They need the guidance of a senior member of the household"
                            status={ registerObj.thingsForNextGenToBecomeMoralScienceOrValues.indexOf('They need the guidance of a senior member of the household') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                cultureSectionQ5('They need the guidance of a senior member of the household')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                a) त्यांना घरातील ज्येष्ठ व्यक्तीचे मार्गदर्शन मिळायला हवे
                            </>):(<>
                                a) They need the guidance of a senior member of the household
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="They should be well behaved"
                            status={ registerObj.thingsForNextGenToBecomeMoralScienceOrValues.indexOf('They should be well behaved') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                cultureSectionQ5('They should be well behaved')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                b) त्याांच्यावर चाांगले सांस्कार व्हायला हव
                            </>):(<>
                                 b) They should be well nurtured
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Activities should be started to educate the children"
                            status={ registerObj.thingsForNextGenToBecomeMoralScienceOrValues.indexOf('Activities should be started to educate the children') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                cultureSectionQ5('Activities should be started to educate the children')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                c) लहान म लवर योग्य ते सांस्कार करणारे उपक्रम स रु ु करायला हवेत
                            </>):(<>
                                c) Appropriate nurturing activities should be started on small scale
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Others"
                            status={ registerObj.thingsForNextGenToBecomeMoralScienceOrValues.indexOf('Others') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                cultureSectionQ5('Others')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                d) अन्य
                            </>):(<>
                                d) Others
                            </>)}
                        </Text>
                    </View>
                    {registerObj.thingsForNextGenToBecomeMoralScienceOrValues.indexOf('Others') !== -1 ? (<TextInput
                        placeholderTextColor='black'
                        style={styles.input}
                        onChangeText={text => setRegisterObj({
                            ...registerObj,
                            otherThingsForNextGenToBecomeMoralScienceOrValues:text
                        })}
                        value={registerObj.otherThingsForNextGenToBecomeMoralScienceOrValues}
                        placeholder={`${appLanguage === 'Marathi' ? 'अन्य' : 'Other'}`}
                    />): (<></>)}

                </View>

            </View>

        </View>
        </>
    )
}

export default Culture

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
          color:'black',
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


