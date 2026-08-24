import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Printer, Plus, Trash2, Search, PlusCircle, FilePlus, FileUp, Upload, PrinterIcon, Settings, UploadCloud, PlusSquareIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";

interface PrinterData {
  name: string;
  driver: string;
  ip: string;
}

const Index = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: printers, isLoading } = useQuery({
    queryKey: ['printers'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/printers');
      return response.data as PrinterData[];
    },
  });

  const filteredPrinters = printers?.filter(printer => 
    printer.name.toLowerCase().includes(query.toLowerCase()) ||
    printer.driver.toLowerCase().includes(query.toLowerCase()) ||
    printer.ip.toLowerCase().includes(query.toLowerCase())
  ) ?? [];

  const handleSearch = (selectedPrinter: PrinterData) => {
    setQuery(selectedPrinter.name);
    setOpen(false);
    toast({
      title: "מדפסת נמצאה",
      description: `נמצאה מדפסת: ${selectedPrinter.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">ניהול מדפסות</h1>
          <p className="text-muted-foreground">מערכת ניהול מדפסות מתקדמת</p>
        </div>

        <div className="flex justify-center">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="flex gap-2 max-w-xl w-full">
                <Input
                  placeholder="חפש מדפסת..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onClick={() => setOpen(true)}
                  className="text-right"
                />
                <Button type="submit" onClick={() => setOpen(true)}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
            <Command shouldFilter={false}>
                <CommandInput
                  placeholder="חפש מדפסת..."
                  value={query}
                  onValueChange={setQuery}
                  className="text-right h-9"
                />
                <CommandList>
                  {isLoading ? (
                    <div className="py-6 text-center">טוען...</div>
                  ) : filteredPrinters.length === 0 ? (
                    <CommandEmpty>לא נמצאו מדפסות</CommandEmpty>
                  ) : (
                    <CommandGroup>
                      {filteredPrinters.map((printer) => (
                        <CommandItem
                          key={printer.name}
                          onSelect={() => handleSearch(printer)}
                          className="text-right flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium">{printer.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {printer.ip} - {printer.driver}
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="p-6 space-y-4 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/form')}>
            <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
              <PlusCircle className="h-6 w-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold text-center">הוסף מדפסת</h2>
            <p className="text-muted-foreground text-center">הוסף מדפסת חדשה למערכת</p>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/active-printers')}>
            <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
              <Printer className="h-6 w-6 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold text-center">מדפסות פעילות</h2>
            <p className="text-muted-foreground text-center">צפה במדפסות הפעילות במערכת</p>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/delete-printer')}>
            <div className="h-12 w-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="h-6 w-6 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold text-center">מחק מדפסת</h2>
            <p className="text-muted-foreground text-center">הסר מדפסת מהמערכת</p>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/add-driver')}>
            <div className="h-12 w-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto">
              <UploadCloud className="h-6 w-6 text-yellow-500" />
            </div>
            <h2 className="text-xl font-semibold text-center">הוספת דרייבר</h2>
            <p className="text-muted-foreground text-center">הוספת דרייבר לשרת המדפסות</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
