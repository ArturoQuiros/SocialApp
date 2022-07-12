import { useSelector, useDispatch } from "react-redux"
import Swal from "sweetalert2";
import mainApi from "../api/mainApi";
import { onLoadPhotos, onSearchPhotos, onSetActivePhoto } from "../store/app/photoSlice";

export const usePhotoStore = () => {

    const dispatch = useDispatch();
  
    const {photos, activePhoto} = useSelector(state => state.photos);
    const {user} = useSelector(state => state.auth);

    const setActivePhoto = (photo) => {
        dispatch(onSetActivePhoto(photo));
    }

    // const startSavingEvent = async(calendarEvent) => {

    //     try {

    //         if (calendarEvent.id){ //Update
    //             await mainApi.put(`/events/${calendarEvent.id}`, calendarEvent);
    //             dispatch(onUpdateEvent({...calendarEvent, user}));
    //             return;
    //         }

    //         //Create
    //         const {data} = await mainApi.post('/events', calendarEvent);
    //         dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user}));
            
    //     } catch (error) {
    //         //console.log(error);
    //         Swal.fire('Error al guardar', error.response.data?.msg, 'error');
    //     }
        
    // }

    // const startDeletingEvent = async() => {

    //     try {

    //         await mainApi.delete(`/events/${activeAlbum.id}`);

    //         dispatch(onDeleteEvent());
            
    //     } catch (error) {
    //         //console.log(error);
    //         Swal.fire('Error al eliminar', error.response.data?.msg, 'error');
    //     }
        
    // }

    const startLoadingPhotos = async (id) => {
        try {
            
            const {data} = await mainApi.get(`/photos?albumId=${id}`);

            dispatch(onLoadPhotos(data));

        } catch (error) {
            console.log(error);
        }
    }

    const startSearchingPhotos = async (id, value) => {
        try {

            const {data} = await mainApi.get(`/photos?albumId=${id}`);

            if (value === "") {
                dispatch(onSearchPhotos(data));
            }else{
                const search = data.filter((photo) => photo.title.includes(value));

                if(search[0]){
                    dispatch(onSearchPhotos(search));
                    return false;
                }else{
                    return true;
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    return {
        photos: photos,
        activePhoto: activePhoto,
        hasPhotoSelected: !!activePhoto, //null = false, object = true
        setActivePhoto,
        //startSavingEvent,
        //startDeletingEvent,
        startLoadingPhotos,
        startSearchingPhotos,
    }

}
