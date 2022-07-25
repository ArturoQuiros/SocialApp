import { useSelector, useDispatch } from "react-redux"
import Swal from "sweetalert2";
import mainApi from "../api/mainApi";
import { fileUpload } from "../helpers/fileUpload";
import { deletingPhoto, onAddNewPhoto, onClearPhotos, onDeleteAllPhotosOfAlbum, onDeletePhoto, onLoadPhotos, onSearchPhotos, onSetActivePhoto, onUpdatePhoto, photoSlice, savingNewPhoto } from "../store/app/photoSlice";



export const usePhotoStore = () => {

    const dispatch = useDispatch();
  
    const {photos, activePhoto, isSaving, isDeleting} = useSelector(state => state.photos);
    const {activeAlbum} = useSelector(state => state.albums);
    const {user} = useSelector(state => state.auth);

    const setActivePhoto = (photo) => {
        dispatch(onSetActivePhoto(photo));
    }

    const startUploadingFile = async (files = []) => {

        //console.log(files);

        dispatch(savingNewPhoto());
    
        return await fileUpload(files[0]);
    
    }

    const startSavingPhoto = async(photo) => {

        try {

            if (photo.id){ //Update
                await mainApi.put(`/photos/${photo.id}`, photo);
                dispatch(onUpdatePhoto({...photo}));
                Swal.fire('Photo updated!', 'The photo was updated successfully!', 'success');
                return;
            }

            //Create
            if(activeAlbum){
                photo.albumId = activeAlbum.id;
            }else{
                photo.albumId = localStorage.getItem('activeAlbum');
            }
            //console.log(photo);
            const {data} = await mainApi.post('/photos', photo);
            dispatch(onAddNewPhoto({...photo, id: data.data.id}));
            Swal.fire('Photo uploaded!', 'The photo was uploaded successfully!', 'success');
            
        } catch (error) {
            //console.log(error);
            Swal.fire('Error while saving photo', error.response.data?.message, 'error');
        }
        
    }

    const startUploadingFiles = async (files = []) => {

        //console.log(files);

        dispatch(savingNewPhoto());

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const photosURLs = await Promise.all(fileUploadPromises);
    
        return photosURLs;
    
    }

    const startSavingPhotos = async(files = []) => {

        try {

            const photosURLs = await startUploadingFiles(files);
            const newPhotos = [];
            let albumId = '';

            if(activeAlbum){
                albumId = activeAlbum.id;
            }else{
                albumId = localStorage.getItem('activeAlbum');
            }

            let x = 0;
            let name = '';
            photosURLs.forEach(url => {
                x = Math.floor(Math.random() * (Math.floor(9999999999) - Math.ceil(999999999) + 1) + Math.ceil(999999999));
                name = '' + x;
                newPhotos.push({albumId, url, name});
            })

            const filePromises = [];
            newPhotos.forEach(photo => {
                filePromises.push(mainApi.post('/photos', photo));
            })

            await Promise.all(filePromises);
            
            const {data} = await mainApi.get(`/photos?albumId=${albumId}`);
            dispatch(onSearchPhotos(data.data));

            Swal.fire('Photos uploaded!', 'The photos were uploaded successfully!', 'success');
            
        } catch (error) {
            //console.log(error);
            Swal.fire('Error while saving photo', error.response.data?.message, 'error');
        }
        
    }

    const startDeletingPhoto = async(photo) => {

        try {

            dispatch(deletingPhoto());

            const segments = photo.url.split('/');
            const imageName = segments[segments.length-1];
            const segments2 = imageName.split('.');
            const imageId = segments2[0];

            await mainApi.delete(`/photos/${photo.id}/${imageId}`);

            dispatch(onDeletePhoto());

            Swal.fire('Photo deleted!', 'The photo was deleted successfully!', 'success');
            
        } catch (error) {
            //console.log(error);
            Swal.fire('Error while deleting photo', error.response.data?.message, 'error');
        }
        
    }

    const startDeletingAllPhotosOfAlbum = async() => {

        try {

            dispatch(deletingPhoto());

            let mongoIds = '';
            let cloudinaryIds = '';

            let segments = '';
            let imageName = '';
            let segments2 = '';
            let imageId = '';

            let cont = 0;
            photos.forEach(photo => {
                cont++;

                segments = photo.url.split('/');
                imageName = segments[segments.length-1];
                segments2 = imageName.split('.');
                imageId = segments2[0];

                if(cont % 50 === 0){ //borrar en grupos de 50
                    mongoIds += photo.id + ',.';
                    cloudinaryIds += 'social-app/' + imageId + ',.';
                }else{
                    mongoIds += photo.id + ',';
                    cloudinaryIds += 'social-app/' + imageId + ',';
                }
                
            })

            if(mongoIds.charAt(mongoIds.length - 1) === '.'){
                mongoIds = mongoIds.slice(0, -1);
                cloudinaryIds = cloudinaryIds.slice(0, -1);
            }

            let segmentsM = mongoIds.split('.');
            let segmentsC = cloudinaryIds.split('.');

            const filePromises = [];
            for (let i = 0; i < segmentsM.length; i++) {
                segmentsM[i] = segmentsM[i].slice(0, -1);
                segmentsC[i] = segmentsC[i].slice(0, -1);
                filePromises.push(mainApi.delete(`/photos/deleteMultiple?mIds=${segmentsM[i]}&cIds=${segmentsC[i]}`));
            }

            await Promise.all(filePromises);

            dispatch(onDeleteAllPhotosOfAlbum());

            Swal.fire('Photos deleted!', 'The photos were deleted successfully!', 'success');
            
        } catch (error) {
            //console.log(error);
            Swal.fire('Error while deleting photos', error.response.data?.message, 'error');
        }
        
    }

    const startLoadingPhotos = async (id) => {
        try {

            dispatch(onClearPhotos());
            
            const {data} = await mainApi.get(`/photos?albumId=${id}`);

            dispatch(onLoadPhotos(data.data));

        } catch (error) {
            //console.log(error);
        }
    }

    const startSearchingPhotos = async (id, value) => {
        try {

            if (value === "") {

                const {data} = await mainApi.get(`/photos?albumId=${id}`);
                dispatch(onSearchPhotos(data.data));

            }else{

                try {
                    const {data} = await mainApi.get(`/photos?s=${value}&albumId=${id}`);

                    dispatch(onSearchPhotos(data.data));
                    return false;
                } catch (error) {
                    return true;
                }

            }

        } catch (error) {
            //console.log(error);
        }
    }

    return {
        photos: photos,
        isSaving: isSaving,
        isDeleting: isDeleting,
        activePhoto: activePhoto,
        hasPhotoSelected: !!activePhoto, //null = false, object = true
        setActivePhoto,
        startUploadingFile,
        startSavingPhoto,
        startDeletingPhoto,
        startLoadingPhotos,
        startSearchingPhotos,
        startDeletingAllPhotosOfAlbum,
        startSavingPhotos,
    }

}
