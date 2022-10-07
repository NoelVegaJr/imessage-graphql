import type { NextPage, NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Auth from '../components/Auth';
import Chat from '../components/Chat';
import { Session } from 'next-auth';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}

const Home: NextPage = () => {
  const { data: session } = useSession();
  const reloadSession = () => {};

  console.log('HERE IS A SESSION: ', session);

  return (
    <div>
      {session?.user?.username ? (
        <Chat />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </div>
  );
};

export default Home;
