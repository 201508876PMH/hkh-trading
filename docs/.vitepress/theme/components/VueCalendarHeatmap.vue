<script setup>
import { onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { computed } from 'vue'
import yaml from 'js-yaml'

const { isDark } = useData()
const values = ref([])
const plMap = new Map()

// ✅ 0 = null/no trades
// ✅ 1–3 = losses
// ✅ 4–6 = gains
const rangeColor = computed(() =>
  isDark.value
    ? [
        '#2b2b2b',  // 0 = null (no trades)
        '#f4cccc',  // 1 = moderate loss
        '#c0392b',  // 2 = heavy loss
        '#802b2b',  // 3 = light loss or zero
        '#a9dfbf',  // 4 = small profit
        '#2ecc71',  // 5 = moderate profit
        '#27ae60'   // 6 = strong profit
      ]
    : [
        '#ebedf0',  // 0 = null (no trades)
        '#fce8e6',  // 1 = moderate loss
        '#ff9999',  // 2 = heavy loss
        '#e74c3c',  // 3 = light loss or zero
        '#b2f2bb',  // 4 = small profit
        '#2ecc71',  // 5 = moderate profit
        '#27ae60'   // 6 = strong profit
      ]
)

onMounted(async () => {
  const res = await fetch('/hkh-trading/data/data.yaml')
  const raw = await res.text()
  const parsed = yaml.load(raw)

  const dailyMap = new Map()

  // Sum numeric P/L per day
  parsed.forEach(entry => {
    const date = entry.datetime.slice(0, 10)
    const pl = parseFloat(entry.pl.replace(/[^\d.-]/g, '')) || 0
    dailyMap.set(date, (dailyMap.get(date) || 0) + pl)
  })

  const allDates = getAllDatesInYear(2025)
  const allPL = [...dailyMap.values()]
  const min = Math.min(...allPL)
  const max = Math.max(...allPL)

  const scaled = allDates.map(date => {
    const pl = dailyMap.get(date) ?? null
    if (pl != null) {
      plMap.set(date, pl)
    }

    let count = null
    if (pl != null) {
      if (pl === 0) {
        count = 3 // middle (neutral)
      } else if (pl < 0) {
        const lossScale = Math.round((pl / min) * 2)
        count = 1 + Math.max(0, Math.min(2, lossScale))  // index 1–3
      } else {
        const profitScale = Math.round((pl / max) * 2)
        count = 4 + Math.max(0, Math.min(2, profitScale)) // index 4–6
      }
    }

    return { date, count }
  })

  values.value = scaled
})

function getAllDatesInYear(year) {
  const dates = []
  const d = new Date(`${year}-01-01`)
  while (d.getFullYear() === year) {
    dates.push(d.toISOString().slice(0, 10))
    d.setDate(d.getDate() + 1)
  }
  return dates
}

const tooltipFormatter = (v) => {
  const dateObj = new Date(v.date)
  const displayDate = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  const key = dateObj.toLocaleDateString('sv-SE')
  const pl = plMap.get(key)

  if (pl == null) {
    return `<strong>No contributions</strong> on ${displayDate}`
  }

  const label = pl >= 0 ? 'Profit' : 'Loss'
  const color = pl >= 0 ? '#2ecc71' : '#ff6b6b'  // match block green/red

  return `${displayDate}: ${label}: <strong style="color: ${color}">${pl >= 0 ? '+' : '-'}${Math.abs(pl).toFixed(2)}</strong>`
}


</script>

<template>
  <CalendarHeatmap
    :values="values"
    start-date="2025-01-01"
    end-date="2025-12-31"
    :round="3"
    :range-color="rangeColor"
    :tooltip-formatter="tooltipFormatter"
  />
</template>