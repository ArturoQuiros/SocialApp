import Gallery from "../components/Gallery";
import SearchBar from "../components/SearchBar";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  let hello;

  if (session) {
    hello = (
      <div className="px-6 py-2.5 text-5xl text-center font-bold dark:text-white">
        Welcome, {session.user.name}
      </div>
    );
  } else {
    hello = (
      <div className="px-6 py-2.5 text-5xl text-center font-bold dark:text-white">
        Welcome{" "}
      </div>
    );
  }

  return (
    <div className="">
      <SearchBar />
      {hello}
    </div>
  );
}
