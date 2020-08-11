import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

function About() {
  return (
    <Layout heading="About" slug="about">
      <SEO title="About" />
      <article className="entry" lang="en">
        <div className="entry-content">
          Hi, there! I am Agastya, and these are my web-logs.
        </div>
      </article>
    </Layout>
  );
}

export default About;
