
import React, { useState } from 'react';
import TopNav from "@/components/TopNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';

const AddDriver = () => {
  const { toast } = useToast();
  const [driverName, setDriverName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/add-driver', { name: driverName });
      if (response.data.success) {
        toast({
          title: "הדרייבר נוסף בהצלחה",
          description: `הדרייבר ${driverName} נוסף למערכת`,
        });
        setDriverName('');
      }
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בהוספת הדרייבר",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <TopNav />
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <Card className="p-6 space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">הוספת דרייבר חדש</h1>
              <p className="text-muted-foreground">הוסף דרייבר חדש למערכת</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-right block">שם הדרייבר</label>
                <Input
                  type="text"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="text-right"
                  placeholder="הכנס שם דרייבר"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                הוסף דרייבר
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddDriver;
