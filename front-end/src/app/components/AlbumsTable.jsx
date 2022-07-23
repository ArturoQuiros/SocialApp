import { Table, Button } from "flowbite-react/lib/cjs/index.js";
import { Link } from "react-router-dom";
import { useAlbumStore } from "../../hooks/useAlbumStore";
import { useUiStore } from "../../hooks/useUiStore";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export const AlbumTable = (props) => {

    const {setActiveAlbum, startDeletingAlbum} = useAlbumStore();
    const {openModal} = useUiStore();

    const onViewAlbum = (album) => {
        setActiveAlbum(album);
    }

    const onNewAlbum = () => {
      setActiveAlbum({
        name: '',
        description: '',
        date: new Date(),
    })
      openModal();
    }

    const onEditAlbum = (album) => {
        setActiveAlbum(album);
        openModal();
    }

    const onDeleteAlbum = (album) => {
        setActiveAlbum(album);
        startDeletingAlbum(album);
    }

    const onConfirmDeleteAlbum = (album) => {
      
      confirmAlert({
        title: 'Are you sure you want to delete this album?',
        message: '',
        buttons: [
          {
            label: 'Yes',
            onClick: () => onDeleteAlbum(album)
          },
          {
            label: 'No',
          }
        ]
      });

    }

  return (
    <>
      <Table hoverable={true}>
        <Table.Head> 
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>
          <div className="flex flex-wrap gap-2">
            <Button gradientMonochrome="purple" onClick={() => onNewAlbum()}>
              New Album
            </Button>
          </div>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {props.albums.map((album) => (
            <Table.Row key={album.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {album.name}
              </Table.Cell>
              <Table.Cell> {album.description}</Table.Cell>
              <Table.Cell>
              <div className="flex flex-wrap gap-2">
                <Link to={`/albums/${album.id}?AlbumTitle=${album.name}`} onClick={() => onViewAlbum(album)}
                className="font-medium text-blue-600 hover:underline text-white decoration-transparent hover:decoration-transparent">
                  <Button gradientMonochrome="info">
                    View
                  </Button>
                </Link>
                <Button gradientMonochrome="success" onClick={() => onEditAlbum(album)}>
                  Edit
                </Button>
                <Button gradientMonochrome="failure" onClick={() => onConfirmDeleteAlbum(album)}>
                  Delete
                </Button>
              </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
