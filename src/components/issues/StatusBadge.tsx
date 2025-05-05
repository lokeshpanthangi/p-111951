
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
    const baseClasses = "status-badge rounded-full inline-flex items-center justify-center font-medium";
    
    const sizeClasses = {
      sm: "text-xs px-1.5 py-0.5",
      md: "text-xs px-2.5 py-1",
      lg: "text-sm px-3 py-1.5"
    };
    
    const statusClasses = {
      "pending": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
      "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
      "resolved": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500"
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
