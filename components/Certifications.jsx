// "use client";
// import { useEffect } from "react";

// export default function Certifications() {
//   // Re-run the Credly embed script when the component loads
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "//cdn.credly.com/assets/utilities/embed.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   const certs = [
//     { title: "AWS Certified Cloud Practitioner", id: "97ad5b1e-24e8-4208-8365-45d4937de903" },
//     { title: "AWS Educate Getting Started with Storage", id: "8bb9b6be-45f3-43b6-a2dd-25d6b6aa0458" },
//     { title: "AWS Educate Introduction to Cloud 101", id: "5ea8025b-a115-4e28-982c-3c8ecf1f64ea" },
//     { title: "AWS Cloud Quest: Cloud Practitioner", id: "a4a760af-ba04-45a9-a3f3-77d36d8b83dd" },
//     { title: "AWS Educate Web Builder", id: "5cf1e74f-eb38-4c81-a1e1-34bd894390f5" },
//     { title: "AWS Academy Graduate - Cloud Foundations", id: "97ad5b1e-24e8-4208-8365-45d4937de903" },
//   ];

//   return (
//     <div className="certifications-grid">
//       {certs.map((cert, index) => (
//         <div key={index} className="cert-card hover-lift animate-fade-in-up">
//           <h3 className="cert-title">{cert.title}</h3>
//           <div className="cert-badge">
//             <div 
//               data-iframe-width="150" 
//               data-iframe-height="270" 
//               data-share-badge-id={cert.id} 
//               data-share-badge-host="https://www.credly.com"
//             ></div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }   


"use client";
import { useEffect } from "react";

export default function Certifications() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//cdn.credly.com/assets/utilities/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const certs = [
    {
      title: "AWS Certified Cloud Practitioner",
      id: "97ad5b1e-24e8-4208-8365-45d4937de903",
      icon: "🏆",
    },
    {
      title: "AWS Educate Getting Started with Storage",
      id: "8bb9b6be-45f3-43b6-a2dd-25d6b6aa0458",
      icon: "🗄️",
    },
    {
      title: "AWS Educate Introduction to Cloud 101",
      id: "5ea8025b-a115-4e28-982c-3c8ecf1f64ea",
      icon: "☁️",
    },
    {
      title: "AWS Cloud Quest: Cloud Practitioner",
      id: "a4a760af-ba04-45a9-a3f3-77d36d8b83dd",
      icon: "🎮",
    },
    {
      title: "AWS Educate Web Builder",
      id: "5cf1e74f-eb38-4c81-a1e1-34bd894390f5",
      icon: "🌐",
    },
    {
      title: "AWS Academy Graduate - Cloud Foundations",
      id: "97ad5b1e-24e8-4208-8365-45d4937de903",
      icon: "🎓",
    },
  ];

  return (
    <div className="grid-3">
      {certs.map((cert, index) => (
        <div key={index} className="cert-card">

          {/* Icon + Title */}
          <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
            <span
              style={{
                fontSize: "2rem",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              {cert.icon}
            </span>
            <h3
              style={{
                fontSize: "0.95rem",
                fontWeight: "700",
                color: "var(--color-text)",
                lineHeight: "1.4",
                minHeight: "2.5rem",
              }}
            >
              {cert.title}
            </h3>
          </div>

          {/* Credly Badge */}
          <div
            style={{
              background: "#f8f9fb",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius)",
              padding: "0.75rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <div
              data-iframe-width="150"
              data-iframe-height="270"
              data-share-badge-id={cert.id}
              data-share-badge-host="https://www.credly.com"
            />
          </div>

          {/* Bottom accent bar */}
          <div
            style={{
              height: "3px",
              background: "linear-gradient(90deg, #ff6b00, #ff8533)",
              borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
              marginTop: "1.25rem",
              marginInline: "-1.75rem",
              marginBottom: "-1.75rem",
            }}
          />
        </div>
      ))}
    </div>
  );
}