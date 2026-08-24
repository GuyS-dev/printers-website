
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Form from "./pages/Form";
import DeletePrinter from "./pages/DeletePrinter";
import ActivePrinters from "./pages/ActivePrinters";
import AddDriver from "./pages/AddDriver";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/form" element={<Form />} />
          <Route path="/active-printers" element={<ActivePrinters />} />
          <Route path="/delete-printer" element={<DeletePrinter />} />
          <Route path="/add-driver" element={<AddDriver />} />
        </Routes>
      </div>
      <Toaster />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
