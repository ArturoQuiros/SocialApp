import { useSelector, useDispatch } from "react-redux"
import Swal from "sweetalert2";
import mainApi from "../api/mainApi";
import { onLoadAlbums, onSearchAlbums, onSetActiveAlbum } from "../store/app/albumSlice";

export const useAlbumStore = () => {

    const dispatch = useDispatch();
  
    const {albums, activeAlbum} = useSelector(state => state.albums);
    const {user} = useSelector(state => state.auth);

    const setActiveAlbum = (album) => {
        dispatch(onSetActiveAlbum(album));
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

    const startLoadingAlbums = async () => {
        try {
            
            const {data} = await mainApi.get(`/albums?userId=${user.uid}`);
            //console.log(data);

            dispatch(onLoadAlbums(data));

        } catch (error) {
            console.log(error);
        }
    }

    const startSearchingAlbums = async (value) => {
        try {

            const {data} = await mainApi.get(`/albums?userId=${user.uid}`);

            if (value === "") {
                dispatch(onSearchAlbums(data));
            }else{
                const search = data.filter((album) => album.title.includes(value));

                if(search[0]){
                    dispatch(onSearchAlbums(search));
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
        albums: albums,
        activeAlbum: activeAlbum,
        hasAlbumSelected: !!activeAlbum, //null = false, object = true
        setActiveAlbum,
        //startSavingEvent,
        //startDeletingEvent,
        startLoadingAlbums,
        startSearchingAlbums,
    }

}
