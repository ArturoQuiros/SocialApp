import { useState, useEffect } from "react";
import { usePhotoStore } from "../../hooks/usePhotoStore";
import { useUiStore } from "../../hooks/useUiStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useParams, useLocation } from "react-router-dom";
import queryString from 'query-string';
import { PhotoModal } from "../components/PhotoModal";
import { SearchBar } from "../components/SearchBar";

export const PhotosPage = () => {

    const [showNoResults, setNoResults] = useState(false);
    const {openModal} = useUiStore();
    const {user} = useAuthStore();
    const {photos, setActivePhoto, startLoadingPhotos} = usePhotoStore();

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(20);
    const [showMore, setShowMore] = useState(true);

    const location = useLocation();
    const { AlbumTitle } = queryString.parse(location.search);
    const {id} = useParams();

    const onClickPhoto = (photo) => {
        setActivePhoto(photo);
        openModal();
    }

    useEffect(() => {
        startLoadingPhotos(id);
    }, [])

    const loadMore = () => {
        if (photos[0]) {
          if (max + 20 >= photos.length) {
            setShowMore(false);
          }
        }
        setMax(max + 20);
    };

    

  return (
    <div className="App">
      <SearchBar
        id={2}
        setNoResults={setNoResults}
      />

      {showNoResults ? (
        <p className="px-6 py-2.5 bg-blue-600 text-white font-medium text-x leading-tight ">
          No results
        </p>
      ) : null}

      {photos[0] ? (
        <section className="overflow-hidden text-gray-700 ">
          <h1 className="px-6 py-2.5 text-5xl text-center font-bold text-slate-900">
            {AlbumTitle}
          </h1>
          <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
            <div className="flex flex-wrap -m-1 md:-m-2">
              {photos.slice(min, max).map((photo) => (
                <div key={photo.id} id="photo_container" className="flex flex-wrap w-1/5 items-stretch">

                <div className="w-full m-2 md:m-2 bg-blue-600 grid grid-cols-1 content-end">

                 <p id="photo_title" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-x leading-tight w-full h-auto m-0">
                    {photo.title}
                  </p>
                  
                  <div className="w-full h-fit m-0">
                    <img
                      className="block object-cover object-center w-full h-full "
                      src={photo.thumbnailUrl + ".png"}
                      width="100%"
                      height="100%"
                    ></img>
                  </div>
              
                  <button
                    type="button"
                    onClick={() => onClickPhoto(photo)}
                    className="w-full h-fit m-0 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    View Photo
                  </button>
                  
                </div>
              </div>
              ))}
            </div>

            {showMore ? (
              <button
                type="button"
                onClick={() => loadMore()}
                className="w-full mt-4 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Load more
              </button>
            ) : null}
          </div>
        </section>
      ) : (
        <p>Loading...</p>
      )}
      <PhotoModal />
    </div>
  )
}
