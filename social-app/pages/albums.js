import { useSession } from "next-auth/react";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Link from 'next/link';
import SearchBar from "../components/SearchBar";

let cont = 0;

export default function Admin() {
  const [albums, setAlbums] = useState({});
  
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
      axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${session.user.id}`)
      .then(res => { //ASYNC      
          const data = res.data;
          setAlbums(data) 
          
      });
    }
    
  });

  if (!session) {
    return "Not authenticated...";
  }

  return (
    <div className="App">

      <SearchBar data={setAlbums} id={1} user={session.user.id} />

      {albums[0] ? ( 

      <div class="flex flex-col items-center">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-[75%] sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-[75%]">
              <thead class="bg-white border-b">
                <tr>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    #
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Title
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>

                {albums.map((album) => (

                  <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{album.id}</td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {album.title}
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <Link href={`/albums/${album.id}`}>
                      <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">View</button>
                      </Link>
                    </td>
                  </tr>
                  
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>

      ) : (
        <p>{cont=0}Loading...</p>
      )}
    </div>
  );
}
