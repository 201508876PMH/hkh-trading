<template>
  <div ref="gridRef" class="ag-theme-alpine" style="height: 500px; width: 100%"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useData } from 'vitepress'

import { createGrid, ModuleRegistry } from 'ag-grid-community'
import { AllCommunityModule } from 'ag-grid-community'

import {
  themeAlpine,
  iconSetMaterial,
  colorSchemeLightCold,
  colorSchemeDarkBlue,
} from 'ag-grid-community'

ModuleRegistry.registerModules([AllCommunityModule])

const { isDark } = useData()
const gridRef = ref(null)
let gridInstance = null

const columnDefs = [
  // your columns here (same as before)
  {
    headerName: 'Pair',
    field: 'pair',
    filter: true,
    flex: 1,
    minWidth: 140,
    cellRenderer: (params) => {
      return `
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="${params.data.icon}" alt="${params.value}" style="width: 20px; height: 20px;" />
          ${params.value}
        </div>`
    },
  },
  { headerName: 'Date & Time', field: 'datetime', filter: 'agDateColumnFilter', flex: 1, minWidth: 160 },
  {
    headerName: 'Bias',
    field: 'bias',
    filter: true,
    flex: 1,
    minWidth: 110,
    cellRenderer: (params) => {
      const val = params.value
      const iconPath =
        val === 'Bullish'
          ? '/hkh-trading/svg/bullish.svg'
          : '/hkh-trading/svg/bearish.svg'

      return `
        <div style="display: flex; align-items: center; gap: 6px;">
          <img src="${iconPath}" alt="${val}" style="width: 14px; height: 14px;" />
          <span>${val}</span>
        </div>`
    },
  },
  { headerName: 'Liquidity', field: 'liquidity', flex: 1, minWidth: 140 },
  { headerName: 'POI', field: 'poi', flex: 1, minWidth: 120 },
  {
    headerName: 'Outcome',
    field: 'outcome',
    flex: 1,
    minWidth: 100,
    cellStyle: (params) => {
      if (params.value === 'Win') {
        return {
          color: '#3B664A',
          textAlign: 'center',
          fontWeight: 'bold',
        }
      } else if (params.value === 'Loss') {
        return {
          color: '#B22222',
          textAlign: 'center',
          fontWeight: 'bold',
        }
      }
    },
  },
  {
    headerName: 'P/L',
    field: 'pl',
    flex: 1,
    minWidth: 100,
    cellRenderer: (params) => {
      const value = parseFloat(params.value)
      const className = value < 0 ? 'pl-circle pl-negative' : 'pl-circle'
      return `<div class="${className}">${params.value}</div>`
    },
  },
  {
    headerName: 'Chart+Notes',
    field: 'notes',
    flex: 2, // wider column
    minWidth: 240,
    cellRenderer: (params) => {
      const { chart, note } = params.value || {}
      return `
        <div style="display:flex; gap:10px; align-items:center;">
          <img src="${chart}" style="width:80px; border-radius:6px;" />
          <div style="font-size:12px;">${note}</div>
        </div>`
    },
  },
]

const rowData = [
  {
    pair: 'BTC/USDT',
    icon: '/hkh-trading/svg/bitcoin.svg',
    datetime: '2025-06-12 14:30',
    bias: 'Bullish',
    liquidity: 'Buy-side taken',
    poi: '1H OB @ 65k',
    outcome: 'Win',
    pl: '+250',
    notes: {
      chart: '/hkh-trading/images/ftmo-challenge-passed.png',
      note: 'Quick bounce off OB, TP1 hit.',
    },
  },
  {
    pair: 'ETH/USDT',
    icon: '/hkh-trading/svg/eth.svg',
    datetime: '2025-06-11 09:10',
    bias: 'Bearish',
    liquidity: 'Sell-side taken',
    poi: '4H FVG',
    outcome: 'Loss',
    pl: '-100',
    notes: {
      chart: '/hkh-trading/images/ftmo-challenge-passed.png',
      note: 'Missed entry timing, stop loss hit.',
    },
  },
]

function createAgGrid() {
  if (!gridRef.value) return

  const theme = themeAlpine
    .withPart(isDark.value ? colorSchemeDarkBlue : colorSchemeLightCold)
    .withPart(iconSetMaterial)
    .withParams({ iconSize: 18 })

  if (gridInstance) {
    gridInstance.destroy()
  }

  gridInstance = createGrid(gridRef.value, {
    columnDefs,
    rowData,
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    theme,
    pagination: true,
    columnHoverHighlight: true,
    domLayout: 'normal',
  })
}

onMounted(() => {
  createAgGrid()
})

// Watch dark mode changes and recreate grid with new theme
watch(isDark, () => {
  createAgGrid()
})
</script>

