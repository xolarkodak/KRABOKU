import React from 'react';
import { FaCloudDownloadAlt, FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GoEye } from 'react-icons/go';

const Head = 'text-xs text-left text-main font-semibold px-6 py-2 uppercase';
const Text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3';

// rows
const Rows = (movie, i, onDeleteHandler, admin, downloadVideo, progress) => {
  return (
    <tr key={i}>
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={movie?.image ? movie?.image : '/images/user.jpg'}
            alt={movie?.name}
          />
        </div>
      </td>
      <td className={`${Text} truncate`}>{movie.name}</td>
      <td className={`${Text}`}>{movie.category}</td>
      <td className={`${Text}`}>{movie.language}</td>
      <td className={`${Text}`}>{movie.year}</td>
      <td className={`${Text}`}>{movie.time}години</td>
      <td className={`${Text} float-right flex-rows gap-2`}>
        {admin ? (
          <>
            <Link
              to={`/edit/${movie?._id}`}
              className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
              Редагувати <FaEdit className="text-green-500" />
            </Link>
            <button
              onClick={() => onDeleteHandler(movie?._id)}
              className="bg-subMain text-white rounded flex-colo w-6 h-6">
              <MdDelete />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => downloadVideo(movie?.video, movie?.name)}
              disabled={progress > 0 && progress < 100}
              className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
              Завантажити
              <FaCloudDownloadAlt className="text-green-500" />
            </button>
            <Link
              to={`/movie/${movie?._id}`}
              className="bg-subMain text-white rounded flex-colo w-6 h-6">
              <GoEye />
            </Link>
          </>
        )}
      </td>
    </tr>
  );
};

function Table({ data, admin, onDeleteHandler, downloadVideo, progress }) {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            <th scope="col" className={`${Head}`}>
              Зображення
            </th>
            <th scope="col" className={`${Head}`}>
              Назва
            </th>
            <th scope="col" className={`${Head}`}>
              Категорія
            </th>
            <th scope="col" className={`${Head}`}>
              Мова
            </th>
            <th scope="col" className={`${Head}`}>
              Рік
            </th>
            <th scope="col" className={`${Head}`}>
              Години
            </th>
            <th scope="col" className={`${Head} text-end`}>
              Дія
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((movie, i) => Rows(movie, i, onDeleteHandler, admin, downloadVideo, progress))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
