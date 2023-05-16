import React from "react";
import Image from "next/image";

function UserIcon() {
  return (
      <Image
        src="https://via.placeholder.com/64x64.png?text=U"
        width={64}
        height={64}
        decoding="async"
        quality={75}
        alt="User Icon"
        className="block w-full max-w-full rounded-sm object-cover object-center"
      />
  );
}

export default UserIcon;
