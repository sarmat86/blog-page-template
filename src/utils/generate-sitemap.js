const ApolloBoost = require('apollo-boost');
const { gql } = require('apollo-boost');
const fs = require('fs');

const paths = {
  root: 'http://localhost:3000',
  articles: '/articles',
  contact: '/contact',
};

const ALL_ARTICLES_QUERY = gql`
{
  allArticles {
    slug
  }
}`;
const ApolloClient = ApolloBoost.default;
(async () => {
  const request = ({ query }) => {
    const endpoint = 'https://graphql.datocms.com/';
    const client = new ApolloClient({
      uri: endpoint,
      headers: {
        authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      },
    });
    return client.query({
      query,
    });
  };
  const response = await request({
    query: ALL_ARTICLES_QUERY,
  });
  const urls = response.data.allArticles.map((item) => `
  <url>
    <loc>${paths.root}${paths.articles}/${item.slug}</loc>
  </url>`);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join('')}
  <url>
    <loc>${paths.root}${paths.contact}</loc>
  </url>
  </urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
})();
