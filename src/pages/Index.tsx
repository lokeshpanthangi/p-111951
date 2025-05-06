import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { getIssues } from "@/lib/supabase-data";
import { Issue } from "@/types";
import StatusBadge from "@/components/issues/StatusBadge";
import CategoryIcon from "@/components/issues/CategoryIcon";

// Static hero image URL
const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop";

const Index = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const [recentIssues, setRecentIssues] = useState<Issue[]>([]);
  const [isLoadingIssues, setIsLoadingIssues] = useState(true);
  const authSectionRef = useRef<HTMLDivElement>(null);
  
  const handleAuthSuccess = () => {
    // This is handled by the AuthContext now
  };

  useEffect(() => {
    const fetchRecentIssues = async () => {
      try {
        const issues = await getIssues();
        setRecentIssues(issues.slice(0, 3)); // Only get the 3 most recent issues
      } catch (error) {
        console.error("Error fetching recent issues:", error);
      } finally {
        setIsLoadingIssues(false);
      }
    };

    fetchRecentIssues();
  }, []);

  useEffect(() => {
    if (location.state && location.state.scrollToAuth) {
      setTimeout(() => {
        const el = document.getElementById("auth-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                  Report civic issues in your community
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
                  CivicSync connects citizens with local authorities to resolve problems 
                  and improve neighborhoods together.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button size="lg" asChild>
                    <Link to="/report">
                      Report an Issue <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/issues">Browse Issues</Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute inset-0 bg-primary/10 rounded-lg transform rotate-3 scale-105"></div>
                <img 
                  src={HERO_IMAGE_URL}
                  alt="Community enhancement" 
                  className="relative rounded-lg shadow-lg w-full h-64 md:h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">How It Works</h2>
              <p className="mt-3 text-muted-foreground">
                Three simple steps to report and track civic issues in your neighborhood
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Submit Your Report</h3>
                <p className="text-muted-foreground">
                  Fill out a simple form with details about the issue you've noticed in your community.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-muted-foreground">
                  Follow updates as your issue is received, reviewed, and addressed by local authorities.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Problem Solved</h3>
                <p className="text-muted-foreground">
                  See real results as issues are resolved, improving quality of life in your neighborhood.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Recent Issues Preview */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Recent Issues</h2>
              <Button variant="outline" asChild>
                <Link to="/issues">View All</Link>
              </Button>
            </div>
            
            {isLoadingIssues ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24 animate-pulse mb-2"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse mb-3"></div>
                      <div className="flex justify-between text-sm">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentIssues.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentIssues.map((issue) => (
                  <Link key={issue.id} to={`/issues/${issue.id}`} className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden block focus:outline-none focus:ring-2 focus:ring-primary">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                      {issue.imageUrl ? (
                        <img 
                          src={issue.imageUrl} 
                          alt={issue.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <CategoryIcon category={issue.category} size={48} />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <StatusBadge status={issue.status} size="sm" />
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-xs font-medium mb-2 capitalize">
                        {issue.category}
                      </span>
                      <h3 className="text-lg font-semibold mb-2 hover:text-primary hover:underline">
                        {issue.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{issue.location}</p>
                      <div className="flex justify-between text-sm">
                        <span>{issue.votes} votes</span>
                        <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-lg p-8 text-center">
                <h3 className="text-xl font-medium mb-2">No issues reported yet</h3>
                <p className="mb-4 text-muted-foreground">Be the first to report an issue in your community!</p>
                <Button asChild>
                  <Link to="/report">Report an Issue</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Auth Section */}
        <section id="auth-section" className="py-16 bg-white dark:bg-gray-900" ref={authSectionRef}>
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold">Join Our Community</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Create an account to report issues, track your reports, and make a difference 
                  in your neighborhood.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-civic-green mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Track the status of your reported issues</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-civic-green mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Receive updates when issues are resolved</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-civic-green mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Vote on issues that matter to you</span>
                  </li>
                </ul>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : user ? (
                <div className="bg-civic-light dark:bg-gray-800 rounded-lg p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">You're logged in!</h3>
                  <p className="mb-6 text-gray-800 dark:text-gray-300">
                    Thank you for being part of our community. You can now report issues 
                    and track their progress.
                  </p>
                  <Button size="lg" asChild>
                    <Link to="/report">Report an Issue</Link>
                  </Button>
                </div>
              ) : (
                <AuthForm onSuccess={handleAuthSuccess} />
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
