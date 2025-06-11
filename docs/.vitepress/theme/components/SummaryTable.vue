<template>
  <div id="summary-table">
    <div v-if="loading">Loading summary...</div>
    <div v-else v-html="summaryHtml"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      summaryHtml: '',
      loading: true
    }
  },
  async mounted() {
    const res = await fetch('/hkh-trading/data/latest.csv')
    const text = await res.text()
    const lines = text.trim().split('\n')
    const headers = lines[0].split(';').map(h => h.replace(/"/g, ''))
    const data = lines.slice(1).map(line => {
      const values = line.split(';').map(v => v.replace(/"/g, ''))
      const obj = {}
      headers.forEach((h, i) => {
        obj[h] = values[i]
      })
      return obj
    })
    this.summaryHtml = this.renderSummaryTable(data)
    this.loading = false
  },
  methods: {
    secondsToHMS(seconds) {
      const h = Math.floor(seconds / 3600)
      const m = Math.floor((seconds % 3600) / 60)
      const s = seconds % 60
      return `${h}h ${m}m ${s}s`
    },
    renderSummaryTable(data) {
      let totalTrades = 0
      let totalVolume = 0
      let totalProfit = 0
      let totalPips = 0
      let totalDuration = 0
      let winningTrades = 0
      let losingTrades = 0
      let maxProfit = -Infinity
      let maxLoss = Infinity

      data.forEach(row => {
        totalTrades++
        const volume = parseFloat(row.Volume) || 0
        const profit = parseFloat(row.Profit) || 0
        const pips = parseFloat(row.Pips) || 0
        const duration = parseInt(row['Trade duration in seconds']) || 0

        totalVolume += volume
        totalProfit += profit
        totalPips += pips
        totalDuration += duration

        if (profit > 0) winningTrades++
        else losingTrades++

        if (profit > maxProfit) maxProfit = profit
        if (profit < maxLoss) maxLoss = profit
      })

      const avgProfit = totalProfit / totalTrades || 0
      const avgDuration = totalDuration / totalTrades || 0
      const winRatePercent = ((winningTrades / totalTrades) * 100).toFixed(1)

      return `
        <table>
          <thead><tr><th>Metric</th><th>Value</th></tr></thead>
          <tbody>
            <tr><td>Total Trades</td><td>${totalTrades}</td></tr>
            <tr><td>Total Volume</td><td>${totalVolume.toFixed(2)}</td></tr>
            <tr><td>Total Profit</td><td>€${totalProfit.toFixed(2)}</td></tr>
            <tr><td>Average Profit / Trade</td><td>€${avgProfit.toFixed(2)}</td></tr>
            <tr><td>Total Pips</td><td>${totalPips.toFixed(2)}</td></tr>
            <tr><td>Average Trade Duration</td><td>${this.secondsToHMS(Math.round(avgDuration))}</td></tr>
            <tr><td>Winning Trades</td><td>${winningTrades}</td></tr>
            <tr><td>Losing Trades</td><td>${losingTrades}</td></tr>
            <tr><td>Max Profit</td><td>€${maxProfit.toFixed(2)}</td></tr>
            <tr><td>Max Loss</td><td>€${maxLoss.toFixed(2)}</td></tr>
            <tr><td>Win Rate</td><td>${winningTrades}/${totalTrades} (${winRatePercent}%)</td></tr>
          </tbody>
        </table>
      `
    }
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  max-width: 600px;
  margin: 1rem 0;
}
th, td {
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  text-align: left;
}
th {
  background-color: #eee;
}
</style>
