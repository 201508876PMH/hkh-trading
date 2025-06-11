<template>
<div class="chart-wrapper">
  <div v-if="chartData">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
  <p v-else>Loading symbol data...</p>
</div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import Papa from 'papaparse'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
  name: 'PieChart',
  components: { Pie },
  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,  // Important for custom sizing
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Most Successful Symbols (Total Profit)'
          }
        },
        layout: {
          bottom: 0,  // adjust this value to add space at the bottom
        }
      }
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      fetch('/hkh-trading/data/latest.csv')
        .then(res => res.text())
        .then(csv => {
          const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true })
          
          // Aggregate profit by symbol (assuming 'Symbol' column exists)
          const symbolProfits = {}

          parsed.data.forEach(row => {
            const symbol = row.Symbol || 'Unknown'
            const profit = parseFloat(row.Profit.replace(',', '.')) || 0

            if (!symbolProfits[symbol]) symbolProfits[symbol] = 0
            symbolProfits[symbol] += profit
          })

          // Filter symbols with positive profit and sort descending
          const filtered = Object.entries(symbolProfits)
            .filter(([_, profit]) => profit > 0)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10) // top 10 symbols

          const labels = filtered.map(([symbol]) => symbol)
          const data = filtered.map(([_, profit]) => profit)

          const backgroundColors = [
            'rgba(56, 142, 60, 0.75)',   // Dark Green
            'rgba(30, 136, 229, 0.75)',  // Bright Blue
            'rgba(251, 140, 0, 0.75)',   // Warm Orange
            'rgba(194, 24, 91, 0.75)',   // Deep Pink
            'rgba(123, 31, 162, 0.75)',  // Rich Purple
            'rgba(0, 151, 167, 0.75)',   // Teal
            'rgba(230, 74, 25, 0.75)',   // Burnt Orange
            'rgba(124, 179, 66, 0.75)',  // Olive Green
            'rgba(255, 179, 0, 0.75)',   // Gold
            'rgba(93, 64, 55, 0.75)'     // Chocolate Brown
          ]

          this.chartData = {
            labels,
            datasets: [{
              label: 'Total Profit (€)',
              data,
              backgroundColor: backgroundColors.slice(0, labels.length),
              hoverOffset: 20,
              borderWidth: 1,
              borderColor: 'rgba(200, 200, 200, 1)'
            }]
          } 
        })
        .catch(err => console.error('Error loading CSV:', err))
    }
  }
}
</script>


<style>
.chart-wrapper {
  max-width: 500px; /* or any size you prefer */
  margin: 0 auto;
}
</style>

