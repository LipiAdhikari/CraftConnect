import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-craft-900 mb-4">404</h1>
      <p className="text-2xl text-craft-800 mb-8">Oops! We can't find that page.</p>
      <Link to="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
