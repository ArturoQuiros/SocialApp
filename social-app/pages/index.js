import SearchBar from "../components/SearchBar";
import styles from "../styles/Home.module.css";
import { useSession, getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  let hello;

  useEffect(() => {
    if (!session) {

    }
  }, []);

  if (session) {
    hello = (
      <div className="px-6 py-2.5 text-5xl text-center font-bold text-slate-900">
        Welcome, {session.user.name}
      </div>
    );
  } else {
    hello = (
      <div className="px-6 py-2.5 text-5xl text-center font-bold text-slate-900">
        Welcome{" "}
      </div>
    );
    return "Not authenticated...";
  }

  

  return (
    <div className="App">
        {hello}
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