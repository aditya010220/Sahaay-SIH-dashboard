import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';


const FilterPanel = ({ filters, onFilterChange, onClearFilters, isOpen, onToggle }) => {
  const specializationOptions = [
    { value: 'anxiety', label: 'Anxiety & Stress' },
    { value: 'depression', label: 'Depression' },
    { value: 'relationships', label: 'Relationships' },
    { value: 'academic', label: 'Academic Pressure' },
    { value: 'trauma', label: 'Trauma & PTSD' },
    { value: 'eating', label: 'Eating Disorders' },
    { value: 'substance', label: 'Substance Abuse' },
    { value: 'grief', label: 'Grief & Loss' },
    { value: 'identity', label: 'Identity & Self-Esteem' },
    { value: 'family', label: 'Family Issues' }
  ];

  const availabilityOptions = [
    { value: 'today', label: 'Available Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  const sessionTypeOptions = [
    { value: 'individual', label: 'Individual Counseling' },
    { value: 'group', label: 'Group Therapy' },
    { value: 'crisis', label: 'Crisis Support' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const activeFilterCount = Object.values(filters)?.filter(value => 
    Array.isArray(value) ? value?.length > 0 : value
  )?.length;

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          fullWidth
        >
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block glass-card p-6 rounded-lg`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Filter Counselors
          </h3>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Specialization */}
          <Select
            label="Specialization"
            options={specializationOptions}
            value={filters?.specialization || ''}
            onChange={(value) => handleFilterChange('specialization', value)}
            placeholder="All specializations"
            searchable
          />

          {/* Availability */}
          <Select
            label="Availability"
            options={availabilityOptions}
            value={filters?.availability || ''}
            onChange={(value) => handleFilterChange('availability', value)}
            placeholder="Any time"
          />

          {/* Session Type */}
          <Select
            label="Session Type"
            options={sessionTypeOptions}
            value={filters?.sessionType || ''}
            onChange={(value) => handleFilterChange('sessionType', value)}
            placeholder="All session types"
          />

          {/* Additional Filters */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Additional Options</h4>
            
            <Checkbox
              label="Previous sessions only"
              description="Show counselors I've worked with before"
              checked={filters?.previousSessions || false}
              onChange={(e) => handleFilterChange('previousSessions', e?.target?.checked)}
            />
            
            <Checkbox
              label="Highly rated (4.5+ stars)"
              checked={filters?.highlyRated || false}
              onChange={(e) => handleFilterChange('highlyRated', e?.target?.checked)}
            />
            
            <Checkbox
              label="Available for emergency sessions"
              checked={filters?.emergencyAvailable || false}
              onChange={(e) => handleFilterChange('emergencyAvailable', e?.target?.checked)}
            />
            
            <Checkbox
              label="Accepts walk-ins"
              checked={filters?.acceptsWalkIns || false}
              onChange={(e) => handleFilterChange('acceptsWalkIns', e?.target?.checked)}
            />
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-border">
            <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Zap"
                iconPosition="left"
                onClick={() => handleFilterChange('availability', 'today')}
              >
                Find Available Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Heart"
                iconPosition="left"
                onClick={() => {
                  handleFilterChange('emergencyAvailable', true);
                  handleFilterChange('availability', 'today');
                }}
              >
                Emergency Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;