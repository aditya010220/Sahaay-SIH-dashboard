import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { label: 'Student', value: 'student' },
    { label: 'Counselor', value: 'counselor' },
    { label: 'Admin', value: 'admin' }
  ];

  const handleChange = (e) => {
    const { name, value } = e?.target || {};
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name && errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
    if (errors.role) setErrors((prev) => ({ ...prev, role: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 characters';
    if (!formData.role) newErrors.role = 'Select a role';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const dashboards = {
    student: '/student-dashboard',
    counselor: '/counselor-dashboard',
    admin: '/admin-analytics-dashboard',
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', formData.role);
      navigate(dashboards[formData.role] || '/student-dashboard');
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        name="fullName"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
        required
        className="gentle-transition focus:shadow-moderate"
      />
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        className="gentle-transition focus:shadow-moderate"
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Create a password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
        className="gentle-transition focus:shadow-moderate"
      />

      <Select
        label="Select Role"
        name="role"
        value={formData.role}
        options={roleOptions}
        onChange={handleRoleChange}
        error={errors.role}
        description="Choose the portal you want to access"
        required
      />

      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Info" size={14} />
          <span>For demo, registration auto-logs you in.</span>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
