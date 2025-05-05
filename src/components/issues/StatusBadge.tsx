
import { IssueStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Clock, Hourglass, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: IssueStatus;
  size?: "sm" | "default";
}

const StatusBadge = ({ status, size = "default" }: StatusBadgeProps) => {
  const getStatusDetails = (status: IssueStatus) => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          icon: Clock,
          className: "bg-status-pending/15 text-status-pending border-status-pending/30"
        };
      case "in-progress":
        return {
          label: "In Progress",
          icon: Hourglass,
          className: "bg-status-in-progress/15 text-status-in-progress border-status-in-progress/30"
        };
      case "resolved":
        return {
          label: "Resolved",
          icon: CheckCircle2,
          className: "bg-status-resolved/15 text-status-resolved border-status-resolved/30"
        };
      default:
        return {
          label: status,
          icon: Clock,
          className: "bg-gray-100 text-gray-500 border-gray-300"
        };
    }
  };

  const { label, icon: Icon, className } = getStatusDetails(status);
  
  return (
    <Badge 
      variant="outline"
      className={cn(
        "gap-1 font-medium border", 
        className,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-0.5 text-xs"
      )}
    >
      <Icon size={size === "sm" ? 12 : 14} className="shrink-0" />
      <span>{label}</span>
    </Badge>
  );
};

export default StatusBadge;
