<template>
  <div class="chart-wrapper">
    <div v-if="chartData">
      <Line
        id="progressive-line-chart"
        :data="chartData"
        :options="chartOptions"
      />
    </div>
    <p v-else>Generating chart data...</p>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
)

export default {
  name: 'ProgressiveLineChart',
  components: { Line },
  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        animation: this.getAnimation(),
        interaction: {
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },  // disable tooltips here
          title: {
            display: true,
            //text: 'Progressive Line Chart with Easing',
            color: '#fff',
            font: { size: 18 }
          }
        },
        scales: {
          x: {
            type: 'linear',
            title: { display: true, text: 'X' },
            ticks: { color: '#3C3C43' },
            grid: { color: 'rgba(255,255,255,0.1)' }
          },
          y: {
            beginAtZero: false,
            title: { display: true, text: 'Y' },
            ticks: { color: '#3C3C43' },
            grid: { color: 'rgba(255,255,255,0.1)' }
          }
        }
      }
    }
  },
  mounted() {
    const data1 = []
    const data2 = []
    let prev1 = 100
    let prev2 = 80

    for (let i = 0; i < 200; i++) { // How detailed the lines
      prev1 += 5 - Math.random() * 10
      prev2 += 5 - Math.random() * 10
      data1.push({ x: i, y: prev1 })
      data2.push({ x: i, y: prev2 })
    }

    this.chartData = {
      datasets: [
        {
          borderColor: '#3F51B5', // blue
          borderWidth: 2.5,
          radius: 0,
          data: data1
        },
        {
          borderColor: '#4CAF4F', // green
          borderWidth: 2.5,
          radius: 0,
          data: data2
        }
      ]
    }
  },
  methods: {
    // Custom easing effect
    easing(t) {
      return 1 - Math.pow(1 - t, 2) // easeOutQuad
    },
    getAnimation() {
      const totalDuration = 5000
      const dataLength = 1000
      const easing = this.easing

      const duration = (ctx) =>
        easing(ctx.index / dataLength) * totalDuration / dataLength

      const delay = (ctx) =>
        easing(ctx.index / dataLength) * totalDuration

      const previousY = (ctx) =>
        ctx.index === 0
          ? ctx.chart.scales.y.getPixelForValue(100)
          : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1]
              .getProps(['y'], true).y

      return {
        x: {
          type: 'number',
          easing: 'linear',
          duration,
          from: NaN,
          delay(ctx) {
            if (ctx.type !== 'data' || ctx.xStarted) return 0
            ctx.xStarted = true
            return delay(ctx)
          }
        },
        y: {
          type: 'number',
          easing: 'linear',
          duration,
          from: previousY,
          delay(ctx) {
            if (ctx.type !== 'data' || ctx.yStarted) return 0
            ctx.yStarted = true
            return delay(ctx)
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin-top: 2rem;
}
#progressive-line-chart {
  width: 100% !important;
  height: auto !important;
}
</style>
