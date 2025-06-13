<template>
  <div id="trade-journal"></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://unpkg.com/gridjs/dist/gridjs.umd.js'
  script.onload = () => {
    new window.gridjs.Grid({
      columns: [
        'Pair',
        'Date & Time',
        'Bias',
        'Liquidity',
        'POI',
        'Outcome',
        'P/L',
        {
          name: 'Chart+Notes',
          formatter: (cell) => window.gridjs.html(cell)
        }
      ],
      data: [
        [
          'BTC/USDT',
          '2025-06-12 14:30',
          'Bullish',
          'Buy-side taken',
          '1H OB @ 65k',
          'Win',
          '+250',
          `<div>
            <img src="/charts/btc-2025-06-12.png" alt="Chart" style="width: 120px; border-radius: 8px;" />
            <p style="margin: 4px 0 0; font-size: 12px;">Quick bounce off OB, TP1 hit.</p>
          </div>`
        ],
        [
          'ETH/USDT',
          '2025-06-11 09:10',
          'Bearish',
          'Sell-side taken',
          '4H FVG',
          'Loss',
          '-100',
          `<div>
            <img src="/charts/eth-2025-06-11.png" alt="Chart" style="width: 120px; border-radius: 8px;" />
            <p style="margin: 4px 0 0; font-size: 12px;">Missed entry timing, stop loss hit.</p>
          </div>`
        ]
      ],
      search: true,
      pagination: true,
      sort: true,
    }).render(document.getElementById('trade-journal'))
  }
  document.head.appendChild(script)
})
</script>

<style>
@import url('https://unpkg.com/gridjs/dist/theme/mermaid.min.css');
</style>
