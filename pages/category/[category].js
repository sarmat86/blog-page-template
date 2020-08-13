import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout/Layout';
import request from '../../lib/datocms';
import ArticleList from '../../components/ArticleList/ArticleList';

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
const CATEGORIES_PATH_QUERY = gql`
{
  allCategories{
    name
    id
  }
}`;
const CATEGORY_ARTICLES_QUERY = gql`
query articleQuery($name: String) {
    category(filter: {
      name: {
        eq: $name
      }
    }){
      name
      id
    } 
}`;

const CategoryArticles = ({ data, activeCategory }) => {
  return (
    <Layout
      title={activeCategory.name}
      seo={data.seo}
    >
      <h1 style={{textAlign: 'right'}}>
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
CategoryArticles.propTypes = {
  data: PropTypes.shape({
    allArticles: PropTypes.arrayOf(PropTypes.object.isRequired),
    seo: PropTypes.arrayOf(PropTypes.object.isRequired),
  }).isRequired,
  activeCategory: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryArticles;

export async function getStaticPaths() {
  const response = await request({
    query: CATEGORIES_PATH_QUERY,
  });
  const paths = response.data.allCategories.map((category) => (
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
  const data = await request({
    query: CATEGORY_ARTICLES_QUERY,
    variables: {
      name: params.category,
    },
  });
  const response = await request({
    query: ARTICLES_QUERY,
    variables: {
      id: [data.data.category.id],
    },
  });
  return {
    props: {
      data: response.data,
      activeCategory: {
        name: data.data.category.name,
        id: data.data.category.id,
      },
    },
  };
}
