import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // For notifications

function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const mobile = localStorage.getItem('adminMobile');

  useEffect(() => {
    if (!mobile) navigate('/user-login');
  }, [mobile, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();

    localStorage.setItem('adminLoggedIn', 'true');
    navigate('/admin/contact-data');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleVerify} className="bg-white/10 p-6 rounded-lg backdrop-blur w-full max-w-sm">
  <h2 className="text-xl font-bold mb-4 text-center">Enter OTP</h2>
        <input
          type="text"
          maxLength="6"
          placeholder="6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-transparent border border-white placeholder-white"
          required
        />
  <button className="w-full bg-green-500 py-2 rounded font-bold hover:bg-green-600">Verify</button>
      </form>
    </div>
  );
}

export default VerifyOTP;
