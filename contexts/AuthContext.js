'use client';
import React, { useState, useEffect, useContext } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  sendEmailVerification,
} from 'firebase/auth';
import app from '@/utils/firebase';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState([]);
  const [selectedRaise, setSelectedRaise] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const auth = getAuth(app);
  const [companies, setCompanies] = useState([]);

  const login = async (email, password) => {
    setAuthError([]);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);
        router.push('/test');
      })
      .catch((error) => {
        setAuthError([...authError, 'Incorrect login information.']);
      });
  };

  const createUser = async (user) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      console.log('response', response);
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
        setLoading(false);
        router.push('/test');
        window.location.reload();
      } else {
        console.error('Error fetching user profile');
        setUserData(null);
        setLoading(false);
      }
    } catch (e) {
      setUserData(null);
      setLoading(false);
    }
  };

  const signup = async (newUser) => {
    setAuthError([]);
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(user).then(() => {
          // Email verification sent!
          toast.success('Check your Email!', {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        });
        setCurrentUser(user);
        createUser({ ...newUser, userId: user.uid });
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          setAuthError([...authError, 'Email is already in use.']);
        }
      });
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccessMessage('Password reset link is sent to your email.');
      })
      .catch((error) => {
        console.log('error', error);
        const errorMessage = error.message;
        setErrorText([`${errorMessage}`]);
      });
  };

  const logout = () => {
    signOut(auth);
    setCurrentUser(null);
    setUserData(null);
    router.push('/');
  };

  const getProfile = async (user) => {
    console.log('getProfile');
    try {
      const response = await fetch(`/api/users/${user.uid}`, {
        cache: 'no-store',
        method: 'GET',
        headers: {
          authorization: `${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
        setCurrentUser(user);
        setLoading(false);
      } else {
        console.error('Error fetching user profile');
        setCurrentUser(null);
        setUserData(null);
        setLoading(false);
      }
    } catch (e) {
      setCurrentUser(null);
      setUserData(null);
      setLoading(false);
    }
  };

  const getRaises = async () => {
    // setLoading(true);
    try {
      const response = await fetch(`/api/raises/all`, {
        cache: 'no-store',
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setCompanies(data.items);
        // setLoading(false);
      } else {
        console.error('Error fetching Raises');
        // setLoading(false);
      }
    } catch (e) {
      console.log('Error', e);
      // setLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        console.log('user is loged in');
        setLoading(true);
        getProfile(user);
      } else {
        // User is signed out
        console.log('user is loged out');
        setLoading(false);
      }
    });
    getRaises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    currentUser,
    userData,
    setUserData,
    login,
    signup,
    logout,
    authError,
    setAuthError,
    resetPassword,
    successMessage,
    setSuccessMessage,
    setLoading,
    selectedRaise,
    setSelectedRaise,
    companies,
    setCompanies,
  };

  while (loading) {
    return (
      <section
        className="w-full h-screen flex justify-center items-center"
        style={{
          background:
            'linear-gradient(270deg, #007cf0, #00dfd8, #00A550, #007cf0, #00dfd8, #00A550)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        }}
      >
        <h2 className="text-center text-5xl md:text-6xl font-extrabold text-white mb-6">
          Loading...
        </h2>
      </section>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
