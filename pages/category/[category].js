import { useContext, useEffect } from 'react';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout/Layout';
import ArticleTile from '../../components/Article/ArticleTile/ArticleTile';
import request from '../../lib/datocms';
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
        activeCategory={activeCategory.id}
        createdAt={article.createdAt.substring(0, article.createdAt.indexOf('T'))}
      />
    ));
  return (
    <Layout
      title={activeCategory.name}
    >
      <h1 style={{textAlign: 'right'}}>
        #
        {activeCategory.name}
      </h1>
      {articlesToRender}
    </Layout>
  );
};
CategoryArticles.propTypes = {
  data: PropTypes.shape({
    allArticles: PropTypes.arrayOf(PropTypes.object.isRequired),
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
