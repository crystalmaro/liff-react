import React from "react";
import liff from "@line/liff";
import "../css/style.css";

export function ShareLineButton() {
  const shareMsg = async () => {
    if (liff.isApiAvailable("shareTargetPicker")) {
      const result = await liff.shareTargetPicker([
        {
          type: "text",
          text: "arrow async await with hooks"
        }
      ]);
      result
        ? alert("Message shared via shareTargetPicker")
        : alert("ShareTargetPicker was cancelled by the user");
    }
    liff.closeWindow();
  };

  return (
    <>
      <button onClick={shareMsg}>Share Message</button>
    </>
  );
}
