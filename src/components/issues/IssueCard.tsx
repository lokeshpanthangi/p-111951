
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Issue } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Edit, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import CategoryIcon from "./CategoryIcon";

interface IssueCardProps {
  issue: Issue;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

const IssueCard = ({ issue, onEdit, onDelete, showActions = false }: IssueCardProps) => {
  const timeAgo = formatDistanceToNow(issue.createdAt, { addSuffix: true });
  const canEdit = showActions && issue.status === "pending";

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      <CardContent className="p-0 flex-grow">
        <div className="relative">
          {issue.imageUrl ? (
            <img 
              src={issue.imageUrl} 
              alt={issue.title}
              className="w-full h-40 object-cover"
            />
          ) : (
            <div className="w-full h-40 bg-muted flex items-center justify-center">
              <CategoryIcon category={issue.category} size={32} />
            </div>
          )}
          <div className="absolute top-2 right-2">
            <StatusBadge status={issue.status} />
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <CategoryIcon category={issue.category} />
            <span className="capitalize">{issue.category}</span>
          </div>
          
          <Link to={`/issues/${issue.id}`} className="hover:underline">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{issue.title}</h3>
          </Link>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
            <div className="flex items-center">
              <ThumbsUp size={16} className="mr-1" /> 
              <span>{issue.votes}</span>
            </div>
            <div>{timeAgo}</div>
          </div>
          
          <div className="mt-2 text-sm text-muted-foreground truncate">
            <span className="italic">Location:</span> {issue.location}
          </div>
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="flex justify-between p-4 pt-0">
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <Link to={`/issues/${issue.id}`}>View Details</Link>
          </Button>

          {canEdit && (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={onEdit}
                disabled={!canEdit}
                title="Edit issue"
              >
                <Edit size={16} />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={onDelete}
                disabled={!canEdit}
                title="Delete issue"
                className="text-destructive hover:bg-destructive/10"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default IssueCard;
