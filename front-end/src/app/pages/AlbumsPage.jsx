import { useEffect, useState } from "react";
import { useAlbumStore } from "../../hooks/useAlbumStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import { AlbumTable } from "../components/AlbumsTable";
import { SearchBar } from "../components/SearchBar";

export const AlbumsPage = () => {

    const [showNoResults, setNoResults] = useState(false);
    const {user} = useAuthStore();
    const {albums, setActiveAlbum, startLoadingAlbums} = useAlbumStore();

    useEffect(() => {
        startLoadingAlbums();
    }, [])

  return (
    <div className="App">
      
      <SearchBar
        id={1}
        setNoResults={setNoResults}
      />

      {showNoResults ? (
        <p className="px-6 py-2.5 bg-blue-600 text-white font-medium text-x leading-tight ">
          No results
        </p>
      ) : null}

      {albums[0] ? (
        <div className="flex flex-col items-center">
          <h1 className="px-6 py-2.5 text-5xl text-center font-bold text-slate-900">
            Albums
          </h1>

          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-[75%] sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <AlbumTable albums={albums} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
