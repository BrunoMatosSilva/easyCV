import { useDebounce } from "@/src/hooks/use-debounce";
import { Input } from "../input"

type IconInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const IconInput = ({ value, onChange, placeholder } : IconInputProps) => {
  const debouncedValue = useDebounce(value)

  return (
    <div className="flex items-center grap-2">
      <div className="h-8 w-8 min-w-1 rounded-full bg-white p-1.5">
        {!!debouncedValue && <img src={`https://cdn.simpleicons.org/${debouncedValue}`} className="w-full h-full object-contain" />}
      </div>
      <Input
      value={value}
      onChange={(e) => onChange(e.target.value)} 
      placeholder={placeholder}
      />
    </div>
  )
}