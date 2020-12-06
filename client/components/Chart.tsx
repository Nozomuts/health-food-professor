import React, { FC } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { COLOR } from "../styles/colors";
import { is_sp } from "../styles/media";

type Props = {
  result: { [name: string]: string };
};

export const Chart: FC<Props> = ({ result }) => {
  const data = () => {
    const arr: { subject: string; A: number; B: number }[] = [];
    let i = 0;
    for (const key in result) {
      const values = result[key].split("に対し");
      if (parseFloat(values[1]) / parseFloat(values[0]) >= 1) {
        arr[i] = {
          subject: key,
          A: (parseFloat(values[1]) / parseFloat(values[0])) * 100,
          B: 100,
        };
        i++;
      }
    }
    console.log(arr);
    return arr;
  };

  return (
    <RadarChart
      cx={is_sp() ? 150 : 210}
      cy={is_sp() ? 120 : 150}
      outerRadius={is_sp() ? 80 : 100}
      width={is_sp() ? 320 : 430}
      height={300}
      data={data()}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" fontSize={is_sp() ? 10 : 16} />
      <PolarRadiusAxis
        angle={30}
        domain={[0, 100]}
        fontSize={is_sp() ? 10 : 16}
        tickFormatter={(value) => Math.floor(value)}
      />
      <Radar
        name="充足率[%]"
        dataKey="A"
        stroke={`${COLOR.PURPLE}`}
        fill={`${COLOR.PURPLE}`}
        fillOpacity={0.6}
      />
      <Radar
        name="100%"
        dataKey="B"
        stroke={`${COLOR.RED}`}
        fill="transparent"
        fillOpacity={0.6}
      />
      <Legend />
    </RadarChart>
  );
};
