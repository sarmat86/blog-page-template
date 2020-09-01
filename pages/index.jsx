import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Layout from '../components/Layout/Layout';
import ArticleList from '../components/ArticleList/ArticleList';
import request from '../lib/datocms';
import TopHeader from '../components/Layout/TopHeader/TopHeader';
import getBlogCategories from '../lib/getBlogCategories';

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

const Home = ({ data }) => (
  <Layout
    title="Main Page"
  >
    <TopHeader />
    <ArticleList
      articles={data.allArticles}
    />
  </Layout>
);
Home.propTypes = {
  data: PropTypes.shape({
    allArticles: PropTypes.arrayOf(PropTypes.object.isRequired),
  }).isRequired,
};
export default Home;

export async function getStaticProps() {
  const allCategories = await getBlogCategories(false);
  const response = await request({
    query: ALL_ARTICLES_QUERY,
  });
  return {
    props: {
      data: response.data,
      allCategories,
    },
  };
}
