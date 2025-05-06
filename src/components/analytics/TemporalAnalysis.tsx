
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";

interface TemporalDataPoint {
  date: string;
  count: number;
}

interface TemporalAnalysisProps {
  data: TemporalDataPoint[];
}

const TemporalAnalysis: React.FC<TemporalAnalysisProps> = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: format(parseISO(item.date), "MMM dd")
  }));

  // If no data is available, show a message
  if (formattedData.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="formattedDate" 
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis 
            tickLine={false}
            axisLine={false}
            width={30}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value}
            domain={[0, 'auto']}
          />
          <Tooltip
            formatter={(value) => [`${value} issues`, 'Reported']}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{
              backgroundColor: 'var(--card)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid var(--border)'
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="hsl(var(--primary))"
            activeDot={{ r: 8 }}
            strokeWidth={2}
            dot={{ strokeWidth: 2, r: 4, fill: "white" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemporalAnalysis;
