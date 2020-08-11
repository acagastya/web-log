import React from 'react';
import PropTypes from 'prop-types';
import Icon from './partials/Icon';
import { EmailSVG } from './partials/SVGIcon';

function Footer({ author, email }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="footer" className="footer-container">
      <div className="footer">
        <div className="social-menu-container">
          <nav aria-label="Social Menu">
            <ul className="social-menu">
              <li>
                <Icon
                  link={`mailto:${email}`}
                  text="Contact via Email"
                  SVG={EmailSVG}
                />
              </li>
            </ul>
          </nav>
        </div>
        <div className="copyright">
          <p>
            © {currentYear} {author}
          </p>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  author: PropTypes.string,
  email: PropTypes.string,
};

Footer.defaultProps = {
  author: 'Agastya',
  email: 'me@hanabi.in',
};

export default Footer;
