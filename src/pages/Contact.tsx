import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar setSearch={() => {}} setMenu={() => {}} />
      <h1 className="text-4xl font-bold text-center mb-5 mt-5">Contact Us</h1>

      <p className="text-center max-w-2xl mx-auto text-gray-600 mb-5">
        If you have any queries, feel free to reach out to us using the form below.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-8 shadow-md rounded-xl"
      >
        <div className="mb-4">
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default Contact;
