# Performance
This page presents a detailed overview of my trading performance. It includes live data visualizations, summary metrics, and trade statistics such as win rate, average profit and loss, and trade durations. The goal is to maintain transparency, track consistency, and reflect on both strengths and areas for improvement throughout my trading development. Each trade contributes to the bigger picture—building experience, refining strategy, and progressing toward long-term goals.

## Trades Summary
Below is a summary of all recorded trades, automatically generated from the latest trading data. It highlights key performance metrics such as total profit, number of trades, average trade duration, and win/loss distribution. This table serves as a quick reference for assessing overall trading effectiveness and monitoring progress over time.


<div id="summary-table">Loading summary...</div>

<script type="module">
  async function fetchAndParseCSV(url) {
    const res = await fetch(url);
    const text = await res.text();
    const lines = text.trim().split('\n');
    const headers = lines[0].split(';').map(h => h.replace(/"/g, ''));
    const data = lines.slice(1).map(line => {
      const values = line.split(';').map(v => v.replace(/"/g, ''));
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = values[i];
      });
      return obj;
    });
    return data;
  }

  function secondsToHMS(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  }

  function renderSummaryTable(data) {
    let totalTrades = 0;
    let totalVolume = 0;
    let totalProfit = 0;
    let totalPips = 0;
    let totalDuration = 0;
    let winningTrades = 0;
    let losingTrades = 0;
    let maxProfit = -Infinity;
    let maxLoss = Infinity;

    data.forEach(row => {
      totalTrades++;
      const volume = parseFloat(row.Volume) || 0;
      const profit = parseFloat(row.Profit) || 0;
      const pips = parseFloat(row.Pips) || 0;
      const duration = parseInt(row['Trade duration in seconds']) || 0;

      totalVolume += volume;
      totalProfit += profit;
      totalPips += pips;
      totalDuration += duration;

      if (profit > 0) winningTrades++;
      else losingTrades++;

      if (profit > maxProfit) maxProfit = profit;
      if (profit < maxLoss) maxLoss = profit;
    });

    const avgProfit = totalProfit / totalTrades || 0;
    const avgDuration = totalDuration / totalTrades || 0;
    const winRatePercent = ((winningTrades / totalTrades) * 100).toFixed(1);

    return `
      <table>
        <thead>
          <tr><th>Metric</th><th>Value</th></tr>
        </thead>
        <tbody>
          <tr><td>Total Trades</td><td>${totalTrades}</td></tr>
          <tr><td>Total Volume</td><td>${totalVolume.toFixed(2)}</td></tr>
          <tr><td>Total Profit</td><td>€${totalProfit.toFixed(2)}</td></tr>
          <tr><td>Average Profit / Trade</td><td>€${avgProfit.toFixed(2)}</td></tr>
          <tr><td>Total Pips</td><td>${totalPips.toFixed(2)}</td></tr>
          <tr><td>Average Trade Duration</td><td>${secondsToHMS(Math.round(avgDuration))}</td></tr>
          <tr><td>Winning Trades</td><td>${winningTrades}</td></tr>
          <tr><td>Losing Trades</td><td>${losingTrades}</td></tr>
          <tr><td>Max Profit</td><td>€${maxProfit.toFixed(2)}</td></tr>
          <tr><td>Max Loss</td><td>€${maxLoss.toFixed(2)}</td></tr>
          <tr><td>Win Rate</td><td>${winningTrades}/${totalTrades} (${winRatePercent}%)</td></tr>
        </tbody>
      </table>
    `;
  }

(async () => {
  if (typeof window !== 'undefined') {
    const data = await fetchAndParseCSV('/hkh-trading/data/latest.csv'); // adjust path
    const tableHTML = renderSummaryTable(data);
    document.getElementById('summary-table').innerHTML = tableHTML;
  }
})();

</script>

<style>
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


## Charts
The visualizations below offer a deeper look into the trading activity and outcomes. Each chart presents a different perspective on performance:

- Bar Chart: Displays the profit or loss of each individual trade. This allows for quick identification of high-impact trades, outliers, and helps assess how consistent results have been across different positions.
<BarChart />

- Line Chart: Plots the cumulative profit over time, offering a clear visual of the equity curve. This chart is especially useful for spotting overall growth, periods of stagnation, or drawdowns, and assessing the long-term trajectory of the trading strategy.
<LineChart />

- Pie Chart: Represents the win/loss distribution across all trades. It provides an immediate sense of trade accuracy and consistency, highlighting how often trades are profitable versus unprofitable.
<PieChart />

Together, these charts provide an at-a-glance overview of key trading metrics, offering visual insights into profitability, trade frequency, and symbol performance. By breaking down results into intuitive formats, they make it easier to track progress over time, spot emerging trends, and identify areas for strategic improvement.


