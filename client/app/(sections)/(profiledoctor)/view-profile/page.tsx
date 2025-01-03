import React from "react";
import { Interests } from "@components/doctor/viewProfileDoctor/interests";
import { ProfileCard } from "@components/doctor/viewProfileDoctor/profileCard";
import { Ratings } from "@components/doctor/viewProfileDoctor/ratings";
import { Certificates } from "@components/doctor/viewProfileDoctor/certificates";
import Heading from "@components/common/Heading";

const page = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-8">
      <Heading variant="secondary">Therapist Profile</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-10 -mt-6">
        <div className="space-y-6 order-2 md:order-1 ">
          <Interests />
          <Ratings />
          <Certificates />
          <Certificates />
          <Certificates />
          <Certificates />
          <Certificates />
          <Certificates />
        </div>
        <div className="md:sticky md:top-6 h-fit order-1 md:order-2 flex md:justify-center">
          <ProfileCard />
        </div>
      </div>
    </main>
  );
};

export default page;
