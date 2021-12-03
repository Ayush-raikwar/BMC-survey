import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet, TextInput  } from 'react-native'
import { RadioButton } from 'react-native-paper';

const Financial = ({ registerObj,setRegisterObj,appLanguage, setSectionCompletionPercent }) => {

    const [text, onChangeText] = React.useState({
        maktinyaHouseHoldExpense:'',
        incomeForHappyLife:'',
        qualityOfIncome:''
    });

    useEffect(() => {
        computePercent();
    },[
        registerObj.sourceOfIncomeOfFamily,
        registerObj.noOfEarnersInFamily,
        registerObj.monthlyFamilyExpenditure,
        registerObj.minimumMonthlyIncomeToLiveHappyLife,
        registerObj.skillsToMatchTheIncome,
        registerObj.financialPlannerAtHome,
        registerObj.howDoYouDoFinancialPlanningAtHome,
        registerObj.howDoYouSave,
        registerObj.likeToHelpFinanciallyAtHome,
        registerObj.participateInTrainingProgOrGroupsToSaveOrEarnMoney,
        registerObj.activityLikeToParticipate,
        registerObj.skillsAwareOf,
    ]);

    const computePercent = () => {
        let answered = 0
        if(registerObj.sourceOfIncomeOfFamily !== ''){
            answered = answered + 1;
        }
        if(registerObj.noOfEarnersInFamily !== ''){
            answered = answered + 1;
        }
        if(registerObj.monthlyFamilyExpenditure !== ''){
            answered = answered + 1;
        }
        if(registerObj.minimumMonthlyIncomeToLiveHappyLife !== ''){
            answered = answered + 1;
        }
        if(registerObj.skillsToMatchTheIncome !== ''){
            answered = answered + 1;
        }
        if(registerObj.financialPlannerAtHome !== ''){
            answered = answered + 1;
        }
        if(registerObj.howDoYouDoFinancialPlanningAtHome !== ''){
            answered = answered + 1;
        }
        if(registerObj.howDoYouSave !== ''){
            answered = answered + 1;
        }
        if(registerObj.likeToHelpFinanciallyAtHome !== ''){
            answered = answered + 1;
        }
        if(registerObj.participateInTrainingProgOrGroupsToSaveOrEarnMoney !== ''){
            answered = answered + 1;
        }
        if(registerObj.activityLikeToParticipate !== '' ){
            answered = answered + 1;
        }
        if(registerObj.skillsAwareOf !== ''){
            answered = answered + 1;
        }

        let percent = Math.floor(answered / 12 * 100)
        setSectionCompletionPercent(percent)
    }

    const economicSectionQ5 = (val) => {
        let tempArray = registerObj.skillsToMatchTheIncome;
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
            skillsToMatchTheIncome:tempArray
        })
    }

    const economicSectionQ1 = (val) => {
        let tempArray = registerObj.sourceOfIncomeOfFamily;
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
            sourceOfIncomeOfFamily:tempArray
        })
    }

    const economicSectionQ7 = (val) => {
        let tempArray = registerObj.howDoYouDoFinancialPlanningAtHome;
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
            howDoYouDoFinancialPlanningAtHome:tempArray
        })
    }

    const economicSectionQ9 = (val) => {
        let tempArray = registerObj.howDoYouSave;
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
            howDoYouSave:tempArray
        })
    }

    const economicSectionQ11 = (val) => {
        let tempArray = registerObj.activityLikeToParticipate;
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
            activityLikeToParticipate:tempArray
        })
    }

    const economicSectionQ12 = (val) => {
        let tempArray = registerObj.skillsAwareOf;
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
            skillsAwareOf:tempArray
        })
    }

    return (
        <>
        {/* Financial container */}
        <View style={styles.formSectionContainer}>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        13) कुटुांबाचे उत्पन्नाचे साधन कोणते ?
                    </>):(<>
                        13) What is the source of income of the family?
                    </>)}
                </Text>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:5}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Private job"
                            status={ registerObj.sourceOfIncomeOfFamily.indexOf('Private job') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ1('Private job')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Private Service */}
                            {appLanguage === 'Marathi' ? (<>
                                a) खासगी नोकरी
                            </>):(<>
                                a) Private job
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Government job"
                            status={ registerObj.sourceOfIncomeOfFamily.indexOf('Government job') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ1('Government job')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Govt. Service */}
                            {appLanguage === 'Marathi' ? (<>
                                b) सरकारी नोकरी
                            </>):(<>
                                b) Government job
                            </>)}
                        </Text>
                    </View>
                </View>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:5}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Agriculture"
                            status={ registerObj.sourceOfIncomeOfFamily.indexOf('Agriculture') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ1('Agriculture')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Agriculture */}
                            {appLanguage === 'Marathi' ? (<>
                                c) शेती
                            </>):(<>
                                c) Agriculture
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Business"
                            status={ registerObj.sourceOfIncomeOfFamily.indexOf('Business') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ1('Business')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Business */}
                            {appLanguage === 'Marathi' ? (<>
                                d) व्यवसाय
                            </>):(<>
                                d) Business
                            </>)}
                        </Text>
                    </View>
                </View>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:5}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Daily wage"
                            status={ registerObj.sourceOfIncomeOfFamily.indexOf('Daily wage') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ1('Daily wage')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Other */}
                            {appLanguage === 'Marathi' ? (<>
                                e) रोजांदारी
                            </>):(<>
                                e) Daily wage
                            </>)}
                        </Text>
                    </View>

                </View>
            </View>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        14) कुटुंबात किती कमावणारे आहेत?
                    </>):(<>
                        14) How many earners in the family?
                    </>)}
                </Text>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:5}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="1"
                            status={ registerObj.noOfEarnersInFamily === '1' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                noOfEarnersInFamily:'1'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* 1 */}
                            {appLanguage === 'Marathi' ? (<>
                                a) १
                            </>):(<>
                                a) 1
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="2"
                            status={ registerObj.noOfEarnersInFamily === '2' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                noOfEarnersInFamily:'2'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* 2 */}
                            {appLanguage === 'Marathi' ? (<>
                                b) २
                            </>):(<>
                                b) 2
                            </>)}
                        </Text>
                    </View>
                </View>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:5}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="3"
                            status={ registerObj.noOfEarnersInFamily === '3' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                noOfEarnersInFamily:'3'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* 3 */}
                            {appLanguage === 'Marathi' ? (<>
                                c) ३
                            </>):(<>
                                c) 3
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="more than 3"
                            status={ registerObj.noOfEarnersInFamily === 'more than 3' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                noOfEarnersInFamily:'more than 3'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* more than 3 */}
                            {appLanguage === 'Marathi' ? (<>
                                d) ३ पेक्षा जास्त
                            </>):(<>
                                d) more than 3
                            </>)}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        15) घरखचााला मक्तिन्याला क्तकती रुपये लागतात? (घराचे मक्तिन्याचे बजेट )
                    </>):(<>
                        15) How much does Maktinya spend on household expenses? (Household budget)
                    </>)}
                </Text>
                
                <TextInput
                        onChangeText={onChangeText}
                        value={text.maktinyaHouseHoldExpense}
                        style={{
                            borderColor:'#aaa', 
                            borderWidth:1, 
                            paddingHorizontal:10,
                            marginLeft:10,
                            marginTop:15
                        }}
                />

            </View>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        16) आनंदी जीवन जगण्यासाठी किमान मासिक उत्पन्न किती असावे?
                    </>):(<>
                        16) What should be the minimum monthly income to live a happy life?
                    </>)}
                </Text>
                <TextInput
                        onChangeText={onChangeText}
                        value={text.incomeForHappyLife}
                        style={{
                            borderColor:'#aaa', 
                            borderWidth:1, 
                            paddingHorizontal:10,
                            marginLeft:10,
                            marginTop:15
                        }}
                />
            </View>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        17) या उत्पन्नाला साजेसे कौिल्य कोणते असावे असे वाटते ? (Skill sets that are needed)
                    </>):(<>
                        17) What do you think should be the quality of this income? (Skill sets that are needed) 
                    </>)}
                </Text>
                <TextInput
                        onChangeText={onChangeText}
                        value={text.qualityOfIncome}
                        style={{
                            borderColor:'#aaa', 
                            borderWidth:1, 
                            paddingHorizontal:10,
                            marginLeft:10,
                            marginTop:15
                        }}
                />
                <View style={{margin:5}}>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Computer Knowledge"
                            status={ registerObj.skillsToMatchTheIncome.indexOf('Computer Knowledge') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ5('Computer Knowledge')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Deposits money to bank account */}
                            {appLanguage === 'Marathi' ? (<>
                                सांगणक ज्ञान
                            </>):(<>
                                Computer Knowledge
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Professional skills"
                            status={ registerObj.skillsToMatchTheIncome.indexOf('Professional skills') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ5('Professional skills')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Professional skills */}
                            {appLanguage === 'Marathi' ? (<>
                                व्यावसायिक कौशल्य
                            </>):(<>
                                Professional skills
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Hospitality training"
                            status={ registerObj.skillsToMatchTheIncome.indexOf('Hospitality training') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ5('Hospitality training')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Hospitality training */}
                            {appLanguage === 'Marathi' ? (<>
                                आतिथ्य प्रशिक्षण
                            </>):(<>
                                Hospitality training
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Tourism related development skills"
                            status={ registerObj.skillsToMatchTheIncome.indexOf('Tourism related development skills') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ5('Tourism related development skills')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Tourism related development skills */}
                            {appLanguage === 'Marathi' ? (<>
                                पर्यटन संबंधित विकास कौशल्ये
                            </>):(<>
                                Tourism related development skills
                            </>)}
                        </Text>
                    </View>

                </View>
            </View>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        घरी आर्थिक नियोजन कोण करते?
                    </>):(<>
                        Who does the financial planning in your household?
                    </>)}
                </Text>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:5}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="I myself"
                            status={ registerObj.financialPlannerAtHome === 'I myself' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                financialPlannerAtHome:'I myself'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* I myself */}
                            {appLanguage === 'Marathi' ? (<>
                                मी स्वतः
                            </>):(<>
                                I myself
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Housewife"
                            status={ registerObj.financialPlannerAtHome === 'Housewife' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                financialPlannerAtHome:'Housewife'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Housewife */}
                            {appLanguage === 'Marathi' ? (<>
                                गृहिणी
                            </>):(<>
                                Housewife
                            </>)}
                        </Text>
                    </View>
                </View>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:5}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Men in the family"
                            status={ registerObj.financialPlannerAtHome === 'Men in the family' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                financialPlannerAtHome:'Men in the family'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Men in the family */}
                            {appLanguage === 'Marathi' ? (<>
                                कुटुंबातील पुरुष
                            </>):(<>
                                Men in the family
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Both"
                            status={ registerObj.financialPlannerAtHome === 'Both' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                financialPlannerAtHome:'Both'
                            })}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Both */}
                            {appLanguage === 'Marathi' ? (<>
                                दोन्ही
                            </>):(<>
                                Both
                            </>)}
                        </Text>
                    </View>
                </View>

            </View>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        तुम्ही घरी आर्थिक नियोजन कसे करता?
                    </>):(<>
                        How do you do financial planning at home?
                    </>)}
                </Text>
                <View style={{margin:5}}>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Savings"
                            status={ registerObj.howDoYouDoFinancialPlanningAtHome.indexOf('Savings') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ7('Savings')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Savings */}
                            {appLanguage === 'Marathi' ? (<>
                                बचत
                            </>):(<>
                                Savings
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Reducing monthly cost"
                            status={ registerObj.howDoYouDoFinancialPlanningAtHome.indexOf('Reducing monthly cost') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ7('Reducing monthly cost')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Reducing monthly cost */}
                            {appLanguage === 'Marathi' ? (<>
                                मासिक खर्च कमी करणे
                            </>):(<>
                                Reducing monthly cost
                            </>)}
                        </Text>
                    </View>


                </View>
            </View>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        पैसे वाचवण्यासाठी किंवा तुमच्या कुटुंबातील कोणत्याही सदस्याला मदतीची गरज आहे का? जर होय, तुम्हाला प्रशिक्षण कार्यक्रम / गटांमध्ये सहभागी व्हायचे आहे का?
                    </>):(<>
                        Do you or any member of your family need help to save or earn money? If yes, do you want to participate in training programs / groups?
                    </>)}
                </Text>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:5}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Yes"
                            status={ registerObj.participateInTrainingProgOrGroupsToSaveOrEarnMoney === 'Yes' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                participateInTrainingProgOrGroupsToSaveOrEarnMoney:'Yes'
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
                            status={ registerObj.participateInTrainingProgOrGroupsToSaveOrEarnMoney === 'No' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                participateInTrainingProgOrGroupsToSaveOrEarnMoney:'No'
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

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        तुम्ही बचत कशी करता?
                    </>):(<>
                        How do you save?
                    </>)}
                </Text>
                <View style={{margin:5}}>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Deposits the savings in the bank"
                            status={ registerObj.howDoYouSave.indexOf('Deposits the savings in the bank') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ9('Deposits the savings in the bank')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Deposits money to bank account */}
                            {appLanguage === 'Marathi' ? (<>
                                बचत बँकेत जमा करते
                            </>):(<>
                                Deposits the savings in the bank
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Deposits money to self-help groups"
                            status={ registerObj.howDoYouSave.indexOf('Deposits money to self-help groups') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ9('Deposits money to self-help groups')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Deposits money to self-help groups */}
                            {appLanguage === 'Marathi' ? (<>
                                बचत गटांना पैसे जमा करतो
                            </>):(<>
                                Deposits money to self-help groups
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Gives to the husband"
                            status={ registerObj.howDoYouSave.indexOf('Gives to the husband') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ9('Gives to the husband')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Gives to the husband */}
                            {appLanguage === 'Marathi' ? (<>
                                नवऱ्याला देते
                            </>):(<>
                                Gives to the husband
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Invest in LIC"
                            status={ registerObj.howDoYouSave.indexOf('Invest in LIC') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ9('Invest in LIC')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Invest in LIC */}
                            {appLanguage === 'Marathi' ? (<>
                                LIC मध्ये गुंतवणूक करा
                            </>):(<>
                                Invest in LIC
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Invest in share market"
                            status={ registerObj.howDoYouSave.indexOf('Invest in share market') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ9('Invest in share market')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Invest in share market */}
                            {appLanguage === 'Marathi' ? (<>
                                शेअर बाजारात गुंतवणूक करा
                            </>):(<>
                                Invest in share market
                            </>)}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        घरात आर्थिक मदतीसाठी तुम्हाला हातभार लावायला आवडेल का? एखाद्या आर्थिक उपक्रमात सहभागी व्हायला आवडेल का?
                    </>):(<>
                        Would you like to help out financially at home?(Would you like to participate in a financial venture?
                    </>)}
                </Text>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:5}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Yes"
                            status={ registerObj.likeToHelpFinanciallyAtHome === 'Yes' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                likeToHelpFinanciallyAtHome:'Yes'
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
                            status={ registerObj.likeToHelpFinanciallyAtHome === 'No' ? 'checked' : 'unchecked' }
                            onPress={() => setRegisterObj({
                                ...registerObj,
                                likeToHelpFinanciallyAtHome:'No'
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

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        कशाप्रकारच्या उपक्रमात सहभागी व्हायला आवडेल?
                    </>):(<>
                        What kind of activity would you like to participate in ?
                    </>)}
                </Text>
                <View style={{margin:5}}>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Business development training"
                            status={ registerObj.activityLikeToParticipate.indexOf('Business development training') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ11('Business development training')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Business development training */}
                            {appLanguage === 'Marathi' ? (<>
                                व्यवसाय विकास प्रशिक्षण
                            </>):(<>
                                Business development training
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Personality development training"
                            status={ registerObj.activityLikeToParticipate.indexOf('Personality development training') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ11('Personality development training')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Personality development training */}
                            {appLanguage === 'Marathi' ? (<>
                                व्यक्तिमत्व विकास प्रशिक्षण
                            </>):(<>
                                Personality development training
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButtonRow}>
                        <RadioButton
                            value="Small scale (Homemade) business development"
                            status={ registerObj.activityLikeToParticipate.indexOf('Small scale (Homemade) business development') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ11('Small scale (Homemade) business development')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Small scale (Homemade) business development */}
                            {appLanguage === 'Marathi' ? (<>
                                लहान प्रमाणात (घरगुती) व्यवसाय विकास
                            </>):(<>
                                Small scale (Homemade) business development
                            </>)}
                        </Text>
                    </View>

                </View>
            </View>

            <View style={{marginTop:10,marginBottom:10}}>
                <Text style={styles.inputTextLabel}>
                    {appLanguage === 'Marathi' ? (<>
                        कोणत्या प्रकारची कौशल्ये अवगत आहेत?
                    </>):(<>
                        What kind of skills are you aware of?
                    </>)}
                </Text>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:5}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Sewing"
                            status={ registerObj.skillsAwareOf.indexOf('Sewing') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ12('Sewing')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Sewing */}
                            {appLanguage === 'Marathi' ? (<>
                                शिवणकाम
                            </>):(<>
                                Sewing
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Embroidery"
                            status={ registerObj.skillsAwareOf.indexOf('Embroidery') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ12('Embroidery')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Embroidery */}
                            {appLanguage === 'Marathi' ? (<>
                                भरतकाम
                            </>):(<>
                                Embroidery
                            </>)}
                        </Text>
                    </View>
                </View>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:5}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Crafts"
                            status={ registerObj.skillsAwareOf.indexOf('Crafts') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ12('Crafts')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Crafts */}
                            {appLanguage === 'Marathi' ? (<>
                                कलाकुसर
                            </>):(<>
                                Crafts
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Computer Knowledge"
                            status={ registerObj.skillsAwareOf.indexOf('Computer Knowledge') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ12('Computer Knowledge')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Computer Knowledge */}
                            {appLanguage === 'Marathi' ? (<>
                                संगणकाचे प्राथमिक ज्ञान
                            </>):(<>
                                Computer Knowledge
                            </>)}
                        </Text>
                    </View>
                </View>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:5}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Food Products"
                            status={ registerObj.skillsAwareOf.indexOf('Food Products') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ12('Food Products')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Food Products */}
                            {appLanguage === 'Marathi' ? (<>
                                खाद्यपदार्थ
                            </>):(<>
                                Food Products
                            </>)}
                        </Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="Other"
                            status={ registerObj.skillsAwareOf.indexOf('Other') !== -1 ? 'checked' : 'unchecked' }
                            onPress={() => {
                                economicSectionQ12('Other')
                            }}
                        />
                        <Text style={styles.radioButtonText}>
                            {/* Other */}
                            {appLanguage === 'Marathi' ? (<>
                                इतर
                            </>):(<>
                                Other
                            </>)}
                        </Text>
                    </View>
                </View>
                {registerObj.skillsAwareOf.indexOf('Other') !== -1 ? (<TextInput
                    placeholderTextColor='black'
                    style={styles.input}
                    onChangeText={text => setRegisterObj({
                        ...registerObj,
                        otherSkillsAwareOf:text
                    })}
                    value={registerObj.otherSkillsAwareOf}
                    placeholder={`${appLanguage === 'Marathi' ? 'अन्य' : 'Other'}`}
                />): (<></>)}
            </View>

        </View>
        </>
    )
}

export default Financial

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
