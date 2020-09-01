import ApolloClient from 'apollo-boost';

const request = ({ query, variables, preview }) => {
  const endpoint = preview
    ? 'https://graphql.datocms.com/preview'
    : 'https://graphql.datocms.com/';
  const client = new ApolloClient({
    uri: endpoint,
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
    },
  });
  return client.query({
    query,
    variables,
  });
};

export default request;
