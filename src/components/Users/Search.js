import { useState } from "react";

export default function Search({
  searchUsers,
  clearUsers,
  showClear,
  setAlert,
}) {
  const [text, setText] = useState("");

  // const handleChage = (e) => {
  //   setText(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      setAlert("Please Enter Something", "light");
    } else {
      searchUsers(e.target.value);

      setText("");
    }
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text "
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClear && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
}
