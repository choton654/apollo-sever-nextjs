import { useApolloClient, useQuery } from '@apollo/client';
import Link from 'next/link';
import { initializeApollo } from '../apollo/client';
import { DELETE_SONG } from '../graphql/mutations';
import { SongsQuery } from '../graphql/queries';

const Index = () => {
  const { data, loading, error } = useQuery(SongsQuery);
  if (loading) return <h4>loading...</h4>;
  if (error) return <h4>{error.message}</h4>;

  const client = useApolloClient();

  return (
    <div>
      <h1>Make your dream songs</h1>
      <Link href='/createSong'>
        <a
          className='btn-floating btn-large red right'
          style={{
            marginLeft: '10px',
          }}>
          <i className='material-icons'>add</i>
        </a>
      </Link>
      <div>
        {
          <ul className='collection'>
            {data.songs.map((song) => (
              <li
                className='collection-item'
                key={song.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
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
                      update: (cache) => {
                        const data = cache.readQuery({ query: SongsQuery });
                        cache.writeQuery({
                          query: SongsQuery,
                          data: {
                            songs: data.songs.filter((s) => s.id !== song.id),
                          },
                        });
                      },
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
