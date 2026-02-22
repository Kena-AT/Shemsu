import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Input = ({ label, icon: Icon, error, className, ...props }) => {
  return (
    <div className="w-full space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        <input
          className={twMerge(
            'w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none placeholder:text-gray-400',
            Icon ? 'pl-10' : 'pl-4',
            error ? 'border-red-500 focus:ring-red-500/10' : 'border-gray-200',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
