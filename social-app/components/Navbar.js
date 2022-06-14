import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session } = useSession()

  if(session) {
    return <>
      <nav className="header">
        <div className="logo">
          <h1>logo</h1>
        </div>
        <div className="hello">
          Hi {session.user.name} 
        </div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/protected">
          <a>Protected</a>
        </Link>
        <div className="signin">
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </nav>
    </>
  }
  return <>
    <nav className="header">
      <div className="logo">
        <h1>logo</h1>
      </div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/protected">
        <a>Protected</a>
      </Link>
      <div className="signin">
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    </nav>
  </>

};

export default Navbar;
