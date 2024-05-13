import React from "react";
import { useState } from "react";
import "../css/Input.css";

const Input = ({setValue}) => {

    const [term, setTerm] = useState('');

    const handleInput = (e)=>{
        setTerm(e.target.value);
        setValue(e.target.value);
    }
  return(
    <input
        type="search"
        className="searchBar"
        value={term}
        onChange={handleInput}
        placeholder="Search"
    />
  );
};

export default Input;
