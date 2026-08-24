import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface IpInputProps {
  value: string;
  onChange: (value: string) => void;
}

const IpInput = ({ value, onChange }: IpInputProps) => {
  const [parts, setParts] = useState(value.split('.').length === 4 ? value.split('.') : ['', '', '', '']);
  const [errors, setErrors] = useState<string[]>(['', '', '', '']);
  const { toast } = useToast();

  const validateOctet = (value: string, index: number): boolean => {
    if (value === '') return true;
    const num = parseInt(value);
    if (isNaN(num) || num < 0 || num > 255) {
      const newErrors = [...errors];
      newErrors[index] = 'Invalid IP (0-255)';
      setErrors(newErrors);
      toast({
        title: "שגיאה",
        description: `אוקטה ${index + 1} חייבת להיות בין 0 ל-255`,
        variant: "destructive",
      });
      return false;
    }
    const newErrors = [...errors];
    newErrors[index] = '';
    setErrors(newErrors);
    return true;
  };

  const handlePartChange = (index: number, newValue: string) => {
    if (!/^\d*$/.test(newValue)) return;
    if (newValue.length > 3) return;
    
    const newParts = [...parts];
    newParts[index] = newValue;
    setParts(newParts);
    
    if (validateOctet(newValue, index)) {
      onChange(newParts.join('.'));
      if (newValue.length === 3 || (newValue.length > 0 && parseInt(newValue) > 25)) {
        // Move to the next field to the right (decrease index since we're displaying right-to-left)
        const nextInput = document.querySelector(`input[name="ip-part-${index - 1}"]`) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '.') {
      e.preventDefault();
      // Move to the next field to the right (decrease index since we're displaying right-to-left)
      const nextInput = document.querySelector(`input[name="ip-part-${index - 1}"]`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    } else if (e.key === 'Backspace' && !parts[index] && index < 3) {
      // Move to the previous field to the left (increase index since we're displaying right-to-left)
      const prevInput = document.querySelector(`input[name="ip-part-${index + 1}"]`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    } else if (e.key === 'Tab') {
      // For tab navigation, move right (decrease index) or allow natural tab order
      if (e.shiftKey) {
        // Shift+Tab: move left (increase index)
        if (index < 3) {
          e.preventDefault();
          const prevInput = document.querySelector(`input[name="ip-part-${index + 1}"]`) as HTMLInputElement;
          if (prevInput) prevInput.focus();
        }
      } else {
        // Tab: move right (decrease index) or continue to next element
        if (index > 0) {
          e.preventDefault();
          const nextInput = document.querySelector(`input[name="ip-part-${index - 1}"]`) as HTMLInputElement;
          if (nextInput) nextInput.focus();
        }
        // If index === 0, let the default tab behavior continue to the submit button
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 flex-row-reverse">
        {[...parts].reverse().map((part, reversedIndex) => {
          const actualIndex = 3 - reversedIndex; // Convert back to original index
          return (
            <React.Fragment key={actualIndex}>
              <div className="flex flex-col items-center flex-1">
                <Input
                  name={`ip-part-${actualIndex}`}
                  value={part}
                  onChange={(e) => handlePartChange(actualIndex, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(actualIndex, e)}
                  className={`w-full text-center ${errors[actualIndex] ? 'border-red-500' : ''}`}
                  maxLength={3}
                />
                {errors[actualIndex] && (
                  <span className="text-xs text-red-500 mt-1">{errors[actualIndex]}</span>
                )}
              </div>
              {reversedIndex < 3 && <span className="text-muted-foreground">.</span>}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default IpInput;