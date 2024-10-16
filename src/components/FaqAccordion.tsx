"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  faqs: FaqItem[];
};

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4 col-span-1 lg:col-span-8">
      {faqs.map((faq: FaqItem, index: number) => (
        <div key={index}>
          <h2
            className="text-lg md:text-xl"
            id={`accordion-collapse-heading-${index}`}
          >
            <button
              type="button"
              className="flex text-start md:items-center justify-between w-full p-5 font-medium rtl:text-right border border-1 border-ad-dark rounded-md focus:ring-1 focus:ring-ad-dark focus:bg-ad-yellow hover:bg-ad-yellow"
              onClick={() => toggleAccordion(index)}
              aria-expanded={index === openIndex}
              aria-controls={`accordion-collapse-body-${index}`}
            >
              <span className="text-xl tracking-tighter">{faq.question}</span>
              <svg
                className={`w-3 h-3 shrink-0 transform ${
                  index === openIndex ? "" : "rotate-180"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id={`accordion-collapse-body-${index}`}
            className={`overflow-hidden transition-height duration-300 ease-in-out ${
              index === openIndex ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="p-5 text-xl">{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
