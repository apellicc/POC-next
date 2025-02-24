"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
import { useContext } from "react";



export default function Test() {
    const router = useRouter();
    const { signOut } = useContext(AuthContext);
  const test = () => {
    // router.push('/signin');
    signOut();
  }

  const test2 = () => {
    router.push('/signin');
    // signOut();
  }
 
  return (
    <ProtectedRoute>
      <div>
      <button onClick={test}>Click me</button>
      <button onClick={test2}>Click test sign</button>
      <h1>Welcome to TEST</h1>
      </div>
    </ProtectedRoute>
  );
}