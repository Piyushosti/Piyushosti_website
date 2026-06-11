// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <a href="#home" className="nav-logo">Piyush Osti</a>
//         <div className="nav-right-group">
//           <div className="nav-links">
//             <a href="#home" className="nav-link">Home</a>
//             <a href="#about" className="nav-link">About</a>
//             <a href="#projects" className="nav-link">Projects</a>
//             <a href="#certifications" className="nav-link">Certifications</a>
//             <a href="#resume" className="nav-link">Resume</a>
//             <a href="#contact" className="nav-link">Contact</a>
//             <a href="/blog" className="nav-link">Blog</a>

//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }



// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function Navbar() {
//   const pathname = usePathname();
//   const isHome = pathname === "/";

//   // On homepage: smooth scroll anchor. On other pages: go home then scroll.
//   const href = (anchor) => isHome ? `#${anchor}` : `/#${anchor}`;

//   return (
//     <nav className="navbar">
//       <div className="nav-container">

//         {/* Logo — always goes home */}
//         <a href={href("home")} className="nav-logo">Piyush Osti</a>

//         <div className="nav-right-group">
//           <div className="nav-links">
//             <a href={href("home")}             className="nav-link">Home</a>
//             <a href={href("about")}            className="nav-link">About</a>
//             <a href={href("projects")}         className="nav-link">Projects</a>
//             <a href={href("certifications")}   className="nav-link">Certifications</a>
//             <a href={href("resume")}           className="nav-link">Resume</a>
//             <a href={href("contact")}          className="nav-link">Contact</a>
//             <Link
//               href="/blog"
//               className={`nav-link ${pathname.startsWith("/blog") ? "active" : ""}`}
//             >
//               Blog
//             </Link>
//           </div>
//         </div>

//       </div>
//     </nav>
//   );
// }

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Handle theme initialization and preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const href = (anchor) => isHome ? `#${anchor}` : `/#${anchor}`;

  const navItems = [
    { label: "Home",           link: href("home") },
    { label: "About",          link: href("about") },
    { label: "Projects",       link: href("projects") },
    { label: "Certifications", link: href("certifications") },
    { label: "Resume",         link: href("resume") },
    { label: "Contact",        link: href("contact") },
    { label: "Blog",           link: "/blog", isRoute: true },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">

          {/* Logo */}
          <a href={href("home")} className="nav-logo">Piyush Osti</a>

          {/* Desktop links */}
          <div className="nav-right-group">
            <div className="nav-links">
              {navItems.map((item) =>
                item.isRoute ? (
                  <Link
                    key={item.label}
                    href={item.link}
                    className={`nav-link ${pathname.startsWith("/blog") ? "active" : ""}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a key={item.label} href={item.link} className="nav-link">
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="theme-toggle"
              style={{
                background: "transparent",
                border: "none",
                fontSize: "1.25rem",
                cursor: "pointer",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                color: "var(--color-text)",
                transition: "transform 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* Hamburger button — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                display: "none",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
                width: "40px",
                height: "40px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                zIndex: 1100,
              }}
              className="hamburger-btn"
            >
              <span style={{
                display: "block", width: "24px", height: "2px",
                background: menuOpen ? "var(--color-primary)" : "var(--color-text)",
                borderRadius: "2px",
                transition: "all 0.3s",
                transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              }} />
              <span style={{
                display: "block", width: "24px", height: "2px",
                background: menuOpen ? "transparent" : "var(--color-text)",
                borderRadius: "2px",
                transition: "all 0.3s",
              }} />
              <span style={{
                display: "block", width: "24px", height: "2px",
                background: menuOpen ? "var(--color-primary)" : "var(--color-text)",
                borderRadius: "2px",
                transition: "all 0.3s",
                transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
              }} />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile fullscreen menu overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--color-bg)",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          transition: "opacity 0.3s, transform 0.3s",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-20px)",
          pointerEvents: menuOpen ? "all" : "none",
        }}
      >
        {navItems.map((item, i) =>
          item.isRoute ? (
            <Link
              key={item.label}
              href={item.link}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "1.6rem",
                fontWeight: "700",
                color: pathname.startsWith("/blog") ? "var(--color-primary)" : "#ffffff",
                textDecoration: "none",
                padding: "0.75rem 2rem",
                transition: "color 0.2s",
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.link}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "1.6rem",
                fontWeight: "700",
                color: "#ffffff",
                textDecoration: "none",
                padding: "0.75rem 2rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--color-primary)"}
              onMouseLeave={(e) => e.target.style.color = "#ffffff"}
            >
              {item.label}
            </a>
          )
        )}

        {/* Orange accent line */}
        <div style={{
          width: "60px", height: "3px",
          background: "linear-gradient(90deg, #ff6b00, #ff8533)",
          borderRadius: "2px",
          marginTop: "1rem",
        }} />
      </div>

      {/* CSS to show/hide hamburger on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .hamburger-btn { display: flex !important; }
          .nav-right-group { display: none !important; }
        }
      `}</style>
    </>
  );
}