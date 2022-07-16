import { useState, useEffect, useRef } from "react";
import { usePhotoStore } from "../../hooks/usePhotoStore";
import { useUiStore } from "../../hooks/useUiStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useParams, useLocation } from "react-router-dom";
import queryString from 'query-string';
import { PhotoModal } from "../components/PhotoModal";
import { SearchBar } from "../components/SearchBar";
import { Button, Spinner } from "flowbite-react/lib/cjs/index.js";

export const PhotosPage = () => {

    const [showNoResults, setNoResults] = useState(false);
    const {openModal} = useUiStore();
    const {user} = useAuthStore();
    const {photos, isSaving, isDeleting, setActivePhoto, startLoadingPhotos, startDeletingPhoto, startDeletingAllPhotosOfAlbum, startSavingPhotos} = usePhotoStore();

    const fileInputRef = useRef();

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(20);
    const [showMore, setShowMore] = useState(true);

    const location = useLocation();
    const { AlbumTitle } = queryString.parse(location.search);
    const {id} = useParams();

    const onViewPhoto = (photo) => {
        setActivePhoto(photo);
        openModal();
    }

    const onUploadPhoto = () => {
      setActivePhoto({
          name: '',
          description: '',
          url: ''
      })
      openModal();

    }

    const onFileInputChange = ({target}) => { //Upload multiple photos
        if (target.files === 0) return;

        startSavingPhotos(target.files);
    }

    const onDeletePhoto = (photo) => {
        setActivePhoto(photo);
        startDeletingPhoto(photo);
    }

    const onDeleteAllPhotos = () => {
        startDeletingAllPhotosOfAlbum();
    }

    useEffect(() => {
        startLoadingPhotos(id);
    }, [])

    useEffect(() => {
        if(photos.length<20){
          setShowMore(false);
        }else{
          setShowMore(true);
        }
    }, [photos])

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
      

      {photos[0] ? (
        <section className="overflow-hidden text-gray-700 ">
          <h1 className="px-0 py-2.5 text-3xl text-center font-bold text-slate-900">
            {AlbumTitle}
          </h1>

          <div className="grid grid-cols-3 justify-items-center gap-1">
            <Button color="purple" onClick={() => onUploadPhoto()}>
              Upload a photo
            </Button>
            <Button color="warning" onClick={() => fileInputRef.current.click()} disabled={isSaving}>
              Upload multiple photos
            </Button>
            <Button color="failure" onClick={() => onDeleteAllPhotos()} disabled={isDeleting}>
              Delete all photos
            </Button>
            </div>
            <div className="grid grid-cols-1 justify-items-center gap-0 mt-4">
            { (isDeleting || isSaving) && (<Spinner aria-label="Default status example" size="xl" />)}
            </div>
          
        <SearchBar
            id={2}
            setNoResults={setNoResults}
          />

        {showNoResults ? (
          <p className="px-6 py-2.5 bg-blue-600 text-white font-medium text-x leading-tight ">
            No results
          </p>
        ) : null}

          <div className="container px-5 py-0 mx-auto lg:pt-3 lg:px-32">
            <div className="flex flex-wrap -m-1 md:-m-2">
              {photos.slice(min, max).map((photo) => (
                <div key={photo.id} id="photo_container" className="flex flex-wrap w-1/5 items-stretch">

                <div className="w-full m-2 md:m-2 bg-blue-600 grid grid-cols-1 content-end">

                 <p id="photo_title" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-x leading-tight w-full h-auto m-0 text-center">
                    {photo.name}
                  </p>
                  
                  <div className="w-full h-fit m-0">
                    <img
                      className="thumbnail block object-cover object-center w-full h-full "
                      src={photo.url}
                      width="100%"
                      height="100%"
                    ></img>
                  </div>
              
                  <div className="grid grid-cols-2 gap-0">
                    <button
                      type="button"
                      onClick={() => onViewPhoto(photo)}
                      className="w-full h-fit m-0 inline-block px-0 py-2.5 bg-emerald-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeletePhoto(photo)}
                
                      className="w-full h-fit m-0 inline-block px-0 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Delete
                    </button>
                  </div>

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
        <>
          <h1 className="px-0 py-2.5 text-3xl text-center font-bold text-slate-900">
            {AlbumTitle}
          </h1>

          <div className="grid grid-cols-2 justify-items-center gap-1">
            <Button color="purple" onClick={() => onUploadPhoto()}>
              Upload a photo
            </Button>
            <Button color="warning" onClick={() => fileInputRef.current.click()} disabled={isSaving}>
              Upload multiple photos
            </Button>
            </div>
            <div className="grid grid-cols-1 justify-items-center gap-0 mt-4">
            { isSaving && (<Spinner aria-label="Default status example" size="xl" />)}
            </div>

          <p className="mt-4">No photos yet in this album :|</p>
        </>
        
      )}
      <PhotoModal />
      <input type="file" multiple accept="image/png, image/jpeg" onChange={onFileInputChange} style={{display: 'none'}} ref={fileInputRef}/>
    </div>
  )
}
