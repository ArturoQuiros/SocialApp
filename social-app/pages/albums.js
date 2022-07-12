import { useSession, getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import SearchBar from "../components/SearchBar";
import { useRouter } from "next/router";
import AlbumTable from "../components/AlbumsTable";

let cont = 0;

export default function Admin() {
  const router = useRouter();
  const [albums, setAlbums] = useState({});
  const [showNoResults, setNoResults] = useState(false);

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
          `https://jsonplaceholder.typicode.com/albums?userId=${session.user.id}`
        )
        .then((res) => {
          //ASYNC
          const data = res.data;
          setAlbums(data);
        });
    }
  });

  if (!session) {
    return "Not authenticated...";
  }

  if (!albums[0]) {
    cont = 0;
  }

  return (
    <div className="App">
      <SearchBar
        d={albums}
        data={setAlbums}
        id={1}
        user={session.user.id}
        setNoResults={setNoResults}
      />

      {showNoResults ? (
        <p class="px-6 py-2.5 bg-blue-600 text-white font-medium text-x leading-tight ">
          No results
        </p>
      ) : null}

      {albums[0] ? (
        <div class="flex flex-col items-center">
          <h1 className="px-6 py-2.5 text-5xl text-center font-bold text-slate-900">
            Albums
          </h1>

          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-[75%] sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <AlbumTable album={albums} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


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

