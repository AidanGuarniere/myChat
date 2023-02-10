import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";

function ChatGPTSEO() {
  const [userText, setUserText] = useState("");
  const [gptResponse, setGptResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const handleChange = (event) => {
    setUserText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userText.length > 2) {
      setLoading(true);
      setError({});
      try {
        // Make a request to the Next.js API endpoint
        const response = await axios.post("/api/chat", {
          prompt: userText,
        });

        // Extract the generated text from the response
        const completion = response.data.completion;
        setGptResponse(completion);
        setLoading(false);

        return completion;
      } catch (error) {
        setError(error);
        setLoading(false);
      }

    } else {
      setError("please enter a valid prompt");
    }
  };

  // basic cache logic
  // useEffect(() => {
  //   // console.log(gptResponse);
  //   if (gptResponse) {
  //     localStorage.setItem("gpt_response", gptResponse);
  //   }
  // }, [gptResponse]);

  // useEffect(() => {
  //   const cachedResponse = localStorage.getItem("gpt_response");
  //   if (cachedResponse) {
  //     setGptResponse(cachedResponse);
  //   }
  // }, []);

  return (
    <div>
      <Head>
        <title>
          {gptResponse ? `ChatGPT response: ${gptResponse}` : "ChatGPT"}
        </title>
      </Head>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userText}
          onChange={handleChange}
          required
          minLength="5"
          maxLength="300"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      <div>
        {error.message && <p>Error: {error.message}</p>}
        {error.code && <p>Error code: {error.code}</p>}
        <div>
          {typeof gptResponse === "string" ? (
            <p>{gptResponse}</p>
          ) : (
            <p>{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatGPTSEO;
