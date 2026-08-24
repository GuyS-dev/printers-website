import React, { useState } from 'react';
import TopNav from "@/components/TopNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import IpInput from "@/components/form/IpInput";
import DriverSelect from "@/components/form/DriverSelect";

const Form = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    driver: '',
    ip: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/submit-form', formData);
      toast({
        title: "המדפסת נוספה בהצלחה",
        description: `המדפסת ${formData.name} נוספה למערכת`,
      });
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בהוספת המדפסת",
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
              <h1 className="text-2xl font-bold">הוספת מדפסת חדשה</h1>
              <p className="text-muted-foreground">מלא את הפרטים להוספת מדפסת חדשה למערכת</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-right block">שם מדפסת</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-right"
                  required
                />
              </div>

              <DriverSelect
                value={formData.driver}
                onChange={(value) => setFormData({ ...formData, driver: value })}
              />

              <div className="space-y-2">
                <label className="text-right block">כתובת IP</label>
                <IpInput 
                  value={formData.ip}
                  onChange={(value) => setFormData({ ...formData, ip: value })}
                />
              </div>

              <Button type="submit" className="w-full">
                הוסף מדפסת
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Form;
