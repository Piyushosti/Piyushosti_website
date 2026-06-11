
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
        <h1 className="hero-title hero-text-appear">Welcome,</h1>
        <h1 className="hero-title-gradient hero-text-appear">I'M Piyush Osti</h1>
        <h1 className="hero-subtitle-role hero-text-appear">Cloud and Devops Engineer</h1>

        {/* Description */}
        <p className="hero-description">
          I design, build, and optimize scalable cloud solutions on AWS to help
          businesses run smarter, faster, and more securely.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">
            View My Projectss
          </a>
          <a
            href="https://www.linkedin.com/in/piyush-osti-5339a9242"
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