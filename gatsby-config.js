const path = require('path');
module.exports = {
  siteMetadata: {
    author: 'Agastya Chandrakant',
    description: 'Web-log',
    email: 'acagastya@outlook.com',
    github: 'acagastya',
    repo: 'web-log',
    siteName: 'Web-log',
    siteUrl: 'https://acagastya.github.io/web-log/',
    title: 'Web-log',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'logs',
        path: path.join(__dirname, 'web-log'),
      },
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              className: 'autolink-header-anchor',
            },
          },
          'gatsby-remark-mermaid',
          {
            resolve: 'gatsby-remark-katex',
            options: {
              strict: 'ignore',
            },
          },
          {
            resolve: 'gatsby-remark-footnotes',
            options: {
              footnoteBackRefAnchorStyle: 'text-decoration: none; border: none',
              footnoteBackRefDisplay: 'inline',
              // footnoteBackRefInnerText: '^',
              footnoteBackRefPreviousElementDisplay: 'inline',
              useFootnoteMarkerText: false,
            },
          },
          'gatsby-remark-abbr',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: '›',
              noInlineHighlight: false,
              showLineNumbers: true,
              prompt: {
                user: 'john',
                host: 'doe',
                global: false,
              },
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'images'),
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Agastya',
        short_name: 'Web-log',
        start_url: '/',
        background_color: '#324996',
        theme_color: '#298BCC',
        display: 'minimal-ui',
        icon: './images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'web-log',
        path: path.join(__dirname, 'web-log'),
      },
    },
  ],
};
