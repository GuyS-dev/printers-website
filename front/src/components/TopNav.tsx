
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, Printer, Plus, Trash2, PlusCircle } from "lucide-react";

const TopNav = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background border-b p-4 mb-6">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-center">
        <Button variant="outline" onClick={() => navigate('/')}>
          <Home className="h-4 w-4 ml-2" />
          דף הבית
        </Button>
        <Button variant="outline" onClick={() => navigate('/form')}>
          <PlusCircle className="h-4 w-4 ml-2 text-blue-500"/>
          הוסף מדפסת
        </Button>
        <Button variant="outline" onClick={() => navigate('/active-printers')}>
          <Printer className="h-4 w-4 ml-2 text-green-500"/>
          מדפסות פעילות
        </Button>
        <Button variant="outline" onClick={() => navigate('/delete-printer')}>
          <Trash2 className="h-4 w-4 ml-2 text-destructive" />
          מחק מדפסת
        </Button>
        <Button variant="outline" onClick={() => navigate('/add-driver')}>
          <Plus className="h-4 w-4 ml-2 text-yellow-500" />
          הוספת דרייבר
        </Button>
      </div>
    </div>
  );
};

export default TopNav;
