import React from "react";
import Image from "next/image";
import Button from "./common/Button";
import Link from "next/link";
const Landing = () => {
  return (
    <section id="home" className="relative z-30">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse md:flex-row space-x-6 items-center justify-between">
          {/* textContent */}
          <div className=" flex flex-col flex-grow justify-center text-center md:text-left md:w-1/2 p-4 relative lg:ml-28 lg:-mt-10">
            <Image
              src={"/images/Home/pluses.png"}
              alt="pluses"
              width={400}
              height={400}
              className="absolute md:left-10 md:bottom-1 bottom-5 -left-5 -z-10 "
            />
            <Image
              src={"/images/Home/pluses.png"}
              alt="pluses"
              width={400}
              height={400}
              className="absolute md:-top-24 md:right-12  -top-48 right-20 -z-10 transform rotate-90"
            />
            <p className="text-xl md:text-3xl font-medium text-paragraphtext mb-3 text-center md:text-left leading-8 tracking-wide md:px-4">
              We are here to help you, make your life easier and support you in
              your therapeutic journey. Talk to your psychiatrist anytime,
              anywhere!
            </p>
            <div className="mx-auto w-fit mt-5 ">
              <Link href={'/chatbot'}>
                <Button variant="secondary" size={"large"} roundedValue="full">
                  <Image
                    src={"/images/Home/talkToAi.png"}
                    width={20}
                    height={20}
                    alt="talkToAi"
                  />
                  Talk to AI
                </Button>
              </Link>
            </div>
          </div>
          {/* textContent */}

          {/* imageContent */}
          <div className=" md:w-1/2 mx-auto p-4 flex justify-center">
            <Image
              src={"/images/Home/landing.png"}
              width={600}
              height={600}
              alt="landing page"
              className="max-w-full"
            />
          </div>
          {/* imageContent */}
        </div>
      </div>
    </section>
  );
};

export default Landing;
