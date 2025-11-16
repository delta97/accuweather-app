import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import type { TemperatureUnit } from '../services/weatherApi';

interface SettingsProps {
  temperatureUnit: TemperatureUnit;
  onTemperatureUnitChange: (unit: TemperatureUnit) => void;
}

export default function Settings({ temperatureUnit, onTemperatureUnitChange }: SettingsProps) {
  return (
    <div className="flex items-center gap-3">
      <FontAwesomeIcon icon={faCog} className="text-white/70" />
      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl p-1">
        <button
          onClick={() => onTemperatureUnitChange('fahrenheit')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            temperatureUnit === 'fahrenheit'
              ? 'bg-white text-blue-600 shadow-lg'
              : 'text-white/80 hover:text-white'
          }`}
        >
          °F
        </button>
        <button
          onClick={() => onTemperatureUnitChange('celsius')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            temperatureUnit === 'celsius'
              ? 'bg-white text-blue-600 shadow-lg'
              : 'text-white/80 hover:text-white'
          }`}
        >
          °C
        </button>
      </div>
    </div>
  );
}
