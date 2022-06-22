import { useSession, getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import SearchBar from "../../components/SearchBar";
import { useRouter } from "next/router";
import Image from "next/image";
import Modal from "../../components/Modal";

let cont = 0;

export default function Album(props) {
  const router = useRouter();
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(20);
  const [showMore, setShowMore] = useState(true);
  const [showNoResults, setNoResults] = useState(false);
  const { AlbumTitle } = router.query;
  const { data: session } = useSession();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  });

  useEffect(() => {
    if (session && cont === 0) {
      cont = 1;
      axios
        .get(
          `https://jsonplaceholder.typicode.com/photos?albumId=${router.query.idAlbum}`
        )
        .then((res) => {
          //ASYNC
          const data = res.data;
          setPhotos(data);
        });
    }
  });

 

  const loadMore = () => {
    if (photos[0]){
      if ((max+20) >= photos.length){
        setShowMore(false);
      }
    }
    setMax(max+20);
  };

  //Modal
  const [isOpen, setIsOpen] = useState(false);
  const openModal = (t, u) => {
    setTitle(t);
    setUrl(u);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const modal = isOpen ? (
    <Modal close={closeModal} title={title} url={url} />
  ) : (
    ""
  );

  if (!session) {
    return "Not authenticated...";
  }

  if (!photos[0]){
    cont = 0;
  }

  return (
    <div className="App">
      <SearchBar
        data={setPhotos}
        id={2}
        user={session.user.id}
        album={router.query.idAlbum}
        setNoResults={setNoResults}
      />

      { showNoResults ? (
        <p class="px-6 py-2.5 bg-blue-600 text-white font-medium text-x leading-tight ">
        No results
      </p>
      ) : (
        null
      )}
      

      {modal}

      {photos[0] ? (
        <section class="overflow-hidden text-gray-700 ">
          <h1 className="px-6 py-2.5 text-5xl text-center font-bold text-slate-900">
            {AlbumTitle}
          </h1>
          <div class="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
            <div class="flex flex-wrap -m-1 md:-m-2">
              {photos.slice(min,max).map((photo) => (
                <div id="photo_container" class="flex flex-wrap w-1/5 items-stretch">
                  <div class="w-full m-2 md:m-2 bg-blue-600 flex flex-wrap items-stretch">
                    <p id="photo_title" class="px-6 py-2.5 bg-blue-600 text-white font-medium text-x leading-tight w-full h-auto m-0">
                      {photo.title}
                    </p>
                    <div class="w-full h-auto m-0">
                      <img
                        class="block object-cover object-center w-full h-full "
                        src={photo.thumbnailUrl + ".png"}
                        width="100%"
                        height="100%"
                      ></img>
                    </div>

                    <button
                      type="button"
                      onClick={() => openModal(photo.title, photo.url)}
                      class="w-full h-auto m-0 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      View Photo
                    </button>
                    
                  </div>
                </div>
              ))}

                

            </div>
            
            { showMore ? (
              <button
                type="button"
                onClick={() => loadMore()}
                class="w-full mt-4 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Load more
              </button>
            ) : (
              null
            )}

            

          </div>

        </section>
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

/*
export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}
*/