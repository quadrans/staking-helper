<template>
<div class="container-fluid px-0 pt-0" >
  <div class="container-fluid bg-map-grey first-section row-before-blue">
    <div class="row">
      <div class="col-12 my-4">
      <h1 class="text-center"><b>Staking statistics</b></h1>
      </div>
    </div>
    <div class="row py-3">
      <div class="col-12 col-lg-7 order-2 order-lg-1 mb-4">
        <div class="card h-100 card-q px-0 pb-0 pt-2 my-0">
          <div class="card-body py-1">
            <h4 class="card-title">Monthly Pool Size</h4>
          </div>
          <apexchart
            type="bar"
            width="100%"
            height="280"
            :options="ChartConfigs.globalMonthlyPoolsize_cfg"
            :series="globalMonthlyPoolsize_data">
          </apexchart>
        </div>
      </div>
      <div class="col-12 col-lg-5 order-1 order-lg-2">
        <div class="row h-50">
          <div class="col-12 col-lg-6 mb-4">
            <div class="card h-100 card-q px-0 pb-0 pt-2">
                <div class="card-body py-1">
                  <h4 class="card-title">Total staked</h4>
                  <p style="font-size: 1.3rem !important;" class="my-1">{{ formatter.QDTAmount(globals.in_staking) }} QDT</p>
                </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 mb-4">
            <div class="card h-100 card-q px-0 pb-0 pt-2">
                <div class="card-body py-1">
                  <h4 class="card-title">Active stakers</h4>
                  <p style="font-size: 1.3rem !important;" class="my-1">{{ globals.active_stakers }}</p>
                </div>
            </div>
          </div>
        </div>
        <div class="row h-50">
          <div class="col-12 col-lg-6 mb-4">
            <div class="card h-100 card-q px-0 pb-0 pt-2">
                <div class="card-body py-1">
                  <h4 class="card-title">Uncollected rewards</h4>
                  <p style="font-size: 1.3rem !important;" class="my-1">{{ formatter.QDTAmount(globals.unissued_interests) }} QDT</p>
                </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 mb-4">
            <div class="card h-100 card-q px-0 pb-0 pt-2">
                <div class="card-body py-1">
                  <h4 class="card-title">Collected rewards</h4>
                  <p style="font-size: 1.3rem !important;" class="my-1">{{ formatter.QDTAmount(globals.issued_interests) }} QDT</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-4 mb-4">
        <div class="card h-100 card-q px-0 pb-0 pt-2 my-0">
          <div class="card-body py-1">
            <h4 class="card-title">Pool shares</h4>
          </div>
          <apexchart
            type="pie"
            width="100%"
            ref="poolSharesChart"
            :options="ChartConfigs.globalPoolShares_cfg"
            :series="globalPoolShares_data">
          </apexchart>
        </div>
      </div>
      <div class="col-12 col-lg-8 mb-4">
        <div class="card h-100 card-q px-0 pb-0 pt-2 my-0">
          <div class="card-body py-1">
            <h4 class="card-title">Monthly Activity</h4>
          </div>
          <apexchart
            type="bar"
            width="100%"
            height="340"
            :options="ChartConfigs.globalMonthlyActivity_cfg"
            :series="globalMonthlyActivity_data">
          </apexchart>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card card-q px-0 py-0">
            <div class="card-body py-4">
              <h4>Top 10 stakers</h4>
                <b-table
                :data="topStakersData"
                :columns="TablesConfigs.topStakersColums"
                >
                </b-table>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import StatisticsAPI from '@/plugins/statistics_api.js';
import FancyFormatter from '@/plugins/fancy-formatter.js';
import ChartConfigs from '@/configs/charts_configs.js';
import TablesConfigs from '@/configs/tables_configs.js';

var Web3 = require("web3");
const ABI_QDT = require("../abi/qdt.json");
const ABI_STAKING = require("../abi/staking.json");

