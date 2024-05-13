import React from "react";
import { useState } from "react";
import Notes from "./Notes";
import "../css/App.css";
import Input from "./Input";
import MiniNote from "./MiniNote";
import { useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import Login from "./Login";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { addNote, deleteNote } from "../Logic/NotesHandling";

const App = () => {
  const [object, setObject] = useState([]);
  const [inputObject, setInputObject] = useState([]);
  const [activeEle, setActiveEle] = useState(-1);
  const [term, setTerm] = useState("");
  const [currUser, setCurrUser] = useState(null);

  useEffect(()=>{
    if (currUser){
      const apply = async () => await setDoc(doc(db, "messages", currUser.uid), { Hello: object });
      apply();
    }
      
  },[object]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrUser(user);
      if (user) {
        const docRef = doc(db, "messages", user.uid);
        const docSnap = async () => {
          const curr = await getDoc(docRef);
          if (curr.exists()) {
            setObject(curr.data().Hello);
          }
        };
        docSnap();
      } else {
        setActiveEle(-1);
        setObject([]);
      }
    });
  }, [currUser]);

  useEffect(() => {
    setTerm("");
  }, [activeEle]);

  useEffect(() => {
    setInputObject(object);
    setInputObject(
      object.filter((note) =>
        note.Title.toLowerCase().startsWith(term.toLowerCase())
      )
    );
  }, [term, object]);

  return (
    <div className="bodyMain">
      <header className="topText" onClick={() => setActiveEle(-1)}>
        <h1>Take Notes</h1>
        <Login user={currUser} />
      </header>
      {activeEle === -1 ? (
        <div className="display">
          <div className="main">
            <div>
              <Input setValue={setTerm} />
              <button
                onClick={() => addNote(setObject, object)}
                className="addBtn"
              >
                <strong>+</strong>
              </button>
            </div>
            <div className="container">
              <div className="note-headings">
                <p>Title</p>
                <p>Created At</p>
              </div>
              {inputObject.map((num, idx) => {
                return (
                  <MiniNote
                    key={idx}
                    num={num}
                    index={num.index}
                    tempIndex={idx}
                    setActiveEle={setActiveEle}
                    deleteNote={(index) => deleteNote(setObject, index)}
                    setObject={setObject}
                    object={object}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Notes
          user={currUser}
          object={object}
          index={activeEle}
          setter={setObject}
          title={object.find((obj) => obj.index === activeEle).Title}
          content={object.find((obj) => obj.index === activeEle).content}
        />
      )}
    </div>
  );
};
export default App;
