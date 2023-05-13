import React, { useState, useEffect } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeReact from "rehype-react";
import highlight from "highlight.js";
import "highlight.js/styles/an-old-hope.css";
import CopyButton from "../components/Dialogue/MessageList/MessageItem/AssistantMessage/CopyButton";

const CodeBlock = ({ children }) => {
  const codeBlock = children[0].props.children;
  const codeString = codeBlock.join("");
  const language = highlight.highlightAuto(codeString).language;
  const value = highlight.highlight(codeString, { language: language }).value;

  return (
    <pre className="font-sans code-container">
      <div className="bg-black rounded-md mb-4 ">
        <div className="code-header flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md not-prose">
          <span>{language}</span>
          <CopyButton text={codeBlock} copyMessage={{preCopy:"Copy code", postCopy:"Copied!"}}/>
        </div>
        <div className="bg-black overflow-y-auto ">
          <code
            className={`!whitespace-pre hljs ${language} bg-black `}
            dangerouslySetInnerHTML={{ __html: value }}
            style={{ backgroundColor: "inherit" }}
          />
        </div>
      </div>
    </pre>
  );
};

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeRaw)
  .use(rehypeSanitize)
  .use(rehypeReact, {
    createElement: React.createElement,
    components: { pre: CodeBlock },
  });

export default function markdownToReact(markdown) {
  return processor.processSync(markdown).result;
}
