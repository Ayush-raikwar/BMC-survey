import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Form from "../api/FormController";


const ViewSingleForm =({ route, navigation })=> {
  const mobile = route.params.mobile;
  const [formData, setFormData] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      setFormData(await Form.getSingle(mobile));
    })();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
      <View>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <FontAwesome
            style={{ padding: 10, margin: 10 }}
            name="arrow-left"
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text>{mobile}</Text>
        <Text>{formData && JSON.stringify(formData, null, 2)}</Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ViewSingleForm
