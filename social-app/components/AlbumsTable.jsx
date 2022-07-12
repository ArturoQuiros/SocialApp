import { Table } from "flowbite-react/lib/cjs/index.js";
import Link from "next/link";

const AlbumTable = (props) => {
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
          {props.album.map((album) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {album.id}
              </Table.Cell>
              <Table.Cell> {album.title}</Table.Cell>
              <Table.Cell>
                <Link href={`/albums/${album.id}?AlbumTitle=${album.title}`}>
                  <a className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                    View
                  </a>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default AlbumTable;
