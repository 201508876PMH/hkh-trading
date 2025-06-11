<template>
  <div class="chart-wrapper">
    <Bar
      v-if="chartData"
      id="profit-chart"
      :options="chartOptions"
      :data="chartData"
    />
    <p v-else>Loading trade data...</p>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import Papa from 'papaparse'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Profit per Trade' }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `€${value}`
            }
          }
        }
      }
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      fetch('/hkh-trading/data/latest.csv')
        .then((response) => response.text())
        .then((csv) => {
          const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true })

          // Sort trades by the Open date (ascending)
          const sortedData = parsed.data.sort((a, b) => {
            return new Date(a.Open) - new Date(b.Open)
          })

          const labels = []
          const profits = []


          parsed.data.forEach((row) => {
            labels.push(row.Open)
            profits.push(parseFloat(row.Profit.replace(',', '.')))
          })

          this.chartData = {
            labels,
            datasets: [
              {
                label: 'Profit (€)',
                data: profits,
                backgroundColor: profits.map(p => p >= 0 ? 'rgba(0, 200, 83, 0.6)' : 'rgba(255, 82, 82, 0.6)')
              }
            ]
          }
        })
        .catch((err) => console.error('Error loading CSV:', err))
      }
    }
}
</script>

<style scoped>
.chart-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: auto;
  padding: 1rem 0;
}

canvas {
  width: 100% !important;
  height: auto !important;
}
</style>

