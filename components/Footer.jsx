import React from 'react';
import Logo from './Logo';

const Footer = () => (
  <footer className="bg-light p-3 text-center" data-testid="footer">
    <Logo testId="footer-logo" />
    <p data-testid="footer-text">
      Sample project provided by <a href="https://auth0.com">Auth0</a>
    </p>
  </footer>
);

export default Footer;
