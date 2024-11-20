import { offers } from "@app/constants/offers";
import Button from "@components/common/Button";
import Footer from "@components/common/Footer";
import Heading from "@components/common/Heading";
import Navbar from "@components/common/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignupDoctor = () => {
  return (
    <>
      <div className="relative pb-16 ">
        <div className="container mx-auto ">
          {/* the background */}

          <Image
            src={"/images/signup-doctor/signup-doctor.png"}
            alt="signup-doctor"
            layout="fill"
            className=" hidden md:block absolute -z-10   "
          />
          {/* the background */}
          {/* Header  */}
          <Navbar />
          {/* Header  */}
          {/* content  */}
          <div className="pt-10 md:pt-80 text-center md:text-left pl-2 md:pl-0 lg:w-[38%]">
            <Image
              src={"/images/signup-doctor/signup-doctor.png"}
              alt="signup-doctor"
              width={500}
              height={500}
              className="md:hidden mx-auto mb-4 "
            />
            <h4 className="text-maintext text-3xl tracking-wide font-bold mb-5 ">
              Join Vitapsyche now and make your own contribution
            </h4>

            <p className="font-medium text-lg text-[#10143B] mb-20 tracking-wide">
              Enjoy practicing psychotherapy online; now you can communicate
              with thousands of customers from all over the world privately.
              Join us with other psychiatrists and psychologists worldwide.
            </p>
          </div>
          <Link
            href={"/signup-doctor/doctor-form1"}
            className="flex justify-center text-xl "
          >
            <Button variant="secondary" size="extraLarge" roundedValue="full">
              join now as a therapist
            </Button>
          </Link>
          {/* content  */}
        </div>
      </div>

      <section className="bg-[#daf4f1]">
        <div className="container mx-auto">
          <Heading variant="secondary">What Vitapsyche offers you</Heading>
          <div className="grid gap-y-8  md:gap-x-10 lg:gap-x-20 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {offers.map((offer, index) => (
              <div
                key={index}
                className="w-[350px] h-[250px] flex flex-col items-center  border-2 p-4 rounded-2xl shadow-sm transition bg-backgroundcolor"
              >
                <div className="flex justify-center items-center space-x-1 mb-2">
                  <Image
                    src={offer.img}
                    width={100}
                    height={100}
                    alt="online-sessions"
                  />
                  <h4 className="text-maintext text-xl tracking-wide font-bold">
                    {offer.title}
                  </h4>
                </div>
                <p className="text-xl tracking-wide text-center ">
                  {offer.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#daf4f1]">
        <div className="container mx-auto">
          <div className="">
            <Heading variant="secondary">
              Hurry up and reserve your place with us
            </Heading>
          </div>
          {/* content */}
          <div>
            {/* the line  */}
            <div className="w-4 h-[500px] md:w-[80%] md:h-4  mx-auto  bg-[#10143b] relative md:mt-44 md:mb-28">
              {/* the line  */}

              {/* steps */}

              <div className="absolute -left-[157px] md:-left-[97px] bottom-[90%] md:bottom-[-50px] flex w-[350px] md:w-auto md:flex-col space-x-4 md:space-x-0 md:space-y-4 items-center justify-center">
                <Image
                  src={"/images/signup-doctor/join-step.png"}
                  width={80}
                  height={80}
                  alt="join-step"
                />
                <div className="w-10 h-10 rounded-full bg-[#daf4f1]  border-2 border-gray-800 flex justify-center items-center text-2xl">
                  1
                </div>
                <p className="font-medium w-[100px] md:w-auto">
                  Click on join Vitapsyche now.
                </p>
              </div>

              <div className="absolute -left-[157px] md:left-[25%] bottom-[60%]  md:bottom-[-50px] flex w-[350px] md:w-auto md:flex-col space-x-4 md:space-x-0 md:space-y-4 items-center justify-center">
                <Image
                  src={"/images/signup-doctor/cv.png"}
                  width={80}
                  height={80}
                  alt="cv"
                />
                <div className="w-10 h-10 rounded-full bg-[#daf4f1]  border-2 border-gray-800 flex justify-center items-center text-2xl">
                  2
                </div>
                <p className="font-medium w-[100px] md:w-auto">
                  upload your own C.V.
                </p>
              </div>

              <div className="absolute -left-[157px] md:left-[60%] bottom-[25%] md:-bottom-[50px] flex w-[350px] md:w-auto md:flex-col space-x-4 md:space-x-0 md:space-y-4 items-center justify-center">
                <Image
                  src={"/images/signup-doctor/profile.png"}
                  width={80}
                  height={80}
                  alt="profile"
                />
                <div className="w-10 h-10 rounded-full bg-[#daf4f1]  border-2 border-gray-800 flex justify-center items-center text-2xl">
                  3
                </div>
                <p className="font-medium w-[100px] md:w-auto">
                  Complete your profile
                </p>
              </div>

              <div className="absolute -left-[157px]  md:left-[100%] md:-translate-x-1/2 bottom-0 translate-y-1/2 md:translate-y-0 md:-bottom-[99px] flex w-[350px] md:w-auto md:flex-col space-x-4 md:space-x-0 md:space-y-4 items-center justify-center">
                <Image
                  src={"/images/signup-doctor/calendar.png"}
                  width={80}
                  height={80}
                  alt="join-step"
                />
                <div className="w-10 h-10 rounded-full bg-[#daf4f1]  border-2 border-gray-800 flex justify-center items-center text-2xl">
                  4
                </div>
                <p className="text-center font-medium w-[100px] md:w-[200px] ">
                  Add time slots to run sessions. Join now as a therapist
                </p>
              </div>
              {/* steps */}
            </div>
          </div>
          {/* content */}

          <Link
            className="flex justify-center text-xl mt-32 "
            href={"/signup-doctor/doctor-form1"}
          >
            <Button variant="secondary" size="extraLarge" roundedValue="full">
              join now as a therapist
            </Button>
          </Link>
        </div>
      </section>

      {/* footer */}
      <Footer />
      {/* footer */}
    </>
  );
};

export default SignupDoctor;
