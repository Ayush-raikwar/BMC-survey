import axios from 'axios';
import { url } from './url';

export const volunteerRegister = (user) => axios.post(
    url + '/user/add-new'
,{
    first_name:user.first_name, 
    last_name:user.last_name,
    mobile:user.mobile,
    email:user.email,
    password:user.password,
});

export const volunteerSignIn = (user) => axios.post(
    url + '/user/login'
,{
    mobile:user.mobile,
    password:user.password,
});

