import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';

import AuthForm from '../components/auth/auth-form';

function AuthPage() {
  const [loading, setloading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setloading(false);
      }
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
