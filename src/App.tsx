
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ReportIssue from "./pages/ReportIssue";
import MyIssues from "./pages/MyIssues";
import BrowseIssues from "./pages/BrowseIssues";
import IssueDetails from "./pages/IssueDetails";
import EditIssue from "./pages/EditIssue";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/report" element={<ReportIssue />} />
          <Route path="/my-issues" element={<MyIssues />} />
          <Route path="/issues" element={<BrowseIssues />} />
          <Route path="/issues/:id" element={<IssueDetails />} />
          <Route path="/edit-issue/:id" element={<EditIssue />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
