// frontend/src/components/Certificate/DownloadCertificate.jsx

import { useRef, useState } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import Certificate from "./Certificate"
import { HiDownload } from "react-icons/hi"

export default function DownloadCertificate({ studentName, courseName }) {
  const certRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const completionDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  // Generate a short unique ID from name + course
  const certificateId = btoa(`${studentName}-${courseName}`)
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 12)
    .toUpperCase()

  const handleDownload = async () => {
    setLoading(true)
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      })
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [900, 636],
      })
      pdf.addImage(imgData, "PNG", 0, 0, 900, 636)
      pdf.save(`${studentName.replace(" ", "_")}_${courseName.slice(0, 20)}_Certificate.pdf`)
    } catch (err) {
      console.error("Certificate generation failed:", err)
    }
    setLoading(false)
  }

  return (
    <div>
      {/* Hidden certificate (off-screen, used only for PDF capture) */}
      <div
        style={{
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          zIndex: -1,
        }}
      >
        <Certificate
          ref={certRef}
          studentName={studentName}
          courseName={courseName}
          completionDate={completionDate}
          certificateId={certificateId}
        />
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={loading}
        className="flex items-center gap-2 rounded-md bg-yellow-50 px-4 py-2 text-sm font-semibold text-richblack-900 hover:bg-yellow-25 disabled:opacity-60 transition-all"
      >
        <HiDownload />
        {loading ? "Generating..." : "Get Certificate"}
      </button>
    </div>
  )
}