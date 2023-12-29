import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BiTime } from 'react-icons/bi';

function FlexNewsItems({ news_ }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-[16px] font-medium">{news_.category}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaRegCalendarAlt className="text-subMain w-3 h-3" />
        <span className="text-[16px] font-medium">{news_.year}</span>
      </div>
      <div className="flex items-center gap-2">
        <BiTime className="text-subMain w-3 h-3" />
        <span className="text-[16px] font-medium">{news_.time} годин</span>
      </div>
    </>
  );
}

export default FlexNewsItems;
