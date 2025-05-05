
import { useState, useEffect } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import IssueList from "@/components/issues/IssueList";
import { getIssues } from "@/lib/mock-data";
import { Issue, IssueCategory, IssueStatus } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

const BrowseIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<IssueCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<IssueStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await getIssues();
        setIssues(data);
        setFilteredIssues(data);
      } catch (error) {
        console.error("Error fetching issues:", error);
        toast({
          title: "Error loading issues",
          description: "There was a problem loading the issues. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [toast]);

  useEffect(() => {
    applyFilters();
  }, [issues, categoryFilter, statusFilter, searchTerm]);

  const applyFilters = () => {
    let result = [...issues];

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter(issue => issue.category === categoryFilter);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(issue => issue.status === statusFilter);
    }

    // Apply search term
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(issue => 
        issue.title.toLowerCase().includes(lowercasedTerm) || 
        issue.description.toLowerCase().includes(lowercasedTerm) ||
        issue.location.toLowerCase().includes(lowercasedTerm)
      );
    }

    setFilteredIssues(result);
  };

  const resetFilters = () => {
    setCategoryFilter("all");
    setStatusFilter("all");
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 md:py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse Issues</h1>
          <p className="text-muted-foreground mb-8">
            Explore civic issues reported in your community
          </p>
          
          {/* Filters */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 mb-8 shadow-sm border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="category-filter" className="block text-sm font-medium mb-1">
                  Category
                </label>
                <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as IssueCategory | "all")}>
                  <SelectTrigger id="category-filter">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="road">Road</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="sanitation">Sanitation</SelectItem>
                    <SelectItem value="electricity">Electricity</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium mb-1">
                  Status
                </label>
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as IssueStatus | "all")}>
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="search" className="block text-sm font-medium mb-1">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="search"
                    placeholder="Search issues..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={resetFilters} className="flex items-center">
                <X className="mr-2 h-4 w-4" />
                Reset Filters
              </Button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredIssues.length} {filteredIssues.length === 1 ? "issue" : "issues"}
                </p>
              </div>
              
              <IssueList issues={filteredIssues} />
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrowseIssues;
