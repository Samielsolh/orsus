'use client';
import ErrorAlert from '@/components/common/ErrorAlert';
import Input from '@/components/common/Input';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Register = () => {
  const { signup, currentUser, authError, setAuthError } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleField = (e) => {
    setAuthError([]);
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password.length < 8) {
      setAuthError(['Password must be at least 8 characters']);
    } else if (user.password !== user.confirmPassword) {
      setAuthError(["Password Doesn't match"]);
    } else {
      signup(user);
    }
  };

  console.log('currentUser', currentUser);

  return !currentUser ? (
    <section
      className="w-full min-h-screen animate-gradient-x"
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
            Sign Up
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm border border-[#E4E4E7] p-6 rounded-xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              label={'First Name'}
              name="firstName"
              value={user.firstName}
              placeholder={'Enter first name'}
              onChange={handleField}
              required
            />
            <Input
              type="text"
              label={'Last Name'}
              name="lastName"
              value={user.lastName}
              placeholder={'Enter last name'}
              onChange={handleField}
              required
            />
            <Input
              type="email"
              label={'email'}
              name="email"
              value={user.email}
              placeholder={'Enter email address'}
              onChange={handleField}
              required
            />
            <Input
              type="password"
              label={'Password'}
              name="password"
              value={user.password}
              placeholder={'Enter password'}
              onChange={handleField}
              required
            />
            <Input
              type="password"
              label={'Confirm Password'}
              name="confirmPassword"
              value={user.confirmPassword}
              placeholder={'Confirm Password'}
              onChange={handleField}
              required
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
                Submit
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            <span className="text-white">Already have an account?</span> <br />
            <Link
              href="/login"
              className="font-semibold leading-6 text-blue-500 hover:text-blue-700"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </section>
  ) : (
    router.push('/')
  );
};
export default Register;
