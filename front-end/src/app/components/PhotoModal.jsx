import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.js';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { usePhotoStore } from '../../hooks/usePhotoStore';


const customStyles = {
  content: {
    // top: '50%',
    // left: '50%',
    // right: 'auto',
    // bottom: 'auto',
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export function PhotoModal() {

  const {isModalOpen, closeModal} = useUiStore();

  const {activePhoto} = usePhotoStore();



  return (
    <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
    >
      {activePhoto?.title && (
        <>
        <h1 className='px-6 py-2.5 text-2xl text-center font-bold text-slate-900'>{activePhoto.title}</h1>
        <hr />
        <img
            alt="photo"
            className="block object-cover object-center w-full h-full rounded-lg"
            src={activePhoto.url + ".png"}
            width="600px"
        ></img>
        </>
      )}
        
    </Modal>
  );
}
