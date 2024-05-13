import React, { useState, useEffect } from "react";
import "../css/LockButton.css";

const LockButton = ({
  object,
  setObject,
  currValue,
  input,
  setInput,
  setActiveEle,
  index,
  deleteNote,
  allowDeletion,
  setAllowDeletion,
  tempIndex,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [passValue, setPassValue] = useState("");
  const [showIcon, setShowIcon] = useState(null);

  useEffect(() => {
    setShowIcon(currValue ? currValue.isLocked : false);
  }, [currValue]);

  useEffect(() => {
    setShowInput(input ? input : allowDeletion);
  }, [input, allowDeletion]);

  const handleSubmission = (e) => {
    e.preventDefault();
    if (allowDeletion) {
      if (passValue === currValue.password) {
        setShowInput(false);
        setAllowDeletion(false);
        deleteNote(index);
      }else{
        setAllowDeletion(false);
        alert('Wrong Password');
      }
      setPassValue('');
      return;
    }
    if (input) {
      if (passValue === currValue.password) {
        setShowInput(false);
        setInput(false);
        setActiveEle(index);
      } else {
        setInput(false);
        alert("Wrong Password");
      }
      setPassValue('');
      return;
    }
    if (currValue.isLocked) {
      if (passValue === currValue.password) {
        const updatedObject = object.map((num) => {
          return num.index === currValue.index
            ? {
                index: num.index,
                Title: num.Title,
                content: num.content,
                creationTime: num.creationTime,
                isLocked: false,
                password: "",
              }
            : num;
        });
        setObject(updatedObject);
        setShowInput(false);
        setPassValue("");
        setShowIcon(false);
      } else {
        alert("Wrong PassWord");
        setShowInput(false);
        setPassValue("");
      }
    } else {
      if (passValue.length === 4) {
        const updatedObject = object.map((num) => {
          return num.index === currValue.index
            ? {
                index: num.index,
                Title: num.Title,
                content: num.content,
                creationTime: num.creationTime,
                isLocked: true,
                password: passValue,
              }
            : num;
        });
        setObject(updatedObject);
        setShowInput(false);
        setPassValue("");
        setShowIcon(true);
      } else alert("Enter password with 4 characters");
    }
  };

  return (
    <>
      <button className="lockBtn" onClick={() => setShowInput(!showInput)}>
        {!showIcon ? (
          <svg
            className="unlocked"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M240-640h360v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85h-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640Zm0 480h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Z" />
          </svg>
        ) : (
          <svg
            className="locked"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
          </svg>
        )}
      </button>
      {showInput ? (
        <form onSubmit={(e) => handleSubmission(e)}>
          <input
            className="password"
            value={passValue}
            onChange={(e) => setPassValue(e.target.value)}
            maxLength={4}
            type="password"
            placeholder="pass"
          />
        </form>
      ) : null}
    </>
  );
};

export default LockButton;
