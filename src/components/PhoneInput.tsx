import { COUNTRIES, type CountryCode } from '../lib/phone';

interface PhoneInputProps {
  country: CountryCode;
  onCountryChange: (country: CountryCode) => void;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PhoneInput({ country, onCountryChange, value, onChange, placeholder }: PhoneInputProps) {
  return (
    <div className="flex gap-2">
      <select
        value={country}
        onChange={(e) => onCountryChange(e.target.value as CountryCode)}
        aria-label="País"
        className="text-sm rounded-full border border-black/10 bg-white pl-3.5 pr-6 py-3 outline-none focus:border-black/30 transition-colors shrink-0 w-[42%] text-ellipsis"
      >
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>
            +{c.dial} {c.name}
          </option>
        ))}
      </select>
      <input
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? 'Número de teléfono'}
        className="flex-1 min-w-0 text-sm rounded-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30 transition-colors"
        autoComplete="tel-national"
      />
    </div>
  );
}
