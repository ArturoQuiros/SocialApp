import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../app/pages/HomePage";
import { AlbumsPage } from "../app/pages/AlbumsPage";
import { PhotosPage } from "../app/pages/PhotosPage";
import {NavbarX} from '../app/components/NavbarX'
import {FooterX} from '../app/components/FooterX'


export const OtherRoutes = () => {
  return (
    <>
    <div className="content">
      <NavbarX />
        <div className="container">
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="albums" element={<AlbumsPage />} />

              <Route path="albums/:id" element={<PhotosPage />} />

              <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <FooterX />
    </div>
        
        
    </>
  )
}
