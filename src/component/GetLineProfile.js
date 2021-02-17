import React, { useState, useEffect } from "react";
import liff from "@line/liff";
import "../css/style.css";

const liffId = "1655635109-E3bAe5pq";

export function GetLineProfile() {
  const [count, setCount] = useState(0);
  const [profile, setProfile] = useState(0);
  const [device, setDevice] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    initLine();
    detectDevice();
  }, []);

  const initLine = () => {
    console.log("init line");
    liff
      .init({ liffId: liffId })
      .then(() => {
        if (liff.isInClient()) {
          getProfile();
          getFriendship();
        } else {
          alert("not LINE client");
        }
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

  const getFriendship = () => {
    liff.getFriendship().then(data => {
      if (data.friendFlag) {
        alert(JSON.stringify(data));
      } else {
        alert(JSON.stringify(data));
        // Redirect users to the LINE Login authorization URL with the bot_prompt query parameter below
        // https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id={1655635109}&redirect_uri={CALLBACK_URL}&state={STATE}&bot_prompt=normal&scope=profile%20openid%20email
        // state: unique alphanumeric string to prevent cross-site request forgery (opens new window). should generate a random value for each login session Math.random().toString(36).slice(2)
      }
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
          Device: {device === 0 ? "" : device}
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
