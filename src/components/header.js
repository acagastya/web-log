/* eslint-disable eqeqeq */

import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { siteMetadata } from '../../gatsby-config';

const { repo } = siteMetadata;
function Header({
  description,
  link = `/${repo}`,
  showHeader,
  siteTitle,
  slug,
}) {
  return (
    <header id="header" className="header-container">
      <div className="header site-header">
        <nav
          id="main-menu"
          className="main-menu-container"
          aria-label="Main Menu"
        >
          <ul className="main-menu">
            <li>
              {slug == 'logs' ? (
                <BoldEntry text="Logs" />
              ) : (
                <Link to={`/${repo}`}>Logs</Link>
              )}
            </li>
            <li>
              {slug == 'about' ? (
                <BoldEntry text="About" />
              ) : (
                <Link to={`/${repo}/about`}>About</Link>
              )}
            </li>
          </ul>
        </nav>

        {showHeader && (
          <div className="header-info">
            <p className="site-title title">
              <Link to={link}>{siteTitle}</Link>
            </p>
            {siteTitle == 'Logs' && (
              <p className="site-description subtitle">{description}</p>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

function BoldEntry({ text = '' }) {
  return <span style={{ fontWeight: 700, cursor: 'default' }}>{text}</span>;
}

export default Header;
