import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FunctionComponent<IAuthProps> = ({
  session,
  reloadSession,
}) => {
  const [username, setUsername] = useState('');

  const onSubmit = async () => {
    try {
      /**
       * createUsername mutation to send our username to the GraphQl API
       */
    } catch (error) {
      console.log('onSubmit error ', error);
    }
  };

  return (
    <div className='border border-red-600 h-screen bg-neutral-800 text-white grid place-content-center'>
      <div className='flex flex-col gap-10 items-center'>
        {session ? (
          <>
            <p className='text-3xl  tracking-wide'>Create a Username</p>
            <input
              placeholder='username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className='w-full text-white p-2 px-3 rounded outline-none bg-transparent border-2 border-neutral-500 placeholder:tracking-wide'
            />

            <motion.button
              whileTap={{ scale: 1 }}
              whileHover={{ scale: 1.025 }}
              onClick={onSubmit}
              className='text-lg  px-4 py-2 w-full rounded bg-blue-600 hover:bg-blue-700  font-semibold '
            >
              Save
            </motion.button>
          </>
        ) : (
          <>
            <p className='text-3xl'>MessengerQL</p>
            <motion.button
              whileTap={{ scale: 1 }}
              whileHover={{ scale: 1.025 }}
              onClick={() => signIn('google')}
              className='flex items-center gap-2 bg-zinc-700 px-4 py-2 text-lg rounded'
            >
              <Image src='/images/googlelogo.png' height='20px' width='20px' />
              Continue with Google
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
