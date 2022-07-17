import { useSelector, useDispatch } from "react-redux"
import Swal from "sweetalert2";
import mainApi from "../api/mainApi";
import { onLoadAlbums } from "../store/app/albumSlice";
import { onLoadAlbumCount, onLoadPhotoCount, onLoadStats, onLoadStatsX, onLoadStatsY } from "../store/app/statsSlice";

export const useStatsStore = () => {

    const dispatch = useDispatch();
  
    const {stats, statsX, statsY, albumCount, photoCount} = useSelector(state => state.stats);
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
            const stats2 = [];

            let x = 0;
            stats.forEach(stat => {
                stats2.push({value: stat.data.data.count, name: stat.data.data.albumName});
                statsX2.push(stat.data.data.albumName);
                statsY2.push(stat.data.data.count);
                x += stat.data.data.count;
            });

            //onsole.log(newStats);

            dispatch(onLoadStats(stats2));
            dispatch(onLoadStatsX(statsX2));
            dispatch(onLoadStatsY(statsY2));
            dispatch(onLoadAlbumCount(statsX2.length));
            dispatch(onLoadPhotoCount(x));

        } catch (error) {
            //console.log(error);
        }

    }

  return {
    stats: stats,
    statsX: statsX,
    statsY: statsY,
    albumCount: albumCount,
    photoCount: photoCount,
    startLoadingStats: startLoadingStats,
}
}
