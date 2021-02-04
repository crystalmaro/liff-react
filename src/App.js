import React from "react";
import "./css/style.css";
import { SearchBook } from "./component/SearchBook";
import { GetLineProfile } from "./component/GetLineProfile";
import { ShareLineButton } from "./component/ShareLineButton";
import { ScratchCard } from "./component/ScratchCard";

function App() {
  return (
    <div className="App">
      <ScratchCard />
      <hr />
      <GetLineProfile />
      <hr />
      <ShareLineButton />
      <hr />
      <SearchBook />
    </div>
  );
}

export default App;
