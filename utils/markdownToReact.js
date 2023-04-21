import React, { useState, useEffect } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeReact from "rehype-react";
import highlight from "highlight.js";
import "highlight.js/styles/an-old-hope.css";

const CodeBlock = ({ children }) => {
  const codeBlock = children[0].props.children;
  const codeString = codeBlock.join("");
  const language = highlight.highlightAuto(codeString).language;
  const value = highlight.highlight(codeString, { language: language }).value;
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    setCopied(true);
    navigator.clipboard.writeText(codeBlock);
    setInterval(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <pre className="font-sans code-container">
      <div className="bg-black rounded-md mb-4 ">
        <div className="code-header flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md not-prose">
          <span>{language}</span>
          <button
            className="flex ml-auto gap-2 copy"
            onClick={() => {
              handleCopyClick();
            }}
          >
            {copied ? (
              <>
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Copied!
              </>
            ) : (
              <>
                {" "}
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                Copy code
              </>
            )}
          </button>
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
