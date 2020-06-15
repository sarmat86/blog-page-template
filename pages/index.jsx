import Layout from '../components/Layout/Layout';
import ArticleTile from '../components/Article/ArticleTile/ArticleTile';

export default function Home() {
  return (
    <Layout>
      <ArticleTile articleId={'art1'}/>
      <ArticleTile articleId={'art2'}/>
    </Layout>
  );
}
