
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronDown, 
  Search, 
  X, 
  Map as MapIcon, 
  Layers, 
  LocateFixed,
  Filter,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import StatusBadge from "@/components/issues/StatusBadge";
import CategoryIcon from "@/components/issues/CategoryIcon";
import { IssueCategory, IssueStatus } from "@/types";

// Helper function for debouncing
const debounce = <F extends (...args: any[]) => any>(
  fn: F,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function(this: any, ...args: Parameters<F>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};

// Mock component for an actual map integration
const MapPlaceholder = ({ 
  children,
  onMapClick
}: { 
  children: React.ReactNode;
  onMapClick: () => void;
}) => {
  return (
    <div 
      className="relative bg-slate-100 dark:bg-slate-800 h-[600px] w-full flex items-center justify-center overflow-hidden"
      onClick={onMapClick}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-muted-foreground">
          <MapIcon size={48} className="mx-auto mb-2 opacity-20" />
          <p>Map integration would be displayed here</p>
          <p className="text-sm">(Mapbox or Google Maps)</p>
        </div>
      </div>
      {children}
    </div>
  );
};

interface MapIssue {
  id: string;
  title: string;
  lat: number;
  lng: number;
  category: IssueCategory;
  status: IssueStatus;
  votes: number;
}

interface MapViewProps {
  issues: MapIssue[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const MapView: React.FC<MapViewProps> = ({ 
  issues, 
  selectedCategory,
  setSelectedCategory
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Record<string, boolean>>({
    pending: true,
    "in-progress": true,
    resolved: false
  });
  const [categoryFilter, setCategoryFilter] = useState<Record<string, boolean>>({
    road: true,
    water: true,
    sanitation: true,
    electricity: true,
    other: true
  });
  const [selectedIssue, setSelectedIssue] = useState<MapIssue | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [mapStyle, setMapStyle] = useState("standard");
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Update category filters when selectedCategory changes from parent
  useEffect(() => {
    if (selectedCategory) {
      const newCategoryFilter = {
        road: selectedCategory === "road",
        water: selectedCategory === "water",
        sanitation: selectedCategory === "sanitation",
        electricity: selectedCategory === "electricity",
        other: selectedCategory === "other"
      };
      setCategoryFilter(newCategoryFilter);
    } else if (selectedCategory === null && 
              Object.values(categoryFilter).filter(Boolean).length === 1) {
      // Reset all filters if only one is selected
      setCategoryFilter({
        road: true,
        water: true,
        sanitation: true,
        electricity: true,
        other: true
      });
    }
  }, [selectedCategory]);
  
  const handleSearchChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, 300);
  
  const clearSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      setSearchQuery("");
    }
  };
  
  const resetFilters = () => {
    setCategoryFilter({
      road: true,
      water: true,
      sanitation: true,
      electricity: true,
      other: true
    });
    setStatusFilter({
      pending: true,
      "in-progress": true,
      resolved: false
    });
    setSelectedCategory(null);
    clearSearch();
  };
  
  const filteredIssues = issues.filter(issue => {
    // Apply search filter
    const matchesSearch = searchQuery === "" || 
      issue.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter[issue.status];
    
    // Apply category filter
    const matchesCategory = categoryFilter[issue.category];
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  const handleMapClick = () => {
    setSelectedIssue(null);
  };
  
  const handleIssueClick = (issue: MapIssue) => {
    setSelectedIssue(issue);
  };
  
  const handleViewDetails = (issue: MapIssue) => {
    navigate(`/issues/${issue.id}`);
  };
  
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategoryFilter = {
      ...categoryFilter,
      [category]: checked
    };
    setCategoryFilter(newCategoryFilter);
    
    // Update parent's selectedCategory if only one category is selected
    const selectedCategories = Object.entries(newCategoryFilter)
      .filter(([_, isSelected]) => isSelected)
      .map(([cat]) => cat);
    
    if (selectedCategories.length === 1) {
      setSelectedCategory(selectedCategories[0]);
    } else {
      setSelectedCategory(null);
    }
  };

  return (
    <div className="flex h-[600px] relative">
      {/* Sidebar */}
      <div 
        className={`${
          showSidebar 
            ? "w-80 translate-x-0" 
            : "w-0 -translate-x-full"
        } h-full bg-background border-r overflow-hidden transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search issues..."
              className="pl-9 pr-9"
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button 
                onClick={clearSearch}
                className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Filters</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={resetFilters}
            >
              Reset all
            </Button>
          </div>
          
          <div className="mb-3">
            <h4 className="text-xs font-medium mb-2 text-muted-foreground">Categories</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries({
                road: "Road",
                water: "Water",
                sanitation: "Sanitation",
                electricity: "Electricity",
                other: "Other"
              }).map(([key, label]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${key}`}
                    checked={categoryFilter[key]}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(key, checked === true)
                    }
                  />
                  <Label
                    htmlFor={`category-${key}`}
                    className="flex items-center text-sm cursor-pointer"
                  >
                    <CategoryIcon category={key as IssueCategory} size={14} />
                    <span className="ml-1">{label}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-medium mb-2 text-muted-foreground">Status</h4>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries({
                pending: "Pending",
                "in-progress": "In Progress",
                resolved: "Resolved"
              }).map(([key, label]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${key}`}
                    checked={statusFilter[key]}
                    onCheckedChange={(checked) => 
                      setStatusFilter(prev => ({ ...prev, [key]: checked === true }))
                    }
                  />
                  <Label
                    htmlFor={`status-${key}`}
                    className="text-sm cursor-pointer"
                  >
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Issues ({filteredIssues.length})</h3>
              <div className="text-xs text-muted-foreground">
                {filteredIssues.length} of {issues.length} shown
              </div>
            </div>
            
            <div className="space-y-2">
              {filteredIssues.map(issue => (
                <div
                  key={issue.id}
                  className={`p-3 border rounded-md cursor-pointer transition-colors ${
                    selectedIssue?.id === issue.id 
                      ? "border-primary bg-primary/5" 
                      : "hover:bg-muted"
                  }`}
                  onClick={() => handleIssueClick(issue)}
                >
                  <div className="flex items-start gap-2">
                    <CategoryIcon category={issue.category} />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-1">{issue.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <StatusBadge status={issue.status} size="sm" />
                        <span className="text-xs text-muted-foreground">
                          {issue.votes} votes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredIssues.length === 0 && (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  No issues match the current filters
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Map */}
      <div className="flex-1 relative">
        <MapPlaceholder onMapClick={handleMapClick}>
          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-background shadow-md h-8 w-8"
            >
              <LocateFixed size={16} />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-background shadow-md h-8 w-8"
                >
                  <Layers size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-32 p-2" align="end">
                <div className="space-y-1">
                  <Button
                    variant={mapStyle === "standard" ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-xs h-8"
                    onClick={() => setMapStyle("standard")}
                  >
                    Standard
                  </Button>
                  <Button
                    variant={mapStyle === "satellite" ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-xs h-8"
                    onClick={() => setMapStyle("satellite")}
                  >
                    Satellite
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Toggle Sidebar Button */}
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 left-4 bg-background shadow-md h-8 px-2"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <Filter size={16} className="mr-1" />
            {showSidebar ? "Hide Filters" : "Show Filters"}
          </Button>
          
          {/* Selected Issue Popup */}
          {selectedIssue && (
            <div 
              className="absolute bottom-4 left-0 right-0 mx-auto w-80 bg-background rounded-lg shadow-lg border animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <CategoryIcon category={selectedIssue.category} />
                    <div>
                      <h3 className="font-medium line-clamp-2">{selectedIssue.title}</h3>
                      <StatusBadge status={selectedIssue.status} size="sm" className="mt-1" />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setSelectedIssue(null)}
                  >
                    <X size={14} />
                  </Button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {selectedIssue.votes} votes
                  </span>
                  <Button 
                    size="sm" 
                    onClick={() => handleViewDetails(selectedIssue)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Back to Top Button (conditional rendering) */}
          <div className="absolute bottom-4 right-4">
            <Button
              variant="outline"
              size="icon"
              className="bg-background shadow-md rounded-full h-10 w-10"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ChevronUp size={20} />
            </Button>
          </div>
          
          {/* Mock map markers (would be actual markers with a real map integration) */}
          {filteredIssues.map(issue => {
            // Calculate position (random for mock purposes)
            const left = 10 + (issue.id.charCodeAt(0) % 80) + '%';
            const top = 10 + (issue.id.charCodeAt(1) % 80) + '%';
            
            return (
              <div 
                key={issue.id}
                className={`absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 ${
                  selectedIssue?.id === issue.id ? 'z-10 scale-110' : 'z-0'
                }`}
                style={{ left, top }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleIssueClick(issue);
                }}
              >
                <div className={`w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center border-2 ${
                  issue.category === 'road' ? 'border-amber-500' : 
                  issue.category === 'water' ? 'border-blue-500' :
                  issue.category === 'sanitation' ? 'border-green-500' :
                  issue.category === 'electricity' ? 'border-yellow-500' :
                  'border-gray-500'
                }`}>
                  <CategoryIcon category={issue.category} size={14} />
                </div>
              </div>
            );
          })}
        </MapPlaceholder>
      </div>
    </div>
  );
};

export default MapView;
