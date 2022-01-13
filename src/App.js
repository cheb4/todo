import "./App.css";
import React, { useState } from "react";
// testing
console.clear();

function App() {
  const getTime = () => {
    let today = new Date();
    let time =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "-" +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds() +
      ":" +
      today.getMilliseconds();
    return time;
  };
  const [messageChange, setMessageChange] = useState({
    topic: "",
    messageContent: "",
  });
  const [message, setMessage] = useState([
    {
      messageContent: "stuff",
      topic: "uuuu",
      time: "2022-1-3-23:27:26:13",
    },
  ]);

  function Note(param, key) {
    const handleDelete = (timeKey) => {
      setMessage(message.filter((ele) => ele.time !== timeKey));
    };

    const handleModify = (timeKey) => {
      let noteToModify = message.filter((ele) => ele.time === timeKey);
      console.log(noteToModify);
      setMessageChange({
        topic: noteToModify[0].topic,
        messageContent: noteToModify[0].messageContent,
        time: noteToModify[0].time,
      });
      setMessage(message.filter((ele) => ele.time !== timeKey));
    };
    return (
      <div className="note">
        <h4>topic: {param.data.topic}</h4>
        <h5>message: {param.data.messageContent}</h5>
        <p>time : {param.data.time} </p>
        <input
          type="button"
          value="delete"
          onClick={() => handleDelete(param.data.time)}
        />
        <input
          type="button"
          value="modify"
          onClick={() => handleModify(param.data.time)}
        />
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage([...message, messageChange]);
    setMessageChange({});
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setMessageChange({
      ...messageChange,
      [event.target.name]: value,
      time: getTime(),
    });
  };

  return (
    <div className="webpage">
      <h1>todo list</h1>
      <form onSubmit={handleSubmit}>
        <label name="topic">topic</label>
        <input
          type="text"
          name="topic"
          value={messageChange.topic || ""}
          onChange={handleChange}
        />
        <label name="messageContent">message</label>
        <input
          type="text"
          name="messageContent"
          value={messageChange.messageContent || ""}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>

      {message.map((propMessage) => (
        <Note data={propMessage} key={propMessage.time} />
      ))}
    </div>
  );
}

export default App;
