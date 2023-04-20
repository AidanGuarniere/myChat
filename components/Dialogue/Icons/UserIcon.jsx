import React from "react";
import Image from "next/image";

function UserIcon() {
  return (
    <div className="relative flex">
      <span
        className="inline-block overflow-hidden relative max-w-full"
        style={{
          boxSizing: "border-box",
          width: "initial",
          height: "initial",
          background: "none",
          opacity: 1,
          border: "0px",
          margin: "0px",
          padding: "0px",
        }}
      >
        <span
          className="block max-w-full"
          style={{
            boxSizing: "border-box",
            width: "initial",
            height: "initial",
            background: "none",
            opacity: 1,
            border: "0px",
            margin: "0px",
            padding: "0px",
            maxWidth: "100%",
          }}
        >
          <Image
            src="https://via.placeholder.com/64x64.png?text=U"
            width={64}
            height={64}
            decoding="async"
            quality={75}
            alt="User Icon"
            className="rounded-sm absolute inset-0 object-cover object-center w-0 h-0 min-w-full max-w-full min-h-full max-h-full"
            style={{
              position: "absolute",
              inset: 0,
              boxSizing: "border-box",
              padding: 0,
              border: "none",
              margin: "auto",
              display: "block",
              width: 0,
              height: 0,
              minWidth: "100%",
              maxWidth: "100%",
              minHeight: "100%",
              maxHeight: "100%",
            }}
          />
        </span>
        <Image
          src="https://via.placeholder.com/64x64.png?text=U"
          width={64}
          height={64}
          decoding="async"
          quality={75}
          alt="User Icon"
          className="block w-full max-w-full"
          style={{
            display: "block",
            maxWidth: "100%",
            width: "initial",
            height: "initial",
            background: "none",
            opacity: 1,
            border: "0px",
            margin: "0px",
            padding: "0px",
          }}
        />
      </span>
    </div>
  );
}

export default UserIcon;
