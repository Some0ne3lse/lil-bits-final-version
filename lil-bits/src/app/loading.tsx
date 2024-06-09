"use client";
import Image from "next/image";

// This is the loading screen.
// Couldn't make it work without adding a bunch of setStates every time I use it
// I know it is in the right location, I know about suspense,
// but I had issues implementing it
// Talked to teacher about it, and was told to do it the way I ended up doing it.

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
