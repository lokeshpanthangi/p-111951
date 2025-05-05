
import React from "react";
import { IssueStatus } from "@/types";

export interface StatusBadgeProps {
  status: IssueStatus;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = "md",
  className = ""
}) => {
  const getStatusClasses = () => {
    const baseClasses = "status-badge";
    const sizeClasses = {
      sm: "text-xs px-1.5 py-0.5",
      md: "text-xs px-2.5 py-1",
      lg: "text-sm px-3 py-1.5"
    };
    
    const statusClasses = {
      "pending": "status-badge-pending",
      "in-progress": "status-badge-in-progress",
      "resolved": "status-badge-resolved"
    };
    
    return `${baseClasses} ${statusClasses[status]} ${sizeClasses[size]} ${className}`;
  };
  
  const getStatusLabel = () => {
    const labels = {
      "pending": "Pending",
      "in-progress": "In Progress",
      "resolved": "Resolved"
    };
    
    return labels[status];
  };
  
  return (
    <span className={getStatusClasses()}>
      {getStatusLabel()}
    </span>
  );
};

export default StatusBadge;
