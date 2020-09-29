import { useContext, useEffect } from 'react';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout/Layout';
import Article from '../../components/Article/Article';
import request from '../../lib/datocms';
import Context from '../../src/context/context';
import getBlogCategories from '../../lib/getBlogCategories';

const ARTICLE_QUERY = gql`
query articleQuery($slug: String) {
    article(filter: {slug: { eq: $slug }}){
      id
      title
      slug
      categories{
        name
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
const ARTICLES_PATH_QUERY = gql`
{
  allArticles {
    id
    slug
  }
}`;

export async function getStaticPaths() {
  const response = await request({
    query: ARTICLES_PATH_QUERY,
  });
  const paths = response.data.allArticles.map((article) => (
    {
      params: {
        slug: article.slug,
      },
    }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const response = await request({
    query: ARTICLE_QUERY,
    variables: {
      slug: params.slug,
    },
  });
  const allCategories = await getBlogCategories();
  return {
    props: {
      data: response.data.article,
      allCategories,
    },
  };
}

const ArticlePage = ({ data, allCategories }) => {
  const { updateCategories, categoriesState } = useContext(Context);
  useEffect(() => {
    if (!categoriesState.length && allCategories.length) {
      updateCategories(allCategories);
    }
  }, []);

  return (
    <Layout
      title={data.title}
      seo={data.seo}
    >
      <Article
        data={data}
      />
    </Layout>
  );
};
ArticlePage.defaultProps = {
  allCategories: [],
};
ArticlePage.propTypes = {
  data: PropTypes.shape({
    allArticles: PropTypes.arrayOf(PropTypes.object.isRequired),
    seo: PropTypes.arrayOf(PropTypes.object.isRequired),
    header: PropTypes.shape({
      content: PropTypes.string,
      label: PropTypes.string,
    }),
    title: PropTypes.string,
  }).isRequired,
  allCategories: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default ArticlePage;
