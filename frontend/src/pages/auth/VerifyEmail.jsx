import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';

const VerifyEmail = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const { verifyEmail, resendVerification } = useAuth();
  const location = useLocation();
  const email = location.state?.email || '';
  const inputRefs = useRef([]);

  React.useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) return toast.error('Please enter all 6 digits');
    verifyEmail.mutate({ email, code: fullCode }, {
      onSuccess: () => toast.success('Email verified successfully!'),
      onError: (err) => toast.error(err.response?.data?.message || 'Verification failed'),
    });
  };

  const handleResend = () => {
    if (timeLeft > 0) return;
    resendVerification.mutate({ email }, {
      onSuccess: () => {
        toast.success('Verification code resent successfully!');
        setTimeLeft(60);
      },
      onError: (err) => toast.error(err.response?.data?.message || 'Failed to resend code'),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-2xl mb-6">
          <Mail size={32} />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your email</h2>
        <p className="text-sm text-gray-500 mb-8">
          We've sent a 6-digit verification code to <br />
          <span className="font-semibold text-gray-900 text-base">{email || 'your email'}</span>. Enter it below.
        </p>

        <div className="flex justify-center gap-2 sm:gap-3 mb-8">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-11 h-14 text-center text-xl font-bold border-2 border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            />
          ))}
        </div>

        <Button className="w-full py-4" isLoading={verifyEmail.isPending} onClick={handleVerify} type="button">
          Verify Account →
        </Button>

        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-500">
            Didn't receive the email?{' '}
            {timeLeft > 0 ? (
              <span className="text-gray-400 font-semibold">Resend in {timeLeft}s</span>
            ) : (
              <button 
                type="button" 
                onClick={handleResend}
                disabled={resendVerification.isPending}
                className="text-blue-600 font-semibold hover:underline disabled:opacity-50"
              >
                {resendVerification.isPending ? 'Sending...' : 'Resend Code'}
              </button>
            )}
          </p>
          <Link to="/signup" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft size={16} /> Change email address
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