export default {
  name: "Statistics",
  components: {},
  data() {
    return {
      ChartConfigs,
      TablesConfigs,
      formatter: FancyFormatter,
      globals: {
        in_staking: 0,
        active_stakers: 0,
        issued_interests: 0,
        unissued_interests: 0,
      },
      topStakersData: [],
      globalPoolShares_data: [],
      globalMonthlyActivity_data: [],
      globalMonthlyPoolsize_data: [],
    };
  },
  methods: {
    async loadGlobals() {
      const globalStats = await StatisticsAPI.getGlobalStatistics()
      this.globals = globalStats;
    },
    async loadShares() {
      let shares = await StatisticsAPI.getShares()
      shares = shares.shares
      this.ChartConfigs.globalPoolShares_cfg.labels = [ "Others" ]
      this.globalPoolShares_data = [ 0 ]
      for(let i = 0; i<shares.length; i++) {
        if(shares[i].share>0.05) {
          this.ChartConfigs.globalPoolShares_cfg.labels.push(shares[i].staker_address)
          this.globalPoolShares_data.push(shares[i].share*100)
        } else {
          this.globalPoolShares_data[0] += (shares[i].share*100)
        }
      }
      this.$refs.poolSharesChart.updateSeries(this.globalPoolShares_data)
      this.$refs.poolSharesChart.updateOptions(this.ChartConfigs.globalPoolShares_cfg)
    },
    async loadTopStakers() {
      let topStakers = await StatisticsAPI.getTopStakers()
      this.topStakersData = topStakers;
      for(let i = 0; i< this.topStakersData.length; i++) {
        this.topStakersData[i].staked_amount=this.formatter.QDTAmount(this.topStakersData[i].staked_amount)+" QDT"
        this.topStakersData[i].accured_interests=this.formatter.QDTAmount(this.topStakersData[i].accured_interests)+" QDT"
        this.topStakersData[i].interest_days=this.topStakersData[i].interest_days+" days"
      }
    },
    async loadMonthlyActivity() {
      let monthlyActivity = await StatisticsAPI.getMonthlyActivity()

      let stakesData = []
      let withdrawsData = []
      console.log(monthlyActivity)
      let months = []
      for(let i=0; i<monthlyActivity.stakes.length; i++) {
        if (months.indexOf(monthlyActivity.stakes[i].month)<0) {
          months.push(monthlyActivity.stakes[i].month)
        }
      }
      for(let i=0; i<monthlyActivity.withdraws.length; i++) {
        if (months.indexOf(monthlyActivity.withdraws[i].month)<0) {
          months.push(monthlyActivity.withdraws[i].month)
        }
      }

      for(let i=0; i<months.length; i++) {

        let d = new Date(months[i]);
        let stake = monthlyActivity.stakes.find((s) => s.month==months[i])
        let withdraw = monthlyActivity.withdraws.find((e) => e.month==months[i])

        if ( stake ) {
          stakesData.push({
            x: d.toLocaleString('default', { month: 'short', year: 'numeric' }),
            y: stake.total_staked,
          })
        } else {
          stakesData.push({
            x: d.toLocaleString('default', { month: 'short', year: 'numeric' }),
            y: 0,
          })
        }

        if ( withdraw ) {
          withdrawsData.push({
            x: d.toLocaleString('default', { month: 'short', year: 'numeric' }),
            y: withdraw.total_withdrawed,
          })
        } else {
          withdrawsData.push({
            x: d.toLocaleString('default', { month: 'short', year: 'numeric' }),
            y: 0,
          })
        }
      }

      this.globalMonthlyActivity_data = [
        {
          name: 'Stakes',
          data: stakesData
        },
        {
          name: 'Withdrawed',
          data: withdrawsData,
        }
      ]
    },
    async loadMonthlyPoolsize() {
      let monthlyPoolsize = await StatisticsAPI.getMonthlyPoolSize()
      let data = []
      console.log(monthlyPoolsize)
      for(let i = 0; i<monthlyPoolsize.length; i++) {
        let d = new Date(monthlyPoolsize[i].month)
        data.push({
          x: d.toLocaleString('default', { month: 'short', year: 'numeric' }),
          y: [
            monthlyPoolsize[i].pool.open,
            monthlyPoolsize[i].pool.high,
            monthlyPoolsize[i].pool.low,
            monthlyPoolsize[i].pool.close
          ]
        });
      }
      this.globalMonthlyPoolsize_data=[
        {
          name: 'Monthly Pool Size',
          data: data
        }
      ]
    },
  },
  mounted() {
    this.loadGlobals()
    this.loadShares()
    this.loadTopStakers()
    this.loadMonthlyActivity()
    this.loadMonthlyPoolsize()
  }
};
</script>
