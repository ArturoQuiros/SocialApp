import { useEffect, useState } from "react";
import { useAlbumStore } from "../../hooks/useAlbumStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useUiStore } from "../../hooks/useUiStore";
import { AlbumModal } from "../components/AlbumModal";
import { AlbumTable } from "../components/AlbumsTable";
import { SearchBar } from "../components/SearchBar";
import { Button } from "flowbite-react/lib/cjs/index.js";

export const AlbumsPage = () => {

    const [showNoResults, setNoResults] = useState(false);
    const {user} = useAuthStore();
    const {albums, setActiveAlbum, startLoadingAlbums} = useAlbumStore();
    const {openModal} = useUiStore();

    useEffect(() => {
        startLoadingAlbums();
    }, [])

    const onNewAlbum = () => {
      setActiveAlbum({
        name: '',
        description: '',
        date: new Date(),
    })
      openModal();
    }

  return (
    <div className="App">

      {albums[0] ? (

        <div>

          <SearchBar
            id={1}
            setNoResults={setNoResults}
          />

          {showNoResults ? (
            <p className="px-6 py-2.5 bg-blue-600 text-white font-medium text-x leading-tight ">
              No results
            </p>
          ) : null}
        

        <div className="flex flex-col items-center">
          {/* <h1 className="px-6 py-2.5 text-5xl text-center font-bold text-slate-900">
            Albums
          </h1> */}

          

          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-[75%] sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <AlbumTable albums={albums} />
              </div>
            </div>
          </div>
        </div>

        </div>
      ) : (
        <>
        <div className="flex flex-wrap gap-2 m-3">
            <Button gradientMonochrome="purple" onClick={() => onNewAlbum()}>
              New Album
            </Button>
          </div>
          <p>No albums yet :|</p>
          </>
        
      )}
      <AlbumModal />
    </div>
  )
}
