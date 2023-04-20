import React from "react";
import markdownToReact from "../../../utils/markdownToReact";

const ChatMessage = ({ markdownContent }) => {
  const renderedMarkdown = markdownToReact(markdownContent);

  return (
    <div className="prose w-full max-w-none break-words dark:prose-invert light text-gray-800">
      {renderedMarkdown}
    </div>
  );
};

export default ChatMessage;
