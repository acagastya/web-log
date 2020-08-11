const path = require('path');

const createTagPages = function(createPage, posts) {
  const allTagsTemplate = path.resolve(
    'src',
    'templates',
    'allTagsTemplate.js'
  );
  const singleTagTemplate = path.resolve(
    'src',
    'templates',
    'singleTagTemplate.js'
  );
  const postsByTag = {};
  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsByTag[tag]) postsByTag[tag] = [];
        postsByTag[tag].push(node);
      });
    }
  });
  const tags = Object.keys(postsByTag);

  createPage({
    path: '/tags',
    component: allTagsTemplate,
    context: { tags, postsByTag },
  });

  tags.forEach(tag => {
    const posts = postsByTag[tag];
    createPage({
      path: `/tags/${tag}`,
      component: singleTagTemplate,
      context: {
        posts,
        tag,
      },
    });
  });
};

const createCatPages = function(createPage, posts) {
  const allCatsTemplate = path.resolve(
    'src',
    'templates',
    'allCatsTemplate.js'
  );
  const singleCatTemplate = path.resolve(
    'src',
    'templates',
    'singleCatTemplate.js'
  );
  const postsByCat = {};
  posts.forEach(({ node }) => {
    if (node.frontmatter.categories) {
      node.frontmatter.categories.forEach(cat => {
        if (!postsByCat[cat]) postsByCat[cat] = [];
        postsByCat[cat].push(node);
      });
    }
  });
  const cats = Object.keys(postsByCat);

  createPage({
    path: '/categories/',
    component: allCatsTemplate,
    context: { cats, postsByCat },
  });

  cats.forEach(cat => {
    const posts = postsByCat[cat];
    createPage({
      path: `/categories/${cat}`,
      component: singleCatTemplate,
      context: {
        cat,
        posts,
      },
    });
  });
};

exports.createPages = function({ graphql, actions }) {
  const { createPage } = actions;

  return new Promise(function(resolve, reject) {
    const blogPostTemplate = path.resolve('src', 'templates', 'blogPost.js');
    resolve(
      graphql(
        `
          query {
            allMarkdownRemark(
              sort: { order: DESC, fields: [frontmatter___date] }
              filter: { frontmatter: { draft: { ne: true } } }
            ) {
              edges {
                node {
                  frontmatter {
                    categories
                    date
                    path
                    tags
                    title
                  }
                }
              }
            }
          }
        `
      ).then(function(result) {
        const posts = result.data.allMarkdownRemark.edges;
        createTagPages(createPage, posts);
        createCatPages(createPage, posts);
        posts.forEach(function({ node }, index) {
          createPage({
            path: 'logs' + node.frontmatter.path,
            component: blogPostTemplate,
            context: {
              pathSlug: node.frontmatter.path,
              prev: index == posts.length - 1 ? null : posts[index + 1].node,
              next: index == 0 ? null : posts[index - 1].node,
            },
          });
          resolve();
        });
      })
    );
  });
};
