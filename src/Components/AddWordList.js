import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Puzzle from "./Puzzle";

const AddWordList = (props) => {
  const [wordList, setWordList] = useState({
    title: "",
    wordlist: ""
  })

  const handleChange = event => {
    setWordList({ ...wordList, [event.target.name]: event.target.value });
    };
  
  const submitForm = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("/wordlists", wordList)
      .then(response => {
        console.log("post response", response)
        setWordList({
          title: "",
          wordlist: ""
        })
        props.history.push("/addWords")
      })
      .catch(err => console.log("Error in AddWordList", err))
    };

    return (
      <>
      <form className="puzzle-form" onSubmit={submitForm}>
        <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Add a title for your Puzzle"
            value={wordList.title}
            onChange={handleChange}
          />
        <label htmlFor="source">Puzzle Source</label>
          <textarea
            type="text"
            name="wordlist"
            placeholder="Add your words separated by a comma"
            value={wordList.wordlist}
            onChange={handleChange}
            />
        <button type="submit">Create Puzzle</button>
        
      </form>
      <Puzzle />
      </>
    )
}

export default AddWordList;