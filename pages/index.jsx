import { useEffect, useContext } from 'react';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Layout from '../components/Layout/Layout';
import ArticleList from '../components/ArticleList/ArticleList';
import request from '../lib/datocms';
import TopHeader from '../components/Layout/TopHeader/TopHeader';
import getBlogCategories from '../lib/getBlogCategories';
import Context from '../src/context/context';

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
const Home = ({ data, allCategories }) => {
  const { updateCategories, categoriesState } = useContext(Context);
  useEffect(() => {
    if (!categoriesState.length && allCategories.length) {
      updateCategories(allCategories);
    }
  }, []);
  return (
    <Layout
      title="Main Page"
      categories={allCategories}
      seo={data.seo}
    >
      <TopHeader />
      <ArticleList
        articles={data.allArticles}
      />
    </Layout>
  );
};
Home.defaultProps = {
  allCategories: [],
};
Home.propTypes = {
  data: PropTypes.shape({
    allArticles: PropTypes.arrayOf(PropTypes.object.isRequired),
    seo: PropTypes.arrayOf(PropTypes.object.isRequired),
  }).isRequired,
  allCategories: PropTypes.arrayOf(PropTypes.object.isRequired),
};
export default Home;
