const mongoose = require("mongoose")
const Category = require("../models/Category")
require("dotenv").config()

const categories = [
  {
    name: "Web Development",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more",
  },
  {
    name: "Data Science",
    description: "Learn Python, Machine Learning, Data Analysis and more",
  },
  {
    name: "AI and ML",
    description: "Learn Artificial Intelligence and Machine Learning concepts",
  },
  {
    name: "Mobile Development",
    description: "Learn iOS, Android, React Native and Flutter development",
  },
  {
    name: "DevOps",
    description: "Learn Docker, Kubernetes, CI/CD and cloud platforms",
  },
  {
    name: "Cybersecurity",
    description: "Learn ethical hacking, network security and more",
  },
]

async function seedCategories() {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("DB connected")

    // Clear existing categories
    await Category.deleteMany({})
    console.log("Existing categories cleared")

    // Insert new categories
    await Category.insertMany(categories)
    console.log("Categories seeded successfully!")

    mongoose.disconnect()
  } catch (error) {
    console.error("Seeding failed:", error)
    mongoose.disconnect()
  }
}

seedCategories()