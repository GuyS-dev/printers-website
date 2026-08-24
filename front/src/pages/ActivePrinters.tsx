
import React from 'react';
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Printer } from "lucide-react";
import TopNav from "@/components/TopNav";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

interface PrinterData {
  name: string;
  driver: string;
  ip: string;
}

const ActivePrinters = () => {
  const { toast } = useToast();
  const { data: printers, isLoading, error } = useQuery({
    queryKey: ['printers'],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:5000/printers');
        console.log('Printers response:', response.data);
        return response.data as PrinterData[];
      } catch (error) {
        console.error('Error fetching printers:', error);
        throw error;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Show error toast only once when error occurs
  React.useEffect(() => {
    if (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בטעינת המדפסות",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div>
      <TopNav />
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">מדפסות פעילות</h1>
            <p className="text-muted-foreground">רשימת כל המדפסות הפעילות במערכת</p>
          </div>

          {isLoading ? (
            <div className="text-center">טוען...</div>
          ) : error ? (
            <div className="text-center text-destructive">אירעה שגיאה בטעינת המדפסות</div>
          ) : !printers?.length ? (
            <div className="text-center">לא נמצאו מדפסות פעילות</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {printers.map((printer) => (
                <Card key={printer.name} className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Printer className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{printer.name}</h3>
                      <p className="text-sm text-muted-foreground">{printer.ip}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">דרייבר: {printer.driver}</p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivePrinters;

