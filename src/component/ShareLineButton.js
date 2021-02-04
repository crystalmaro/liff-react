import React, { useState } from "react";
import liff from "@line/liff";
import "../css/style.css";

export function ShareLineButton() {
  const shareMsg = () => {

    




    if (liff.isApiAvailable("shareTargetPicker")) {
      liff
        .shareTargetPicker([
          {
            type: "text",
            text: "test line"
          }
        ])
        .then(alert("launch shareTargetPicker"))
        .catch(res => {
          alert("shareTargetPicker fail");
        });
    }
  };

  return (
    <>
      <button onClick={shareMsg}>Share Message</button>
    </>
  );
}
