import { gql } from 'apollo-boost';
import request from './datocms';
import { readFile, writeFile } from '../src/utils/fs-helpers';
import { BLOG_CACHE } from './server-paths';

const ALL_CATEGORIES_QUERY = gql`
{
  allCategories{
    name
    id
  }
}`;

const getBlogCategories = async (cache = true) => {
  let categories = null;
  if (cache) {
    categories = await readFile(BLOG_CACHE, 'utf8')
      .catch((_) => {});
  }
  if (!categories) {
    const response = await request({
      query: ALL_CATEGORIES_QUERY,
    });
    categories = response.data.allCategories;
    writeFile(BLOG_CACHE, JSON.stringify(categories), 'utf8').catch(() => {});
    return categories;
  }
  return JSON.parse(categories);
};

export default getBlogCategories;
