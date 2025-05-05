
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryDistribution from "@/components/analytics/CategoryDistribution";
import TemporalAnalysis from "@/components/analytics/TemporalAnalysis";
import TopVotedIssues from "@/components/analytics/TopVotedIssues";
import MapView from "@/components/analytics/MapView";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock fetch function - in a real app, this would call your API
const fetchAnalyticsData = async () => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock data for analytics
  return {
    categories: {
      road: 32,
      water: 24,
      sanitation: 18,
      electricity: 15,
      other: 11,
    },
    temporal: [
      { date: "2025-04-29", count: 8 },
      { date: "2025-04-30", count: 12 },
      { date: "2025-05-01", count: 10 },
      { date: "2025-05-02", count: 15 },
      { date: "2025-05-03", count: 20 },
      { date: "2025-05-04", count: 17 },
      { date: "2025-05-05", count: 13 },
    ],
    topVoted: [
      { id: "1", title: "Broken traffic light on Main Street", votes: 87, category: "road", status: "in-progress" },
      { id: "2", title: "Water leak near community center", votes: 72, category: "water", status: "pending" },
      { id: "3", title: "Trash collection missed for 2 weeks", votes: 65, category: "sanitation", status: "resolved" },
      { id: "4", title: "Flickering street lights on Oak Avenue", votes: 58, category: "electricity", status: "pending" },
      { id: "5", title: "Pothole causing damage to vehicles", votes: 52, category: "road", status: "in-progress" },
    ],
    issueLocations: [
      { id: "1", title: "Broken traffic light on Main Street", lat: 40.712776, lng: -74.005974, category: "road", status: "in-progress", votes: 87 },
      { id: "2", title: "Water leak near community center", lat: 40.715076, lng: -74.002974, category: "water", status: "pending", votes: 72 },
      { id: "3", title: "Trash collection missed for 2 weeks", lat: 40.712176, lng: -74.007974, category: "sanitation", status: "resolved", votes: 65 },
      { id: "4", title: "Flickering street lights on Oak Avenue", lat: 40.710776, lng: -74.003974, category: "electricity", status: "pending", votes: 58 },
      { id: "5", title: "Pothole causing damage to vehicles", lat: 40.713776, lng: -74.006974, category: "road", status: "in-progress", votes: 52 },
      { id: "6", title: "Fallen tree blocking sidewalk", lat: 40.714776, lng: -74.001974, category: "other", status: "pending", votes: 45 },
      { id: "7", title: "Broken water main", lat: 40.711776, lng: -74.004974, category: "water", status: "in-progress", votes: 38 },
    ]
  };
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7days");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["analytics", timeRange],
    queryFn: fetchAnalyticsData,
  });
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prev => prev === category ? null : category);
  };
  
  const filteredData = React.useMemo(() => {
    if (!data || !selectedCategory) return data;
    
    // Filter temporal data by category (in a real app, this would be more sophisticated)
    // For now, we'll just simulate filtered data
    return {
      ...data,
      temporal: data.temporal.map(day => ({
        ...day, 
        count: Math.floor(day.count * 0.7) // Simulating filtered data
      })),
      topVoted: data.topVoted.filter(issue => issue.category === selectedCategory),
    };
  }, [data, selectedCategory]);
  
  if (isError) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
          <Card className="p-10 text-center">
            <CardContent>
              <p className="text-destructive">Failed to load analytics data. Please try again later.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          
          <div className="flex items-center gap-2">
            {selectedCategory && (
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <span>Filtering by: {selectedCategory}</span>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="ml-1 rounded-full w-4 h-4 bg-primary text-primary-foreground flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            )}
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            {isLoading ? (
              <div className="h-96 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <span className="ml-2 text-muted-foreground">Loading analytics data...</span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Issues by Category</CardTitle>
                      <CardDescription>Distribution of issues across different categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CategoryDistribution 
                        data={data.categories}
                        onCategoryClick={handleCategoryClick}
                        selectedCategory={selectedCategory}
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Issue Submissions Over Time</CardTitle>
                      <CardDescription>Daily activity for the {timeRange === "7days" ? "past week" : timeRange === "30days" ? "past month" : "past 3 months"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TemporalAnalysis 
                        data={filteredData?.temporal || data?.temporal || []} 
                      />
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Top Voted Issues</CardTitle>
                    <CardDescription>Most supported issues in the community</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TopVotedIssues 
                      data={filteredData?.topVoted || data?.topVoted || []} 
                    />
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="map">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Map view of reported issues</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="h-[600px] flex items-center justify-center">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <span className="ml-2 text-muted-foreground">Loading map data...</span>
                  </div>
                ) : (
                  <MapView 
                    issues={data?.issueLocations || []}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Analytics;
