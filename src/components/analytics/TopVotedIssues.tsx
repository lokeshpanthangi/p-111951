
import React from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { IssueCategory, IssueStatus, Issue } from "@/types";
import CategoryIcon from "@/components/issues/CategoryIcon";
import StatusBadge from "@/components/issues/StatusBadge";
import { Card } from "@/components/ui/card";

interface TopVotedIssuesProps {
  issues: Issue[];
}

const COLORS = {
  road: "#FBBF24",     // amber from our updated theme
  water: "#4C6FFF",    // blue from our updated theme
  sanitation: "#34D399", // green from our updated theme
  electricity: "#FBBF24", // amber from our updated theme (for consistency)
  other: "#94A3B8",    // gray
};

const TopVotedIssues: React.FC<TopVotedIssuesProps> = ({ issues }) => {
  const navigate = useNavigate();
  const sortedData = [...issues].sort((a, b) => b.votes - a.votes);

  const handleClick = (issue: Issue) => {
    navigate(`/issues/${issue.id}`);
  };

  // If no data is available, show a message
  if (sortedData.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-80 flex items-center justify-center text-muted-foreground">
          No data available
        </div>
        
        <Card className="p-4 h-80 flex items-center justify-center text-muted-foreground">
          No data available
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 10,
            }}
          >
            <XAxis 
              type="number" 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              dataKey="title"
              type="category"
              tickLine={false}
              axisLine={false}
              width={90}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
            />
            <Tooltip 
              formatter={(value: number) => [`${value} votes`, 'Votes']}
              labelFormatter={(label) => label}
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '1px solid #E2E8F0'
              }}
            />
            <Bar 
              dataKey="votes" 
              barSize={20} 
              radius={[0, 4, 4, 0]}
              cursor="pointer"
              onClick={handleClick}
            >
              {sortedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[entry.category]} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <Card className="p-4 h-[300px] overflow-auto">
        <table className="w-full">
          <thead className="text-sm text-muted-foreground">
            <tr>
              <th className="text-left font-medium py-2">Issue</th>
              <th className="text-center font-medium py-2 w-24">Votes</th>
              <th className="text-center font-medium py-2 w-32">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((issue) => (
              <tr 
                key={issue.id}
                className="border-t border-border hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => handleClick(issue)}
              >
                <td className="py-3">
                  <div className="flex items-start gap-2">
                    <div className="mt-1">
                      <CategoryIcon category={issue.category} size={16} />
                    </div>
                    <span className="line-clamp-2">{issue.title}</span>
                  </div>
                </td>
                <td className="text-center font-medium">{issue.votes}</td>
                <td className="text-center">
                  <div className="flex justify-center py-1">
                    <StatusBadge status={issue.status} size="sm" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {sortedData.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No data available
          </div>
        )}
      </Card>
    </div>
  );
};

export default TopVotedIssues;
