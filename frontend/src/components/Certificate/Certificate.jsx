// frontend/src/components/Certificate/Certificate.jsx

import { forwardRef } from "react"
import logoImg from "../../assets/Logo/Logo-Full-Light.png"

const Certificate = forwardRef(({ studentName, courseName, completionDate, certificateId }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: "900px",
        height: "636px",
        background: "#fdfaf2",
        position: "relative",
        fontFamily: "Georgia, serif",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Watermark pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(45deg, rgba(201,168,76,0.04) 0px, rgba(201,168,76,0.04) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(-45deg, rgba(201,168,76,0.04) 0px, rgba(201,168,76,0.04) 1px, transparent 1px, transparent 40px)",
        pointerEvents: "none",
      }} />

      {/* Gold outer border */}
      <div style={{
        position: "absolute", inset: "10px",
        border: "3px solid #c9a84c",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: "16px",
        border: "1px solid rgba(201,168,76,0.4)",
        pointerEvents: "none",
      }} />

      {/* Corner TL */}
      <svg style={{ position:"absolute", top:18, left:18, width:70, height:70 }} viewBox="0 0 80 80" fill="none">
        <path d="M8 8 L8 40 M8 8 L40 8" stroke="#c9a84c" strokeWidth="1.5"/>
        <circle cx="8" cy="8" r="3" fill="#c9a84c"/>
        <path d="M8 24 Q20 20 24 8" stroke="#c9a84c" strokeWidth="0.8" fill="none" opacity="0.6"/>
      </svg>

      {/* Corner TR */}
      <svg style={{ position:"absolute", top:18, right:18, width:70, height:70, transform:"scaleX(-1)" }} viewBox="0 0 80 80" fill="none">
        <path d="M8 8 L8 40 M8 8 L40 8" stroke="#c9a84c" strokeWidth="1.5"/>
        <circle cx="8" cy="8" r="3" fill="#c9a84c"/>
        <path d="M8 24 Q20 20 24 8" stroke="#c9a84c" strokeWidth="0.8" fill="none" opacity="0.6"/>
      </svg>

      {/* Corner BL */}
      <svg style={{ position:"absolute", bottom:18, left:18, width:70, height:70, transform:"scaleY(-1)" }} viewBox="0 0 80 80" fill="none">
        <path d="M8 8 L8 40 M8 8 L40 8" stroke="#c9a84c" strokeWidth="1.5"/>
        <circle cx="8" cy="8" r="3" fill="#c9a84c"/>
        <path d="M8 24 Q20 20 24 8" stroke="#c9a84c" strokeWidth="0.8" fill="none" opacity="0.6"/>
      </svg>

      {/* Corner BR */}
      <svg style={{ position:"absolute", bottom:18, right:18, width:70, height:70, transform:"scale(-1)" }} viewBox="0 0 80 80" fill="none">
        <path d="M8 8 L8 40 M8 8 L40 8" stroke="#c9a84c" strokeWidth="1.5"/>
        <circle cx="8" cy="8" r="3" fill="#c9a84c"/>
        <path d="M8 24 Q20 20 24 8" stroke="#c9a84c" strokeWidth="0.8" fill="none" opacity="0.6"/>
      </svg>

      {/* Main content */}
      <div style={{ position:"relative", zIndex:1, textAlign:"center", padding:"0 80px", width:"100%" }}>

        {/* Brand — uses actual logo */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"16px" }}>
          <img
            src={logoImg}
            alt="StudyNotion"
            style={{ height:"70px", objectFit:"contain" }}
          />
        </div>

        {/* Rule */}
        <div style={{ display:"flex", alignItems:"center", gap:"12px", margin:"0 auto 14px", maxWidth:"400px" }}>
          <div style={{ flex:1, height:"1px", background:"linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />
          <div style={{ width:"7px", height:"7px", background:"#c9a84c", transform:"rotate(45deg)" }} />
          <div style={{ flex:1, height:"1px", background:"linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />
        </div>

        {/* Certificate of */}
        <div style={{ fontFamily:"Georgia, serif", fontSize:"10px", letterSpacing:"6px", color:"#b8892a", textTransform:"uppercase", marginBottom:"4px" }}>
          Certificate of
        </div>

        <div style={{ fontFamily:"Georgia, serif", fontSize:"32px", fontWeight:"700", color:"#1a1a2e", letterSpacing:"3px", marginBottom:"16px" }}>
          COMPLETION
        </div>

        {/* Presented to */}
        <div style={{ fontSize:"12px", letterSpacing:"3px", color:"#6b6b6b", textTransform:"uppercase", marginBottom:"6px" }}>
          This is to proudly certify that
        </div>

        {/* Student Name */}
        <div style={{
          fontSize:"52px",
          fontStyle:"italic",
          fontWeight:"600",
          color:"#b8892a",
          lineHeight:1,
          marginBottom:"12px",
          fontFamily:"'Brush Script MT', cursive",
        }}>
          {studentName}
        </div>

        {/* Body text */}
        <div style={{ fontSize:"13px", color:"#4a4a4a", marginBottom:"8px" }}>
          has demonstrated exceptional commitment and successfully completed
        </div>

        {/* Course name */}
        <div style={{
          fontSize:"17px",
          fontWeight:"700",
          color:"#1a1a2e",
          letterSpacing:"1px",
          margin:"8px auto 12px",
          padding:"8px 32px",
          borderTop:"1px solid rgba(201,168,76,0.5)",
          borderBottom:"1px solid rgba(201,168,76,0.5)",
          display:"inline-block",
        }}>
          ✦ {courseName} ✦
        </div>

        <div style={{ fontSize:"12px", color:"#6b6b6b", marginBottom:"16px" }}>
          with full dedication, perseverance, and a passion for learning.
        </div>

        {/* Footer */}
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginTop:"12px" }}>

          {/* Date */}
          <div style={{ textAlign:"center", flex:1 }}>
            <div style={{ width:"140px", height:"1px", background:"#c9a84c", margin:"0 auto 6px" }} />
            <div style={{ fontSize:"13px", fontWeight:"600", color:"#1a1a2e" }}>{completionDate}</div>
            <div style={{ fontSize:"9px", letterSpacing:"2px", color:"#9a8a6a", textTransform:"uppercase" }}>Date Issued</div>
          </div>

          {/* Seal */}
          <div style={{ position:"relative", width:"90px", height:"90px", flexShrink:0 }}>
            <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="46" stroke="#c9a84c" strokeWidth="1"/>
              <circle cx="50" cy="50" r="40" stroke="#c9a84c" strokeWidth="0.5" strokeDasharray="4 3"/>
              <path d="M50 4 A46 46 0 0 1 96 50 A46 46 0 0 1 50 96 A46 46 0 0 1 4 50 A46 46 0 0 1 50 4" stroke="none" id="sc"/>
              <text fontFamily="Georgia, serif" fontSize="7" fill="#b8892a" letterSpacing="2">
                <textPath href="#sc" startOffset="5%">STUDYNOTION ✦ CERTIFIED ✦ EXCELLENCE ✦</textPath>
              </text>
            </svg>
            <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
              <div style={{ fontFamily:"Georgia, serif", fontSize:"16px", fontWeight:"700", color:"#b8892a" }}>SN</div>
              <div style={{ fontSize:"6px", letterSpacing:"1px", color:"#9a8a6a", textTransform:"uppercase" }}>Certified</div>
            </div>
          </div>

          {/* Certificate ID */}
          <div style={{ textAlign:"center", flex:1 }}>
            <div style={{ width:"140px", height:"1px", background:"#c9a84c", margin:"0 auto 6px" }} />
            <div style={{ fontSize:"11px", fontWeight:"600", color:"#1a1a2e", letterSpacing:"1px" }}>{certificateId}</div>
            <div style={{ fontSize:"9px", letterSpacing:"2px", color:"#9a8a6a", textTransform:"uppercase" }}>Certificate ID</div>
          </div>

        </div>
      </div>
    </div>
  )
})

Certificate.displayName = "Certificate"
export default Certificate