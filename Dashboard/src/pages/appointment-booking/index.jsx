import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CounselorCard from './components/CounselorCard';
import AppointmentCalendar from './components/AppointmentCalendar';
import BookingForm from './components/BookingForm';
import FilterPanel from './components/FilterPanel';
import ConfirmationModal from './components/ConfirmationModal';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('browse');
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]); // Track booked slots

  // Generate more available slots for the next 30 days
  const generateAvailableSlots = () => {
    const slots = [];
    const today = new Date();
    const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

    // Generate slots for next 30 days
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Skip weekends for professional counselors
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        timeSlots.forEach(time => {
          const dateStr = date.toISOString().split('T')[0];
          const slotKey = `${dateStr}-${time}`;

          // Check if this slot is not booked
          if (!bookedSlots.includes(slotKey)) {
            slots.push({
              date: dateStr,
              time: time,
              available: true
            });
          }
        });
      }
    }

    return slots;
  };

  const [availableSlots, setAvailableSlots] = useState(generateAvailableSlots());

  // Update available slots when booked slots change
  React.useEffect(() => {
    setAvailableSlots(generateAvailableSlots());
  }, [bookedSlots]);

  // Indian counselors data with photos and realistic Indian names and locations
  const counselors = [

    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      title: "Licensed Marriage & Family Therapist",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      experience: "12 years experience",
      rating: 4.8,
      reviewCount: 203,
      location: "Mental Health Center, IIT Mumbai",
      availability: "busy",
      isOnline: true,
      specializations: ["Family Pressure", "Career vs Parents' Expectations", "Identity Crisis"],
      bio: `Dr. Kumar focuses on family dynamics and helping students balance personal aspirations with family expectations.`,
      education: "MD Psychiatry, AIIMS Delhi",
      languages: ["Hindi", "English", "Marathi"]
    },
    {
      id: 3,
      name: "Dr. Meera Reddy",
      title: "Clinical Social Worker",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      experience: "6 years experience",
      rating: 4.7,
      reviewCount: 89,
      location: "Crisis Support Center, Bangalore University",
      availability: "available",
      isOnline: false,
      specializations: ["Depression", "Self-harm", "Suicidal Thoughts"],
      bio: `Dr. Reddy provides crisis intervention and support for students facing severe mental health challenges.`,
      education: "MSW in Psychiatric Social Work, TISS Mumbai",
      languages: ["Telugu", "English", "Hindi", "Kannada"]
    },
    {
      id: 4,
      name: "Dr. Amit Patel",
      title: "Licensed Professional Counselor",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
      experience: "10 years experience",
      rating: 4.9,
      reviewCount: 156,
      location: "Student Health Services, JNU Delhi",
      availability: "available",
      isOnline: true,
      specializations: ["Body Image Issues", "Social Media Pressure", "Perfectionism"],
      bio: `Dr. Patel specializes in modern challenges faced by Indian youth including social media impact and body image concerns.`,
      education: "M.Phil Clinical Psychology, Delhi University",
      languages: ["Gujarati", "Hindi", "English"]
    },
    {
      id: 5,
      name: "Dr. Kavitha Nair",
      title: "Psychiatric Nurse Practitioner",
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      experience: "15 years experience",
      rating: 4.8,
      reviewCount: 178,
      location: "Mental Health Clinic, NIMHANS Bangalore",
      availability: "unavailable",
      isOnline: false,
      specializations: ["Medication Management", "Bipolar Disorder", "ADHD"],
      bio: `Dr. Nair provides psychiatric evaluations and medication management following Indian mental health protocols.`,
      education: "MSc Psychiatric Nursing, NIMHANS Bangalore",
      languages: ["Malayalam", "English", "Hindi", "Tamil"]
    },
    {
      id: 6,
      name: "Dr. Arjun Singh",
      title: "Licensed Clinical Psychologist",
      avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
      experience: "9 years experience",
      rating: 4.6,
      reviewCount: 134,
      location: "Counselling Center, Jamia Millia Islamia",
      availability: "available",
      isOnline: true,
      specializations: ["Grief & Loss", "Homesickness", "Cultural Adjustment"],
      bio: `Dr. Singh helps students deal with grief, homesickness, and cultural adjustments common in Indian educational settings.`,
      education: "MA Psychology, Jamia Millia Islamia",
      languages: ["Hindi", "English", "Urdu"]
    },
    {
      id: 7,
      name: "Dr. Sunita Gupta",
      title: "Educational Psychologist",
      avatar: "https://images.unsplash.com/photo-1584043204475-8cc101d6c77a?w=400&h=400&fit=crop&crop=face",
      experience: "11 years experience",
      rating: 4.7,
      reviewCount: 145,
      location: "Student Wellness Center, BHU Varanasi",
      availability: "available",
      isOnline: true,
      specializations: ["Learning Disabilities", "Study Habits", "Memory Issues"],
      bio: `Dr. Gupta specializes in learning difficulties and helps students develop effective study strategies and memory techniques.`,
      education: "PhD Educational Psychology, BHU Varanasi",
      languages: ["Hindi", "English", "Bengali"]
    },
    {
      id: 8,
      name: "Dr. Vikram Malhotra",
      title: "Addiction Counselor",
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      experience: "7 years experience",
      rating: 4.5,
      reviewCount: 92,
      location: "De-addiction Center, AIIMS Delhi",
      availability: "available",
      isOnline: false,
      specializations: ["Substance Abuse", "Gaming Addiction", "Social Media Addiction"],
      bio: `Dr. Malhotra helps students overcome various addictions including substance abuse and digital addiction.`,
      education: "M.Phil Clinical Psychology, AIIMS Delhi",
      languages: ["Hindi", "English", "Punjabi"]
    }
  ];

  const filteredCounselors = React.useMemo(() => {
    let filtered = counselors;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(counselor =>
        counselor?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        counselor?.specializations?.some(spec =>
          spec?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )
      );
    }

    // Apply other filters
    if (filters?.availability) {
      filtered = filtered.filter(counselor => counselor?.availability === filters?.availability);
    }

    if (filters?.isOnline !== undefined) {
      filtered = filtered.filter(counselor => counselor?.isOnline === filters?.isOnline);
    }

    if (filters?.specialization) {
      filtered = filtered.filter(counselor =>
        counselor?.specializations?.includes(filters?.specialization)
      );
    }

    return filtered;
  }, [counselors, searchQuery, filters]);

  const handleBookAppointment = (counselorId) => {
    const counselor = counselors?.find(c => c?.id === counselorId);
    setSelectedCounselor(counselor);
    setCurrentStep('calendar');
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset selected time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleProceedToForm = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep('form');
    }
  };

  const handleFormSubmit = (formData) => {
    const appointment = {
      id: Date.now(),
      counselor: selectedCounselor,
      date: selectedDate,
      time: selectedTime,
      ...formData
    };
    setAppointmentData(appointment);
    setShowConfirmation(true);
  };

  const handleConfirmAppointment = () => {
    // Mark the slot as booked
    const dateStr = selectedDate.toISOString().split('T')[0];
    const slotKey = `${dateStr}-${selectedTime}`;
    setBookedSlots(prev => [...prev, slotKey]);

    // Show success message
    alert('Appointment booked successfully!');

    // Reset and navigate
    setShowConfirmation(false);
    setCurrentStep('browse');
    setSelectedCounselor(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setAppointmentData(null);

    // Navigate to dashboard
    navigate('/student-dashboard');
  };

  const handleViewProfile = (counselorId) => {
    // Handle view profile logic
    console.log('View profile for counselor:', counselorId);
  };

  const handleEmergencyBooking = () => {
    // Handle emergency booking
    alert('Connecting you to emergency support...');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {['browse', 'calendar', 'form', 'confirm'].map((step, index) => (
          <React.Fragment key={step}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${currentStep === step
              ? 'bg-primary text-primary-foreground'
              : index < ['browse', 'calendar', 'form', 'confirm'].indexOf(currentStep)
                ? 'bg-success text-success-foreground'
                : 'bg-muted text-muted-foreground'
              }`}>
              {index + 1}
            </div>
            {index < 3 && (
              <div className={`w-8 h-0.5 ${index < ['browse', 'calendar', 'form', 'confirm'].indexOf(currentStep)
                ? 'bg-success'
                : 'bg-muted'
                }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="student" />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Book Your Counseling Session
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with licensed mental health professionals who understand the unique challenges of Indian student life.
              Your wellbeing is our priority.
            </p>
          </div>

          {/* Emergency Support Banner */}
          <div className="bg-error/10 border border-error/20 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Heart" className="text-error" size={24} />
                <div>
                  <h3 className="font-medium text-foreground">Need immediate support?</h3>
                  <p className="text-sm text-muted-foreground">
                    Crisis support is available 24/7. Don't wait if you're in distress.
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEmergencyBooking}
                  iconName="Zap"
                  iconPosition="left"
                  className="border-error/20 text-error hover:bg-error/10"
                >
                  Emergency Booking
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="Phone"
                  iconPosition="left"
                >
                  KIRAN Helpline: 1800-599-0019
                </Button>
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Browse Counselors Step */}
          {currentStep === 'browse' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filter Panel */}
              <div className="lg:col-span-1">
                <FilterPanel
                  filters={filters}
                  onFilterChange={setFilters}
                  onClearFilters={() => setFilters({})}
                  isOpen={isFilterOpen}
                  onToggle={() => setIsFilterOpen(!isFilterOpen)}
                />
              </div>

              {/* Counselors List */}
              <div className="lg:col-span-3">
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search counselors by name or specialization..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">
                    {filteredCounselors?.length} counselor{filteredCounselors?.length !== 1 ? 's' : ''} available
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/ai-chatbot-support')}
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Try AI Support First
                  </Button>
                </div>

                {/* Counselors Grid */}
                <div className="space-y-4">
                  {filteredCounselors?.map(counselor => (
                    <CounselorCard
                      key={counselor?.id}
                      counselor={counselor}
                      onBookAppointment={handleBookAppointment}
                      onViewProfile={handleViewProfile}
                    />
                  ))}
                </div>

                {filteredCounselors?.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="UserX" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No counselors found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFilters({});
                        setSearchQuery('');
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Calendar Step */}
          {currentStep === 'calendar' && selectedCounselor && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep('browse')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                  className="mb-4"
                >
                  Back to Counselors
                </Button>
                <div className="text-center">
                  <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
                    Book with {selectedCounselor?.name}
                  </h2>
                  <p className="text-muted-foreground">{selectedCounselor?.title}</p>
                </div>
              </div>

              <AppointmentCalendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                availableSlots={availableSlots}
                onTimeSelect={handleTimeSelect}
                selectedTime={selectedTime}
              />

              {selectedDate && selectedTime && (
                <div className="mt-6 text-center">
                  <Button
                    onClick={handleProceedToForm}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Continue to Booking Form
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Form Step */}
          {currentStep === 'form' && (
            <div className="max-w-2xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => setCurrentStep('calendar')}
                iconName="ArrowLeft"
                iconPosition="left"
                className="mb-6"
              >
                Back to Calendar
              </Button>
              <BookingForm
                counselor={selectedCounselor}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSubmit={handleFormSubmit}
              />
            </div>
          )}
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmation && appointmentData && (
        <ConfirmationModal
          appointment={appointmentData}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmAppointment}
        />
      )}
    </div>
  );
};

export default AppointmentBooking;