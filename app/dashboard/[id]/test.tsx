"use client";
import { ChartData } from "@/util/format-tracking";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export function DevicePieChart({ deviceData }: { deviceData: ChartData }) {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={deviceData}
            // cx="50%"
            // cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
