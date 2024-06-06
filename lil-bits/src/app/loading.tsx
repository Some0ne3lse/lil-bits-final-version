"use client";
import Image from "next/image";
const Loading = () => {
  return (
    <main>
      <div className="loader">
        <Image
          src={"/fetching.webp"}
          width={150}
          height={144}
          alt="Lil' Bits logo"
          className="fetching_image"
          priority
        />
        <p className="loading_text">Loading...</p>
      </div>
    </main>
  );
};

export default Loading;
