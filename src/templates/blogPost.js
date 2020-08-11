import React from 'react';
import { graphql, Link } from 'gatsby';
import moment from 'moment';
import Layout from '../components/layout';

import SEO from '../components/seo';
import {
  CalendarSVG,
  CategorySVG,
  NextSVG,
  PrevSVG,
  TagSVG,
} from '../components/partials/SVGIcon';
import { siteMetadata } from '../../gatsby-config';

const { repo } = siteMetadata;

function Template({ data, pageContext }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const {
    categories,
    cover,
    date,
    lang = 'en',
    path,
    tags,
    title,
  } = frontmatter;
  const { siteUrl } = data.site.siteMetadata;
  const { next, prev } = pageContext;
  const momentDate = moment(date);
  const parsedDate = momentDate.format('MMM DD, YYYY');
  const ISODate = momentDate.toISOString();

  return (
    <Layout showHeader={false} heading={title}>
      <SEO cover={cover} blog={true} path={path} tags={tags} title={title} />
      <Article
        categories={categories}
        html={html}
        ISODate={ISODate}
        lang={lang}
        parsedDate={parsedDate}
        tags={tags}
        title={title}
      />
      <EntryNavContainer next={next} prev={prev} />
    </Layout>
  );
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        categories
        cover
        date
        lang
        path
        tags
        title
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

function Article({ categories, html, ISODate, lang, parsedDate, tags, title }) {
  return (
    <article lang={lang} className="entry">
      <Header parsedDate={parsedDate} title={title} />
      <div
        className="entry-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Footer categories={categories} tags={tags} />
    </article>
  );
}

function Footer({ categories, tags }) {
  return (
    <footer className="entry-footer-container">
      <div className="entry-footer">
        {categories.length ? (
          <div className="categories">
            <span className="taxonomyTerm-icon">
              <CategorySVG />
            </span>
            <span className="screen-reader">Categories: </span>
            {categories.map((category, index) => {
              return (
                <React.Fragment key={category}>
                  <Link className="category" to={`/categories/${category}`}>
                    {category}
                  </Link>
                  {index < categories.length - 1 ? ', ' : ' '}
                </React.Fragment>
              );
            })}
          </div>
        ) : null}
        {tags.length ? (
          <div className="tags">
            <span className="taxonomyTerm-icon">
              <TagSVG />
            </span>
            <span className="screen-reader">Tags: </span>
            {tags.map((tag, index) => {
              return (
                <React.Fragment key={tag}>
                  <Link className="tag" to={`/tags/${tag}`}>
                    {tag}
                  </Link>
                  {index < tags.length - 1 ? ', ' : ' '}
                </React.Fragment>
              );
            })}
          </div>
        ) : null}
      </div>
    </footer>
  );
}

function Header({ email, ISODate, parsedDate, title, username }) {
  return (
    <header className="header-container">
      <div className="header entry-header">
        <div className="header-info">
          <h1 className="title">{title}</h1>
        </div>
        <div className="meta">
          <PostedOn ISODate={ISODate} parsedDate={parsedDate} />
        </div>
      </div>
    </header>
  );
}

function EntryNavContainer({ next, prev }) {
  return (
    <nav className="entry-nav-container">
      <div className="entry-nav">
        {prev && (
          <PrevEntry
            slug={prev.frontmatter.path}
            title={prev.frontmatter.title}
          />
        )}
        {next && (
          <NextEntry
            slug={next.frontmatter.path}
            title={next.frontmatter.title}
          />
        )}
      </div>
    </nav>
  );
}

function PostedOn({ ISODate, parsedDate }) {
  return (
    <span className="posted-on">
      <CalendarSVG />
      <span className="screen-reader">Posted on </span>
      <time className="date" dateTime={ISODate}>
        {parsedDate}
      </time>
    </span>
  );
}

function NextEntry({ slug, title }) {
  return (
    <div className="next-entry">
      <Link to={`/logs${slug}`}>
        <span className="screen-reader">Next log: </span>
        {title}
        <span aria-hidden="true">
          Next
          <NextSVG />
        </span>
      </Link>
    </div>
  );
}

function PrevEntry({ slug, title }) {
  return (
    <div className="prev-entry">
      <Link to={`/logs${slug}`}>
        <span aria-hidden="true">
          <PrevSVG />
          Previous
        </span>
        <span className="screen-reader">Previous log: </span>
        {title}
      </Link>
    </div>
  );
}

export default Template;
