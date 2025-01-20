
// src/components/SpaceSelector.tsx
import React from 'react';

interface SpaceSelectorProps {
  onSelect: (type: 'box' | 'vr') => void;
  selected?: 'box' | 'vr';
}

export const SpaceSelector: React.FC<SpaceSelectorProps> = ({ onSelect, selected }) => {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
      <button
        onClick={() => onSelect('box')}
        className={`p-6 border rounded-lg ${
          selected === 'box' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
        }`}
      >
        <h3 className="text-lg font-semibold">Box Individuel</h3>
        <p className="text-gray-600">Capacité : 1 personne</p>
      </button>
      <button
        onClick={() => onSelect('vr')}
        className={`p-6 border rounded-lg ${
          selected === 'vr' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
        }`}
      >
        <h3 className="text-lg font-semibold">Espace VR</h3>
        <p className="text-gray-600">Capacité : jusqu'à 4 personnes</p>
      </button>
    </div>
  );
};
