import React, { useState } from "react";

import { useSelector } from "react-redux";

import { createCategory } from "../services/operations/courseDetailsAPI";

const AddCategory = () => {

  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const result = await createCategory(formData, token);

    console.log(result);

    setFormData({
      name: "",
      description: "",
    });
  };

  return (

    <div className="min-h-screen bg-richblack-900 text-white flex justify-center items-center p-6">

      <div className="w-full max-w-[600px] bg-richblack-800 p-8 rounded-xl">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Add New Category
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >

          <div className="flex flex-col gap-2">

            <label className="text-sm">
              Category Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              className="bg-richblack-700 p-3 rounded-lg outline-none"
              required
            />

          </div>

          <div className="flex flex-col gap-2">

            <label className="text-sm">
              Category Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter category description"
              className="bg-richblack-700 p-3 rounded-lg outline-none min-h-[140px]"
              required
            />

          </div>

          <button
            type="submit"
            className="bg-yellow-50 text-black font-bold py-3 rounded-lg hover:scale-[1.02] transition-all duration-200"
          >
            Create Category
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddCategory;