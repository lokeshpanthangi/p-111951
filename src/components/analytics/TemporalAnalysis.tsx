
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

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="formattedDate" 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            tickLine={false}
            axisLine={false}
            width={30}
            tickFormatter={(value) => value}
            domain={[0, 'auto']}
          />
          <Tooltip
            formatter={(value) => [`${value} issues`, 'Reported']}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid #E2E8F0'
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
