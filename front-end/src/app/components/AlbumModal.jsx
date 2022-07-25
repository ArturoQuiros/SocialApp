import { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.js';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { useAlbumStore } from '../../hooks/useAlbumStore';
import { Button, Label, TextInput, Textarea } from "flowbite-react/lib/cjs/index.js";


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

export function AlbumModal() {

  const {isModalOpen, closeModal} = useUiStore();

  const {activeAlbum, startSavingAlbum} = useAlbumStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [modalTitle, setModalTitle] = useState("New Album");

  const [formValues, setFormValues] = useState({
      name: '',
      description: ''
  })

  useEffect(() => {
    if (activeAlbum !== null){
      setFormValues({...activeAlbum});

      if(activeAlbum.name !== ''){
        setModalTitle("Edit Album");
      }else{
        setModalTitle("New Album");
      }
    }

  }, [activeAlbum])


  const onInputChange = ({target}) => {
      setFormValues({
          ...formValues,
          [target.name]: target.value
      })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if ( formValues.name.length <= 0) {
        Swal.fire('Name is required', 'Enter a name for the album', 'error');
        return;
    }

    if ( formValues.description.length <= 0) {
        Swal.fire('Description is required', 'Enter a description for the album', 'error');
        return;
    }

    //console.log(formValues);

    await startSavingAlbum(formValues);
    closeModal();
    setFormSubmitted(false);
}

  return (
    <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal w-11/12 sm:w-11/12 md:w-3/4 lg:w-4/6 xl:w-1/2 2xl:w-1/3"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
    >
        <h1 className='text-2xl mt-1 mb-2'>{modalTitle}</h1>
        <hr />

        <form className="flex flex-col gap-4 w-full mt-3" onSubmit={onSubmit}>
          <div>
            <div className="mb-2 block w-full">
              <Label
                htmlFor="name"
                value="Name"
              />
            </div>
            <TextInput
              sizing="lg"
              id="name"
              type="text"
              placeholder="Album name"
              name="name"
              value={formValues.name}
              onChange={onInputChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="description"
                value="Description"
              />
            </div>
            <Textarea
              sizing="lg"
              id="description"
              type="text"
              placeholder="Album description"
              rows={5}
              name="description"
              value={formValues.description}
              onChange={onInputChange}
            />
          </div>
          <Button type="submit">
            Save album
          </Button>
        </form>
                
    </Modal>
  );
}
