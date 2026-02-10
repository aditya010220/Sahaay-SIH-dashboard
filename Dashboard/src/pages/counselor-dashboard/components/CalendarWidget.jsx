import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'month'

  const appointments = [
    { date: '2025-01-12', time: '09:00', student: 'Sarah Chen', type: 'Individual' },
    { date: '2025-01-12', time: '10:30', student: 'Marcus Johnson', type: 'Crisis' },
    { date: '2025-01-12', time: '14:00', student: 'Emma Rodriguez', type: 'Group' },
    { date: '2025-01-13', time: '11:00', student: 'David Kim', type: 'Assessment' },
    { date: '2025-01-13', time: '15:30', student: 'Lisa Wang', type: 'Individual' },
    { date: '2025-01-14', time: '09:30', student: 'Alex Thompson', type: 'Follow-up' },
    { date: '2025-01-15', time: '13:00', student: 'Maya Patel', type: 'Individual' },
    { date: '2025-01-16', time: '10:00', student: 'James Wilson', type: 'Group' }
  ];

  const getWeekDates = (date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate?.getDay();
    const diff = startDate?.getDate() - day;
    startDate?.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate?.setDate(startDate?.getDate() + i);
      week?.push(currentDate);
    }
    return week;
  };

  const getAppointmentsForDate = (date) => {
    const dateStr = date?.toISOString()?.split('T')?.[0];
    return appointments?.filter(apt => apt?.date === dateStr);
  };

  const weekDates = getWeekDates(currentDate);
  const today = new Date();

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setDate(currentDate?.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const getSessionTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'crisis': return 'bg-error/10 text-error border-error/20';
      case 'group': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'assessment': return 'bg-warning/10 text-warning border-warning/20';
      case 'individual': return 'bg-primary/10 text-primary border-primary/20';
      case 'follow-up': return 'bg-accent/10 text-accent border-accent/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Calendar" className="text-primary" size={24} />
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Weekly Schedule
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            onClick={() => navigateWeek(-1)}
          />
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            onClick={() => navigateWeek(1)}
          />
          <Button
            variant="secondary"
            size="sm"
            iconName="Plus"
            iconPosition="left"
          >
            Add
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-foreground mb-2">
          {currentDate?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {weekDates?.map((date, index) => {
          const dayAppointments = getAppointmentsForDate(date);
          const isToday = date?.toDateString() === today?.toDateString();
          const isPast = date < today && !isToday;

          return (
            <div
              key={index}
              className={`min-h-[120px] p-2 rounded-lg border gentle-transition ${
                isToday
                  ? 'bg-primary/10 border-primary/20'
                  : isPast
                  ? 'bg-muted/50 border-border opacity-60' :'bg-background/50 border-border hover:bg-background/80'
              }`}
            >
              <div className={`text-sm font-medium mb-2 ${
                isToday ? 'text-primary' : isPast ? 'text-muted-foreground' : 'text-foreground'
              }`}>
                {date?.getDate()}
                {isToday && (
                  <span className="ml-1 text-xs bg-primary text-primary-foreground px-1 rounded">
                    Today
                  </span>
                )}
              </div>
              <div className="space-y-1">
                {dayAppointments?.slice(0, 3)?.map((appointment, aptIndex) => (
                  <div
                    key={aptIndex}
                    className={`text-xs p-1 rounded border ${getSessionTypeColor(appointment?.type)}`}
                  >
                    <div className="font-medium truncate">
                      {appointment?.time}
                    </div>
                    <div className="truncate opacity-80">
                      {appointment?.student}
                    </div>
                  </div>
                ))}
                
                {dayAppointments?.length > 3 && (
                  <div className="text-xs text-muted-foreground text-center py-1">
                    +{dayAppointments?.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-primary/20 border border-primary/40"></div>
              <span className="text-muted-foreground">Individual</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-error/20 border border-error/40"></div>
              <span className="text-muted-foreground">Crisis</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-secondary/20 border border-secondary/40"></div>
              <span className="text-muted-foreground">Group</span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="ExternalLink"
            iconPosition="right"
          >
            Full Calendar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;