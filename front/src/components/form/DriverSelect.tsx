import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

interface DriverSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const DriverSelect = ({ value, onChange }: DriverSelectProps) => {
  const [driverOpen, setDriverOpen] = useState(false);
  const [driverSearch, setDriverSearch] = useState('');

  // Fetch drivers using react-query
  const { data: driversData, isLoading: isLoadingDrivers, error: driversError } = useQuery({
    queryKey: ['drivers'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/get-drivers');
      return response.data.drivers as string[];
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Remove duplicates and filter drivers
  const uniqueDrivers = driversData ? [...new Set(driversData)] : [];
  const filteredDrivers = uniqueDrivers.filter(driver =>
    driver.toLowerCase().includes(driverSearch.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <label className="text-right block">דרייבר</label>
      <Popover open={driverOpen} onOpenChange={setDriverOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Input
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setDriverSearch(e.target.value);
              }}
              onClick={() => setDriverOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                  e.preventDefault();
                  setDriverOpen(true);
                }
              }}
              className="text-right pr-4 cursor-text bg-background hover:bg-accent/50 focus:bg-background"
              placeholder="בחר או הקלד דרייבר"
              required
            />
            <ChevronDown 
              className={`absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition duration-200 ${
                driverOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[var(--radix-popover-trigger-width)] p-0" 
          align="start"
          side="bottom"
        >
          <Command className="w-full">
            <CommandInput
              placeholder="חפש דרייבר..."
              value={driverSearch}
              onValueChange={setDriverSearch}
              className="text-right h-9"
            />
            <CommandList className="max-h-[300px] overflow-y-auto">
              {isLoadingDrivers ? (
                <div className="py-6 text-center">טוען...</div>
              ) : driversError ? (
                <div className="py-6 text-center text-sm text-destructive">
                  שגיאה בטעינת רשימת הדרייברים. אנא נסה שנית מאוחר יותר.
                </div>
              ) : (
                <>
                  <CommandEmpty>לא נמצאו תוצאות</CommandEmpty>
                  <CommandGroup>
                    {filteredDrivers.map((driver, index) => (
                      <CommandItem
                        key={`${driver}-${index}`}
                        onSelect={() => {
                          onChange(driver);
                          setDriverOpen(false);
                        }}
                        className="text-right cursor-pointer"
                      >
                        {driver}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DriverSelect;