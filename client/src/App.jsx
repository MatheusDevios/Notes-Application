import React, { useState } from "react";
import Axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import { useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(props) {
    Axios.post("http://localhost:3001/create", {
      title: props.title,
      content: props.content,
    }).then((response) => {
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

  function deleteNote(_id) {
    Axios.delete(`http://localhost:3001/delete/${_id}`).then(() => {
      setNotes(
        notes.filter((value) => {
          return value._id != _id;
        })
      );
    });
  }

  function getNotes() {
    Axios.get("http://localhost:3001/notes").then((response) => {
      setNotes(response.data);
    });
  }

  useEffect(() => {
    getNotes();
  }, [notes])

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
