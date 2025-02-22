"use client";

import ProtectedRoute from "@/components/ProtectedRoute";



export default function Home() {
 
  return (
    <ProtectedRoute>
      <div>
        <h1>Welcome to Home</h1>
      </div>
    </ProtectedRoute>
  );
}