import AsyncWriter from "../utils/AsyncWriter";

export const save = async (formdata) => {
  let offlineForms = await AsyncWriter.getData("offline-forms");
  let mobile = formdata.mobileNumber;
  let newAddition = {};
  let newForm = {
    [mobile]: {
      data: formdata,
      uploaded: false,
      isformComplete: false
    },
  };
  // console.log('New form', newForm);
  if (offlineForms) {
    newAddition = {
      ...newForm,
      ...offlineForms,
    };
  } else {
    newAddition = {
      ...newForm,
    };
  }

  await AsyncWriter.writeData("offline-forms", newAddition);
};

export const update = async (mobile, update) => {
  let offlineForms = await AsyncWriter.getData("offline-forms");
  // console.log('offline forms update method', offlineForms)
  let updatedForms = {
    ...offlineForms,
    [mobile]: {
      ...offlineForms[mobile],
      ...update,
    },
  };
  // console.log('updated Forms', updatedForms);
  await AsyncWriter.writeData('offline-forms', updatedForms)
  console.log('...i have updated the form for', mobile);
};

export const get = async () => {
  let offlineForms = await AsyncWriter.getData("offline-forms");
  return offlineForms;
};

export const getSingle = async (mobile) => {
  let offlineForms = await AsyncWriter.getData("offline-forms");
  console.log('Get Single form', mobile);
  let form = offlineForms[mobile];
  // console.log('Get Single form up', mobile);

  // console.log(form);
  return form;
};

export const removeall = async () => {
  await AsyncWriter.clearData("offline-forms");
  let offlineForms = await AsyncWriter.getData("offline-forms");
  // console.log("Checking if alive", offlineForms);
};
