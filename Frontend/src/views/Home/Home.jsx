import React, { useEffect, useState } from "react";
import { Avatar, Button, TextInput } from "@mantine/core";
import { useUserdata } from "../../stores/PersonContxt";
export function Home(props) {
  const { user: currentUser } = useUserdata();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState();

  const userID = props.userID;
  console.log("home: ", userID, currentUser._id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Sending message:", message);
    const response = await fetch("http://localhost:5000/api/message/addmsg", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message,
        from: currentUser._id,
        to: userID,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      return;
    }
    const data = await response.json();
    console.log(data);
    setMessage("");
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/message/getmsg",
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              from: currentUser._id,
              to: userID,
            }),
          }
        );
        if (!response.ok) {
          const data = await response.json();
          console.log(data);
          return;
        }
        const data = await response.json();
        console.log(data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (userID) {
      fetchMessages();
    }
  }, [userID, currentUser._id]);

  console.log("messages: ", messages);
  const renderMessages = () => {
    if (!messages) {
      return null;
    }
    return messages.map((msg, index) => {
      const isFromSelf = msg.fromSelf;
      const style = {
        display: "flex",
        alignSelf: isFromSelf ? "flex-end" : "flex-start",
        marginBottom: 8,
        maxWidth: "60%",
        backgroundColor: isFromSelf ? "#d5f5dc" : "#f5d5d5",
        padding: 8,
        borderRadius: 4,
        justifyContent: isFromSelf ? "flex-start" : "flex-end", // add this line
      };

      const messageStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
      };
      const avatarStyle = {
        marginLeft: isFromSelf ? 8 : 0,
        marginRight: isFromSelf ? 0 : 8,
      };
      return (
        <div key={msg.id} style={style}>
          {isFromSelf ? <Avatar radius="xl" style={avatarStyle} /> : null}
          <span style={messageStyle}>{msg.message}</span>
          {isFromSelf ? null : <Avatar radius="xl" style={avatarStyle} />}
        </div>
      );
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {userID && (
        <div style={{ flex: 1, overflowY: "scroll" }}>{renderMessages()}</div>
      )}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center" }}
      >
        <TextInput
          placeholder="Type a message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          style={{ marginRight: 8, flex: 1 }}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
