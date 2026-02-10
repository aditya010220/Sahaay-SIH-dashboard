import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const AuthLinks = () => {
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert('Password reset link would be sent to your email. For demo, use: student@sahaay.edu / student123');
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  const handleCounselorLogin = () => {
    navigate('/counselor-login');
  };

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <div className="space-y-6">
      {/* Recovery Links */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 text-sm">
        <Button
          variant="link"
          onClick={handleForgotPassword}
          iconName="Key"
          iconPosition="left"
          className="text-muted-foreground hover:text-primary p-0 h-auto gentle-transition"
        >
          Forgot Password?
        </Button>

        <Button
          variant="link"
          onClick={handleCreateAccount}
          iconName="UserPlus"
          iconPosition="left"
          className="text-muted-foreground hover:text-primary p-0 h-auto gentle-transition"
        >
          Create Account
        </Button>
      </div>


      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/30"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-3 text-muted-foreground font-caption">
            Other Portals
          </span>
        </div>
      </div> */}

      {/* Role-based Login Links */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"> */}
      {/* <Button
          variant="ghost"
          onClick={handleCounselorLogin}
          iconName="Stethoscope"
          iconPosition="left"
          className="justify-start border border-border/30 hover:bg-secondary/10 gentle-hover"
        >
          <div className="text-left">
            <div className="font-medium text-sm">Counselor Portal</div>
            <div className="text-xs text-muted-foreground">Manage sessions & students</div>
          </div>
        </Button> */}

      {/* <Button
          variant="ghost"
          onClick={handleAdminLogin}
          iconName="Settings"
          iconPosition="left"
          className="justify-start border border-border/30 hover:bg-accent/10 gentle-hover"
        >
          <div className="text-left">
            <div className="font-medium text-sm">Admin Portal</div>
            <div className="text-xs text-muted-foreground">Analytics & management</div>
          </div>
        </Button> */}
      {/* </div> */}

      {/* Support Information */}
      <div className="text-center pt-4 border-t border-border/30">
        <p className="text-xs text-muted-foreground mb-2">
          Need immediate support?
        </p>

      </div>
    </div>
  );
};

export default AuthLinks;
