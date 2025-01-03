import Button from "@components/common/Button";
import { Star } from "lucide-react";
import Image from "next/image";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { GiTimeSynchronization } from "react-icons/gi";
import { GrLanguage } from "react-icons/gr";
import { FaGlobe } from "react-icons/fa";

export function ProfileCard() {
  return (
    <div className=" w-[500px] bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-start gap-4">
        <Image
          src="/images/about-us/me.jpg"
          alt="Therapist"
          width={64}
          height={64}
          className="rounded-full"
        />
        <div className="flex-1">
          <h1 className="text-xl font-semibold">Dalal Radwan</h1>
          <p className="text-gray-600">Psychiatrist</p>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">5.0 (5 reviews)</span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-3">
          <GrLanguage />
          <span className="text-gray-600">Language: English, Arabic</span>
        </div>

        <div className="flex items-center space-x-3">
          <FaGlobe />
          <span className="text-gray-600">Country: Egypt</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaRegCalendarAlt />

          <span className="text-gray-600">Joining Date: 2 years ago</span>
        </div>
        <div className="flex items-center space-x-3">
          <GiTimeSynchronization />
          <span className="text-gray-600">
            Number of sessions: 500+ Sessions
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaRegClock />
          <p>
            <span className="font-medium">950 EGP</span> / 60 Min &bull;
            <span className="ml-2 font-medium">600 EGP</span> / 30 Min
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-center space-x-8">
        <button className="text-lg font-medium text-subheading hover:underline">
          Write a review
        </button>
        <Button variant="secondary" size="large" roundedValue="md">
          Select Time Slot
        </Button>
      </div>
    </div>
  );
}
