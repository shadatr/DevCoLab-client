import React, { useEffect } from "react";

const words = ["Explore", "Create", "Collaborate"];

const Home = () => {
  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 150; // Adjust the typing speed (in milliseconds)

    const typeWord = (element, word) => {
      let wordIndex = 0;
      const wordInterval = setInterval(() => {
        if (wordIndex === word.length) {
          clearInterval(wordInterval);
          setTimeout(eraseWord, 1000); // Delay before erasing
        } else {
          element.textContent += word[wordIndex];
          wordIndex++;
        }
      }, typingSpeed);
    };

    const eraseWord = () => {
      const element = document.querySelector(".word-typing");
      const eraseInterval = setInterval(() => {
        if (element.textContent.length === 0) {
          clearInterval(eraseInterval);
          currentIndex = (currentIndex + 1) % words.length; // Move to the next word
          setTimeout(() => typeWord(element, words[currentIndex]), 1000); // Delay before typing the next word
        } else {
          element.textContent = element.textContent.slice(0, -1);
        }
      }, typingSpeed);
    };

    const element = document.querySelector(".word-typing");
    typeWord(element, words[currentIndex]);

    return () => {
      clearInterval(currentIndex);
    };
  }, []);

  return (
    <div className="flex h-[88vh] w-[100%] justify-center items-center gap-20">
      <div className="flex flex-col text-xxlg">
        <span className="flex items-center gap-5  w-[430px] h-10">
          <span className="word-typing text-lightRed"/>
          <span className="border-t-[5px] border-5 border-secondary w-[100px]" />
        </span>
        <span>Join and Elevate Your Craft.</span>
      </div>
      <div className="w-[348px] text-md">
        Explore other developers projects and post your projects to get feedback
        from other developers!
      </div>
    </div>
  );
};

export default Home;
