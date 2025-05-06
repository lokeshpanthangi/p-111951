import React, { useState } from "react";
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
  road: "#F59E0B",     // Amber-500 from the updated theme
  water: "#2563EB",    // Blue-600 from the updated theme
  sanitation: "#22C55E", // Green-500 from the updated theme
  electricity: "#38BDF8", // Sky-400 from the updated theme
  other: "#6B7280",    // Gray-500 from the updated theme
};

const HOVER_COLORS = {
  road: "#fbbf24",        // Lighter Amber
  water: "#60a5fa",       // Lighter Blue
  sanitation: "#4ade80",  // Lighter Green
  electricity: "#7dd3fc", // Lighter Sky
  other: "#9ca3af",       // Lighter Gray
};

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({
  data,
  onCategoryClick,
  selectedCategory = null,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const totalIssues = data.reduce((sum, item) => sum + item.count, 0);
  
  const chartData = data.map((item) => ({
    name: item.category,
    value: item.count,
    displayName: item.category.charAt(0).toUpperCase() + item.category.slice(1),
  }));

  // If no data is available, show a message
  if (chartData.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="text-center mb-2">
        <div className="text-2xl font-bold">{totalIssues}</div>
        <div className="text-xs text-muted-foreground">Total Issues</div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full h-[322px] md:h-[276px]">
        <div className="flex-shrink-0 flex items-center justify-center">
          <ResponsiveContainer width={276} height={276}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="60%"
                innerRadius="30%"
                fill="#8884d8"
                dataKey="value"
                nameKey="displayName"
                onClick={(entry) => onCategoryClick && onCategoryClick(entry.name)}
                activeIndex={selectedCategory ? chartData.findIndex(item => item.name === selectedCategory) : undefined}
                activeShape={({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }) => {
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
                onMouseEnter={(_, index) => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {chartData.map((entry, index) => {
                  const category = entry.name as IssueCategory;
                  const isHovered = hoveredIndex === index;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        isHovered
                          ? HOVER_COLORS[category] || COLORS[category] || "#6B7280"
                          : COLORS[category] || "#6B7280"
                      }
                      className={selectedCategory && selectedCategory !== entry.name ? "opacity-60" : ""}
                      style={{ cursor: 'pointer' }}
                    />
                  );
                })}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value} issues (${Math.round((value / totalIssues) * 100)}%)`,
                  name
                ]}
                contentStyle={{
                  backgroundColor: 'rgba(35, 39, 47, 0.1)', // 90% see-through for light mode
                  color: '#23272f',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
                  border: '1px solid #334155',
                  fontWeight: 500
                }}
              />
              {/* Custom style for dark mode tooltip */}
              <style>{`
                @media (prefers-color-scheme: dark) {
                  .recharts-tooltip-wrapper {
                    background: #fff !important;
                    color: #23272f !important;
                    border-radius: 8px !important;
                    border: 1px solid #334155 !important;
                    font-weight: 500 !important;
                  }
                  .recharts-tooltip-wrapper * {
                    color: #23272f !important;
                  }
                }
              `}</style>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row md:flex-col gap-4 md:gap-2">
            {chartData.map((item, index) => {
              const category = item.name as IssueCategory;
              return (
                <span
                  key={category}
                  className={`flex items-center gap-1 cursor-pointer ${selectedCategory === category ? 'font-bold' : ''}`}
                  onClick={() => onCategoryClick && onCategoryClick(category)}
                >
                  <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[category] }} />
                  <CategoryIcon category={category} size={14} />
                  {item.displayName}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDistribution;
