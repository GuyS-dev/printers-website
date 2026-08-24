
import React, { useState } from 'react';
import TopNav from "@/components/TopNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from 'axios';

const DeletePrinter = () => {
  const { toast } = useToast();
  const [printerName, setPrinterName] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.post('http://localhost:5000/delete-printer', { name: printerName });
      if (response.data.success) {
        toast({
          title: "המדפסת נמחקה בהצלחה",
          description: `המדפסת ${printerName} הוסרה מהמערכת`,
        });
      } else {
        toast({
          title: "שגיאה",
          description: "לא ניתן למחוק את המדפסת",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה במחיקת המדפסת",
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
              <div className="h-12 w-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold">מחיקת מדפסת</h1>
              <p className="text-muted-foreground">הזן את שם המדפסת שברצונך למחוק מהמערכת</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-right block">שם מדפסת</label>
                <Input
                  type="text"
                  value={printerName}
                  onChange={(e) => setPrinterName(e.target.value)}
                  className="text-right"
                  placeholder="הזן שם מדפסת"
                  required
                />
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full" disabled={!printerName}>
                    מחק מדפסת
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>האם אתה בטוח?</AlertDialogTitle>
                    <AlertDialogDescription>
                      פעולה זו תמחק את המדפסת {printerName} מהמערכת. פעולה זו בלתי הפיכה.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>ביטול</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      מחק
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeletePrinter;
