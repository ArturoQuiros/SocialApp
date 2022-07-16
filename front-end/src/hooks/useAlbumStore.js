import { useSelector, useDispatch } from "react-redux"
import Swal from "sweetalert2";
import mainApi from "../api/mainApi";
import { onAddNewAlbum, onDeleteAlbum, onLoadAlbums, onSearchAlbums, onSetActiveAlbum, onUpdateAlbum } from "../store/app/albumSlice";

export const useAlbumStore = () => {

    const dispatch = useDispatch();
  
    const {albums, activeAlbum} = useSelector(state => state.albums);
    const {user} = useSelector(state => state.auth);

    const setActiveAlbum = (album) => {
        localStorage.setItem('activeAlbum', album.id);
        dispatch(onSetActiveAlbum(album));
    }

    const startSavingAlbum = async(album) => {

        try {

            if (album.id){ //Update
                await mainApi.put(`/albums/${album.id}`, album);
                dispatch(onUpdateAlbum({...album}));
                Swal.fire('Album updated!', 'The album was updated successfully!', 'success');
                return;
            }

            //Create
            const {data} = await mainApi.post('/albums', album);
            dispatch(onAddNewAlbum({...album, id: data.data.id}));
            Swal.fire('Album created!', 'The album was created successfully!', 'success');
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error while saving album', error.response, 'error');
        }
        
    }

    const startDeletingAlbum = async(album) => {

        try {

            try {

                const {data} = await mainApi.get(`/photos?albumId=${album.id}`);

                Swal.fire('Error while deleting album', 'This album is not empty, delete its photos first', 'error');

            } catch (error) {

                await mainApi.delete(`/albums/${album.id}`);
                dispatch(onDeleteAlbum());
                Swal.fire('Album deleted!', 'The album was deleted successfully!', 'success');
                
            }

        } catch (error) {
            //console.log(error);
            Swal.fire('Error while deleting album', error.response, 'error');
        }
        
    }

    const startLoadingAlbums = async () => {
        try {
            
            const {data} = await mainApi.get(`/albums?userId=${user.uid}`);

            dispatch(onLoadAlbums(data.data));

        } catch (error) {
            console.log(error);
        }
    }

    const startSearchingAlbums = async (value) => {
        try {

            if (value === "") {

                const {data} = await mainApi.get(`/albums?userId=${user.uid}`);
                dispatch(onSearchAlbums(data.data));

            }else{

                try {
                    const {data} = await mainApi.get(`/albums?s=${value}`);

                    dispatch(onSearchAlbums(data.data));
                    return false;
                } catch (error) {
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
        startSavingAlbum,
        startDeletingAlbum,
        startLoadingAlbums,
        startSearchingAlbums,
    }

}
