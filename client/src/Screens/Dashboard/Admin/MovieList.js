import React from 'react';
import Table from '../../../Components/Table';
import { Movies } from '../../../Data/MovieData';
import SideBar from '../SideBar';

function MoviesList() {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Список фільмів</h2>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
            Видалити все
          </button>
        </div>

        <Table data={Movies} admin={true} />
      </div>
    </SideBar>
  );
}

export default MoviesList;
