import axios from 'axios';
import { url } from './url';


export const sendOtp = (mobileNumber) => axios.post(
    url + '/userData/sendotp'
    , {mobile:mobileNumber});
