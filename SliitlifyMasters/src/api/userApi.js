const axios = require('axios');

const userApiUrl = {
  readUserId:
    'https://us-central1-emassignment-236c8.cloudfunctions.net/backend/api/user/getuser/',
  readAttendance:
    'https://us-central1-emassignment-236c8.cloudfunctions.net/backend/api/getattendance/',
  createFeedback: '',
};

const readFirestoreUserId = async (userUid) => {
  try {
    const { data } = await axios
      .get(`${userApiUrl.readUserId}${userUid}`)
      .then();
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
    return data;
  } catch (error) {
    console.log('readAttendancebyId-->', error);
  }
};

const createUserFeedback = async (userUid, feedback) => {
  await axios
    .post(userApiUrl.createFeedback, {
      msNo: userUid,
      feedback: feedback,
    })
    .then()
    .catch((error) => console.log('createFeedback-->', error));
};

export { readFirestoreUserId, readAttendancebyId, createUserFeedback };
