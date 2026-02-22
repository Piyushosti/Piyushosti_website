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



"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // On homepage: smooth scroll anchor. On other pages: go home then scroll.
  const href = (anchor) => isHome ? `#${anchor}` : `/#${anchor}`;

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* Logo — always goes home */}
        <a href={href("home")} className="nav-logo">Piyush Osti</a>

        <div className="nav-right-group">
          <div className="nav-links">
            <a href={href("home")}             className="nav-link">Home</a>
            <a href={href("about")}            className="nav-link">About</a>
            <a href={href("projects")}         className="nav-link">Projects</a>
            <a href={href("certifications")}   className="nav-link">Certifications</a>
            <a href={href("resume")}           className="nav-link">Resume</a>
            <a href={href("contact")}          className="nav-link">Contact</a>
            <Link
              href="/blog"
              className={`nav-link ${pathname.startsWith("/blog") ? "active" : ""}`}
            >
              Blog
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
}