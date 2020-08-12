import { useContext, useEffect } from 'react';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout/Layout';
import Article from '../../components/Article/Article';
import request from '../../lib/datocms';
import Context from '../../src/context/context';

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

const ArticlePage = ({ data }) => {
  const { articlesVotesState, getVotesData } = useContext(Context);
  const votesData = articlesVotesState.length
    ? articlesVotesState.find((art) => art.id === data.id)
    : null;
  useEffect(() => {
    if (!votesData) {
      getVotesData([data.id]);
    }
  }, [votesData]);
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
}

ArticlePage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ArticlePage;

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

  return {
    props: {
      data: response.data.article,
    },
  };
}
