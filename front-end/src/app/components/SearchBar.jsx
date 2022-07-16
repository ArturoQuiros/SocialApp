import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAlbumStore } from "../../hooks/useAlbumStore";
import { usePhotoStore } from "../../hooks/usePhotoStore";

export const SearchBar = (props) => {
  const [value, setValue] = useState("");

  const {activeAlbum, startSearchingAlbums} = useAlbumStore();
  const {startSearchingPhotos} = usePhotoStore();

  const searchAlbums = async () => {

    const noResults = await startSearchingAlbums(value);

    if (noResults){
      props.setNoResults(true);
    } else{
      props.setNoResults(false);
    }

  };

  const searchPhotos = async () => {

    const noResults = await startSearchingPhotos(activeAlbum.id, value);

    if (noResults){
      props.setNoResults(true);
    } else{
      props.setNoResults(false);
    }

  };

  const search = (e) => {
    e.preventDefault();
    if (props.id == 1) {
      searchAlbums();
    } else if (props.id == 2) {
      searchPhotos();
    }
  };

  return (
    <div className="grid justify-items-center">
      <form className="flex items-center my-4 w-11/12">
        <label htmlFor="simple-search" className="sr-only">
          Search by Name
        </label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by Name"
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
            required
          />
        </div>
        <button
          type="submit"
          onClick={search}
          className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
};
