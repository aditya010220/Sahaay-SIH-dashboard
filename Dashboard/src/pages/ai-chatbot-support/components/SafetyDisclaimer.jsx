import React from 'react';
import Icon from '../../../components/AppIcon';

const SafetyDisclaimer = () => {
  return (
    <div className="p-4 mb-4 mx-4 mt-4 bg-amber-50 dark:bg-white-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          <Icon name="AlertTriangle" size={20} className="text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1 space-y-2">
         <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-300">
  Important Safety Disclaimer
</h3>

<ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1.5 list-disc list-inside">
  <li>
    I am an AI assistant, <strong>not a licensed therapist or medical professional</strong>.
  </li>
  <li>
    This service provides <strong>support and guidance only</strong>, not medical diagnosis or treatment.
  </li>
  <li>
    In case of an emergency or mental health crisis, please reach out immediately:
  </li>
</ul>

<div className="pl-4 text-xs text-amber-700 dark:text-amber-300 space-y-1">
  <p>
    National Crisis Hotline: <strong>14416</strong>
  </p>
  <p>
    Crisis Text Line: Text <strong>HOME</strong> to <strong>741741</strong>
  </p>
  <p>
    Emergency Services: <strong>911</strong>
  </p>
</div>

<p className="text-xs text-amber-600 dark:text-amber-400 italic mt-2">
  Your safety matters. If you’re in immediate danger, please seek professional help right away.
</p>

        </div>
      </div>
    </div>
  );
};

export default SafetyDisclaimer;
