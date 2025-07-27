'use client'; // Client-side component

import { useState } from 'react';
import { supabase } from '../lib/supabase'; // Adjust the import path as necessary

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'creator' | 'learner'>('learner');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    let error;
    if (isLogin) {
      ({ error } = await supabase.auth.signInWithPassword({ email, password }));
    } else {
      ({ error } = await supabase.auth.signUp({ email, password }));
      if (!error) {
        // Insert user role after signup
        await supabase.from('users').insert({ id: (await supabase.auth.getUser()).data.user?.id, email, role });
      }
    }
    if (error) alert(error.message);
    else alert('Success!');
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md">
      <h2 className="text-2xl mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="p-2 border w-full mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="p-2 border w-full mb-2"
      />
      {!isLogin && (
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as 'creator' | 'learner')}
          className="p-2 border w-full mb-2"
        >
          <option value="learner">Learner</option>
          <option value="creator">Creator</option>
        </select>
      )}
      <button onClick={handleAuth} className="bg-blue-500 text-white p-2 w-full">
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
      <p className="mt-2 text-center">
        {isLogin ? 'New? ' : 'Have account? '}
        <span className="text-blue-500 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Login'}
        </span>
      </p>
    </div>
  );
}