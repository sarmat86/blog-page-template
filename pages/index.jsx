import { useEffect, useContext } from 'react';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Layout from '../components/Layout/Layout';
import ArticleTile from '../components/Article/ArticleTile/ArticleTile';
import request from '../lib/datocms';
import Context from '../src/context/context';
import TopHeader from '../components/Layout/TopHeader/TopHeader';

const ALL_ARTICLES_QUERY = gql`
{
  allArticles {
    id
    title
    slug
    shortDescription
    categories{
      id
      name
    }
    labels
    seo: _seoMetaTags {
      attributes
      content
      tag
    }
    thumbnails{
      url
      title
      height
    }
    createdAt
    tags{
      description,
      title,
    }
  }
}`;

const Home = ({ data }) => {
  const { getVotesData } = useContext(Context);
  const { allArticles } = data;
  const articleIds = allArticles.map((article) => article.id);
  useEffect(() => {
    getVotesData(articleIds);
  }, []);
  const articlesToRender = allArticles
    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
    .map((article) => (
      <ArticleTile
        key={article.id}
        id={article.id}
        title={article.title}
        shortDescription={article.shortDescription}
        slug={article.slug}
        thumbnails={article.thumbnails}
        rate={article.rate}
        categories={article.categories}
        createdAt={article.createdAt.substring(0, article.createdAt.indexOf('T'))}
      />
    ));
  return (
    <Layout
      title="lorem ipsum"
    >
      <TopHeader />
      {articlesToRender}
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
}
