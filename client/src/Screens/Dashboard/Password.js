import React from "react";
import { Input } from "../../Components/UsedInputs";
import SideBar from "./SideBar";

function Password() {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Змінити пароль</h2>
        <Input
          label="Попередній пароль"
          placeholder="********"
          type="password"
          bg={true}
        />
        <Input
          label="Новий пароль"
          placeholder="********"
          type="password"
          bg={true}
        />
        <Input
          label="Підтвердити пароль"
          placeholder="********"
          type="password"
          bg={true}
        />
        <div className="flex justify-end items-center my-4">
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
           Змінити пароль
          </button>
        </div>
      </div>
    </SideBar>
  );
}

export default Password;
