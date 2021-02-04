import React from "react";
import "./css/style.css";
import { SearchBook } from "./component/SearchBook";
import { GetLineProfile } from "./component/GetLineProfile";
import { ShareLineButton } from "./component/ShareLineButton";

function App() {
  return (
    <div className="App">
      <GetLineProfile />
      <hr />
      <ShareLineButton />
      <hr />
      <SearchBook />
    </div>
  );
}

export default App;
