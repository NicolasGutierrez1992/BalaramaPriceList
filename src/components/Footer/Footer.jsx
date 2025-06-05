import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Balarama. Todos los derechos
        reservados.
      </p>
    </footer>
  );
};

export default Footer;
