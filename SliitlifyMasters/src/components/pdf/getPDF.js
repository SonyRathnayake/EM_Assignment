import axios from 'axios';
import fileDownload from 'js-file-download';

const handleDownload = (url) => {
  axios
    .get(url, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, 'dummy');
    });
};

export { handleDownload };
// const getPDF = (url) => {
//   try {
//     axios.get(`${url}`).then((response) => console.log(response.blob()));
//     // .then((blob) => {
//     //   // Create blob link to download
//     //   console.log(blob);
//     //   const url = window.URL.createObjectURL(new Blob([blob]));
//     //   const link = document.createElement('a');
//     //   link.href = url;
//     //   link.setAttribute('download', `Lol.pdf`);

//     //   // Append to html link element page
//     //   document.body.appendChild(link);

//     //   // Start download
//     //   link.click();

//     //   // Clean up and remove the link
//     //   link.parentNode.removeChild(link);
//     // });
//   } catch (error) {
//     console.log('readFirestoreUserId-->', error);
//   }
// };

// const { data } = await axios.get(`${url}`);
// fetch('https://cors-anywhere.herokuapp.com/' + fileURL, {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/pdf',
//   },
// })
//   .then((response) => response.blob())
//   .then((blob) => {
//     // Create blob link to download
//     const url = window.URL.createObjectURL(new Blob([blob]));
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', `FileName.pdf`);

//     // Append to html link element page
//     document.body.appendChild(link);

//     // Start download
//     link.click();

//     // Clean up and remove the link
//     link.parentNode.removeChild(link);
//   });
