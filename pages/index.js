import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import { initializeApollo } from '../apollo/client';

const UsersQuery = gql`
  query UsersQuery {
    songs {
      name
    }
  }
`;

const Index = () => {
  const { data, loading } = useQuery(UsersQuery);
  // console.log(data.users);

  if (loading) return <h4>loading...</h4>;

  return (
    <div>
      <Link href='/about'>
        <a>static page</a>
      </Link>{' '}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: UsersQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
