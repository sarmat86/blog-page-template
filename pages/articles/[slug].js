import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout/Layout';
import Article from '../../components/Article/Article';
import request from '../../lib/datocms';

const ARTICLE_QUERY = gql`
query articleQuery($slug: String) {
    article(filter: {slug: { eq: $slug }}){
      id
      title
      shortDescription
      content
      slug
      sources
      thumbnail{
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
      rate
      createdAt
      date,
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

export default function Articles({ data }) {
  return (
    <Layout>
      <Article
        id={data.id}
        title={data.title}
        shortDescription={data.shortDescription}
        content={data.content}
        slug={data.slug}
        thumbnail={data.thumbnail}
        video={data.video}
        rate={data.rate}
        date={data.date}
        createdAt={data.createdAt.substring(0, data.createdAt.indexOf('T'))}
        sources={data.sources}
      />
    </Layout>
  );
}

Articles.propTypes = {
  data: PropTypes.object.isRequired,
};

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
