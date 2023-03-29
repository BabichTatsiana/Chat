import React, { useState } from "react";
import { LANGS } from "../../../constants";
import { ArrowDownIcon } from "../../../icons";

const LangList = () => {
  const [selected, setSelected] = useState("RU");
  const [openListLang, setOpenListLang] = useState(false);

  const toggleDropdown = () => {
    setOpenListLang(!openListLang);
  };
  return (
    <div className="flex-center m-5 icon">
      <div className="dropdown">
        <div className="dropbtn" onClick={toggleDropdown}>
          {selected}
          <div className="icon-margin-left">
            <ArrowDownIcon />
          </div>
        </div>
        <ul
          className={
            openListLang
              ? "dropdown-content dropdown-content-visible"
              : "dropdown-content"
          }
        >
          {LANGS.map((lang) => (
            <li key={lang.key} onClick={() => setSelected(lang.title)}>
              {lang.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LangList;
