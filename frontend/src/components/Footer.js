import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <p className="footer__copyright">© {currentYear} Mesto Russia</p>
    </div>
  );
}

export default Footer;
