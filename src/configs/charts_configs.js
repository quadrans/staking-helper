import FancyFormatter from '@/plugins/fancy-formatter.js';

const ChartConfigs = {

  globalPoolShares_cfg: {
    chart: {
      type: 'pie',
      toolbar: {
        show: false,
      },
    },
    labels: [],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
                      return value.toFixed(2)+'%'
                    }
      }
    }
  },
  globalMonthlyActivity_cfg : {
    chart: {
      toolbar: {
        show: false,
      },
    },
    legend: { show: false, },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 5
      }
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return FancyFormatter.QDTAmount(value);
        }
      },
    },
    tooltip: {
      y: {
        formatter: FancyFormatter.QDTAmount
      }
    }
  },
  globalMonthlyPoolsize_cfg: {
    chart: {
        zoom: {
          autoScaleYaxis: true
        },
        toolbar: {
          show: false,
        },
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#20c997',
          downward: '#6f42c1',
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return FancyFormatter.QDTAmount(value);
        }
      },
    },
  },
}


export default ChartConfigs;
