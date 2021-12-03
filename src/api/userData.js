import axios from 'axios';
import {url} from './url';

export const submitUserData = async (userData) => {
	let response = await axios.post(url + '/userData/addUserData', {data:userData});
	return response && response.data;
};

export const getFormRegStatus = (mobileNumber) => axios.get(url + '/userData/getFormRegStatus/' + mobileNumber);

export const getUserDataByMobileNo = (mobileNumber) => axios.get(url + '/userData/getUserDataByMobileNo/' + mobileNumber);

export const getAllDistricts = () => axios.get(url + '/userData/getAllDistricts');

export const getEducationList = () => axios.get(url + '/userData/getEducationList');

export const getOccupationList = () => axios.get(url + '/userData/getOccupationList');

export const getTalukaListByDistrict = (district) => axios.get(url + '/userData/getTalukaListByDistrict/' + district);

export const getConstituencyListByDistrict = (district) => axios.get(url + '/userData/getConstituencyListByDistrict/' + district);

export const getVillageListByTaluka = (taluka) => axios.get(url + '/userData/getVillageListByTaluka/' + taluka);
