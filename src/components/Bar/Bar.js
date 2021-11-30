import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Sidebar from "./Sidebar/Sidebar";

const Bar = () => {
  const [options, setOptions] = useState(false);

  return (
    <div>
      <Dropdown onClick={() => setOptions(true)}></Dropdown>
      <Sidebar options={options} setOptions={setOptions}></Sidebar>
    </div>
  );
};

export default Bar;
