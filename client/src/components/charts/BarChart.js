import { Box, Typography } from '@mui/material'
import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
  {
    learningPath:"problem Solving",
    enrolledDevelopers:"100",
  },
  {
    learningPath:"Java",
    enrolledDevelopers:"99",
  },
  {
    learningPath:"Math",
    enrolledDevelopers:"40"
  },
  {
    learningPath:"Math",
    enrolledDevelopers:"40"
  },
  {
    learningPath:"Math",
    enrolledDevelopers:"40"
  }
]

const PathChart = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" sx={{margin:"10px auto"}}>
      <ResponsiveContainer width="90%" aspect={2}>
        <BarChart
          width={800}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            bottom: 5,
          }}
        >
          <XAxis dataKey="learningPath" />
          <YAxis />
          <Bar dataKey="enrolledDevelopers"/>

        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default PathChart