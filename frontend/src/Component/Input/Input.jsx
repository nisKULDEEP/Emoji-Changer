import React, { useEffect, useState } from "react";
import "./Input.css";

const Input = () => {
  //State mangement
  //input is for taking the input from the input box
  //allData is the data coming from backend servers
  const [input, setInput] = useState("");
  const [allData, setAllData] = useState([]);

  //emojiBox is a object which consists all the emoji
  const emojiBox = {
    "::smiley::": "😀",
    "::sad::": "😫",
    "::smiley::": "😊",
  };

  //handleChange function taking the input and changing it into emoji
  const handleChange = (e) => {
    let { value } = e.target;

    var re = new RegExp(Object.keys(emojiBox).join("|"), "gi");
    value = value.replace(re, function (matched) {
      return emojiBox[matched];
    });

    setInput(value);
  };

  //post function is sending post request to the backend server
  const post = () => {
    const payload = {
      string: input,
    };
    fetch("http://127.0.0.1:9999/input/upload", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
      },
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((res) => res.status(200))
      .catch((err) => new Error(err.message))
      .finally(fetchData);

    setInput("");
  };

  //fetchData function send get request and recieving the data from backend
  const fetchData = () => {
    fetch("http://127.0.0.1:9999/input/alldata")
      .then((res) => res.json())
      .then((res) => setAllData(res.inputData));
  };

  //i use useEffect, so first time when page loaded, i can fetch all the data from backend
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h3>Change into Emoji😊</h3>
      <div id="input-container">
        <input
          type="text"
          onChange={handleChange}
          value={input}
          id="input_box"
        ></input>
        <button onClick={post}>Add Now</button>
      </div>
      <div id="container">
        <ol>
          {allData.map(({ string }) => (
            <li key={string}>{string}</li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default Input;
