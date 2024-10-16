"use client";
import { useFormspark } from "@formspark/use-formspark";
import { useState, ChangeEvent, FocusEvent, FormEvent } from "react";
import FormSuccessMessage from "@/components/FormSuccessMessage";
import Image from "next/image";
import Botpoison from "@botpoison/browser";

const FORMSPARK_FORM_ID = process.env.NEXT_PUBLIC_FORMSPARK_FORM_ID as string;
const botpoison = new Botpoison({
  publicKey: process.env.NEXT_PUBLIC_BOTPOISON_PUBLIC_KEY as string,
});

interface Service {
  name: string;
  id: string;
}

export default function ContactForm() {
  const [submit] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedServices((prevSelectedServices) =>
      checked
        ? [...prevSelectedServices, name]
        : prevSelectedServices.filter((service) => service !== name)
    );
  };

  const handleFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.target.placeholder = "";
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    placeholder: string
  ) => {
    if (!e.target.value) {
      e.target.placeholder = placeholder;
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true); // Set submitting to true when form submission starts

    const { solution } = await botpoison.challenge();

    const formData = {
      firstName,
      lastName,
      businessName,
      website,
      email,
      phone,
      message,
      selectedServices,
      _botpoison: solution, // Add Botpoison solution to form data
    };

    await submit(formData);
    setIsSubmitted(true); // Set isSubmitted to true when form is submitted
    setSubmitting(false); // Set submitting to false after submission
  };

  const services: Service[] = [
    { name: "Standard", id: "standard" },
    { name: "Booking", id: "booking" },
    { name: "Blogging", id: "blogging" },
    { name: "Something else", id: "somethingElse" },
  ];

  return !isSubmitted ? (
    <form id="contactForm" onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="w-full">
          <label htmlFor="firstName" className="field-label">
            First name
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onFocus={handleFocus}
            onBlur={(e) => handleBlur(e, "Enter your first name")}
            type="text"
            id="firstName"
            className="input"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="lastName" className="field-label">
            Last name
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onFocus={handleFocus}
            onBlur={(e) => handleBlur(e, "Enter your last name")}
            type="text"
            id="lastName"
            className="input"
            placeholder="Enter your last name"
            required
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="w-full">
          <label htmlFor="businessName" className="field-label">
            Business name
          </label>
          <input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            onFocus={handleFocus}
            onBlur={(e) => handleBlur(e, "Tell us your business name")}
            type="text"
            id="businessName"
            className="input"
            placeholder="Tell us your business name"
          />
        </div>
        <div className="w-full">
          <label htmlFor="website" className="field-label">
            Current website (if applicable)
          </label>
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            onFocus={handleFocus}
            onBlur={(e) => handleBlur(e, "What is your current website?")}
            type="text"
            id="website"
            className="input"
            placeholder="What is your current website?"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="w-full">
          <label htmlFor="email" className="field-label">
            Your email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleFocus}
            onBlur={(e) => handleBlur(e, "Enter your email address")}
            type="email"
            id="email"
            className="input"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="phone" className="field-label">
            Phone number
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onFocus={handleFocus}
            onBlur={(e) => handleBlur(e, "What is your phone number?")}
            type="tel"
            id="phone"
            className="input"
            placeholder="What is your phone number?"
            required
          />
        </div>
      </div>
      <div>
        <h3 className="field-label">What service(s) are you interested in?</h3>
        <ul className="rounded items-center w-full font-medium border shadow-sm sm:flex divide-x overflow-hidden">
          {services.map((service, index) => (
            <li key={index} className="w-full bg-white">
              <div className="flex items-center pl-3">
                <input
                  id={service.id}
                  name={service.id}
                  type="checkbox"
                  checked={selectedServices.includes(service.id)}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 bg-white border-gray-700 accent-sd-green"
                />
                <label
                  htmlFor={service.id}
                  className="w-full py-4 ml-2 font-medium text-ad-dark"
                >
                  {service.name}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full">
        <label htmlFor="message" className="field-label">
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={handleFocus}
          onBlur={(e) => handleBlur(e, "Write your message here")}
          rows={8}
          id="message"
          className="input"
          placeholder="Write your message here"
          required
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="btn btn--primary flex gap-2 mt-4"
      >
        {submitting ? "Sending..." : "Send "}
        <span>
          <Image
            src="/icons/mui-send.svg"
            alt="send icon"
            height="20"
            width="20"
            className="text-ad-mint"
          />
        </span>
      </button>
    </form>
  ) : (
    <FormSuccessMessage />
  );
}
