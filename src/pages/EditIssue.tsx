
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import IssueForm, { IssueFormData } from "@/components/issues/IssueForm";
import { getIssueById, updateIssue } from "@/lib/mock-data";
import { Issue } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const EditIssue = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [issue, setIssue] = useState<Issue | null>(location.state?.issue || null);
  const [loading, setLoading] = useState(!location.state?.issue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch if we don't already have the issue from location state
    if (!issue && id) {
      const fetchIssue = async () => {
        try {
          const data = await getIssueById(id);
          if (data) {
            if (data.status !== "pending") {
              toast({
                title: "Cannot edit this issue",
                description: "Only pending issues can be edited.",
                variant: "destructive",
              });
              navigate("/my-issues");
              return;
            }
            setIssue(data);
          } else {
            toast({
              title: "Issue not found",
              description: "The requested issue could not be found.",
              variant: "destructive",
            });
            navigate("/my-issues");
          }
        } catch (error) {
          console.error("Error fetching issue:", error);
          toast({
            title: "Error loading issue",
            description: "There was a problem loading the issue details. Please try again.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };

      fetchIssue();
    }
  }, [id, issue, navigate, toast]);

  const handleSubmit = async (data: IssueFormData) => {
    if (!id || !issue) return;
    
    setIsSubmitting(true);

    try {
      // In a real app, we would handle file upload separately
      // Here we're just simulating it for demo purposes
      let imageUrl = issue.imageUrl;
      if (data.imageFile) {
        // Simulate file upload delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Use a random placeholder image URL for demo
        const placeholders = [
          "https://images.unsplash.com/photo-1518544801976-5e98c8c3c6e6?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1583952336699-d0d4f0c9b03e?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1517660029921-0cbea2f15f8f?w=800&auto=format&fit=crop"
        ];
        imageUrl = placeholders[Math.floor(Math.random() * placeholders.length)];
      }

      // Update the issue
      const updatedIssue = await updateIssue(id, {
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        imageUrl: data.imageFile === null ? undefined : imageUrl
      });

      if (updatedIssue) {
        // Show success toast
        toast({
          title: "Issue updated successfully!",
          description: "Your issue has been updated.",
        });

        // Redirect to the issue details page
        navigate(`/issues/${id}`);
      } else {
        toast({
          title: "Error updating issue",
          description: "There was a problem updating your issue. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating issue:", error);
      toast({
        title: "Error updating issue",
        description: "There was a problem updating your issue. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-800">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Issue Not Found</h1>
            <p className="mb-6">The issue you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <a href="/my-issues">View My Issues</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 md:py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <Button 
              variant="ghost" 
              className="mb-6 -ml-2" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Edit Issue</h1>
            
            <Card>
              <CardHeader>
                <CardTitle>Update Issue Details</CardTitle>
                <CardDescription>
                  Make changes to your issue report below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <IssueForm 
                  onSubmit={handleSubmit} 
                  initialData={issue}
                  isSubmitting={isSubmitting} 
                />
              </CardContent>
            </Card>
            
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
              <h3 className="font-medium mb-2 flex items-center">
                <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Note
              </h3>
              <p className="text-sm text-muted-foreground">
                You can only edit issues with a "Pending" status. Once an issue has been marked as "In Progress" or "Resolved", 
                it can no longer be modified.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EditIssue;
