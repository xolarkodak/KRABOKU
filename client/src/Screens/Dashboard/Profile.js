import React from "react";
import Uploder from "../../Components/Uploder";
import { Input } from "../../Components/UsedInputs";
import SideBar from "./SideBar";

function Profile() {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Профіль</h2>
        <Uploder />
        <Input
          label="Повне ім'я"
          placeholder="Біл Херінктон"
          type="text"
          bg={true}
        />
        <Input
          label="Email"
          placeholder="kraboku@gmail.com"
          type="email"
          bg={true}
        />
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
            Видалити акаунт
          </button>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
            Оновити профіль
          </button>
        </div>
      </div>
    </SideBar>
  );
}

export default Profile;
