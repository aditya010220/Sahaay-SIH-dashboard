import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AppointmentCalendar = ({ selectedDate, onDateSelect, availableSlots, onTimeSelect, selectedTime }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };
  
  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };
  
  const isDateAvailable = (date) => {
    if (!date) return false;
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    return date >= today;
  };
  
  const isDateSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };
  
  const hasAvailableSlots = (date) => {
    if (!date) return false;
    const dateStr = date?.toISOString()?.split('T')?.[0];
    return availableSlots?.some(slot => slot?.date === dateStr);
  };
  
  const days = getDaysInMonth(currentMonth);
  
  const timeSlots = selectedDate ? 
    availableSlots?.filter(slot => slot?.date === selectedDate?.toISOString()?.split('T')?.[0]) : [];

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Select Date & Time
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth(-1)}
              iconName="ChevronLeft"
            />
            <span className="text-sm font-medium text-foreground min-w-[120px] text-center">
              {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth(1)}
              iconName="ChevronRight"
            />
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {daysOfWeek?.map(day => (
            <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
          
          {days?.map((date, index) => (
            <div key={index} className="relative">
              {date ? (
                <button
                  onClick={() => isDateAvailable(date) && onDateSelect(date)}
                  disabled={!isDateAvailable(date)}
                  className={`w-full h-10 rounded-lg text-sm font-medium gentle-transition relative ${
                    isDateSelected(date)
                      ? 'bg-primary text-primary-foreground'
                      : isDateAvailable(date)
                      ? 'hover:bg-muted text-foreground'
                      : 'text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  {date?.getDate()}
                  {hasAvailableSlots(date) && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-success rounded-full" />
                  )}
                </button>
              ) : (
                <div className="w-full h-10" />
              )}
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span>Selected</span>
          </div>
        </div>
      </div>
      {/* Time Slots */}
      {selectedDate && (
        <div>
          <h4 className="text-md font-heading font-medium text-foreground mb-3">
            Available Times - {selectedDate?.toLocaleDateString()}
          </h4>
          
          {timeSlots?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {timeSlots?.map((slot) => (
                <button
                  key={slot?.time}
                  onClick={() => onTimeSelect(slot?.time)}
                  className={`p-3 rounded-lg text-sm font-medium gentle-transition ${
                    selectedTime === slot?.time
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  }`}
                >
                  {slot?.time}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No available time slots for this date</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;