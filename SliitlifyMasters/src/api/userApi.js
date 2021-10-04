const axios = require('axios');

const userApiUrl = {
  readUserId:
    'https://us-central1-emassignment-236c8.cloudfunctions.net/backend/api/user/getuser/',
};

const readFirestoreUserId = async (userUid) => {
  try {
    const { data } = await axios.get(`${userApiUrl.readUserId}${userUid}`);
    return data;
  } catch (error) {
    console.log('readFirestoreUserId-->', error);
  }
};

export { readFirestoreUserId };
