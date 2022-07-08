<template>
  <div class="container-fluid bg-map-grey first-section row-before-blue">
    <!-- Header start -->
    <div class="row">
      <div class="col-12 my-4">
      <h1 class="text-center"><b>Your wallet address:</b> {{ walletAddress }}</h1>
      </div>
    </div>
    <!-- Header end -->
    <div class="row">
      <div class="col-6">

        <div class="row">
          <div class="col-6">
            <div class="card card-q px-0 py-0">
                <div class="card-body py-1">
                  <p style="font-size: 1.3rem !important;" class="my-1">{{ formatter.QDTAmount(qdtBalance)  }} QDT</p>
                  <h5 class="card-title">Wallet Balance</h5>
                </div>
            </div>
          </div>
          <div class="col-6">
            <div class="card card-q px-0 py-0">
                <div class="card-body py-1">
                  <p style="font-size: 1.3rem !important;" class="my-1">{{ formatter.QDTAmount(staking) }}</p>
                  <h5 class="card-title">In staking</h5>
                </div>
            </div>
          </div>

          <div class="col-6">
            <div class="card card-q px-0 py-0">
                <div class="card-body py-1">
                  <p style="font-size: 1.3rem !important;" class="my-1">{{ formatter.QDTAmount(interest) }} QDT</p>
                  <h5 class="card-title">Uncollected rewards</h5>
                </div>
            </div>
          </div>
          <div class="col-6">
            <div class="card card-q px-0 py-0">
                <div class="card-body py-1">
                  <p style="font-size: 1.3rem !important;" class="my-1">{{ formatter.QDTAmount(totalCollected) }} QDT</p>
                  <h5 class="card-title">Collected rewards</h5>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div v-if="staking > 0" class="card card-q px-0 py-0">
            <div class="card-body py-1">
              <h3 class="title">Withdraw</h3>
                <p style="line-height: 22px !important">You will withdraw all the tokens + reward.</p>
              <div class="text-center">
              <b-button
                type="fill mx-auto"
                v-if="!isWithdrawing"
                v-on:click="withdraw"
                >WITHDRAW</b-button
              >
              </div>
              <div v-if="isWithdrawing">
                <b-message type="is-info" aria-close-label="Close message">
                  Please confirm the <b>withdraw transaction</b> and wait until
                  is confirmed...
                </b-message>
              </div>
            </div>
        </div>
        <div v-else class="card card-q px-0 py-0">
            <div class="card-body py-1">
              <h3 class="title">Stake</h3>
                <b-input
                  placeholder="Write the amount to stake here (min. 10000 QDT)"
                  min="10000"
                  type="number"
                  v-model="toStake"
                ></b-input>
                <h4>Estimated rewards</h4>
                <p>
                  30 days rewards: <span> {{ oneMonth_est_rewards }}</span> QDT<br/>
                  90 days rewards: <span> {{ threeMonths_est_rewards }}</span> QDT <br/>
                  1 year rewards: <span> {{ oneYear_est_rewards }}</span> QDT <br/>
                </p>
              <div class="text-center">
              <b-button
                type="fill mx-auto"
                v-if="!isWithdrawing"
                v-on:click="stake"
                >STAKE</b-button
              >
              </div>
              <div v-if="isStaking">
                <b-message type="is-info" aria-close-label="Close message">
                  Please confirm the <b>withdraw transaction</b> and wait until
                  is confirmed...
                </b-message>
              </div>
            </div>
        </div>
      </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="card card-q px-0 py-0">
          <div class="card-body py-4">
            <h3 class="title mb-2">Activity history</h3>
            <b-table
              :data="stakerActivityData"
              :columns="TablesConfigs.stakerActivityColumns"
            >
            </b-table>
          </div>
      </div>
    </div>
  </div>
</div>
</template>



<script>
import FancyFormatter from '@/plugins/fancy-formatter.js'
import StatisticsAPI from '@/plugins/statistics_api.js'
import TablesConfigs from '@/configs/tables_configs.js'

export default {
  name: "StakerDashboard",
  components: {
  },
  props: {
    walletAddress: String,
    staking: Number,
    interest: Number,
    qdtBalance: Number,
    isWithdrawing: Boolean,
    isStaking: Boolean,
    isApproving: Boolean,
  },
  data() {
    return {
      TablesConfigs,
      toStake: 0,
      formatter: FancyFormatter,
      oneMonth_est_rewards: 0,
      threeMonths_est_rewards: 0,
      oneYear_est_rewards: 0,
      stakerActivityData: [],
      totalCollected : 0,
    };
  },
  methods: {
    withdraw() {
      this.$emit('withdraw')
    },
    stake() {
      this.$emit('stake',this.toStake)
    },
    async loadActivity() {
      const r = await StatisticsAPI.getStakerActivity(this.walletAddress)

      this.stakerActivityData = []
      for(let i=0; i<r.stakes.length; i++) {
        let o = {
          action: "Stake",
          timestamp: (new Date(r.stakes[i].opening_timestamp).toLocaleString('default')),
          amount: FancyFormatter.QDTAmount(r.stakes[i].staked_amount)+" QDT",
          block_number: FancyFormatter.blockLink("https://etherscan.io/",r.stakes[i].opening_block),
          tx_hash: FancyFormatter.txLink("https://etherscan.io",r.stakes[i].opening_tx,""),
        }
        this.stakerActivityData.push(o)
      }
      for(let i=0; i<r.withdraws.length; i++) {
        let o = {
          action: "Withdraw",
          timestamp: (new Date(r.withdraws[i].closing_timestamp).toLocaleString('default')),
          amount: FancyFormatter.QDTAmount(r.withdraws[i].withdrawed_amount)+" QDT",
          block_number: FancyFormatter.blockLink("https://etherscan.io",r.withdraws[i].closing_block),
          tx_hash: FancyFormatter.txLink("https://etherscan.io",r.withdraws[i].closing_tx,""),
        }
        this.stakerActivityData.push(o)
      }
      this.stakerActivityData.sort( (a,b) => { return a.timestamp>b.timestamp; } )

    },
    async loadTotalCollected() {
      const r = await StatisticsAPI.getStakerTotalCollected(this.walletAddress);
      this.totalCollected = r.total_collected;
    }
  },
  mounted() {
    this.loadActivity()
    this.loadTotalCollected()
  },
  watch: {
    toStake(newStake,oldStake) {
      this.oneMonth_est_rewards = (30*(newStake*0.14)/365).toFixed(2)
      this.threeMonths_est_rewards = (90*(newStake*0.14)/365).toFixed(2)
      this.oneYear_est_rewards = (newStake*0.14).toFixed(2)
    },
    walletAddress(newAddress,oldAddress) {
      this.loadActivity()
      this.loadTotalCollected()
    },
  }
};
</script>
