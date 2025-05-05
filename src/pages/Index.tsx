
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  const handleAuthSuccess = () => {
    // This is handled by the AuthContext now
  };

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
                  IssueRadar connects citizens with local authorities to resolve problems 
                  and improve neighborhoods together.
                </p>
                <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
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
              
              <div className="relative mx-auto max-w-md">
                <div className="absolute inset-0 bg-civic-blue/10 rounded-lg transform rotate-3 scale-105"></div>
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop"
                  alt="Community enhancement" 
                  className="relative rounded-lg shadow-lg"
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
                <div className="w-16 h-16 rounded-full bg-civic-blue/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-civic-blue">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Submit Your Report</h3>
                <p className="text-muted-foreground">
                  Fill out a simple form with details about the issue you've noticed in your community.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-civic-blue/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-civic-blue">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-muted-foreground">
                  Follow updates as your issue is received, reviewed, and addressed by local authorities.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-civic-blue/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-civic-blue">3</span>
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4">
                  <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium mb-2">
                    Road
                  </span>
                  <h3 className="text-lg font-semibold mb-2">Pothole on Main Street</h3>
                  <p className="text-sm text-muted-foreground mb-3">Main Street & Oak Avenue</p>
                  <div className="flex justify-between text-sm">
                    <span>12 votes</span>
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mb-2">
                    Water
                  </span>
                  <h3 className="text-lg font-semibold mb-2">Broken Water Main</h3>
                  <p className="text-sm text-muted-foreground mb-3">27 Elm Street</p>
                  <div className="flex justify-between text-sm">
                    <span>8 votes</span>
                    <span>1 week ago</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium mb-2">
                    Sanitation
                  </span>
                  <h3 className="text-lg font-semibold mb-2">Overflowing Trash Containers</h3>
                  <p className="text-sm text-muted-foreground mb-3">Cedar Park</p>
                  <div className="flex justify-between text-sm">
                    <span>5 votes</span>
                    <span>2 weeks ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Auth Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
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
                <div className="bg-civic-light rounded-lg p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">You're logged in!</h3>
                  <p className="mb-6">
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
