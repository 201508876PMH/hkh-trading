<template>
  <div ref="gridRef" class="ag-theme-alpine" style="height: 1000px; width: 100%"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useData } from 'vitepress'
import yaml from 'js-yaml'

import { createGrid, ModuleRegistry } from 'ag-grid-community'
import { AllCommunityModule } from 'ag-grid-community'

import {
  themeAlpine,
  iconSetMaterial,
  colorSchemeLightCold,
  colorSchemeDark,
} from 'ag-grid-community'

ModuleRegistry.registerModules([AllCommunityModule])

const { isDark } = useData()
const gridRef = ref(null)
let gridInstance = null
const rowData = ref([])

const defaultIcon = "/hkh-trading/svg/unknown-coin.svg";  // Your default icon URL
const iconMap = {
  BTC: "/hkh-trading/svg/bitcoin.svg",
  ETH: "/hkh-trading/svg/eth.svg",
  GBP: "/hkh-trading/svg/gpg.svg",
  // add more mappings here
};

const columnDefs = [
  {
    headerName: 'Pair',
    field: 'pair',
    filter: true,
    minWidth: 140,
    cellRenderer: (params) => {
      const pair = params.value || "";
      const base = pair.split('/')[0];
      const icon = iconMap[base] || defaultIcon;
      return `
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="${icon}" alt="${base}" style="width: 20px; height: 20px;" />
          ${pair}
        </div>`;
    },
  },
  { headerName: 'Date & Time', field: 'datetime', filter: 'agDateColumnFilter', minWidth: 160 },
  {
    headerName: 'Bias',
    field: 'bias',
    filter: true,
    minWidth: 110,
    cellRenderer: (params) => {
      const val = params.value
      const iconPath = val === 'Bullish'
        ? '/hkh-trading/svg/bullish.svg'
        : '/hkh-trading/svg/bearish.svg'

       return `
        <div style="display: flex; align-items: center; gap: 6px; justify-content: center;">
          <img src="${iconPath}" alt="${val}" style="width: 14px; height: 14px;" />
          <span>${val}</span>
        </div>`;
    },
  },
  //{ headerName: 'Liquidity', field: 'liquidity', flex: 1, minWidth: 140, cellStyle: { textAlign: 'center' } },
  //{ headerName: 'POI', field: 'poi', flex: 1, minWidth: 120, cellStyle: { textAlign: 'center' } },
  {
    headerName: 'Outcome',
    field: 'outcome',
    minWidth: 100,
    cellRenderer: (params) => {
      if (params.value === 'Win') {
        return `<span class="win">${params.value}</span>`;
      } else if (params.value === 'Loss') {
        return `<span class="loss">${params.value}</span>`;
      }
      return params.value;
    },
    cellStyle: { textAlign: 'center' }
  },
  {
    headerName: 'P/L',
    field: 'pl',
    minWidth: 100,
    cellRenderer: (params) => {
      const value = parseFloat(params.value);
      const className = value < 0 ? 'pl-circle pl-negative' : 'pl-circle';
      return `<div class="${className}" style="text-align: center;">${params.value}</div>`;
    },
    cellStyle: { textAlign: 'center' }, // <-- Center content horizontally
  },
  {
    headerName: 'Notes',
    field: 'notes',
    minWidth: 240,
  },
  {
    headerName: 'Link',
    field: 'link',
    minWidth: 250,
    cellRenderer: (params) => {
      const { datetime, outcome, pl } = params.data || {}
      if (!datetime || !outcome || !pl) return ''

      const year = datetime.slice(0, 4)
      const formattedDatetime = datetime.replace(' ', '-').replace(':', '-')
      const numericPart = Math.abs(parseFloat(pl)).toString()
      const anchor = `_${formattedDatetime}-${outcome.toLowerCase()}-${numericPart}`
      const url = `/hkh-trading/journal/${year}/journal.html#${anchor}`

      return `<a href="${url}" style="color: var(--vp-c-brand); text-decoration: underline;">View</a>`
    },
    cellStyle: { textAlign: 'center' }
  }
]

// Create grid with autosizing on gridReady
function createAgGrid() {
  if (!gridRef.value) return

  const theme = themeAlpine
    .withPart(isDark.value ? colorSchemeDark : colorSchemeLightCold)
    .withPart(iconSetMaterial)
    .withParams({ iconSize: 18 })

  if (gridInstance) {
    gridInstance.destroy()
  }

  gridInstance = createGrid(gridRef.value, {
    columnDefs,
    rowData: rowData.value,
    defaultColDef: {
      sortable: true,
      resizable: false,
    },
    theme,
    autoSizeStrategy: { type: 'fitCellContents' },  // <-- here as object    pagination: true,
    pagination: true,
    columnHoverHighlight: true,
    domLayout: 'normal',
  })
}

// Load YAML data, then create grid
async function loadData() {
  try {
    const res = await fetch('/hkh-trading/data/data.yaml')
    const text = await res.text()
    const data = yaml.load(text)
    rowData.value = data
    createAgGrid()
  } catch (e) {
    console.error('Error loading YAML data:', e)
  }
}

onMounted(() => {
  loadData()
})

// Recreate grid on dark mode changes (only if data loaded)
watch(isDark, () => {
  if (rowData.value.length) {
    createAgGrid()
  }
})
</script>
