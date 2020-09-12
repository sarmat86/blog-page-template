import { useEffect, useContext } from 'react';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout/Layout';
import request from '../../lib/datocms';
import ArticleList from '../../components/ArticleList/ArticleList';
import getBlogCategories from '../../lib/getBlogCategories';
import Context from '../../src/context/context';

const ARTICLES_QUERY = gql`
query articleQuery($id: [ItemId]) {
    allArticles(filter: { 
      categories: { 
        allIn: $id
      }
     }){
      id
      title
      slug
      categories{
        name
        id
      }
      labels
      shortDescription
      content
      sources
      thumbnails{
          url
          title
          height
        }
      video{
          height
          provider
          title
          url
          width
        }
      seo: _seoMetaTags {
          attributes
          content
          tag
        }
      createdAt
      tags{
          description,
          title,
        }
  }
}`;

export async function getStaticPaths() {
  const allCategories = await getBlogCategories();
  const paths = allCategories.map((category) => (
    {
      params: {
        category: category.name,
      },
    }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const allCategories = await getBlogCategories();
  const currentCategory = allCategories
    .find((cat) => cat.name === params.category);
  // get all articles by current category
  const articlesResponse = await request({
    query: ARTICLES_QUERY,
    variables: {
      id: [currentCategory.id],
    },
  });
  return {
    props: {
      data: articlesResponse.data,
      allCategories,
      activeCategory: {
        name: currentCategory.name,
        id: currentCategory.id,
      },
    },
  };
}

const CategoryArticles = ({ data, activeCategory, allCategories }) => {
  const { updateCategories, categoriesState } = useContext(Context);
  useEffect(() => {
    if (!categoriesState.length && allCategories.length) {
      updateCategories(allCategories);
    }
  }, []);
  return (
    <Layout
      title={activeCategory.name}
      seo={data.seo}
    >
      <h1 style={{ textAlign: 'right' }}>
        #
        {activeCategory.name}
      </h1>
      <ArticleList
        articles={data.allArticles}
        activeCategory={activeCategory.id}
      />
    </Layout>
  );
};
CategoryArticles.defaultProps = {
  allCategories: [],
};

CategoryArticles.propTypes = {
  data: PropTypes.shape({
    allArticles: PropTypes.arrayOf(PropTypes.object.isRequired),
    seo: PropTypes.arrayOf(PropTypes.object.isRequired),
  }).isRequired,
  activeCategory: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  allCategories: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default CategoryArticles;
