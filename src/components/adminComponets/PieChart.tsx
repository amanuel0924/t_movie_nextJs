/* eslint-disable react/prop-types */
"use client"
import { Box, Typography } from "@mui/material"
import { Suspense } from "react"
import { PieChart, Pie, Cell, Tooltip } from "recharts"

const COLORS = ["#9b59b6", "#e74c3c", "#f1c40f", "#2ecc71", "#3498db"]

// const CustomTooltip = ({
//   active,
//   payload,
// }: {
//   active: boolean
//   payload: any
// }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
//       </div>
//     )
//   }
//   return null
// }

type Item = {
  categoryId: number
  _count: {
    id: number
  }
}

const MyPieChart = ({ data = [] }: { data: Item[] }) => {
  const typeMapping: Record<number, string> = {
    1: "Recommended",
    2: "Popular ",
    3: "Featured",
    4: "Favorites",
    5: "Watch Later",
  }

  const transformedData = data.map((item) => ({
    name: typeMapping[item.categoryId] || `Category ${item.categoryId}`,
    value: item._count.id,
  }))

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center ",
        alignContent: "center",
      }}
    >
      {" "}
      <PieChart width={600} height={400}>
        <Pie
          data={transformedData}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {transformedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        {/* <Tooltip
          content={<CustomTooltip active={true} payload={transformedData} />}
        /> */}
      </PieChart>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Category Distribution</Typography>
        <ul>
          {transformedData.map((item) => (
            <li
              key={item.name}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor:
                    COLORS[transformedData.indexOf(item) % COLORS.length],
                  marginRight: "10px",
                }}
              />
              {item.value}: {item.name}
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  )
}
export default MyPieChart
