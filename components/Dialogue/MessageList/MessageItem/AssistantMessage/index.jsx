import React from "react";
import markdownToReact from "../../../../../utils/markdownToReact";

function AssistantMessage({ message }) {
  const renderedMarkdown = markdownToReact(message);

  return (
    <div className="w-full min-h-[20px] flex flex-col items-start gap-4 text-gray-800">
      <div className="prose w-full max-w-none break-words dark:prose-invert light text-gray-800 px-[1.6rem] md:px-0">
        {renderedMarkdown}
      </div>
    </div>
  );
}

export default AssistantMessage;

