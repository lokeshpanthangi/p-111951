
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Issue } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, Image, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import StatusBadge from "./StatusBadge";
import CategoryIcon from "./CategoryIcon";
import { Button } from "@/components/ui/button";

interface IssueCardProps {
  issue: Issue;
  showActions?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const IssueCard = ({ issue, showActions = false, onClick, onEdit, onDelete }: IssueCardProps) => {
  const timeAgo = formatDistanceToNow(issue.createdAt, { addSuffix: true });
  
  return (
    <Card 
      className={cn(
        "overflow-hidden h-full flex flex-col transition-all duration-200",
        "hover:shadow-md hover:border-primary/20 hover:scale-[1.01]",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <CardContent className="p-0 flex-grow">
        <div className="relative">
          {issue.imageUrl ? (
            <img 
              src={issue.imageUrl} 
              alt={issue.title}
              className="w-full h-36 object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-36 bg-muted flex items-center justify-center">
              <CategoryIcon category={issue.category} size={32} />
            </div>
          )}
          
          <div className="absolute top-2 right-2">
            <StatusBadge status={issue.status} size="sm" />
          </div>
          
          {issue.imageUrl && (
            <div className="absolute bottom-2 left-2 bg-black/50 rounded-full p-1">
              <Image size={16} className="text-white" />
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <CategoryIcon category={issue.category} />
            <span className="capitalize">{issue.category}</span>
            <span className="text-xs text-muted-foreground ml-auto">{timeAgo}</span>
          </div>
          
          <Link to={`/issues/${issue.id}`} className="block group">
            <h3 className="font-medium text-lg mb-2 line-clamp-2 group-hover:text-primary group-hover:underline">
              {issue.title}
            </h3>
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="mt-2 text-sm text-muted-foreground truncate max-w-[70%]">
              <span className="inline-flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3 mr-1"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {issue.location}
              </span>
            </div>
            
            <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-full">
              <ThumbsUp size={14} className="text-primary" /> 
              <span className="text-xs font-medium">{issue.votes}</span>
            </div>
          </div>

          {showActions && onEdit && onDelete && (
            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-border/50">
              <Button variant="ghost" size="sm" className="h-8 px-2" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit();
              }}>
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-destructive hover:text-destructive" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete();
              }}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
