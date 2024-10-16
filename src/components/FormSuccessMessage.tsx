const FormSuccessMessage = () => {
  return (
    <div className="bg-sd-dark-800 border bg-white shadow-sm p-6 rounded-lg">
      <h3 className="text-3xl font-semibold mb-6">Great to hear from you!</h3>
      <p className="text-lg">
        Your message has been received. We will get back to you shortly.
      </p>
      <br />
      <p className="text-lg">
        Need to get in touch faster? Give us a call on the number below.
      </p>
      <br />
      <a
        className="text-lg font-semibold flex gap-2 items-center text-ad-blue"
        href="tel:+447590841878"
      >
        07590841878
      </a>
    </div>
  );
};

export default FormSuccessMessage;
