import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@apollo/client';
import UserOperations from '../../graphql/operations/user';
import {
  CreateUsernameData,
  CreateUsernameVariables,
} from '../../utils/types/types';

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FunctionComponent<IAuthProps> = ({
  session,
  reloadSession,
}) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    if (!usernameInput) return;

    try {
      const { data } = await createUsername({
        variables: { username: usernameInput },
      });
      console.log('Submit Response: ', data, loading, error);

      if (!data?.createUsername.success) {
        throw new Error();
      }
      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;
      }

      reloadSession();
    } catch (error) {
      console.log('onSubmit error ', error);
    }
  };

  return (
    <div className='border border-red-600 h-screen grid place-content-center'>
      <div className='flex flex-col gap-10 items-center'>
        {session ? (
          <>
            <p className='text-3xl tracking-wide shadow-2xl'>
              Create a Username
            </p>
            <input
              placeholder='username'
              value={usernameInput}
              onChange={(event) => setUsernameInput(event.target.value)}
              className='w-full text-white p-2 px-3 rounded outline-none bg-transparent border-2 border-neutral-500/50 placeholder:tracking-wide hover:border-neutral-500 focus:border-neutral-500 transition-all duration-150'
            />

            <motion.button
              whileTap={{ scale: 1 }}
              whileHover={{ scale: 1.009 }}
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
