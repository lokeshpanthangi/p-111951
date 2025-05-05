
import { IssueStatus } from "@/types";

interface StatusBadgeProps {
  status: IssueStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusLabel = (status: IssueStatus) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "in-progress":
        return "In Progress";
      case "resolved":
        return "Resolved";
      default:
        return status;
    }
  };

  return (
    <span className={`status-badge status-badge-${status}`}>
      {getStatusLabel(status)}
    </span>
  );
};

export default StatusBadge;
