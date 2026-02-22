export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <div className="container">
        <p className="copyright-text">
          © {currentYear} Piyush Osti. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}