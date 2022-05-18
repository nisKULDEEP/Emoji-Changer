import React, { useEffect, useState } from "react";
import "./Input.css";

const Input = () => {
  const [input, setInput] = useState("");
  const [allData, setAllData] = useState([]);

  const emojiBox = {
    "::smiley::": "😀",
    "::sad::": "😫",
    "::smiley::": "😊",
  };
  const handleChange = (e) => {
    let { value } = e.target;
    value = value.replaceAll("::smiley::", "😀");
    value = value.replaceAll("::sad::", "😫");
    value = value.replaceAll("::smiley::", "😊");

    // value = value.replace(
    //   /\b(?:"::happy::"|"::sad::"|"::smiley::")\b/gi,
    //   (matched) => emojiBox[matched]
    // );

    setInput(value);
  };

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

  const fetchData = () => {
    fetch("http://127.0.0.1:9999/input/alldata")
      .then((res) => res.json())
      .then((res) => setAllData(res.inputData));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <input type="text" onChange={handleChange} value={input}></input>
        <button onClick={post}>Add Now</button>
      </div>
      <div id="container">
        {allData.map(({ string }) => (
          <div key={string}>{string}</div>
        ))}
      </div>
    </>
  );
};

export default Input;
