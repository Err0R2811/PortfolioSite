import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PrefsProvider } from "@/context/PrefsContext";
import { LoadingScreen } from "@/components/LoadingScreen";
import SplashCursor from "@/components/SplashCursor";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PrefsProvider>
      <TooltipProvider>
        <SplashCursor
          DENSITY_DISSIPATION={5}
          COLOR_UPDATE_SPEED={14}
          RAINBOW_MODE
        />
        <LoadingScreen />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PrefsProvider>
  </QueryClientProvider>
);

export default App;
