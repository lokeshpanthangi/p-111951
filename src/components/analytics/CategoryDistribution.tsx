
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { IssueCategory } from "@/types";
import CategoryIcon from "@/components/issues/CategoryIcon";

interface CategoryDataItem {
  category: IssueCategory;
  count: number;
}

interface CategoryDistributionProps {
  data: CategoryDataItem[];
  onCategoryClick?: (category: string) => void;
  selectedCategory?: string | null;
}

const COLORS = {
  road: "#F59E0B",     // amber
  water: "#0EA5E9",    // blue
  sanitation: "#10B981", // green
  electricity: "#EAB308", // yellow
  other: "#94A3B8",    // gray
};

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({
  data,
  onCategoryClick,
  selectedCategory = null,
}) => {
  const totalIssues = data.reduce((sum, item) => sum + item.count, 0);
  
  const chartData = data.map((item) => ({
    name: item.category,
    value: item.count,
    displayName: item.category.charAt(0).toUpperCase() + item.category.slice(1),
  }));

  return (
    <div className="h-80 w-full">
      <div className="text-center mb-2">
        <div className="text-2xl font-bold">{totalIssues}</div>
        <div className="text-xs text-muted-foreground">Total Issues</div>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={50}
            fill="#8884d8"
            dataKey="value"
            nameKey="displayName"
            onClick={(entry) => onCategoryClick && onCategoryClick(entry.name)}
            activeIndex={selectedCategory ? chartData.findIndex(item => item.name === selectedCategory) : undefined}
            activeShape={({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, name }) => {
              return (
                <g>
                  <path
                    d={`M${cx},${cy} L${cx + innerRadius * Math.cos(-startAngle * Math.PI / 180)},${cy + innerRadius * Math.sin(-startAngle * Math.PI / 180)} A${innerRadius},${innerRadius} 0 0 1 ${cx + innerRadius * Math.cos(-endAngle * Math.PI / 180)},${cy + innerRadius * Math.sin(-endAngle * Math.PI / 180)} Z`}
                    fill="#fff"
                  />
                  <path
                    d={`M${cx},${cy} L${cx + outerRadius * Math.cos(-startAngle * Math.PI / 180)},${cy + outerRadius * Math.sin(-startAngle * Math.PI / 180)} A${outerRadius},${outerRadius} 0 0 1 ${cx + outerRadius * Math.cos(-endAngle * Math.PI / 180)},${cy + outerRadius * Math.sin(-endAngle * Math.PI / 180)} Z`}
                    fill={fill}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                </g>
              );
            }}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.name as IssueCategory] || "#94A3B8"}
                className={selectedCategory && selectedCategory !== entry.name ? "opacity-60" : ""}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number, name: string) => [
              `${value} issues (${Math.round((value / totalIssues) * 100)}%)`,
              name
            ]}
            contentStyle={{ 
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid #E2E8F0'
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry, index) => {
              const item = chartData[index];
              const category = item.name as IssueCategory;
              return (
                <span 
                  className={`flex items-center gap-1 cursor-pointer ${selectedCategory === category ? 'font-bold' : ''}`}
                  onClick={() => onCategoryClick && onCategoryClick(category)}
                >
                  <CategoryIcon category={category} size={14} />
                  {item.displayName}
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryDistribution;
