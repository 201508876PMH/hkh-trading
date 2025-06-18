import DefaultTheme from 'vitepress/theme'
import VueCalendarHeatmap from 'vue3-calendar-heatmap'

import './custom.css'

// Required timeline CSS
import './styles/index.css'

// Required calendar heatmap CSS
import 'vue3-calendar-heatmap/dist/style.css'
import 'tippy.js/dist/tippy.css'

import BarChart from './components/BarChart.vue'
import LineChart from './components/LineChart.vue'
import PieChart from './components/PieChart.vue'
import ProgressiveLineChart from './components/ProgressiveLineChart.vue'
import SummaryTable from './components/SummaryTable.vue'
import TradeJournalAG from './components/TradeJournalAG.vue'
import JournalSummary from './components/JournalSummary.vue'
import CalendarHeatmap from './components/CalendarHeatmap.vue'


export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(VueCalendarHeatmap)

    DefaultTheme.enhanceApp?.({ app })  // keep default behavior
    app.component('BarChart', BarChart)
    app.component('LineChart', LineChart)
    app.component('PieChart', PieChart)
    app.component('ProgressiveLineChart', ProgressiveLineChart)
    app.component('SummaryTable', SummaryTable)
    app.component('TradeJournalAG', TradeJournalAG)
    app.component('JournalSummary', JournalSummary)
    app.component('CalendarHeatmap', CalendarHeatmap)
  }
}
