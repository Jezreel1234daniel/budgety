import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';

export default function Home() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    }
    getSession();
  }, [router]);

  const handleLogin = async (type) => {
    setLoading(true);
    if (type === 'google') {
      await supabase.auth.signInWithOAuth({ provider: 'google' });
    } else {
      await supabase.auth.signInWithOtp({ email });
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Welcome to Budgety</h1>
      <button onClick={() => handleLogin('google')} disabled={loading}>
        Sign in with Google
      </button>
      <div>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={() => handleLogin('email')} disabled={loading}>
          Sign in with Email
        </button>
      </div>
    </div>
  );
}
