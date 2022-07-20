import React, { useState } from "react";
import Axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import { useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  // const url = process.env.REACT_APP_URL;
  function addNote(props) {
    Axios.post(
      `https://keeper-app-89be6-default-rtdb.europe-west1.firebasedatabase.app/notes.json`,
      {
        title: props.title,
        content: props.content,
      }
    ).then((response) => {
      console.log("Added new note to db: ", response.body);
      // setNotes([
      //   ...notes,
      //   {
      //     title: props.title,
      //     content: props.content,
      //   },
      // ]);
      console.log("notes: ", notes);
    });
  }

  // mongodb+srv://Matheus:notesmatehus@notes.aj2f3.mongodb.net/?retryWrites=true&w=majority

  function deleteNote(_id) {
    Axios.delete(
      `https://keeper-app-89be6-default-rtdb.europe-west1.firebasedatabase.app/notes.json/${_id}`
    ).then(() => {
      setNotes(
        notes.filter((value) => {
          return value._id != _id;
        })
      );
    });
  }

  function getNotes() {
    Axios.get(
      "https://keeper-app-89be6-default-rtdb.europe-west1.firebasedatabase.app/notes.json"
    ).then((response) => {
      setNotes(response.data);
    });
  }

  useEffect(() => {
    getNotes();
  }, [notes]);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            _id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
