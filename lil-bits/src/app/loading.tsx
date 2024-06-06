"use client";
import Image from "next/image";
const Loading = () => {
  return (
    <main>
      <div className="loader">
        <Image
          src={"/lilBits.png"}
          width={150}
          height={144}
          alt="Lil' Bits logo"
          priority
        />
        <p className="loading_text">Loading...</p>
      </div>
    </main>
  );
};

export default Loading;
