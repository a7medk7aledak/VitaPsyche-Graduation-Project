import React from "react";
import Heading from "./common/Heading";
import Button from "./common/Button";
import Image from "next/image";

const AboutMindmed = () => {
  return (
    <section id="aboutMindmed" className="relative">
      <div className="container mx-auto px-3 md:px-0 ">
        <Heading variant="secondary" position="left">
          Information about <span className="text-heading">MindMed</span>
        </Heading>
        <div className="flex flex-col-reverse md:flex-row justify-center items-center -mt-16">
          {/* textContent */}
          <div className="flex flex-col md:w-1/2 space-y-5 ">
            <p className="md:text-left text-xl p-3 md:pr-10 ">
              <span className="text-maintext font-medium">
                Psychological assessment:{" "}
              </span>
              Through advanced psychological tests and machine learning models,
              the platform will be able to determine the user’s psychological
              state and provide recommendations based on the results.
            </p>{" "}
            <p className=" md:text-left text-xl  p-3  md:pr-10 ">
              {" "}
              <span className="text-maintext font-medium">
                Communication with doctors:
              </span>{" "}
              The platform allows users to communicate directly with
              psychologists through an integrated chat system and book
              appointments for consultations.
            </p>{" "}
            <p className="md:text-left text-xl p-3  md:pr-10 ">
              <span className="text-maintext font-medium">
                Doctor recommendations:{" "}
              </span>
              Provide personalized recommendations to users based on their
              psychological assessments and preferences.{" "}
            </p>
            <p className="md:text-left text-xl  p-3  md:pr-10 ">
              <span className="text-maintext font-medium">
                Sale of products and medicines:{" "}
              </span>
              Provide a platform for selling products and medicines related to
              mental health and psychotherapy. Dissemination of knowledge:
              Provide articles and educational content that support mental
              health and help users understand themselves better.
            </p>
            <div>
              <Button variant="secondary" size="small" roundedValue="full">
                Show more
              </Button>
            </div>
          </div>
          {/* textContent */}

          {/* image content */}
          <div className="mb-7 md:mb-0 flex-shrink">
            <Image
              src={"/images/Home/aboutMindmed.png"}
              width={600}
              height={600}
              alt="aboutMindmed"
              className="max-w-full  "
            />
          </div>
          {/* image content */}
        </div>
      </div>
    </section>
  );
};

export default AboutMindmed;
