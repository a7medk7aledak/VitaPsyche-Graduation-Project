"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Heading from "@components/common/Heading";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import emailjs from "@emailjs/browser";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  message: string;
  email: string;
}

const ContactForm = () => {
  console.log("renduring");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    message: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.message.length) {
      const fullName = `${formData.firstName} ${formData.lastName}`;
      const emailParams: Record<string, string> = {
        fullName: fullName,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
        email: formData.email,
      };

      emailjs
        .send(
          "service_01kkjad",
          "template_ldopp0r",
          emailParams,
          "AjAO6BZV9xIBR9BQC"
        )
        .then(
          (result) => {
            console.log("Email sent successfully:", result);
            setSubmitted(true);
            setTimeout(() => {
              setSubmitted(false);
            }, 3000);
          },
          (error) => {
            console.log("Error in sending email:", error.text);
            setSubmitted(false);
          }
        );

      if (formData.email.length) {
        console.log("confirmation happen");
        emailjs
          .send(
            "service_2riy6pi",
            "template_90dcmkl",
            {
              user_email: formData.email,
              user_name: fullName,
            },
            "AjAO6BZV9xIBR9BQC"
          )
          .then(
            (result) => {
              console.log("Confirmation email sent:", result);
            },
            (error) => {
              console.log("Error in sending confirmation email:", error);
            }
          );
      }

      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        message: "",
        email: "",
      });
    }
  };

  return (
    <section id="contact-us" className="relative">
      <div className="container mx-auto">
        <div className="-mt-10 mb-8">
          <Heading variant="secondary">You are our priority</Heading>
          <h6 className="w-fit mx-auto -mt-24 p-5 text-lg text-paragraphtext font-medium text-center">
            We appreciate your comments and inquiries! Feel free to contact us.
          </h6>
        </div>
        {/* box of contact us */}
        <div className="gap-4 flex flex-col md:flex-row rounded-lg bg-white max-w-[1100px] mx-auto min-h-[500px]">
          {/* right part  */}
          <div className="bg-maincolorincontactform text-white p-5 flex flex-col justify-between rounded-lg w-full space-y-8 md:w-1/4">
            <div>
              <h4 className="text-2xl font-medium">Contact Information</h4>
              <p className="text-[#c8cdcd]">
                Say something to start a live chat!
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-3 items-center">
                <FiPhoneCall className="text-xl" />
                <div>
                  <h4 className="font-medium">Hotline</h4>
                  <p>29374277</p>
                </div>
              </div>
              <div className="flex space-x-3 items-center">
                <MdEmail className="text-xl" />
                <div>
                  <h4 className="font-medium">e-mail</h4>
                  <p>info@yoursite.com</p>
                </div>
              </div>
              <div className="flex space-x-3 items-center">
                <TbWorld className="text-xl" />
                <div>
                  <h4 className="font-medium">Website</h4>
                  <p>MindMed.com</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <FaTwitter className="w-6 h-6 p-1 bg-white text-black rounded-full cursor-pointer" />
              <FaInstagram className="w-6 h-6 p-1 bg-white text-black rounded-full cursor-pointer" />
              <FaFacebook className="w-6 h-6 p-1 bg-white text-black rounded-full cursor-pointer" />
            </div>
          </div>
          {/* right part  */}
          {/* left part  */}
          <div className="w-3/4 p-5">
            <form
              action=""
              className="flex flex-wrap pt-8"
              onSubmit={sendEmail}
            >
              <div className="flex flex-col group mb-7 mr-16 ">
                <label className="group-focus-within:text-maincolorincontactform transition-colors duration-200">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-fit border-b py-2 px-3 text-gray-700 leading-tight focus:outline-none group-focus:border-maincolorincontactform transition-colors duration-200"
                />
              </div>

              <div className="flex flex-col group mb-7 ">
                <label className="group-focus-within:text-maincolorincontactform transition-colors duration-200">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-fit border-b py-2 px-3 text-gray-700 leading-tight focus:outline-none group-focus:border-maincolorincontactform transition-colors duration-200"
                />
              </div>

              <div className="flex flex-col group mb-7 mr-16">
                <label className="group-focus-within:text-maincolorincontactform transition-colors duration-200">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-fit border-b py-2 px-3 text-gray-700 leading-tight focus:outline-none group-focus:border-maincolorincontactform transition-colors duration-200"
                />
              </div>

              <div className="flex flex-col group mb-7">
                <label className="group-focus-within:text-maincolorincontactform transition-colors duration-200">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-fit border-b py-2 px-3 text-gray-700 leading-tight focus:outline-none group-focus:border-maincolorincontactform transition-colors duration-200"
                />
              </div>

              <div className="flex flex-col group mb-7 w-full">
                <label className="group-focus-within:text-maincolorincontactform transition-colors duration-200">
                  Write Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border-b py-2 px-3 mb-7 text-gray-700 leading-tight focus:outline-none focus:border-maincolorincontactform transition-colors duration-200"
                />
              </div>

              {/* Display the success message in front of the button */}
              {submitted && (
                <p className="text-green-600 font-medium mb-4">
                  Thank you for contacting us! Your message has been submitted
                  successfully.
                </p>
              )}

              <button
                type="submit"
                className="bg-maincolorincontactform hover:shadow-lg ml-auto text-white font-medium py-3 px-6 rounded-md transition-shadow duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
          {/* left part  */}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
