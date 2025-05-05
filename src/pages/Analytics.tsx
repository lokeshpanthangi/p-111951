
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import CategoryDistribution from "@/components/analytics/CategoryDistribution";
import TemporalAnalysis from "@/components/analytics/TemporalAnalysis";
import TopVotedIssues from "@/components/analytics/TopVotedIssues";
import MapView from "@/components/analytics/MapView";
import { useToast } from "@/components/ui/use-toast";
import { IssueCategory, IssueStatus } from "@/types";

// Type definitions for the data structures
interface CategoryData {
  category: IssueCategory;
  count: number;
}

interface TemporalData {
  date: string;
  count: number;
}

interface TopVotedIssue {
  id: string;
  title: string;
  votes: number;
  category: IssueCategory;
  status: IssueStatus;
}

interface MapIssue {
  id: string;
  title: string;
  lat: number;
  lng: number;
  category: IssueCategory;
  status: IssueStatus;
  votes: number;
}

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock data for charts
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [temporalData, setTemporalData] = useState<TemporalData[]>([]);
  const [topVotedIssues, setTopVotedIssues] = useState<TopVotedIssue[]>([]);
  const [mapIssues, setMapIssues] = useState<MapIssue[]>([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setIsLoading(true);
      try {
        // In a real app, these would be API calls
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

        // Mock category distribution data
        setCategoryData([
          { category: "road", count: 42 },
          { category: "water", count: 28 },
          { category: "electricity", count: 35 },
          { category: "sanitation", count: 19 },
          { category: "other", count: 15 },
        ]);

        // Mock temporal data (last 7 days)
        const today = new Date();
        const temporalMockData = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(date.getDate() - (6 - i));
          return {
            date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
            count: Math.floor(Math.random() * 10) + 5,
          };
        });
        setTemporalData(temporalMockData);

        // Mock top voted issues
        setTopVotedIssues([
          { 
            id: "issue-1", 
            title: "Massive pothole on Main Street causing traffic delays", 
            votes: 47, 
            category: "road" as IssueCategory, 
            status: "pending" as IssueStatus 
          },
          { 
            id: "issue-2", 
            title: "Broken water main near Central Park", 
            votes: 36, 
            category: "water" as IssueCategory, 
            status: "in-progress" as IssueStatus 
          },
          { 
            id: "issue-3", 
            title: "Frequent power outages in Westside neighborhood", 
            votes: 32, 
            category: "electricity" as IssueCategory, 
            status: "in-progress" as IssueStatus
          },
          { 
            id: "issue-4", 
            title: "Overflowing trash bins on Pine Avenue", 
            votes: 28, 
            category: "sanitation" as IssueCategory, 
            status: "resolved" as IssueStatus 
          },
          { 
            id: "issue-5", 
            title: "Dangerous intersection without proper signage", 
            votes: 26, 
            category: "road" as IssueCategory, 
            status: "pending" as IssueStatus 
          },
        ]);

        // Mock map issues
        setMapIssues([
          { 
            id: "map-1", 
            title: "Pothole on Main Street", 
            lat: 40.7128, 
            lng: -74.006, 
            category: "road" as IssueCategory, 
            status: "pending" as IssueStatus, 
            votes: 47 
          },
          { 
            id: "map-2", 
            title: "Broken water main", 
            lat: 40.7148, 
            lng: -74.013, 
            category: "water" as IssueCategory, 
            status: "in-progress" as IssueStatus, 
            votes: 36 
          },
          { 
            id: "map-3", 
            title: "Power outages", 
            lat: 40.7158, 
            lng: -73.990, 
            category: "electricity" as IssueCategory, 
            status: "in-progress" as IssueStatus, 
            votes: 32 
          },
          { 
            id: "map-4", 
            title: "Trash overflow", 
            lat: 40.7218, 
            lng: -74.001, 
            category: "sanitation" as IssueCategory, 
            status: "resolved" as IssueStatus, 
            votes: 28 
          },
          { 
            id: "map-5", 
            title: "Dangerous intersection", 
            lat: 40.7098, 
            lng: -73.997, 
            category: "road" as IssueCategory, 
            status: "pending" as IssueStatus, 
            votes: 26 
          },
        ]);

      } catch (error) {
        console.error("Error fetching analytics data:", error);
        toast({
          title: "Error loading analytics",
          description: "Could not load analytics data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [toast]);

  // Handle category filtering
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prev => prev === category ? null : category);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-8 md:py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground mb-8">
            Explore and analyze civic issues across the community
          </p>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Category Distribution</CardTitle>
                    <CardDescription>
                      Number of issues by category
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    {isLoading ? (
                      <div className="h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                      </div>
                    ) : (
                      <CategoryDistribution 
                        data={categoryData} 
                        onCategoryClick={handleCategoryClick}
                        selectedCategory={selectedCategory}
                      />
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Temporal Analysis</CardTitle>
                    <CardDescription>
                      Issue reports over the past 7 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    {isLoading ? (
                      <div className="h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                      </div>
                    ) : (
                      <TemporalAnalysis data={temporalData} />
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Top Voted Issues</CardTitle>
                  <CardDescription>
                    Most supported issues by community votes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="h-[400px] flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <TopVotedIssues issues={topVotedIssues} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="map">
              <Card>
                <CardContent className="p-0">
                  {isLoading ? (
                    <div className="h-[70vh] flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <MapView 
                      issues={mapIssues}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;
