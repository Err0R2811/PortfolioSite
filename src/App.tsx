import { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PrefsProvider, usePrefs } from "@/context/PrefsContext";
import { LoadingScreen } from "@/components/LoadingScreen";
import SplashCursor from "@/components/SplashCursor";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const MotionPrefs = ({ children }: { children: ReactNode }) => {
  const { reducedMotion } = usePrefs();
  return (
    <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
};

const CursorEffect = () => {
  const { particles } = usePrefs();
  if (!particles) return null;
  return (
    <SplashCursor
      DENSITY_DISSIPATION={5}
      COLOR_UPDATE_SPEED={14}
      RAINBOW_MODE
    />
  );
};

const App = () => (
  <PrefsProvider>
    <MotionPrefs>
      <TooltipProvider>
        <CursorEffect />
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
    </MotionPrefs>
  </PrefsProvider>
);

export default App;
