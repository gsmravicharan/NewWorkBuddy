// ...existing code...
import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    console.log('Home page mounted!');
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Welcome to Worker-Customer Management</h1>
      <p className="mt-4">Public landing page</p>
    </main>
  );
};

export default Home;
// ...existing code...