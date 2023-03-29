import React, { useState } from "react";
import { TABS } from "../../../constants";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../icons";

const TabContainer = ({ tab, setTab }) => {
  const [shift, setShift] = useState(false);
  const getTabClassName = (key) => {
    let style = "tablinks";
    if (key === 0 && shift) style += " tablinks-opacity-reverse";
    if (tab === key) style += " tablinks-active";
    if (key === TABS.length - 1 && !shift) style += " tablinks-opacity";
    return style;
  };

  const changeTab = (tab) => {
    setTab(tab);
  };
  return (
    <div className="tab-container">
      {shift && (
        <div className="flex-center m-5 icon ">
          <ArrowLeftIcon onClick={(e) => setShift(!shift)} />
        </div>
      )}

      {TABS.map((tab) => {
        return (
          <div
            key={tab.key}
            className={getTabClassName(tab.key)}
            onClick={(e) => changeTab(tab.key)}
          >
            {tab.name}
          </div>
        );
      })}

      {!shift && (
        <div className="flex-center m-5 icon ">
          <ArrowRightIcon onClick={(e) => setShift(!shift)} />
        </div>
      )}
    </div>
  );
};

export default TabContainer;
