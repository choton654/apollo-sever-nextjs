import { gql, useApolloClient, useQuery } from '@apollo/client';
import Link from 'next/link';
import { initializeApollo } from '../apollo/client';

const SongsQuery = gql`
  query SongsQuery {
    songs {
      id
      title
    }
  }
`;

const DELETE_SONG = gql`
  mutation($songId: ID!) {
    deleteSong(songId: $songId) {
      title
    }
  }
`;

const Index = () => {
  const { data, loading, error } = useQuery(SongsQuery);
  if (loading) return <h4>loading...</h4>;
  if (error) return <h4>{error.message}</h4>;

  const client = useApolloClient();

  return (
    <div>
      <Link href='/createSong'>
        <a className='btn-floating btn-large red right'>
          <i className='material-icons'>add</i>
        </a>
      </Link>
      <div>
        {
          <ul className='collection'>
            {data.songs.map((song) => (
              <li className='collection-item' key={song.id}>
                <Link href={`/singleSong?songId=${song.id}`}>
                  <a>{song.title}</a>
                </Link>
                <button
                  type='button'
                  className='btn waves-effect waves-light'
                  onClick={() => {
                    client.mutate({
                      variables: { songId: song.id },
                      mutation: DELETE_SONG,
                      refetchQueries: [
                        {
                          query: SongsQuery,
                        },
                      ],
                    });
                  }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: SongsQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
