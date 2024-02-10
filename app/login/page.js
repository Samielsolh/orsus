'use client';

import ErrorAlert from '@/components/common/ErrorAlert';
import Input from '@/components/common/Input';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
  const { login, currentUser, userData, authError, setAuthError } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const handleField = (e) => {
    setAuthError([]);
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(user.email, user.password);
  };

  return !userData ? (
    <section
      className="w-full h-screen animate-gradient-x"
      style={{
        background:
          'linear-gradient(270deg, #007cf0, #00dfd8, #00A550, #007cf0, #00dfd8, #00A550)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
      }}
    >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-5xl md:text-6xl font-extrabold text-white mb-6 float-in">
            Sign In
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm border border-[#E4E4E7] p-6 rounded-xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label={'Email'}
              name="email"
              value={user.email}
              placeholder={'Email'}
              onChange={handleField}
              required={true}
            />
            <Input
              type="password"
              label={'Password'}
              name="password"
              value={user.password}
              placeholder={'Password'}
              onChange={handleField}
              required={true}
            />
            {authError.length > 0 && authError && (
              <ErrorAlert
                title="Error"
                errors={authError}
                onClose={() => setAuthError([])}
              />
            )}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            <Link
              href="/reset-password"
              className="font-semibold leading-6 text-blue-500 hover:text-blue-700"
            >
              Forget password?
            </Link>
            <br />
            <span className="text-white">Don't have an account?</span>
            <br />
            <Link
              href="/register"
              className="font-semibold leading-6 text-blue-500 hover:text-blue-700"
            >
              register here
            </Link>
          </p>
        </div>
      </div>
    </section>
  ) : (
    router.push('/')
  );
};
export default Login;
