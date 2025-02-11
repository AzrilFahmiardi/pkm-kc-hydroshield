import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, Lock, Droplets, Mail, Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({ value, onChange, placeholder, id }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="flex items-center border-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-gray-50 transition-all duration-200">
      <Lock className="h-5 w-5 text-gray-400 mx-3 flex-shrink-0" />
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full p-2.5 sm:p-3 bg-transparent focus:outline-none text-sm sm:text-base"
        placeholder={placeholder}
        id={id}
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="px-3 py-2 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors duration-200"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? 
          <EyeOff className="h-5 w-5 text-gray-400 hover:text-blue-600" /> : 
          <Eye className="h-5 w-5 text-gray-400 hover:text-blue-600" />
        }
      </button>
    </div>
  );
};

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-6 sm:py-8 md:py-12">
      {/* Logo dan Brand */}
      <div className="flex flex-col items-center space-y-2 mb-6 sm:mb-8">
        <div className="flex items-center justify-center p-2 sm:p-3 bg-blue-100 rounded-full">
          <Droplets className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-blue-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">HydroShield</h1>
      </div>
      
      {/* Form Container */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-blue-100 p-6 sm:p-8">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Login</h2>
          {/* <p className="text-gray-600 text-sm sm:text-base">Masuk ke dashboard monitoring Anda</p> */}
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-6 text-sm sm:text-base">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium text-sm sm:text-base mb-1.5">
              Username / Email
            </label>
            <div className="flex items-center border-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-gray-50 transition-all duration-200">
              <User className="h-5 w-5 text-gray-400 mx-3 flex-shrink-0" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2.5 sm:p-3 bg-transparent focus:outline-none text-sm sm:text-base"
                placeholder="Masukkan username atau email"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium text-sm sm:text-base mb-1.5">
              Password
            </label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              id="password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white mt-6 p-2.5 sm:p-3 rounded-lg hover:bg-blue-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                     transition-all duration-200 font-medium text-sm sm:text-base
                     transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Masuk
          </button>
        </form>

        <div className="mt-6 sm:mt-8 text-center text-sm sm:text-base">
          <span className="text-gray-600">Belum punya akun? </span>
          <Link 
            to="/register" 
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};

export const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    try {
      await axios.post('http://localhost:5000/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat pendaftaran');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-6 sm:py-8 md:py-12">
      {/* Logo dan Brand */}
      <div className="flex flex-col items-center space-y-2 mb-6 sm:mb-8">
        <div className="flex items-center justify-center p-2 sm:p-3 bg-blue-100 rounded-full">
          <Droplets className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-blue-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">HydroShield</h1>
      </div>
      
      {/* Form Container */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-blue-100 p-6 sm:p-8">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Register</h2>
          {/* <p className="text-gray-600 text-sm sm:text-base">Bergabung dengan sistem monitoring HydroShield</p> */}
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-6 text-sm sm:text-base">
            {error}
          </div>
        )}
        
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label htmlFor="reg-username" className="block text-gray-700 font-medium text-sm sm:text-base mb-1.5">
              Username
            </label>
            <div className="flex items-center border-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-gray-50 transition-all duration-200">
              <User className="h-5 w-5 text-gray-400 mx-3 flex-shrink-0" />
              <input
                id="reg-username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full p-2.5 sm:p-3 bg-transparent focus:outline-none text-sm sm:text-base"
                placeholder="Pilih username"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="reg-email" className="block text-gray-700 font-medium text-sm sm:text-base mb-1.5">
              Email
            </label>
            <div className="flex items-center border-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-gray-50 transition-all duration-200">
              <Mail className="h-5 w-5 text-gray-400 mx-3 flex-shrink-0" />
              <input
                id="reg-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-2.5 sm:p-3 bg-transparent focus:outline-none text-sm sm:text-base"
                placeholder="Masukkan email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="reg-password" className="block text-gray-700 font-medium text-sm sm:text-base mb-1.5">
              Password
            </label>
            <PasswordInput
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Buat password"
              id="reg-password"
            />
          </div>

          <div>
            <label htmlFor="reg-confirm-password" className="block text-gray-700 font-medium text-sm sm:text-base mb-1.5">
              Konfirmasi Password
            </label>
            <PasswordInput
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="Konfirmasi password"
              id="reg-confirm-password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white mt-6 p-2.5 sm:p-3 rounded-lg hover:bg-blue-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                     transition-all duration-200 font-medium text-sm sm:text-base
                     transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Daftar
          </button>
        </form>

        <div className="mt-6 sm:mt-8 text-center text-sm sm:text-base">
          <span className="text-gray-600">Sudah punya akun? </span>
          <Link 
            to="/login" 
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            Masuk
          </Link>
        </div>
      </div>
    </div>
  );
};