import React, { useEffect, useState } from "react";
import axios from "axios";

const ModelSelect = ({ model, setModel }) => {
  // const [models, setModels] = useState([]);

  // useEffect(() => {
  //   // Fetch the list of available models on component mount
  //   axios
  //     .get("/api/proxy/models")
  //     .then((response) => {
  //       console.log(response);
  //       const modelNames = response.data.models.data.map((model) => model.id);
  //       setModels(modelNames);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  const handleModelSelect = (selection) => {
    if (model !== selection) {
      setModel(selection);
    }
  };

  return (
    <div className="absolute  top-10 flex flex-col justify-center items-center w-full ">
      <label
        className="block text-gray-700 text-center text-xl font-bold mb-2"
        htmlFor="model-select"
      >
        Select Model
      </label>
      <select
        id="model-select"
        value={model}
        onChange={(e) => handleModelSelect(e.target.value)}
        className="shadow appearance-none border rounded w-auto py-2 px-3 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option key={"gpt-3.5-turbo"} value={"gpt-3.5-turbo"}>
          {"gpt-3.5-turbo"}
        </option>
        <option key={"gpt-4"} value={"gpt-4"}>
          {"gpt-4"}
        </option>
      </select>
    </div>
  );
};

export default ModelSelect;
