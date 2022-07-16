import mainApi from "../api/mainApi";
import { getEnvVariables } from "./getEnvVariables";
let {VITE_CLOUD_NAME, VITE_API_KEY, VITE_UPLOAD_PRESET} = getEnvVariables();

export const fileUpload = async (file) => {

    if (!file) throw new Error('No file to upload');

    const timestamp = Math.round(new Date().getTime() / 1000);
    //console.log(timestamp);

    try {

        const {data} = await mainApi.get(`/photos/signature?timestamp=${timestamp}&upload_preset=${VITE_UPLOAD_PRESET}`);
        //console.log(data);

        const cloudUrl = 'https://api.cloudinary.com/v1_1/'+VITE_CLOUD_NAME+'/image/upload';
        const formData = new FormData();
        formData.append('upload_preset', VITE_UPLOAD_PRESET);
        formData.append('file', file);
        formData.append('api_key', VITE_API_KEY);
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