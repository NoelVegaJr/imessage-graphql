import type { NextPage, NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Auth from '../components/Auth';
import Chat from '../components/Chat';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  console.log('gerServerSideProps response ', session);
  return {
    props: {
      session,
    },
  };
}

const Home: NextPage = () => {
  const { data: session } = useSession();
  const reloadSession = () => {
    const event = new Event('visibilitychange');
    document.dispatchEvent(event);
  };

  console.log('HERE IS A SESSION: ', session);

  return (
    <div className='bg-neutral-800 h-screen w-full text-white'>
      {session?.user?.username ? (
        <Chat />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </div>
  );
};

export default Home;
