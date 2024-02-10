'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
// import { useAuth } from "@/contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const { userData } = useAuth();

  return userData ? children : router.push('/login');
}
