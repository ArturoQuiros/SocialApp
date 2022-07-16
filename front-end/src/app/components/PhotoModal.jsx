import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.js';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { usePhotoStore } from '../../hooks/usePhotoStore';
import { Button, Label, TextInput, Textarea, Spinner, FileInput } from "flowbite-react/lib/cjs/index.js";
import { useDispatch } from 'react-redux';
import { savingNewPhoto } from '../../store/app/photoSlice';

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

const formFields = {
  name: '',
  description: '',
  url: ''
}

export function PhotoModal() {

  const dispatch = useDispatch();

  const {isModalOpen, closeModal} = useUiStore();

  const {activePhoto, startSavingPhoto, startUploadingFile, isSaving} = usePhotoStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [fileSelected, setfileSelected] = useState([]);

  const [formValues, setFormValues] = useState(formFields);

  useEffect(() => {
    if (activePhoto !== null){
      if(!activePhoto.description){
        setFormValues({...activePhoto, description: ''});
      }else{
        setFormValues({...activePhoto});
      }
      
    }

  }, [activePhoto])

  const onInputChange = ({target}) => {
      setFormValues({
          ...formValues,
          [target.name]: target.value
      })
  }

  const onFileInputChange = ({target}) => {
      if (target.files === 0) return;

      setfileSelected(target.files)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if ( formValues.name.length <= 0) {
        Swal.fire('Name is required', 'Enter a name for the photo', 'error');
        return;
    }

    formValues.url = await startUploadingFile(fileSelected);

    await startSavingPhoto(formValues);
    closeModal();
    setFormSubmitted(false);
  }

  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if ( formValues.name.length <= 0) {
        Swal.fire('Name is required', 'Enter a name for the photo', 'error');
        return;
    }

    await startSavingPhoto(formValues);
    closeModal();
    setFormSubmitted(false);
  }

  return (
    <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className={"modal " + (activePhoto?.name ? '' : 'w-2/4')}
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
    >
      {activePhoto?.name ? (

        <>
          <form className="flex flex-col gap-4 w-full mt-1" onSubmit={onSubmitUpdate}>
            <div className="grid grid-cols-3 gap-2 w-full">
              <div className="col-span-2">
              <TextInput
                sizing="md"
                type="text"
                placeholder="Photo name"
                name="name"
                value={formValues.name}
                onChange={onInputChange}
                
              />
              </div>
              <Button type="submit">
                Save
              </Button>
            </div>
            <div>
              <Textarea
                sizing="md"
                type="text"
                placeholder="Photo description"
                rows={2}
                name="description"
                value={formValues.description}
                onChange={onInputChange}
                style={{resize: 'none'}}
              />
            </div>
            
          </form>
        <hr />
        <img
            alt="photo"
            className="modal_img block object-cover object-center rounded-lg mt-3"
            src={activePhoto.url}
        ></img>
        </>

      ) : (

        <>
          <h1 className='text-2xl mt-1 mb-2'>Upload a photo</h1>
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
                placeholder="Photo name"
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
                placeholder="Photo description"
                rows={5}
                name="description"
                value={formValues.description}
                onChange={onInputChange}
              />
            </div>
            <div id="fileUpload">
              <div className="mb-2 block">
                <Label
                  htmlFor="file"
                  value="Select photo"
                />
              </div>
              <FileInput
                id="file"
                accept="image/png, image/jpeg"
                required={true}
                onChange={onFileInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button type="submit" disabled={isSaving}>
                Save Photo
              </Button>
              { isSaving && (<Spinner aria-label="Default status example" size="xl" />)}
              
            </div>
            
          </form>
        </>

      )
      }
        
    </Modal>
  );
}
