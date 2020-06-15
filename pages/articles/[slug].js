import { gql } from 'apollo-boost';
import Layout from '../../components/Layout/Layout';
import Article from '../../components/Article/Article';
import request from '../../lib/datocms';

const ARTICLE_QUERY = gql`
{
    article(filter: {id: { eq: "5062334" }}){
      id
      title
      shortDescription
      content
      slug
      sources
      thumbnail{
        id
        url
        title
      }
      image{
        id
        url
        title
        filename
        tags
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
        rate={data.rate}
        date={data.date}
        createdAt={data.createdAt}
        image={data.image}
        sources={data.sources}
      />
    </Layout>
  );
}
export async function getStaticPaths() {
  const response = await request({
    query: ARTICLES_PATH_QUERY,
  });
  const paths = response.data.allArticles.map((article) => (
    {
      params: {
        slug: article.slug,
        id: article.id,
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
      articleId: params.id,
    },
  });

  return {
    props: {
      data: response.data.article,
    },
  };
}
