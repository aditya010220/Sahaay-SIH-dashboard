import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ userRole = 'student' }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Role-based mock credentials and redirects
  const mockByRole = {
    student: { email: 'student@sahaay.edu', password: 'student123', redirect: '/student-dashboard' },
    counselor: { email: 'counselor@sahaay.edu', password: 'counselor123', redirect: '/counselor-dashboard' },
    admin: { email: 'admin@sahaay.edu', password: 'admin123', redirect: '/admin-analytics-dashboard' }
  };
  const defaultRole = userRole || 'student';
  const mockCredentials = mockByRole[defaultRole];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleLogin = async (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const email = (formData?.email || '').trim().toLowerCase();
    const password = (formData?.password || '').trim();

    const roleFromPassword = password === 'admin123' ? 'admin'
      : password === 'counselor123' ? 'counselor'
      : password === 'student123' ? 'student'
      : null;

    // Simulate API call
    setTimeout(() => {
      const validEmail = /\S+@\S+\.\S+/.test(email);

      if (validEmail && roleFromPassword) {
        const role = roleFromPassword;
        localStorage.setItem('userRole', role);
        localStorage.setItem('isAuthenticated', 'true');
        navigate(mockByRole[role].redirect);
      } else {
        setErrors({
          general: 'Invalid credentials. Use: student123, counselor123, or admin123 (any valid email).'
        });
      }
      setIsLoading(false);
    }, 600);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('isAuthenticated', 'true');
      navigate(mockCredentials.redirect);
    }, 2000);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {/* General Error Message */}
      {errors?.general && (
        <div className="p-4 rounded-lg bg-error/10 border border-error/20 text-center">
          <div className="flex items-center justify-center space-x-2 text-error">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm font-medium">{errors?.general}</span>
          </div>
        </div>
      )}
      {/* Email Input */}
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
        className="gentle-transition focus:shadow-moderate"
      />
      {/* Password Input */}
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData?.password}
        onChange={handleInputChange}
        error={errors?.password}
        required
        className="gentle-transition focus:shadow-moderate"
      />
      {/* Login Button */}
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="right"
        className="bg-primary hover:bg-primary/90 text-primary-foreground gentle-hover"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground font-caption">
            Or continue with
          </span>
        </div>
      </div>
      {/* Google OAuth Button */}
      <Button
        type="button"
        variant="outline"
        fullWidth
        onClick={handleGoogleLogin}
        loading={isLoading}
        className="border-border/50 hover:bg-secondary/10 gentle-hover"
      >
        <div className="flex items-center space-x-2">
          <svg width="18" height="18" viewBox="0 0 24 24" className="text-foreground">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Continue with Google</span>
        </div>
      </Button>
    </form>
  );
};

export default LoginForm;
