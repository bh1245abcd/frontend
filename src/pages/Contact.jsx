import React, { useState } from 'react'

const faqs = [
  {
    question: 'How can I contact Abhi Jewels?',
    answer:
      'You can reach us through our contact form, email, or by visiting our store. Our team will be happy to assist you.',
  },
  {
    question: 'Do you offer certified jewellery?',
    answer:
      'Yes, all our jewellery is certified and undergoes strict quality checks to ensure purity and authenticity.',
  },
  {
    question: 'Do you provide custom jewellery designs?',
    answer:
      'Absolutely. We offer personalized jewellery designs crafted to match your preferences and special occasions.',
  },
  {
    question: 'What is your return or exchange policy?',
    answer:
      'We offer a flexible return and exchange policy. Please contact our support team for detailed information.',
  },
  {
    question: 'Are your diamonds ethically sourced?',
    answer:
      'Yes, we source all diamonds and precious stones from trusted, certified, and ethical suppliers.',
  },
  {
    question: 'Do you provide jewellery maintenance services?',
    answer:
      'Yes, we provide cleaning, polishing, and maintenance services to help your jewellery retain its shine.',
  },
]

const Contact = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-3xl mx-auto mt-24 px-6">
      <h2 className="text-3xl font-bold text-center text-[#832729] mb-10">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800"
            >
              {faq.question}
              <span className="text-xl">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>

            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Contact
