import { Routes, Route, Navigate } from "react-router-dom";
import { StatsPage } from "../app/pages/StatsPage";
import { AlbumsPage } from "../app/pages/AlbumsPage";
import { PhotosPage } from "../app/pages/PhotosPage";
import {NavbarX} from '../app/components/NavbarX'
import {FooterX} from '../app/components/FooterX'
import { SettingsPage } from "../app/pages/SettingsPage";


export const OtherRoutes = () => {
  return (
    <>
    <div className="content">
      <NavbarX />
        <div className="container">
          <Routes>

              <Route path="albums" element={<AlbumsPage />} />

              <Route path="albums/:id" element={<PhotosPage />} />

              <Route path="stats" element={<StatsPage />} />

              <Route path="settings" element={<SettingsPage />} />

              <Route path="/*" element={<Navigate to="/albums" />} />
          </Routes>
        </div>
        <FooterX />
    </div>
        
        
    </>
  )
}
