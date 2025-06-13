import DefaultTheme from 'vitepress/theme'

import './custom.css'

// Required timeline CSS
import './styles/index.css'

import BarChart from './components/BarChart.vue'
import LineChart from './components/LineChart.vue'
import PieChart from './components/PieChart.vue'
import ProgressiveLineChart from './components/ProgressiveLineChart.vue'
import SummaryTable from './components/SummaryTable.vue'
import TradeJournalAG from './components/TradeJournalAG.vue'


export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    DefaultTheme.enhanceApp?.({ app })  // keep default behavior
    app.component('BarChart', BarChart)
    app.component('LineChart', LineChart)
    app.component('PieChart', PieChart)
    app.component('ProgressiveLineChart', ProgressiveLineChart)
    app.component('SummaryTable', SummaryTable)
    app.component('TradeJournalAG', TradeJournalAG)
  }
}
