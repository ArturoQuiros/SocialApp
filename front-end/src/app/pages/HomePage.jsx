import { useAuthStore } from "../../hooks/useAuthStore";

export const HomePage = () => {

    const {user} = useAuthStore();

  return (
    <div className="App mb-5">
        <div className="px-6 py-2.5 text-5xl text-center font-bold text-slate-900">
          Welcome, {user.name}
        </div>
    </div>
  )
}
