import { Table } from "flowbite-react/lib/cjs/index.js";
import { Link } from "react-router-dom";
import { useAlbumStore } from "../../hooks/useAlbumStore";

export const AlbumTable = (props) => {

    const {setActiveAlbum} = useAlbumStore();

    const onClickAlbum = (album) => {
        setActiveAlbum(album);
    }

  return (
    <>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>#</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Actions</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {props.albums.map((album) => (
            <Table.Row key={album.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {album.id}
              </Table.Cell>
              <Table.Cell> {album.title}</Table.Cell>
              <Table.Cell>
                <Link to={`/albums/${album.id}?AlbumTitle=${album.title}`} onClick={() => onClickAlbum(album)}
                className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  View
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
