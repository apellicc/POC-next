"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from 'next/navigation';



export default function Home() {
    const router = useRouter();

  const test = () => {
    router.push('/test');
  }
 
  return (
    <ProtectedRoute>
      <div>
        <button onClick={test}>Click me</button>
        <h1>Welcome to Home</h1>
      </div>
    </ProtectedRoute>
  );
}