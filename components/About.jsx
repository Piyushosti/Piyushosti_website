// export default function About() {
//   return (
//     <section id="about" className="about">
//       <div className="container">
//         <div className="about-content animate-fade-in-up">
//           <h2 className="section-title">About Me</h2>
//           <div className="about-card hover-lift">
//             <p className="about-text">
//               Passionate Cloud Solution Architect with a strong focus on <strong>AWS Cloud</strong>. 
//               Skilled in designing and implementing scalable solutions, with hands-on expertise 
//               across core AWS services. Continuously enhancing cloud expertise through 
//               AWS learning achievements and practical projects. Enthusiastic about 
//               leveraging cloud technologies to solve real-world challenges and drive 
//               innovation.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


export default function About() {
  const stats = [
    { value: "10+", label: "AWS Projects", icon: "☁️" },
    { value: "6",   label: "Certifications", icon: "🏅" },
    { value: "3+",  label: "Years Learning", icon: "📚" },
  ];

  const skills = [
    { category: "Compute & Storage", icon: "⚡", tags: ["EC2", "Lambda", "S3", "EBS", "EFS"] },
    { category: "Networking",        icon: "🌐", tags: ["VPC", "Route 53", "CloudFront", "ELB", "NAT Gateway"] },
    { category: "Database",          icon: "🗄️", tags: ["RDS", "DynamoDB", "Aurora", "ElastiCache"] },
    { category: "Security & IAM",    icon: "🔒", tags: ["IAM", "KMS", "WAF", "Shield", "GuardDuty"] },
    { category: "DevOps & CI/CD",    icon: "🔧", tags: ["CodePipeline", "CodeDeploy", "CloudFormation", "Terraform"] },
    { category: "Monitoring",        icon: "📊", tags: ["CloudWatch", "CloudTrail", "Config", "X-Ray"] },
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">

        {/* ── Section Header ── */}
        <h2 className="section-heading">About Me</h2>
        <p className="section-subheading">
          Passionate cloud engineer building scalable solutions on AWS
        </p>

        {/* ── Bio Card ── */}
        <div className="about-card">
          <p>
            Passionate Cloud Solution Architect with a strong focus on{" "}
            <strong style={{ color: "var(--color-primary)" }}>AWS Cloud</strong>.
            Skilled in designing and implementing scalable solutions, with hands-on
            expertise across core AWS services. Continuously enhancing cloud expertise
            through AWS learning achievements and practical projects. Enthusiastic about
            leveraging cloud technologies to solve real-world challenges and drive
            innovation.
          </p>
        </div>

        {/* ── Stats Row ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            maxWidth: "700px",
            margin: "2.5rem auto",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="card"
              style={{ textAlign: "center", padding: "1.75rem 1rem" }}
            >
              <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>
                {s.icon}
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "2rem",
                  fontWeight: "800",
                  color: "var(--color-primary)",
                  lineHeight: 1,
                  marginBottom: "0.35rem",
                }}
              >
                {s.value}
              </span>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "var(--color-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Skills Grid ── */}
        <h3
          style={{
            textAlign: "center",
            fontSize: "1.4rem",
            fontWeight: "700",
            marginBottom: "1.75rem",
            color: "var(--color-text)",
          }}
        >
          AWS Skills &amp; Services
        </h3>

        <div className="grid-3">
          {skills.map((skill) => (
            <div key={skill.category} className="card" style={{ textAlign: "center" }}>
              <span className="card-icon">{skill.icon}</span>
              <h4 className="card-title">{skill.category}</h4>
              <div className="tag-list">
                {skill.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}