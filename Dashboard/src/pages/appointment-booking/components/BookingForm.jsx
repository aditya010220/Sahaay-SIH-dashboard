import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BookingForm = ({ counselor, selectedDate, selectedTime, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    sessionType: '',
    urgencyLevel: '',
    concerns: '',
    previousSessions: false,
    shareAssessments: false,
    shareMoodData: false,
    reminderEmail: true,
    reminderSMS: false,
    additionalNotes: ''
  });

  const [errors, setErrors] = useState({});

  const sessionTypeOptions = [
    { value: 'individual', label: 'Individual Counseling' },
    { value: 'group', label: 'Group Therapy' },
    { value: 'crisis', label: 'Crisis Intervention' },
    { value: 'consultation', label: 'Brief Consultation' }
  ];

  const urgencyOptions = [
    { value: 'low', label: 'Low - General Support' },
    { value: 'medium', label: 'Medium - Moderate Concern' },
    { value: 'high', label: 'High - Urgent Support Needed' },
    { value: 'crisis', label: 'Crisis - Immediate Help Required' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.sessionType) {
      newErrors.sessionType = 'Please select a session type';
    }
    
    if (!formData?.urgencyLevel) {
      newErrors.urgencyLevel = 'Please select urgency level';
    }
    
    if (!formData?.concerns?.trim()) {
      newErrors.concerns = 'Please describe your concerns';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      const appointmentData = {
        counselorId: counselor?.id,
        date: selectedDate,
        time: selectedTime,
        ...formData
      };
      onSubmit(appointmentData);
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Book Appointment
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          iconName="X"
        />
      </div>
      {/* Appointment Summary */}
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-foreground mb-2">Appointment Details</h4>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="User" size={16} />
            <span>{counselor?.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} />
            <span>{selectedDate?.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} />
            <span>{selectedTime}</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Session Type */}
        <Select
          label="Session Type"
          options={sessionTypeOptions}
          value={formData?.sessionType}
          onChange={(value) => handleInputChange('sessionType', value)}
          error={errors?.sessionType}
          required
        />

        {/* Urgency Level */}
        <Select
          label="Urgency Level"
          description="Help us prioritize your appointment"
          options={urgencyOptions}
          value={formData?.urgencyLevel}
          onChange={(value) => handleInputChange('urgencyLevel', value)}
          error={errors?.urgencyLevel}
          required
        />

        {/* Concerns */}
        <div>
          <Input
            label="Primary Concerns"
            type="text"
            placeholder="Briefly describe what you'd like to discuss..."
            value={formData?.concerns}
            onChange={(e) => handleInputChange('concerns', e?.target?.value)}
            error={errors?.concerns}
            required
            className="min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground mt-1">
            This information helps your counselor prepare for the session
          </p>
        </div>

        {/* Data Sharing Options */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Data Sharing (Optional)</h4>
          
          <Checkbox
            label="Share previous assessment results"
            description="Allow counselor to view your PHQ-9 and GAD-7 scores"
            checked={formData?.shareAssessments}
            onChange={(e) => handleInputChange('shareAssessments', e?.target?.checked)}
          />
          
          <Checkbox
            label="Share mood tracking data"
            description="Provide counselor with your recent mood patterns"
            checked={formData?.shareMoodData}
            onChange={(e) => handleInputChange('shareMoodData', e?.target?.checked)}
          />
          
          <Checkbox
            label="I have had previous sessions with this counselor"
            checked={formData?.previousSessions}
            onChange={(e) => handleInputChange('previousSessions', e?.target?.checked)}
          />
        </div>

        {/* Reminder Preferences */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Reminder Preferences</h4>
          
          <Checkbox
            label="Email reminders"
            description="Receive appointment reminders via email"
            checked={formData?.reminderEmail}
            onChange={(e) => handleInputChange('reminderEmail', e?.target?.checked)}
          />
          
          <Checkbox
            label="SMS reminders"
            description="Receive appointment reminders via text message"
            checked={formData?.reminderSMS}
            onChange={(e) => handleInputChange('reminderSMS', e?.target?.checked)}
          />
        </div>

        {/* Additional Notes */}
        <Input
          label="Additional Notes (Optional)"
          type="text"
          placeholder="Any additional information you'd like to share..."
          value={formData?.additionalNotes}
          onChange={(e) => handleInputChange('additionalNotes', e?.target?.value)}
          className="min-h-[80px]"
        />

        {/* Privacy Notice */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Icon name="Shield" size={16} className="text-accent mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Privacy & Confidentiality</p>
              <p className="text-muted-foreground">
                All information shared is confidential and protected under HIPAA guidelines. 
                Your data will only be accessible to your assigned counselor and authorized staff.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            iconName="Calendar"
            iconPosition="left"
            className="flex-1"
          >
            Book Appointment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;