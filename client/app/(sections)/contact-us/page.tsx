"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import Heading from "@components/common/Heading";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  message: string;
  email: string;
}

const ContactForm = () => {
  console.log("rendering");
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
          (result: EmailJSResponseStatus) => {
            console.log("Email sent successfully:", result);
            setSubmitted(true);
            setTimeout(() => {
              setSubmitted(false);
            }, 3000);
          },
          (error: EmailJSResponseStatus) => {
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
            (result: EmailJSResponseStatus) => {
              console.log("Confirmation email sent:", result);
            },
            (error: EmailJSResponseStatus) => {
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
    <motion.section
      id="contact-us"
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <motion.div
          className="-mt-10 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Heading variant="secondary">You are our priority</Heading>
          <h6 className="w-fit mx-auto -mt-24 p-5 text-lg text-paragraphtext font-medium text-center">
            We appreciate your comments and inquiries! Feel free to contact us.
          </h6>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row rounded-lg bg-white max-w-[1100px] mx-auto min-h-[500px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Right section with contact info */}
          <motion.div
            className="bg-maincolorincontactform text-white p-5 flex flex-col items-center md:items-start justify-between rounded-lg w-full space-y-8 md:w-1/4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
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
                  <p>Vitapsyche.com</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-[100px] -ml-7 md:ml-0 ">
              <FaTwitter className="w-6 h-6 p-1 bg-white text-black rounded-full cursor-pointer" />
              <FaInstagram className="w-6 h-6 p-1 bg-white text-black rounded-full cursor-pointer" />
              <FaFacebook className="w-6 h-6 p-1 bg-white text-black rounded-full cursor-pointer" />
            </div>
          </motion.div>

          {/* Left section with contact form */}
          <div className="md:w-3/4 w-full  p-5 pl-8">
            <motion.form
              className="flex flex-wrap pt-8"
              onSubmit={sendEmail}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex flex-col group mb-7 w-full md:w-1/2">
                <label className="group-focus-within:text-maincolorincontactform transition-colors duration-200">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-10/12 md:w-3/4  border-b py-2 px-3 text-gray-700 leading-tight focus:outline-none group-focus:border-maincolorincontactform transition-colors duration-200"
                />
              </div>

              <div className="flex flex-col group mb-7 w-full md:w-1/2">
                <label className="group-focus-within:text-maincolorincontactform transition-colors duration-200">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-10/12 md:w-3/4 border-b py-2 px-3 text-gray-700 leading-tight focus:outline-none group-focus:border-maincolorincontactform transition-colors duration-200"
                />
              </div>

              <div className="flex flex-col group mb-7 w-full  md:w-1/2">
                <label className="group-focus-within:text-maincolorincontactform transition-colors duration-200">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-10/12 md:w-3/4  border-b py-2 px-3 text-gray-700 leading-tight focus:outline-none group-focus:border-maincolorincontactform transition-colors duration-200"
                />
              </div>

              <div className="flex flex-col group mb-7 w-full md:w-1/2">
                <label className="group-focus-within:text-maincolorincontactform transition-colors duration-200">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-10/12  md:w-3/4 border-b py-2 px-3 text-gray-700 leading-tight focus:outline-none group-focus:border-maincolorincontactform transition-colors duration-200"
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

              {/*  success message */}
              {submitted && (
                <motion.p
                  className="text-green-600 font-medium mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Thank you for contacting us! Your message has been submitted
                  successfully.
                </motion.p>
              )}

              <motion.button
                type="submit"
                className="bg-maincolorincontactform hover:shadow-lg ml-auto text-white font-medium py-3 px-6 rounded-md transition-shadow duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactForm;
