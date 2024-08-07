import React, { Component } from "react";

class Chatbot extends Component {
  constructor(props) {
    super(props);

    // Retrieve chat messages from localStorage
    const chatMessages = localStorage.getItem("chatMessages");
    this.state = {
      chatMessages: chatMessages ? JSON.parse(chatMessages) : [],
    };
  }

  componentDidMount() {
    // Clear chat messages from localStorage
    localStorage.removeItem("chatMessages");

    (function (d, m) {
      var kommunicateSettings = {
        appId: "2ce3812014abae0e0d8608791bb0f86e8",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
        onInit: function () {
          // Add event listener to receive chat messages
          window.KommunicateGlobal.document.dispatchEvent(
            new CustomEvent("onKmChatLoaded", {})
          );
        },
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});

    // Add event listener to receive chat messages
    window.addEventListener("onKmChatLoaded", this.handleChatMessages);
  }

  componentWillUnmount() {
    // Remove event listener
    window.removeEventListener("onKmChatLoaded", this.handleChatMessages);
  }

  handleChatMessages = () => {
    // Retrieve chat messages from Kommunicate
    const chatMessages = window.KommunicateGlobal.document.querySelectorAll(
      ".km-msg-text"
    );

    // Store chat messages in state and localStorage
    const messages = [];
    chatMessages.forEach((message) => {
      messages.push(message.textContent);
    });
    this.setState({ chatMessages: messages });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  };

  render() {
    return (
      <div className="chatbot-container">
        {/* Add the HTML markup for your chatbot widget here */}
        <div></div>

        {/* Render the chat messages */}
        <ul>
          {this.state.chatMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Chatbot;
