import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
      <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center mb-8 border border-red-100">
        <ShieldAlert className="text-red-500" size={48} />
      </div>
      <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">Access Denied</h1>
      <p className="text-gray-500 max-w-sm mb-10 text-lg">
        You don't have the required permissions to view this page. This area is reserved for verified sellers.
      </p>
      <div className="flex gap-4">
        <Link to="/">
          <Button variant="outline" icon={ArrowLeft}>Back to Marketplace</Button>
        </Link>
        <Link to="/login">
          <Button>Switch Account</Button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
