<template>
  <div class="container-fluid bg-map-grey first-section row-before-blue">
    <!-- Header start -->
    <div class="row">
      <div class="col-12 my-4">
      <h1 class="text-center text-break"><b>Your wallet address:</b> {{ walletAddress }}</h1>
      </div>
    </div>
    <!-- Header end -->
    <div class="row py-3">
      <div class="col-12 col-xl-6 order-2 order-xl-1">
        <div class="row h-50">
          <div class="col-12 col-lg-6 mb-4">
            <div class="card h-100 card-q px-0 pb-0 pt-2">
                <div class="card-body py-1">
                  <h4 class="card-title">Wallet Balance</h4>
                  <p style="font-size: 1.3rem !important;" class="my-1">{{ formatter.QDTAmount(qdtBalance)  }} QDT</p>
                </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 mb-4">
            <div class="card h-100 card-q px-0 pb-0 pt-2">
                <div class="card-body py-1">
                  <h4 class="card-title">In staking</h4>
                  <p style="font-size: 1.3rem !important;" class="my-1">{{ formatter.QDTAmount(staking) }}</p>
                </div>
            </div>
          </div>
        </div>
        <div class="row h-50">
          <div class="col-12 col-lg-6 mb-4">
            <div class="card h-100 card-q px-0 pb-0 pt-2">
                <div class="card-body py-1">
                  <h4 class="card-title">Uncollected rewards</h4>
                  <p style="font-size: 1.3rem !important;" class="my-1">{{ formatter.QDTAmount(interest) }} QDT</p>
                </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 mb-4">
            <div class="card h-100 card-q px-0 pb-0 pt-2">
                <div class="card-body py-1">
                  <h4 class="card-title">Collected rewards</h4>
                  <p style="font-size: 1.3rem !important;" class="my-1">{{ formatter.QDTAmount(totalCollected) }} QDT</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-6 order-1 order-xl-2 mb-4">
        <div v-if="staking > 0" class="card h-100 card-q px-0 pb-0 pt-2">
            <div class="card-body py-1">
              <h4>Withdraw</h4>
                <p style="line-height: 22px !important">
                  You will withdraw all the tokens + reward.
                </p>
                <p style="line-height: 22px !important">
                  <b> Total: </b> {{ toWithdraw }} QDT
                </p>

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
        <div v-else class="card h-100 card-q px-0 py-0">
            <div class="card-body py-1">
              <div class="row">
                <div class="col">
                  <h4 class="card-title">Stake</h4>
                  <p class="mb-0"> The minimum amount of QDT you can stake is <b>10.000 Quadrans Token</b>.</p>
                  <div class="form-inline">
                    <b-input
                      placeholder="Write the amount to stake here (min. 10000 QDT)"
                      min="10000"
                      type="number"
                      v-model="toStake"
                      style="max-width: 70%; width: 100%"
                    ></b-input>
                      <b-button
                        type="fill"
                        v-if="!isWithdrawing"
                        v-on:click="stake"
                        >STAKE</b-button
                      >
                  </div>
                  <h4 class="card-title">Estimated rewards</h4>
                  <p>
                    30 days rewards: <span> {{ oneMonth_est_rewards }}</span> QDT<br/>
                    90 days rewards: <span> {{ threeMonths_est_rewards }}</span> QDT <br/>
                    1 year rewards: <span> {{ oneYear_est_rewards }}</span> QDT <br/>
                  </p>
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
      </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="card card-q px-0 pb-0 pt-2">
          <div class="card-body py-4">
            <h4 class="card-title">Activity history</h4>
            <!-- <b-table
              :data="stakerActivityData"
              :columns="TablesConfigs.stakerActivityColumns"
            >
            </b-table> -->
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col" class="d-none d-xl-table-cell">Date</th>
                  <th scope="col">Block #</th>
                  <th scope="col">Action</th>
                  <th scope="col">Amount</th>
                  <th class="d-none d-xl-table-cell" scope="col">Transaction hash</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="activity in stakerActivityData" :key="activity.block_number">
                  <td class="d-none d-xl-table-cell">{{ activity.timestamp }}</td>
                  <td v-html="activity.block_number"></td>
                  <td>{{ activity.action }}</td>
                  <td>{{ activity.amount }}</td>
                  <td class="d-none d-xl-table-cell text-break" v-html="activity.tx_hash"></td>
                </tr>
              </tbody>
            </table>
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
      toWithdraw: 0,
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
          n : r.stakes[i].opening_block,
          action: "Stake",
          timestamp: (new Date(r.stakes[i].opening_timestamp).toLocaleString('default')),
          amount: FancyFormatter.QDTAmount(r.stakes[i].staked_amount)+" QDT",
          block_number: FancyFormatter.blockLink("https://etherscan.io",r.stakes[i].opening_block),
          tx_hash: FancyFormatter.txLink("https://etherscan.io",r.stakes[i].opening_tx,""),
        }
        this.stakerActivityData.push(o)
      }
      for(let i=0; i<r.withdraws.length; i++) {
        let o = {
          n: r.withdraws[i].closing_block,
          action: "Withdraw",
          timestamp: (new Date(r.withdraws[i].closing_timestamp).toLocaleString('default')),
          amount: FancyFormatter.QDTAmount(r.withdraws[i].withdrawed_amount)+" QDT",
          block_number: FancyFormatter.blockLink("https://etherscan.io",r.withdraws[i].closing_block),
          tx_hash: FancyFormatter.txLink("https://etherscan.io",r.withdraws[i].closing_tx,""),
        }
        this.stakerActivityData.push(o)
      }
      this.stakerActivityData.sort( (a,b) => { return a.n>b.n; } )

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
    staking(newStaking,oldStaking) {
      this.toWithdraw = (newStaking+this.$props.interest).toFixed(2);
    },
    interest(newInterest,oldInterest) {
      this.toWithdraw = (newInterest+this.$props.staking).toFixed(2);
    }
  }
};
</script>
