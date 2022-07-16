import { useSelector, useDispatch } from "react-redux"
import Swal from "sweetalert2";
import mainApi from "../api/mainApi";
import { onLoadAlbums } from "../store/app/albumSlice";
import { onLoadStatsX, onLoadStatsY } from "../store/app/statsSlice";

export const useStatsStore = () => {

    const dispatch = useDispatch();
  
    const {statsX, statsY} = useSelector(state => state.stats);
    const {albums} = useSelector(state => state.albums);
    const {user} = useSelector(state => state.auth);

    const startLoadingStats = async () => {
        
        try {
            
            const {data} = await mainApi.get(`/albums?userId=${user.uid}`);

            dispatch(onLoadAlbums(data.data));

            const fileUploadPromises = [];
            for (const album of data.data) {
                fileUploadPromises.push(mainApi.get(`/photos?albumIdCount=${album.id}&albumName=${album.name}`));
            }

            const stats = await Promise.all(fileUploadPromises);

            const statsX2 = [];
            const statsY2 = [];
            stats.forEach(stat => {
                statsX2.push(stat.data.data.albumName);
                statsY2.push(stat.data.data.count);
            });

            //onsole.log(newStats);

            dispatch(onLoadStatsX(statsX2));
            dispatch(onLoadStatsY(statsY2));

        } catch (error) {
            console.log(error);
        }

    }

  return {
    statsX: statsX,
    statsY: statsY,
    startLoadingStats: startLoadingStats,
}
}
