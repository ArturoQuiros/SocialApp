import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { SignUpPage } from "../auth/pages/SignUpPage";
import { useAuthStore } from "../hooks/useAuthStore";
import { CheckingAuth } from "../ui/components/CheckingAuth";
import { OtherRoutes } from "./OtherRoutes";

export const AppRouter = () => {

    //const status = 'not-authenticated';
    const {status, checkAuthToken} = useAuthStore();
    
    useEffect(() => {
      checkAuthToken();
    }, [])
    

    if (status === 'checking'){
      return <CheckingAuth />
    }

  return (
    <Routes>

        {
            (status === 'not-authenticated')
            ? (
              <>
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/signup" element={<SignUpPage />} />
                <Route path="/*" element={<Navigate to='/auth/login' />} />
              </>
            ) : (
              <>
                <Route path="/*" element={<OtherRoutes />} />
              </>
            )
        }
        
    </Routes>
  )
}
