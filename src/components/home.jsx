import React, { useEffect } from "react";
import refer from "./images/refer.png";
import responsive from "./images/responsive.png";
import like from "./images/like.png";
import idea from "./images/idea.png";

const words = ["Explore", "Create", "Collaborate"];
const advantages = [
  {
    title: "Unlock Your Creativity",
    description:
      "DevCoLab empowers developers to unlock their full creative potential. Whether you're a seasoned coder or just starting your journey, this platform provides a space for you to breathe life into your projects.",
    image: refer,
  },
  {
    title: "Inspiration Awaits",
    description:
      "Get inspired by a diverse and vibrant community of skilled developers. Explore their projects, share your thoughts, and connect with like-minded innovators who are passionate about technology and coding.",
    image: responsive,
  },
  {
    title: "Feedback Matters",
    description:
      "At DevCoLab, your projects are more than lines of code; they're a canvas for collaboration. Receive valuable feedback from other developers, helping you refine your work, fix bugs, and fine-tune your creations.",
    image: like,
  },
  {
    title: " Share Your Ideas",
    description:
      "Have a groundbreaking idea? Share it with the world and see it evolve with the input of a global community. Collaborate with others to turn your vision into a reality.",
    image: idea,
  },
];

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
    <div>
      <div className="flex lg:flex-row sm:flex-col h-[88vh] w-[100%] justify-center items-center gap-20">
        <div className="flex flex-col lg:text-xlg sm:text-lg p-5">
          <span className="flex items-center gap-5 lg:w-[430px] sm:w-[200px] h-10">
            <span className="word-typing text-lightRed" />
            <span className="border-t-[5px] border-5 border-secondary lg:w-[100px] sm:w-[50px]" />
          </span>
          <span>Join and Elevate Your Craft.</span>
        </div>
        <div className="lg:w-[348px] sm:w-[300px] text-md">
          Explore other developers projects and post your projects to get
          feedback from other developers!
        </div>
      </div>
      <div className="bg-secondary h-screen text-primary w-[100%] flex flex-col items-center justify-center lg:gap-40 sm:gap-20">
        <div className="flex lg:flex-row sm:flex-col items-center gap-20">
          <span className="text-gray lg:text-xlg sm:text-lg">
            What is DevCoLab?
          </span>
          <span className="lg:w-[520px] sm:w-screen lg:p-10 sm:p-5 lg:text-md sm:text-xsm bg-lightRed text-secondary">
            DevCoLab is the ultimate platform for developers to share their
            projects, gain valuable feedback, and ignite their creative
            potential. It's more than just a website; it's a dynamic hub where
            talented developers come together to transform ideas into reality.
          </span>
        </div>
        <div className="text-gray ms:text-xxsm lg:text-sm lg:w-[630px] sm:w-screen text-center">
          Ready to embark on a journey of coding excellence? Dive into DevCoLab
          and discover a world of endless possibilities. Whether you're seeking
          inspiration, feedback, or just a supportive developer network, we've
          got you covered. Join DevCoLab today and be part of something
          extraordinary!
        </div>
      </div>
      <div className="about-img h-screen" id="about">
        <div className="about flex h-screen w-[100%] justify-center items-center">
          <span className="grid grid-cols-2  text-primary lg:w-[900px] sm:w-[350px]">
            {advantages.map((item) => (
              <span className="advantage flex justify-center items-center flex-col lg:w-[300px] sm:w-[150px] text-center p-5 font-bold m-5 gap-3 rounded-[30px]">
                <img
                  src={item.image}
                  width={100}
                  className="lg:w-[100px] sm:w-[50px]"
                  alt="icon"
                ></img>
                <p className="lg:text-md sm:text-xsm">{item.title}</p>
                <p className="lg:text-xsm sm:text-xxsm">{item.description}</p>
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
