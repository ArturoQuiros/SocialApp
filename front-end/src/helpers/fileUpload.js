import mainApi from "../api/mainApi";
import { getEnvVariables } from "./getEnvVariables";
let {CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_UPLOAD_PRESET} = getEnvVariables();

//Fix, undefined .env
CLOUDINARY_CLOUD_NAME="dszgkhxlc";
CLOUDINARY_API_KEY="553711114944398";
CLOUDINARY_UPLOAD_PRESET="social-app";

export const fileUpload = async (file) => {

    if (!file) throw new Error('No file to upload');

    const timestamp = Math.round(new Date().getTime() / 1000);
    //console.log(timestamp);

    try {

        const {data} = await mainApi.get(`/photos/signature?timestamp=${timestamp}&upload_preset=${CLOUDINARY_UPLOAD_PRESET}`);
        //console.log(data);

        const cloudUrl = 'https://api.cloudinary.com/v1_1/'+CLOUDINARY_CLOUD_NAME+'/image/upload';
        const formData = new FormData();
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('file', file);
        formData.append('api_key', CLOUDINARY_API_KEY);
        formData.append("timestamp", timestamp);
        formData.append("signature", data);

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (!resp.ok) throw new Error('Could not upload file');

        const cloudResp = await resp.json();

        //console.log(cloudResp);

        return cloudResp.secure_url;

    }catch(error){
        throw new Error(error.message);
    }

}