const axios = require('axios');

const userApiUrl = {
  readUserId:
    'https://us-central1-emassignment-236c8.cloudfunctions.net/backend/api/user/getuser/',
  readAttendance:
    'https://us-central1-emassignment-236c8.cloudfunctions.net/backend/api/getattendance/',
};

const readFirestoreUserId = async (userUid) => {
  try {
    const { data } = await axios
      .get(`${userApiUrl.readUserId}${userUid}`)
      .then();
    console.log(data);
    return data;
  } catch (error) {
    console.log('readFirestoreUserId-->', error);
  }
};

const readAttendancebyId = async (userUid) => {
  try {
    const { data } = await axios
      .get(`${userApiUrl.readAttendance}${userUid}`)
      .then();
    console.log(data);
    return data;
  } catch (error) {
    console.log('readAttendancebyId-->', error);
  }
};

export { readFirestoreUserId, readAttendancebyId };
