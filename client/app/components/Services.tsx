import Image from "next/image";
import React from "react";
import Button from "./common/Button";
import Heading from "./common/Heading";
import { services } from "../constants/services";

const Services = () => {
  return (
    <section id="services" className="relative">
      <div className="container mx-auto relative z-30 px-3 md:px-0">
        <Heading variant="secondary">Services to improve mental health</Heading>
        <div className=" flex gap-4 flex-wrap justify-center items-center">
          <Image
            src={"/images/Home/pluses.png"}
            alt="pluses"
            width={400}
            height={400}
            className="absolute md:left-0 md:top-10 top-[27rem] -left-1 -z-10 "
          />
          <Image
            src={"/images/Home/pluses.png"}
            alt="pluses"
            width={400}
            height={400}
            className="absolute  md:right-12 md:top-0  top-6 -z-10 "
          />
          {/* box */}
          {services.map((service, index) => (
            <div
              key={index}
              className="w-[300px] h-[300px] flex flex-col space-y-8 border-2 p-5 text-center rounded-2xl shadow-sm hover:shadow-md transition duration-150 bg-backgroundcolor"
            >
              <Image
                src={service.img}
                width={100}
                height={100}
                alt={service.alt}
                className="mx-auto"
              />
              <p className="text-paragraphtext text-lg capitalize">
                {service.title}
              </p>
              <div className="mx-auto">
                <Button variant="secondary" size="small" roundedValue="full">
                  {service.buttonTitle}
                </Button>
              </div>
            </div>
          ))}
          {/* box */}
        </div>
      </div>
    </section>
  );
};

export default Services;
