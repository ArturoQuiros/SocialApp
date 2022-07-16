
export const getEnvVariables = () => {
    
    //import.meta.env;

    return {
        //...import.meta.env
        VITE_API_URL: import.meta.env.VITE_API_URL,
        CLOUDINARY_CLOUD_NAME: import.meta.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: import.meta.env.CLOUDINARY_API_KEY,
        CLOUDINARY_UPLOAD_PRESET: import.meta.env.CLOUDINARY_UPLOAD_PRESET,
    }

}