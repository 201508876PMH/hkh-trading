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
  colorSchemeDarkBlue,
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
  // add more mappings here
};

const columnDefs = [
  {
    headerName: 'Pair',
    field: 'pair',
    filter: true,
    flex: 1,
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
  { headerName: 'Date & Time', field: 'datetime', filter: 'agDateColumnFilter', flex: 1, minWidth: 160 },
  {
    headerName: 'Bias',
    field: 'bias',
    filter: true,
    flex: 1,
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
  { headerName: 'Liquidity', field: 'liquidity', flex: 1, minWidth: 140, cellStyle: { textAlign: 'center' } },
  { headerName: 'POI', field: 'poi', flex: 1, minWidth: 120, cellStyle: { textAlign: 'center' } },
  {
    headerName: 'Outcome',
    field: 'outcome',
    flex: 1,
    minWidth: 100,
    cellStyle: (params) => {
      if (params.value === 'Win') {
        return { color: '#3B664A', textAlign: 'center', fontWeight: 'bold' }
      } else if (params.value === 'Loss') {
        return { color: '#B22222', textAlign: 'center', fontWeight: 'bold' }
      }
    },
  },
  {
    headerName: 'P/L',
    field: 'pl',
    flex: 1,
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
    flex: 2,
    minWidth: 240,
  },
]

// Create grid with autosizing on gridReady
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
    rowData: rowData.value,
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    theme,
    autoSizeStrategy: { type: 'fitCellContents' },  // <-- here as object    pagination: true,
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
