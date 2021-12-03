import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { RadioButton } from "react-native-paper";

export const CustomerCall = ({ registerObj,setRegisterObj,appLanguage, setSectionCompletionPercent }) => {

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



    return(
        <View style={styles.formSectionContainer}>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        8) त म् ु िी ऑनलाईन खरे दी करता का ?
                    </>):(<>
                        8) Do you shop online? 
                    </>)}
                </Text>
                <View style={styles.radioButtonContainer}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Yes"
                            status={ registerObj.shopOnlineCheck === 'Yes' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                shopOnlineCheck:'Yes'
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
                            status={ registerObj.shopOnlineCheck === 'No' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                shopOnlineCheck:'No'
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
                       9) मक्तिन्यातून क्तकतीदा ऑनलाईन खरे दी करता ?
                    </>):(<>
                        9) How often do you get online from Maktinya?
                    </>)}
                </Text>
                <View style={{marginLeft:10,marginRight:10,marginTop:20, flexDirection:'row'}}>
                    <RadioButton
                        value="1"
                        status={ registerObj.maktinyaOnlineShoppingCheck === '1' ? 'checked' : 'unchecked' }
                        onPress={() => setRegisterObj({
                            ...registerObj,
                            maktinyaOnlineShoppingCheck:'1'
                        })}
                    />
                    <Text style={{...styles.radioButtonText, alignSelf:'center'}}>
                        {/* Positive: */}
                        {appLanguage === 'Marathi' ? (<>
                            a) आठवड्यात न ु नकमान एकदा
                        </>):(<>
                           a) At least once a week
                        </>)}
                    </Text>
                </View>

                

                <View style={{marginLeft:10,marginRight:10,marginTop:10, flexDirection:'row'}}>
                    <RadioButton
                        value="2"
                        status={ registerObj.maktinyaOnlineShoppingCheck === '2' ? 'checked' : 'unchecked' }
                        onPress={() => setRegisterObj({
                            ...registerObj,
                            maktinyaOnlineShoppingCheck:'2'
                        })}
                    />
                    <Text style={{...styles.radioButtonText, alignSelf:'center'}}>
                        {/* Negative: */}
                        {appLanguage === 'Marathi' ? (<>
                            b) मनहन्यात न ू एकदा
                        </>):(<>
                           b) Once in a while
                        </>)}
                    </Text>
                </View>
                <View style={{marginLeft:10,marginRight:10,marginTop:10, flexDirection:'row'}}>
                    <RadioButton
                        value="3"
                        status={ registerObj.maktinyaOnlineShoppingCheck === '3' ? 'checked' : 'unchecked' }
                        onPress={() => setRegisterObj({
                            ...registerObj,
                            maktinyaOnlineShoppingCheck:'3'
                        })}
                    />
                    <Text style={{...styles.radioButtonText, alignSelf:'center'}}>
                        {/* Negative: */}
                        {appLanguage === 'Marathi' ? (<>
                            c) नवशेष नननमत्त असलां तर (सण-वार)
                        </>):(<>
                           c) If you are newly intoxicated (festival-wise)
                        </>)}
                    </Text>
                </View>

                <View style={{marginLeft:10,marginRight:10,marginTop:10, flexDirection:'row'}}>
                    <RadioButton
                        value="4"
                        status={ registerObj.maktinyaOnlineShoppingCheck === '4' ? 'checked' : 'unchecked' }
                        onPress={() => setRegisterObj({
                            ...registerObj,
                            maktinyaOnlineShoppingCheck:'4'
                        })}
                    />
                    <Text style={{...styles.radioButtonText, alignSelf:'center'}}>
                        {/* Negative: */}
                        {appLanguage === 'Marathi' ? (<>
                            d) नेहमीच खरे दी करत नाही
                        </>):(<>
                           d) Not always true
                        </>)}
                    </Text>
                </View>

                
            </View>

            <View style={{marginTop:10,marginBottom:10}}>   
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        10) ऑनलाईन खरे दीत सवााक्तधक कल या गोष्टी घेण्याकडे असतो-
                    </>):(<>
                        10) The real trend online is to take these things-
                    </>)}
                </Text>
                <View style={{...styles.radioButtonContainer, flexDirection:'column'}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="1"
                            status={ registerObj.realOnlineTrend === '1' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setRegisterObj({
                                ...registerObj,
                                realOnlineTrend:'1'
                                })
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Yes */}
                            {appLanguage === 'Marathi' ? (<>
                                a) नकराणा
                            </>):(<>
                                a) Rejection 
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="2"
                            status={ registerObj.realOnlineTrend === '2' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                realOnlineTrend:'2'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* No */}
                            {appLanguage === 'Marathi' ? (<>
                                b) भाजीपाला
                            </>):(<>
                                b) Vegetables
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="3"
                            status={ registerObj.realOnlineTrend === '3' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                realOnlineTrend:'3'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* No */}
                            {appLanguage === 'Marathi' ? (<>
                                c) फूड: स्वीगी/झोमॅटो
                            </>):(<>
                                c) Food: Swiggy / Zomato
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="4"
                            status={ registerObj.realOnlineTrend === '4' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                realOnlineTrend:'4'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* No */}
                            {appLanguage === 'Marathi' ? (<>
                                d) कपड
                            </>):(<>
                                d) Clothes
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="5"
                            status={ registerObj.realOnlineTrend === 'No' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                realOnlineTrend:'5'
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
            

            </View>

            <View>
                    <Text style={{...styles.inputTextLabel, marginVertical:15}}>
                        {appLanguage === 'Marathi' ? (<>
                            11) आरोग्य चाांगले रािण्यासाठी तुम्िी काय करता?
                        </>):(<>
                            11) What do you do to stay healthy?
                        </>)}
                    </Text>


                    <View style={{...styles.radioButtonContainer, flexDirection:'column'}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="1"
                            status={ registerObj.stayingHealthyCheck === '1' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setRegisterObj({
                                ...registerObj,
                                stayingHealthyCheck:'1'
                                })
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Yes */}
                            {appLanguage === 'Marathi' ? (<>
                                a) रोज चालायला जात
                            </>):(<>
                                a) Going for a walk every day
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="2"
                            status={ registerObj.stayingHealthyCheck === '2' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                stayingHealthyCheck:'2'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* No */}
                            {appLanguage === 'Marathi' ? (<>
                                b) ननयनमत व्यायाम करत
                            </>):(<>
                                b) Exercising regularly
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="3"
                            status={ registerObj.stayingHealthyCheck === '3' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                stayingHealthyCheck:'3'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* No */}
                            {appLanguage === 'Marathi' ? (<>
                                c) नजम मध्ये जात
                            </>):(<>
                                c) Going into Najam
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="4"
                            status={ registerObj.stayingHealthyCheck === '4' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                stayingHealthyCheck:'4'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* No */}
                            {appLanguage === 'Marathi' ? (<>
                                d) सेंनिय धान्य वापरत
                            </>):(<>
                                d) Using sennia grains
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="5"
                            status={ registerObj.stayingHealthyCheck === '5' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                stayingHealthyCheck:'5'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* No */}
                            {appLanguage === 'Marathi' ? (<>
                                e) डाएट करत
                            </>):(<>
                                e) Dieting
                            </>)}
                        </Text>
                    </View>
                </View>
                  
            </View>

           

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        12) सेंक्तिय दजेदार अन्न पदाथा जर आपल्यासाठी उपलब्ध के ले तर त्याचा दैन क्त ां दन जीवनात?
                    </>):(<>
                        12) If you can get healthy food for your daily life Will you use?
                    </>)}
                </Text>

                <View style={{margin:5,marginTop:10}}>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="1"
                            status={ registerObj.healthyFoodDailyCheck=== '1' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setRegisterObj({
                                    ...registerObj,
                                    healthyFoodDailyCheck:'1'
                                })
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                a) हो 
                            </>):(<>
                                a) Yes
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="2"
                            status={ registerObj.healthyFoodDailyCheck=== '2' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                setRegisterObj({
                                    ...registerObj,
                                    healthyFoodDailyCheck:'2'
                                })
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {appLanguage === 'Marathi' ? (<>
                                b) नाही
                            </>):(<>
                                 b) No
                            </>)}
                        </Text>
                    </View>
                    
                    {/* {registerObj.thingsForNextGenToBecomeMoralScienceOrValues.indexOf('Others') !== -1 ? (<TextInput
                        placeholderTextColor='black'
                        style={styles.input}
                        onChangeText={text => setRegisterObj({
                            ...registerObj,
                            otherThingsForNextGenToBecomeMoralScienceOrValues:text
                        })}
                        value={registerObj.otherThingsForNextGenToBecomeMoralScienceOrValues}
                        placeholder={`${appLanguage === 'Marathi' ? 'अन्य' : 'Other'}`}
                    />): (<></>)} */}

                </View>

            </View>

        </View>
    )
}

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
