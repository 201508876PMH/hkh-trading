<template>
  <div class="chart-wrapper">
    <div v-if="chartData">
      <Line
        id="cumulative-profit-chart"
        :data="chartData"
        :options="chartOptions"
      />
    </div>
    <p v-else>Loading trade data...</p>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import Papa from 'papaparse'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale
)

export default {
  name: 'CumulativeProfitChart',
  components: { Line },
  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        pointStyle: 'rectRot',
        pointRadius: 5,
        pointHoverRadius: 10,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Cumulative Profit Over Time' }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'PPpp' // Pretty print
            },
            title: { display: true, text: 'Date' }
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Cumulative Profit (€)' },
            ticks: {
              callback: (value) => `€${value}`
            }
          }
        }
      }
    }
  },
  mounted() {
    fetch('/data/latest.csv')
      .then((res) => res.text())
      .then((csv) => {
        const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true })

        const trades = parsed.data
          .map((row) => {
            const profit = parseFloat(row.Profit.replace(',', '.'))
            const time = new Date(row.Open)
            return { time, profit }
          })
          .filter(entry => !isNaN(entry.time.getTime()) && !isNaN(entry.profit))
          .sort((a, b) => a.time - b.time)

        let cumulative = 0
        const labels = []
        const dataPoints = []

        trades.forEach(({ time, profit }) => {
          cumulative += profit
          labels.push(time)
          dataPoints.push(cumulative)
        })

        this.chartData = {
          labels,
          datasets: [
            {
              label: 'Cumulative Profit (€)',
              data: dataPoints,
              borderColor: 'rgba(0, 123, 255, 0.9)',
              backgroundColor: 'rgba(0, 123, 255, 0.3)',
              fill: true,
              tension: 0.0,
              segment: {
                borderColor: ctx => {
                const { p0, p1 } = ctx;
                return p1.parsed.y >= p0.parsed.y ? 'rgba(0, 200, 83, 0.9)' : 'rgba(255, 82, 82, 0.9)';
                }
              }
            }
          ]
        }
      })
      .catch((err) => console.error('Error loading CSV:', err))
  }
}
</script>

<style scoped>
.chart-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: auto;
}

#cumulative-profit-chart {
  width: 100% !important;
  height: auto !important;
}
</style>