import { useSession } from "next-auth/react";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Link from 'next/link';
import SearchBar from "../../components/SearchBar";
import { useRouter } from 'next/router'
import Image from 'next/image'
import Modal from '../../components/Modal';

let cont = 0;

export default function Album(props) {
    const router = useRouter()
    const [photos, setPhotos] = useState([]);
    const [title, setTitle] = useState([]);
    const [url, setUrl] = useState([]);
    
    const { data: session } = useSession();
    const { status } = useSession({
      required: true,
      onUnauthenticated() {
        // The user is not authenticated, handle it here.
      },
    });
  
    useEffect(() => {
      if(session && cont === 0){
        cont = 1;
        axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${router.query.idAlbum}`)
        .then(res => { //ASYNC
          const data = res.data;
          setPhotos(data)
        });
      }
      
    });

      //Modal
    const [isOpen, setIsOpen] = useState(false);
    const openModal = (t, u) => {
        setTitle(t);
        setUrl(u);
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const modal = (
        isOpen ? <Modal close={closeModal} title={title} url={url}/> : ''
    )
    
    if (!session) {
      return "Not authenticated...";
    }
  
    return (
      <div className="App">
  
        <SearchBar data={setPhotos} id={2} user={session.user.id} album={router.query.idAlbum}/>

        {modal}
  
        {photos[0] ? ( 

            <section class="overflow-hidden text-gray-700 ">
            <div class="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
            <div class="flex flex-wrap -m-1 md:-m-2">

                {photos.map((photo) => (
                    <div class="flex flex-wrap w-1/3">
                    <div class="w-full p-1 md:p-2">
                        <p>{photo.title}</p>
                        <Image alt="gallery" class="block object-cover object-center w-full h-full rounded-lg"
                        src={photo.thumbnailUrl + ".png"} width="150px" height="150px"></Image>
                        <p></p>
                        <button type="button" onClick={() => openModal(photo.title, photo.url)} class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            Abrir
                        </button>
                    </div>
                </div>
                ))}

                
            </div>
            </div>
            </section>
            
        ) : (
          <p>{cont=0}Loading...</p>
        )}
      </div>
    );
  }
  