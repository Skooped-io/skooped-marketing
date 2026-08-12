import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Plans from "./pages/Plans.tsx";
import MenuItem from "./pages/MenuItem.tsx";
import Build from "./pages/Build.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import Templates from "./pages/Templates.tsx";
import IndustryTemplate from "./pages/IndustryTemplate.tsx";
import NPI from "./pages/NPI.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import CityPage from "./pages/CityPage.tsx";
import WelcomeLocalScoop from "./pages/WelcomeLocalScoop.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/plans/:slug" element={<MenuItem />} />
          <Route path="/build" element={<Build />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/:slug" element={<IndustryTemplate />} />
          <Route path="/npi" element={<NPI />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Navigate to="/contact" replace />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/local/:slug" element={<CityPage />} />
          {/* Post-checkout landing for Stripe payment links (noindex, kept out of the sitemap) */}
          <Route path="/welcome/local-scoop" element={<WelcomeLocalScoop />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
