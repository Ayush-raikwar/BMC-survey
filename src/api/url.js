// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const url = async () => {
//     const val = await AsyncStorage.getItem('api_url')
//     if(val != null){
//         return val;
//         // console.log();
//     }
// }
const ip = '13.233.116.111';    //server ip
// const ip = '192.168.0.122'    // for local testing

export const url = 'http://' + ip + ':5011/v1';

// export const url = apiUrl();


