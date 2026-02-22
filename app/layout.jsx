import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Piyush Osti | AWS Cloud Engineer",
  description: "Professional AWS Cloud Engineer portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <footer className="footer">
          <div className="container">
            <p className="footer-text">&copy; 2025 Piyush Osti. All Rights Reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}