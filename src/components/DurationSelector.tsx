// src/components/DurationSelector.tsx
import React from 'react';

interface DurationSelectorProps {
  onSelect: (duration: 30 | 60) => void;
  selected?: 30 | 60;
}

export const DurationSelector: React.FC<DurationSelectorProps> = ({ onSelect, selected }) => {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
      <button
        onClick={() => onSelect(30)}
        className={`p-6 border rounded-lg ${
          selected === 30 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
        }`}
      >
        <h3 className="text-lg font-semibold">30 minutes</h3>
        <p className="text-gray-600">18€/personne</p>
      </button>
      <button
        onClick={() => onSelect(60)}
        className={`p-6 border rounded-lg ${
          selected === 60 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
        }`}
      >
        <h3 className="text-lg font-semibold">1 heure</h3>
        <p className="text-gray-600">À partir de 25€/personne</p>
      </button>
    </div>
  );
};