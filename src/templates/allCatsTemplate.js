import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { siteMetadata } from '../../gatsby-config';

const { repo } = siteMetadata;

function AllCatsTemplate({ pageContext }) {
  console.log(pageContext);
  const { cats, postsByCat } = pageContext;
  const count = Object.values(postsByCat).map(el => el.length);
  const [max, min] = [Math.max(...count), Math.min(...count)];
  cats.sort(function(str1, str2) {
    return str1.toLowerCase().localeCompare(str2.toLowerCase());
  });
  return (
    <Layout heading="Categories" slug="categories">
      <SEO title="Categories" />
      <div className="term-cloud-container">
        <ul className="term-cloud">
          {cats.map(cat => {
            const numerator = postsByCat[cat].length - min;
            const denominator = max - min;
            const num = denominator ? numerator / denominator : 1;
            const weight = 100 * Math.round((2 * numerator) / denominator + 3);
            return (
              <li key={cat}>
                <Link
                  to={`/${repo}/categories/${cat}`}
                  style={{ fontSize: `${1 + num}em`, fontWeight: `${weight}` }}
                >
                  {cat}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}

export default AllCatsTemplate;
