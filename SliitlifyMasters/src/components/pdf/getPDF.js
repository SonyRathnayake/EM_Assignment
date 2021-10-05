import axios from 'axios';
import fileDownload from 'js-file-download';

const handleDownload = (url) => {
  axios
    .get(url, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, 'dummy');
    })
    .catch((err) => console.log(err));
};

export { handleDownload };
