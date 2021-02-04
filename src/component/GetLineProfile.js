import React, { useState, useEffect } from "react";
import liff from "@line/liff";
import axios from "axios";
import "../css/style.css";

export function GetLineProfile() {
  const [count, setCount] = useState(0);
  const [profile, setProfile] = useState(0);
  const [device, setDevice] = useState();
  const [email, setEmail] = useState();

  const initLine = () => {
    liff
      .init({ liffId: "1655635109-E3bAe5pq" })
      .then(() => {
        if (liff.isInClient()) getProfile();
        else alert("not LINE client");
      })
      .catch(err => {
        alert(err);
      });
  };

  const getProfile = () => {
    liff.getProfile().then(response => {
      setProfile(response);
      setEmail(liff.getDecodedIDToken().email);
    });
  };

  const detectDevice = () => {
    setDevice(liff.getOS());
  };

  return (
    <>
      <h3>Line Login</h3>
      <section>
        <p>Click {count} times</p>
        <button onClick={() => setCount(count + 1)}>++</button>
        <p>
          <button onClick={initLine}>init LINE</button>
        </p>
        <p>
          <button onClick={detectDevice}>detect device</button>
          {device === 0 ? "" : device}
        </p>
      </section>
      <section>
        <img
          className="profile-image"
          src={
            profile.pictureUrl
              ? profile.pictureUrl
              : "https://mokmoon.com/images/ic_liff.png"
          }
        />
        <p>User ID: {profile.userId} </p>
        <p>Display Name: {profile.displayName} </p>
        <p>Status Message: {profile.statusMessage} </p>
        <p>email: {email} </p>
      </section>
    </>
  );
}
