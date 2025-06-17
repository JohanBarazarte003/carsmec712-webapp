// Archivo: app/components/IconPicker.jsx
'use client';

import * as LucideIcons from 'lucide-react';

// Lista de los nombres de los iconos que queremos ofrecer.
// Puedes añadir o quitar iconos de esta lista según necesites.
const availableIcons = [
  'Wrench', 'BrainCircuit', 'Car', 'Droplet', 'Settings', 'ShieldCheck', 
  'GaugeCircle', 'BatteryCharging', 'Wind', 'Thermometer', 'CarFront','SprayCan', 'PaintBucket'
];

const IconPicker = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Selecciona un Icono
      </label>
      <div className="grid grid-cols-5 md:grid-cols-8 gap-2 p-4 bg-gray-900 border border-gray-700 rounded-lg">
        {availableIcons.map(iconName => {
          const IconComponent = LucideIcons[iconName];
          if (!IconComponent) return null; // Por si hay un error en el nombre

          const isSelected = value === iconName;

          return (
            <button
              key={iconName}
              type="button" // Importante para que no envíe el formulario
              onClick={() => onChange(iconName)}
              title={iconName}
              className={`flex items-center justify-center p-3 rounded-md transition-all duration-200
                ${isSelected 
                  ? 'bg-brand-red text-white ring-2 ring-offset-2 ring-offset-gray-900 ring-brand-red' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <IconComponent size={24} />
            </button>
          );
        })}
      </div>
      {/* Input oculto para referencia, aunque no es estrictamente necesario */}
      <input type="hidden" value={value} required />
      {value && <p className="text-xs text-gray-500 mt-2">Seleccionado: <span className="font-mono">{value}</span></p>}
    </div>
  );
};

export default IconPicker;