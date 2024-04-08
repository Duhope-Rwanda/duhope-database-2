import axios from "axios";

const presetName = process.env.REACT_CLOUDINARY_PRESET_NAME||'xtaojmih';
const cloudName = process.env.REACT_CLOUDINARY_CLOUD_NAME||'des6kmdkj';

export const uploadMultipleImages = async (images) => {

  // Create an empty array to store the URLs of strings
  let urls: string[] = [];

  // Use Promise.all to upload all the images at once
  const promises = images.map(async (image) => {
    return new Promise((resolve, reject) => {
    const formData = new FormData();
    // if (image) {
        formData.append("file", image);
    // }
    formData.append("upload_preset", presetName || "");
    formData.append("cloud_name", cloudName || "");
    
    axios
        .post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData,
            {
                headers: { "X-Requested-With": "XMLHttpRequest" },
                // params: { use_filename: true } as any, // change type to any
            }
        )
        .then((res: { data: { secure_url: string } }) => {
            // Push the URL to the array
            urls.push(res.data.secure_url);
            resolve(res.data.secure_url);
        })
        .catch((e: any) => {
            console.log(e);
        //   $toast.error(
        //     "Failed to upload files, please try again or check your internet",
        //     {
        //       position: "top-right",
        //       duration: 4000,
        //     }
        //   );
          reject(e);
        });
    });
  });
  // Wait for all the promises to resolve
  await Promise.all(promises);
  // Return the array of URLs
  return urls;
};

export const uploadSingleImage = (file) => {

  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", presetName|| "");
    formData.append("cloud_name", cloudName|| "");
    const config = {
      headers: { "X-Requested-With": "XMLHttpRequest" },
      use_filename: true,
    };
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        config
      )
      .then((res) => {

        resolve(res.data.secure_url);
      })
      .catch((e) => {
        // $toast.error(
        //   "Failed to upload files, please try again or check your internet",
        //   {
        //     position: "top-right",
        //     duration: 4000,
        //   }
        // );
        reject();
      });
  });
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};