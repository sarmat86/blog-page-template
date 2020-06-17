import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Layout from '../components/Layout/Layout';
import ArticleTile from '../components/Article/ArticleTile/ArticleTile';
import request from '../lib/datocms';

const ALL_ARTICLES_QUERY = gql`
{
  allArticles {
    id
    title
    shortDescription
    slug
    thumbnail{
      url
      title
    }
    rate
    createdAt
    tags{
      description,
      title,
    }
  }
}`;

const Home = ({ data }) => {
  const { allArticles } = data;
  const articles = allArticles.map((article) => (
    <ArticleTile
      key={article.id}
      id={article.id}
      title={article.title}
      shortDescription={article.shortDescription}
      slug={article.slug}
      imgUrl={article.thumbnail.url}
      rate={article.rate}
      createdAt={article.createdAt}
    />
  ));
  return (
    <Layout>
      {articles}
    </Layout>
  );
};
Home.propTypes = {
  data: PropTypes.shape({
    allArticles: PropTypes.arrayOf(PropTypes.object.isRequired),
  }).isRequired,
};
export default Home;

export async function getStaticProps() {
  const response = await request({
    query: ALL_ARTICLES_QUERY,
  });
  return {
    props: {
      data: response.data,
    },
  };
};
