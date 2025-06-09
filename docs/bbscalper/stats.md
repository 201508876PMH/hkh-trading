# BBScalper Strategy
#### Type <Badge type="warning" text="HF"/><Badge type="tip" text="Indicators"/>
This page documents the performance and behavior of the **BBScalper** trading strategy, including backtesting results, key performance metrics, and trade analytics.

The data presented here is based on historical backtesting within a specified time frame and trading conditions. It is intended to provide a quantitative overview of how the strategy performs under simulated market conditions.

::: info Data
Backtest results can be downloaed here: :bar_chart:<code>[bbscalper](https://github.com/201508876PMH/trade-bot-site/blob/master/docs/backtest_results/bbscalper/full_backtest_report.txt)</code>
:::
## Backtest configuration
```json:line-numbers{14}
{
  "args": [
    "backtesting",
    "--config", 
      "user_data/config.json",
    "--strategy",    
      "BBScalper",
    "--timerange",
      "20240101-20250101",
    "--timeframe",
      //"4h",
      // "1h",
      //"30m",
      "15m",
      //"5m"
  ]
}
```

## Backtesting report

````md{8}
<!--@include: ../backtest_results/bbscalper/backtest_report.md-->
````

## Left open trades report

```md
<!--@include: ../backtest_results/bbscalper/left_open_trades_report.md-->
```

## Enter tag stats

```md
<!--@include: ../backtest_results/bbscalper/enter_tags.md-->
```

## Exit reason stats

```md
<!--@include: ../backtest_results/bbscalper/exit_tags.md-->
```
## Mixed tag stats

```md
<!--@include: ../backtest_results/bbscalper/mixed_tags.md-->
```

## Summary metrics

```md{13}
<!--@include: ../backtest_results/bbscalper/summary_metrics.md-->
```

## Strategy summary

```md
<!--@include: ../backtest_results/bbscalper/strategy_summary.md-->
```