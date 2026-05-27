// src/components/core/Dashboard/InstructorDashboard/InstructorChart.jsx

import { useState } from "react"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(ArcElement, Tooltip, Legend)

export default function InstructorChart({ courses }) {
  const [currentChart, setCurrentChart] = useState("students")

  // ── Generate random colours for each course slice ────────────────────────
  function generateRandomColors(count) {
    const colors = []
    for (let i = 0; i < count; i++) {
      const h = Math.floor(Math.random() * 360)
      colors.push(`hsl(${h}, 70%, 60%)`)
    }
    return colors
  }

  // ── Chart data — Students ────────────────────────────────────────────────
  const chartDataStudents = {
    labels: courses.map((c) => c.courseName),
    datasets: [
      {
        data: courses.map((c) => c.totalStudents ?? 0),
        backgroundColor: generateRandomColors(courses.length),
        borderWidth:     0,
      },
    ],
  }

  // ── Chart data — Revenue ─────────────────────────────────────────────────
  const chartDataIncome = {
    labels: courses.map((c) => c.courseName),
    datasets: [
      {
        data: courses.map((c) => c.totalRevenue ?? 0),
        backgroundColor: generateRandomColors(courses.length),
        borderWidth:     0,
      },
    ],
  }

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#AFB2BF",
          font: { size: 12 },
        },
      },
    },
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md border
                    border-richblack-700 bg-richblack-800 p-6">

      {/* Chart Title + Toggle */}
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-richblack-5">Visualise</p>
        <div className="flex gap-x-2">
          <button
            onClick={() => setCurrentChart("students")}
            className={`rounded-sm px-3 py-1 text-sm font-medium transition-all ${
              currentChart === "students"
                ? "bg-richblack-700 text-yellow-50"
                : "text-richblack-300"
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setCurrentChart("income")}
            className={`rounded-sm px-3 py-1 text-sm font-medium transition-all ${
              currentChart === "income"
                ? "bg-richblack-700 text-yellow-50"
                : "text-richblack-300"
            }`}
          >
            Income
          </button>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mx-auto w-full max-w-[250px]">
        <Pie
          data={
            currentChart === "students" ? chartDataStudents : chartDataIncome
          }
          options={chartOptions}
        />
      </div>

    </div>
  )
}