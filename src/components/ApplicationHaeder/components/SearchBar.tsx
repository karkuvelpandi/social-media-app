import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
type SearchBarProps = {
  context?: "mobile";
};
export const SearchBar: React.FC<SearchBarProps> = () => {
  const [show, setShow] = useState<boolean>(false);
  const darkMode = useSelector((state: RootState) => state.visibility.darkMode);
  return (
    <>
      <span className="p-input-icon-right text-myTextColor xxs:hidden sm:block sm:w-auto xxs:top-0 xxs:left-0 sm:relative">
        <i
          className={`pi pi-search font-bold ${
            darkMode ? "text-white" : "text-black"
          } `}
        />
        <InputText
          placeholder="Search anything..."
          type="text"
          className="h-10 rounded-full border-[1px] border-gray-300 xxs:w-full sm:w-auto bg-transparent text-myTextColor"
        />
      </span>
      <i
        className={`pi px-2 h-4 hover:cursor-pointer text-myTextColor sm:hidden ${
          show ? "pi-times" : "pi-search"
        }`}
        onClick={() => setShow(!show)}
      />
      {show && (
        <span className="p-input-icon-right pageInEffectDown xxs:w-full sm:hidden sm:w-auto xxs:fixed z-50 xxs:top-20 xxs:left-0 ">
          <i
            className={`pi pi-search font-bold ${
              darkMode ? "text-white" : "text-black"
            } `}
          />
          <InputText
            placeholder="Search anything..."
            type="text"
            className="h-10 rounded-full border-[1px] border-gray-300 xxs:w-full sm:w-auto"
          />
        </span>
      )}
    </>
  );
};
