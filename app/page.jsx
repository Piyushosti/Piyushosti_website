import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Certifications from "../components/Certifications";
import Resume from "../components/Resume";
import Contact from "../components/Contact";

export default function Page() {
  return (
    <main>
      {/* Hero Section: The first thing visitors see */}
      <Hero />

      {/* About Section: The clean, centered card layout we designed */}
      <About />

      {/* Projects Section: Showcasing your AWS work */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <h2 className="section-heading">Featured Projects</h2>
            <p className="section-subheading">
              Real-world AWS cloud solutions I've designed and implemented
            </p>
          </div>
          <Projects />
        </div>
      </section>

      {/* Certifications Section: Displaying your AWS badges */}
      <section id="certifications" className="certifications">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <h2 className="section-heading">Certifications & Badges</h2>
            <p className="section-subheading">Professional AWS certifications and learning achievements</p>
          </div>
          <Certifications />
        </div>
      </section>

      {/* Resume Section: Education and Skills */}
      <Resume />

      {/* Contact Section: Lead generation for your cloud services */}
      <Contact />
    </main>
  );
}