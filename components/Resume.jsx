// export default function Resume() {
//   return (
//     <section id="resume" className="resume">
//       <div className="container">
//         <div className="section-header animate-fade-in-up">
//           <h2 className="section-title">Resume</h2>
//           <p className="section-subtitle">My educational background and professional experience</p>
//         </div>

//         <div className="resume-grid">
//           {/* Education Column */}
//           <div className="resume-card hover-lift">
//             <div className="resume-icon">🎓</div>
//             <h3 className="resume-card-title">Education</h3>
//             <div className="resume-content">
//               <h4 className="resume-highlight">Kathford International College of Engineering and Management</h4>
//               <p>Bachelor's Degree in Engineering</p>
//               <span className="resume-date">2022 – 2026</span>
//             </div>
//           </div>

//           {/* Experience Column */}
//           <div className="resume-card hover-lift">
//             <div className="resume-icon">💼</div>
//             <h3 className="resume-card-title">Experience</h3>
//             <div className="resume-content">
//               {/* Added Easypr Experience */}
//               <div className="experience-item">
//                 <h4 className="resume-highlight">DevOps Engineer</h4>
//                 <p className="experience-company">Easypr</p>
//                 <p className="experience-desc">Streamlining deployment pipelines and managing cloud infrastructure.</p>
//               </div>
//               <hr className="resume-divider" />
//               <div className="experience-item">
//                 <h4 className="resume-highlight">Self-Placed Projects & Learning</h4>
//                 <p className="experience-desc">Designed and implemented scalable AWS cloud solutions independently.</p>
//               </div>
//             </div>
//           </div>

//           {/* Skills Column */}
//           <div className="resume-card hover-lift">
//             <div className="resume-icon">⚙️</div>
//             <h3 className="resume-card-title">Skills</h3>
//             <div className="resume-content">
//               <div className="skill-category">
//                 <h4 className="resume-highlight">AWS Cloud Services</h4>
//                 <p>Compute, Storage, Database, Networking, Security, Identity & Compliance, Management & Governance</p>
//               </div>
//               <div className="skill-category">
//                 <h4 className="resume-highlight">Programming Languages</h4>
//                 <p>Python, C++, C</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Languages Section */}
//         <div className="languages-container animate-fade-in-up">
//           <div className="resume-card hover-lift language-card">
//             <div className="resume-icon">🌐</div>
//             <h3 className="resume-card-title">Languages</h3>
//             <div className="languages-list">
//               <span className="language-pill">Hindi</span>
//               <span className="language-pill">English</span>
//               <span className="language-pill">Nepali</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


export default function Resume() {
  const awsSkills = [
    "EC2", "S3", "Lambda", "RDS", "DynamoDB",
    "VPC", "CloudFront", "Route 53", "IAM", "CloudWatch",
    "CloudFormation", "ELB", "Auto Scaling", "SNS", "SQS",
  ];

  const devSkills = ["Python", "C++", "C", "Bash", "Terraform"];

  return (
    <section id="resume" className="resume-section">
      <div className="container">

        {/* ── Section Header ── */}
        <h2 className="section-heading">Resume</h2>
        <p className="section-subheading">
          My educational background and professional experience
        </p>

        {/* ── Top 3 Cards ── */}
        <div className="grid-3" style={{ marginBottom: "1.75rem" }}>

          {/* Education */}
          <div className="resume-card">
            <span className="resume-card-icon">🎓</span>
            <h3 className="resume-card-heading">Education</h3>

            <span className="resume-institution">
              Kathford International College of Engineering and Management
            </span>
            <p className="resume-text" style={{ margin: "0.4rem 0" }}>
              Bachelor's Degree in Engineering
            </p>
            <span className="resume-year">2022 – 2026</span>
          </div>

          {/* Experience */}
          <div className="resume-card">
            <span className="resume-card-icon">💼</span>
            <h3 className="resume-card-heading">Experience</h3>

            {/* Easypr */}
            <span className="resume-label">DevOps Engineer</span>
            <p className="resume-text" style={{ marginBottom: "0.2rem" }}>
              <strong>Easypr</strong>
            </p>
            <p className="resume-text" style={{ marginBottom: "1rem" }}>
              Streamlining deployment pipelines and managing cloud infrastructure.
            </p>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: "var(--color-border)",
                margin: "0.75rem 0",
              }}
            />

            {/* Self projects */}
            <span className="resume-label">Self-Placed Projects & Learning</span>
            <p className="resume-text">
              Designed and implemented scalable AWS cloud solutions and full-stack
              projects independently.
            </p>
          </div>

          {/* Skills */}
          <div className="resume-card">
            <span className="resume-card-icon">⚙️</span>
            <h3 className="resume-card-heading">Skills</h3>

            <span className="resume-label">AWS Cloud Services</span>
            <div className="tag-list" style={{ justifyContent: "flex-start", marginBottom: "1rem" }}>
              {awsSkills.map((s) => (
                <span key={s} className="tag" style={{ fontSize: "0.72rem", padding: "0.2rem 0.65rem" }}>
                  {s}
                </span>
              ))}
            </div>

            <span className="resume-label">Programming Languages</span>
            <div className="tag-list" style={{ justifyContent: "flex-start" }}>
              {devSkills.map((s) => (
                <span
                  key={s}
                  className="tag"
                  style={{
                    fontSize: "0.72rem",
                    padding: "0.2rem 0.65rem",
                    background: "var(--color-secondary)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Languages Card (centered, half-width) ── */}
        <div style={{ maxWidth: "420px", margin: "0 auto" }}>
          <div className="resume-card" style={{ textAlign: "center" }}>
            <span className="resume-card-icon">🌐</span>
            <h3 className="resume-card-heading">Languages</h3>
            <div className="tag-list" style={{ justifyContent: "center", marginTop: "0.5rem" }}>
              {["Nepali", "Hindi", "English"].map((lang) => (
                <span
                  key={lang}
                  className="tag"
                  style={{ background: "var(--color-secondary)", fontSize: "0.85rem" }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}