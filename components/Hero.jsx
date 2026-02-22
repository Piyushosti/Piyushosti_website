// export default function Hero() {
//   return (
//     <header id="home" className="hero">
//       <div className="hero-background">
//         <div className="hero-decoration-1"></div>
//         <div className="hero-decoration-2"></div>
//       </div>
//       <div className="hero-content animate-fade-in-up">
//         <div className="hero-image-container">
//           <img src="/Piyush-osti-Cloud Engineer-photo.jpg" alt="Piyush Osti" className="hero-img animate-pulse-glow" />
//         </div>
//         <h1 className="hero-title">
//           Welcome, <span className="hero-title-gradient">I'M Piyush Osti</span>
//           Cloud and Devops Engineer
//         </h1>
//         <p className="hero-subtitle">I design, build, and optimize scalable cloud solutions on AWS.</p>
//         <div className="hero-buttons">
//           <a href="#projects" className="btn btn-primary">View My Projects</a>
//           <a href="https://linkedin.com/..." target="_blank" className="btn btn-outline">LinkedIn Profile</a>
//         </div>
//       </div>
//     </header>
//   );
// }
import VisitorCounter from "./VisitorCounter";

export default function Hero() {
  return (
    <header id="home" className="hero">
      <div className="hero-content">

        {/* Profile Image - centered via text-align:center on parent */}
        <img
          src="/Piyush-osti-Cloud Engineer-photo.jpg"
          alt="Piyush Osti"
          className="hero-img"
        />

        {/* Title block:
            Line 1: "Welcome,"            white
            Line 2: "I'M Piyush Osti"    orange gradient
            Line 3: "Cloud and Devops Engineer"  white
        */}
        <h1 className="hero-title">Welcome,</h1>
        <h1 className="hero-title-gradient">I'M Piyush Osti</h1>
        <h1 className="hero-subtitle-role">Cloud and Devops Engineer</h1>

        {/* Description */}
        <p className="hero-description">
          I design, build, and optimize scalable cloud solutions on AWS to help
          businesses run smarter, faster, and more securely.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">
            View My Projects
          </a>
          <a
            href="https://linkedin.com/in/piyush-osti"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            LinkedIn Profile
          </a>
        </div>
        {/* Visitor Counter */}
      </div>
    </header>
  );
}