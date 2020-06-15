import Layout from '../../components/Layout/Layout';
import Article from '../../components/Article/Article';

export default function Articles({ articleData }) {
  return (
    <Layout>
      <Article title={articleData.title} />
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          id: 'test',
        },
      },
    ],
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const articleData = {
    id: 'test',
    title: 'test1',
  };
  return {
    props: {
      articleData,
    },
  };
}
