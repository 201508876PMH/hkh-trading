<template>
  <div id="summary-table">
    <div v-if="loading">Loading journal summary...</div>
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
  mounted() {
    this.$nextTick(() => {
      const trades = [...document.querySelectorAll("h2")].filter(h2 =>
        h2.textContent.match(/(win|loss)/i) && h2.textContent.match(/[+-]\d+/)
      )

      if (trades.length === 0) {
        this.loading = false
        return
      }

      let totalTrades = 0
      let totalProfit = 0
      let maxProfit = -Infinity
      let maxLoss = Infinity
      let winCount = 0
      let lossCount = 0

      trades.forEach(trade => {
        const text = trade.textContent.trim()

        const outcomeMatch = text.match(/\b(win|loss)\b/i)
        const plMatches = [...text.matchAll(/([+-])\s?(\d+(?:\.\d+)?)/g)]
        const lastMatch = plMatches.pop()

        if (!outcomeMatch || !lastMatch) return

        const outcome = outcomeMatch[1].toLowerCase()
        const sign = lastMatch[1]
        const amount = parseFloat(lastMatch[2])
        const profit = sign === '-' ? -amount : amount

        totalTrades++
        totalProfit += profit

        if (profit > maxProfit) maxProfit = profit
        if (profit < maxLoss) maxLoss = profit

        if (outcome === 'win') winCount++
        if (outcome === 'loss') lossCount++
      })

      const avgProfit = totalTrades ? totalProfit / totalTrades : 0
      const winRatePercent = totalTrades ? ((winCount / totalTrades) * 100).toFixed(1) : '0.0'

      this.summaryHtml = `
        <table>
          <thead><tr><th>Metric</th><th>Value</th></tr></thead>
          <tbody>
            <tr><td>Total Trades</td><td>${totalTrades}</td></tr>
            <tr><td>Total Profit</td><td>€${totalProfit.toFixed(2)}</td></tr>
            <tr><td>Average Profit / Trade</td><td>€${avgProfit.toFixed(2)}</td></tr>
            <tr><td>Winning Trades</td><td>${winCount}</td></tr>
            <tr><td>Losing Trades</td><td>${lossCount}</td></tr>
            <tr><td>Max Profit</td><td>€${maxProfit.toFixed(2)}</td></tr>
            <tr><td>Max Loss</td><td>€${maxLoss.toFixed(2)}</td></tr>
            <tr><td>Win Rate</td><td>${winCount}/${totalTrades} (${winRatePercent}%)</td></tr>
          </tbody>
        </table>
      `

      this.loading = false
    })
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
