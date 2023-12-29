import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GoEye } from 'react-icons/go';

const Head = 'text-xs text-left text-main font-semibold px-6 py-2 uppercase';
const Text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3';


const Rows = (news, i, onDeleteHandler, admin) => {
  return (
    <tr key={i}>
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={news?.image ? news?.image : '/images/user.jpg'}
            alt={news?.name}
          />
        </div>
      </td>
      <td className={`${Text} truncate`}>{news.name}</td>
      <td className={`${Text}`}>{news.tag}</td>
      <td className={`${Text}`}>{news.language}</td>
      <td className={`${Text}`}>{news.year}</td>
      <td className={`${Text}`}>{news.time} хвилини</td>
      <td className={`${Text} float-right flex-rows gap-2`}>
        {admin ? (
          <>
            <Link
              to={`/editnews/${news?._id}`}
              className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
              Редагувати <FaEdit className="text-green-500" />
            </Link>
            <button
              onClick={() => onDeleteHandler(news?._id)}
              className="bg-subMain text-white rounded flex-colo w-6 h-6">
              <MdDelete />
            </button>
          </>
        ) : (
          <>
          
            <Link
              to={`/news/${news?._id}`}
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
              Тег
            </th>
            <th scope="col" className={`${Head}`}>
              Мова
            </th>
            <th scope="col" className={`${Head}`}>
              Дата публікації
            </th>
            <th scope="col" className={`${Head}`}>
              Хвилини
            </th>
            <th scope="col" className={`${Head} text-end`}>
              Дія
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((news, i) => Rows(news, i, onDeleteHandler, admin, downloadVideo, progress))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
