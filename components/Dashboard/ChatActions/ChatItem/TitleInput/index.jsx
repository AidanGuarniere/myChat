import React from 'react'

export default function TitleInput({ inputRef, titleInputValue, setTitleInputValue }) {
    return (
      <input
        ref={inputRef}
        type="text"
        className="content h-5 w-full bg-transparent text-white border border-blue-600 outline-none  border-[1.5px] mb-1 align-middle pb-1"
        value={titleInputValue}
        onChange={(e) => setTitleInputValue(e.target.value)}
      ></input>
    );
  }