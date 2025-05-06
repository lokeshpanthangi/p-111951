
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
import { getCategoryDistribution, getTemporalAnalysis, getTopVotedIssues, getIssuesForMap } from "@/lib/supabase-data";
import { useQuery } from "@tanstack/react-query";

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

interface LocationState {
  issueId?: string;
  showMap?: boolean;
}

const Analytics = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const showMap = state?.showMap || false;
  const focusIssueId = state?.issueId || null;
  
  const [activeTab, setActiveTab] = useState(showMap ? "map" : "overview");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  // Use react-query to fetch data
  const { data: categoryData = [], isLoading: isCategoryLoading, error: categoryError } = useQuery({
    queryKey: ['categoryDistribution'],
    queryFn: getCategoryDistribution
  });

  const { data: temporalData = [], isLoading: isTemporalLoading, error: temporalError } = useQuery({
    queryKey: ['temporalAnalysis'],
    queryFn: () => getTemporalAnalysis(7)
  });

  const { data: topVotedIssues = [], isLoading: isTopVotedLoading, error: topVotedError } = useQuery({
    queryKey: ['topVotedIssues'],
    queryFn: () => getTopVotedIssues(5)
  });

  const { data: mapIssues = [], isLoading: isMapLoading, error: mapError } = useQuery({
    queryKey: ['mapIssues'],
    queryFn: getIssuesForMap
  });

  // Handle errors
  useEffect(() => {
    if (categoryError) {
      toast({
        title: "Error loading category data",
        description: "Could not load category distribution. Please try again later.",
        variant: "destructive",
      });
    }

    if (temporalError) {
      toast({
        title: "Error loading temporal data",
        description: "Could not load temporal analysis. Please try again later.",
        variant: "destructive",
      });
    }

    if (topVotedError) {
      toast({
        title: "Error loading top voted issues",
        description: "Could not load top voted issues. Please try again later.",
        variant: "destructive",
      });
    }

    if (mapError) {
      toast({
        title: "Error loading map data",
        description: "Could not load map data. Please try again later.",
        variant: "destructive",
      });
    }
  }, [categoryError, temporalError, topVotedError, mapError, toast]);

  const isLoading = isCategoryLoading || isTemporalLoading || isTopVotedLoading || isMapLoading;

  // Handle category filtering
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prev => prev === category ? null : category);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-8 md:py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground mb-8">
            Explore and analyze civic issues across the community
          </p>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Category Distribution</CardTitle>
                    <CardDescription>
                      Number of issues by category
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] p-4">
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
                  <CardHeader className="pb-2">
                    <CardTitle>Temporal Analysis</CardTitle>
                    <CardDescription>
                      Issue reports over the past 7 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] p-4">
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

            <TabsContent value="map" className="h-[70vh] min-h-[600px]">
              <Card className="h-full">
                <CardContent className="p-0 h-full overflow-hidden">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <MapView 
                      issues={mapIssues}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      focusIssueId={focusIssueId}
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
