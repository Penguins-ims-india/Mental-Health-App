import React, { useState, useEffect } from "react";
import axios from 'axios';
import JournalBar from "./JournalBar.jsx";

const userId = 13

const Journal = () => {

  const onSubmit = () => {
    axios.post(`/api/${userId}/journal`, {journal: {title, body}})
      .then(res => console.log(res))
      .catch((err) => console.error('Could not post journal: ', err))
  };

  const [journals, setJournals] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const journalsRef = useRef(journals);

  useEffect(() => {
    axios.get(`/api/${userId}/journal`)
      .then(({ data }) => { setJournals(data); })
      .catch((err) => console.error('Could not get journal entries: ', err));
  }, [journalsRef])

  return (
    <>
      <JournalBar journals={journals}/>
      <h1>JOURNAL</h1>
      <input
        type="text"
        value={title}
        name="title"
        onChange={(e) => {setTitle(e.target.value)}}
        placeholder="Title"
      ></input>
      <textarea
        type="text"
        value={body}
        name="body"
        onChange={(e) => {setBody(e.target.value)}}
        placeholder="What's on your mind?"
      ></textarea>
      <button
        type="submit"
        onClick={onSubmit}
      >Save Journal</button>
    </>
  )
}

export default Journal;
