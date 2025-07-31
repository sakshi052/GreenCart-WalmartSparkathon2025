import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from './firebase';

export default function withAuth(Component) {
  return function ProtectedPage(props) {
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          router.push('/login'); // redirect if not logged in
        }
      });
      return () => unsubscribe();
    }, [router]);

    return <Component {...props} />;
  };
}
