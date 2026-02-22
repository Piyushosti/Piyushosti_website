// export default function Projects() {
//   const projectData = [
//     {
//       title: "Static Website Hosting on AWS",
//       description: "Designed and deployed a responsive static portfolio website using Amazon S3, integrated with CloudFront and Route 53.",
//       icon: "☁️",
//       tags: ["S3", "CloudFront", "Route 53"]
//     },
//     {
//       title: "Network Security & VPC Configuration",
//       description: "Implemented secure and scalable VPC architectures by configuring subnets, NAT gateways, and security groups.",
//       icon: "🔒",
//       tags: ["VPC", "Security Groups", "NAT Gateway"]
//     },
//     {
//       title: "Auto Scaling & Load Balancing",
//       description: "Built resilient applications with Auto Scaling groups and Elastic Load Balancers for seamless scaling.",
//       icon: "⚡",
//       tags: ["Auto Scaling", "ELB", "High Availability"]
//     },
//     {
//       title: "Database Management with DynamoDB & RDS",
//       description: "Designed and managed data solutions ensuring availability, automated backups, and optimization.",
//       icon: "🗄️",
//       tags: ["DynamoDB", "RDS", "Backups"]
//     },
//     {
//       title: "Monitoring & Optimization",
//       description: "Configured CloudWatch, CloudFront, and proactive alerting for infrastructure performance management.",
//       icon: "📊",
//       tags: ["CloudWatch", "Monitoring", "Alerts"]
//     },
//     {
//       title: "Sentiment Analysis from Customer Calls",
//       description: "Developed a fully automated voice analytics pipeline that converts customer call recordings into insights using AWS AI.",
//       icon: "🎧",
//       tags: ["Amazon Transcribe", "Amazon Comprehend", "AWS Lambda", "S3"]
//     }
//   ];

//   return (
//     <div className="projects-grid">
//       {projectData.map((project, index) => (
//         <div key={index} className="project-card hover-lift animate-fade-in-up">
//           <div className="project-icon">{project.icon}</div>
//           <h3 className="project-title">{project.title}</h3>
//           <p className="project-description">{project.description}</p>
//           <div className="project-tags">
//             {project.tags.map((tag, tIndex) => (
//               <span key={tIndex} className="tag">{tag}</span>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


export default function Projects() {
  const projectData = [
    {
      title: "Static Website Hosting on AWS",
      description:
        "Designed and deployed a responsive static portfolio website using Amazon S3, integrated with CloudFront and Route 53.",
      icon: "☁️",
      tags: ["S3", "CloudFront", "Route 53"],
    },
    {
      title: "Network Security & VPC Configuration",
      description:
        "Implemented secure and scalable VPC architectures by configuring subnets, NAT gateways, and security groups.",
      icon: "🔒",
      tags: ["VPC", "Security Groups", "NAT Gateway"],
    },
    {
      title: "Auto Scaling & Load Balancing",
      description:
        "Built resilient applications with Auto Scaling groups and Elastic Load Balancers for seamless scaling.",
      icon: "⚡",
      tags: ["Auto Scaling", "ELB", "High Availability"],
    },
    {
      title: "Database Management with DynamoDB & RDS",
      description:
        "Designed and managed data solutions ensuring availability, automated backups, and optimization.",
      icon: "🗄️",
      tags: ["DynamoDB", "RDS", "Backups"],
    },
    {
      title: "Monitoring & Optimization",
      description:
        "Configured CloudWatch, CloudFront, and proactive alerting for infrastructure performance management.",
      icon: "📊",
      tags: ["CloudWatch", "Monitoring", "Alerts"],
    },
    {
      title: "Sentiment Analysis from Customer Calls",
      description:
        "Developed a fully automated voice analytics pipeline that converts customer call recordings into valuable business insights using AWS AI services.",
      icon: "🎧",
      tags: ["Amazon Transcribe", "Amazon Comprehend", "AWS Lambda", "S3"],
    },
  ];

  return (
    <div className="grid-3">
      {projectData.map((project, index) => (
        <div key={index} className="card" style={{ textAlign: "center" }}>
          {/* Icon */}
          <span className="card-icon">{project.icon}</span>

          {/* Title */}
          <h3 className="card-title">{project.title}</h3>

          {/* Description */}
          <p className="card-description">{project.description}</p>

          {/* Tags */}
          <div className="tag-list">
            {project.tags.map((tag, tIndex) => (
              <span key={tIndex} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}