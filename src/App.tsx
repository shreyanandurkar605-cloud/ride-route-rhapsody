import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import SearchPage from "./pages/SearchPage";
import HistoryPage from "./pages/HistoryPage";
import TimetablePage from "./pages/TimetablePage";
import NotFound from "./pages/NotFound";
import { useState, createContext, useContext } from "react";

const queryClient = new QueryClient();

interface NavigationContextType {
  currentPage: string;
  navigate: (page: string) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('search');

  const navigate = (page: string) => {
    setCurrentPage(page);
  };

  const goBack = () => {
    setCurrentPage('search');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'search':
        return <SearchPage />;
      case 'history':
        return <HistoryPage onBack={goBack} />;
      case 'timetable':
        return <TimetablePage onBack={goBack} />;
      default:
        return <SearchPage />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <NavigationContext.Provider value={{ currentPage, navigate, goBack }}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={renderCurrentPage()} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </NavigationContext.Provider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;