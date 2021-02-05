import React from "react";
import "./css/style.css";
import { SearchBook } from "./component/SearchBook";
import { GetLineProfile } from "./component/GetLineProfile";
import { ShareLineButton } from "./component/ShareLineButton";
import { DrawHooks } from "./component/DrawHooks";
import { Scratchcard } from "./component/Scratchcard";
import { Scratchcard2 } from "./component/Scratchcard2";

function App() {
  return (
    <div className="App">
      <Scratchcard2 />
      <hr />
      <Scratchcard />
      <hr />
      <GetLineProfile />
      <hr />
      <ShareLineButton />
      <hr />
      <DrawHooks />
      <hr />
      <SearchBook />
    </div>
  );
}

export default App;
