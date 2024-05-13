import React from "react";
import { useState, useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase/firebase";
import "../css/Notes.css";
import StylesBar from "./StylesBar";

const Notes = ({ user, object, index, setter, title, content }) => {
  const [contentText, setContentText] = useState(`${content}`);
  const [titleText, setTitleText] = useState(`${title}`);
  const [currDate, setCurrDate] = useState(null);
  const ref = useRef("");

  useEffect(() => {
    const date = new Date().toDateString().split(" ");
    setCurrDate(`${date[1]} ${date[2]} ${date[3]}`);
  }, []);

  const handleClick = async () => {
    const updatedObject = object.map((num) => {
      return num.index === index
        ? {
            index: num.index,
            Title: titleText,
            content: contentText,
            creationTime: currDate,
            isLocked: num.isLocked,
            password: num.password,
          }
        : num;
    });
    setter(updatedObject);
    if (user)
      await setDoc(doc(db, "messages", user.uid), { Hello: updatedObject });
  };

  const sanitizeConf = {
    allowedTags: ["b", "i", "a", "p", "div", "br", "strong"],
    allowedAttributes: { a: ["href"] },
  };

  const handleChange = (e) => {
    setContentText(sanitizeHtml(`${e.currentTarget.innerHTML}`, sanitizeConf));
  };

  const tabHandling = (e) => {
    if (e.code === "Tab") {
      e.preventDefault();
      const selection = window.getSelection();
      const tabText = document.createTextNode("\t");
      const range = selection.getRangeAt(0);
      range.insertNode(tabText);
      range.setStartAfter(tabText);
      range.setEndAfter(tabText);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const textBold = ()=>{
    document.execCommand('bold', false, null);
  }

  return (
    <div className="top">
      <div>
        <p className="date">{currDate}</p>
        <div className="top-portion">
          <input
            className="heading"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            placeholder="Think New i guess..."
          />
          <button className="saveBtn" onClick={handleClick}>
            Save
          </button>
        </div>
        <br />
        <ContentEditable
          innerRef={ref}
          className="notes-area"
          html={contentText}
          onChange={handleChange}
          placeholder="Get Better......"
          tagName="div"
          onKeyDown={tabHandling}
        />
      </div>
    </div>
  );
};

export default Notes;
