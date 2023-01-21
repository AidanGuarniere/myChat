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
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        {
          prompt: userText,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_OPENAI_KEY,
          },
        }
      );
      console.log(response)
      setGptResponse(response.data.choices[0].text);
      setLoading(false);
      setError({});
    } catch (e) {
      setError({
        code: e.response.status,
        message: e.response.data.error,
        details: e.response.data,
      });
      setLoading(false);
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
          {typeof gptResponse === "string" ? <p>{gptResponse}</p> : <p>object detected</p>}
        </div>
      </div>
    </div>
  );
}

export default ChatGPTSEO;
