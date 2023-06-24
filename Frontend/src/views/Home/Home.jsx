import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, TextInput } from "@mantine/core";
import { useUserdata } from "../../stores/PersonContxt";
import { io } from "socket.io-client";

export function Home(props) {
  const { user: currentUser } = useUserdata();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

  const userID = props.userID;

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
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
      socket.current.emit("send-msg", {
        to: userID,
        from: currentUser._id,
        message,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { fromSelf: true, message: message },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  });

  useEffect(() => {
    arrivalMessage &&
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const renderMessages = () => {
    if (!messages) {
      return null;
    }

    return messages.map((msg, index) => {
      const isFromSelf = msg.fromSelf;

      const containerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: isFromSelf ? "flex-end" : "flex-start",
        marginBottom: 8,
      };

      const messageStyle = {
        display: "flex",
        alignItems: "center",
        padding: "8px 12px",
        borderRadius: 8,
        backgroundColor: isFromSelf ? "#d5f5dc" : "#f5d5d5",
        color: isFromSelf ? "#333" : "#555",
        maxWidth: "60%",
      };

      const avatarStyle = {
        width: 32,
        height: 32,
        marginRight: isFromSelf ? 0 : 8,
        marginLeft: isFromSelf ? 8 : 0,
      };

      return (
        <div key={index} style={containerStyle}>
          {!isFromSelf && <Avatar radius="xl" style={avatarStyle} />}
          <div style={messageStyle}>{msg.message}</div>
          {isFromSelf && <Avatar radius="xl" style={avatarStyle} />}
        </div>
      );
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {userID && (
        <div style={{ flex: 1, overflowY: "scroll", paddingBottom: "56px" }}>
          {renderMessages()}
          <div ref={scrollRef}></div>
        </div>
      )}
      {!userID && <div style={{ flex: 1, overflowY: "scroll" }}></div>}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          position: "sticky",
          bottom: 0,
          background: "white",
          padding: "8px",
        }}
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
