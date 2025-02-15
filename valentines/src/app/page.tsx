"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Cat1 from "@/app/img/shycat.jpg";
import Cat2 from "@/app/img/cryingcat.jpg";
import Cat3 from "@/app/img/flowercat.png";
import Cat4 from "@/app/img/ringcatto.png";
import { Button } from "@/components/ui/button";
import React from "react";
import Confetti from "react-confetti";

// Music file (Ensure this file is in the public/music/ folder)
const loveSong = "/blue.mp3";

export default function Home() {
  const [currentImage, setCurrentImage] = useState(Cat1);
  const [message, setMessage] = useState("I have something to say....");
  const [ignoreCount, setIgnoreCount] = useState(0);
  const [buttonWord, setButtonWord] = useState("ignore");
  const [buttonWord1, setButtonWord1] = useState("listen to catcat");
  const [listenCount, setListenCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Define type for TypeScript

  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(loveSong);
      audioRef.current.loop = true; // Loop music
    }
  }, []);

  const handleIgnoreClick = () => {
    if (ignoreCount === 0) {
      setCurrentImage(Cat2);
      setMessage("wiwwy??? 🥺");
      setIgnoreCount(1);
    } else {
      alert("you have broken my heart. goodbye 💔");
    }
  };

  const handleListen = () => {
    if (listenCount === 0) {
      setCurrentImage(Cat3);
      setMessage("Will you be my Vawentine?");
      setButtonWord("NO!");
      setButtonWord1("YES ❤️");
      setListenCount(1);
      audioRef.current?.play(); // ✅ Use optional chaining to avoid null errors
    } else {
      setShowConfetti(true);
      setCurrentImage(Cat4);
      setMessage("I LOVE YOU BABY");
    }
  };

  return (
    <div className="min-h-screen bg-blue-300 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && <Confetti />}
      <div className="flex items-center justify-center gap-x-10">
        <Button variant="outline" onClick={handleIgnoreClick}>
          {buttonWord}
        </Button>

        <Image src={currentImage} alt="Cat" className="w-64 h-120" />

        <Button variant="outline" onClick={handleListen}>{buttonWord1}</Button>
      </div>

      <div className="text-2xl text-black font-bold mt-4 text-center">{message}</div>
    </div>
  );
}
