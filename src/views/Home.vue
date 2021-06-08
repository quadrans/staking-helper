<template>
  <div class="container">
    <div class="box">
      <div v-if="account">
        Welcome back:<br />
        {{ account }}
        <hr />
        <div class="columns">
          <div class="column">
            <h1 class="subtitle">{{ qdt_balance }}</h1>
            <h1 class="title">QDT Balance</h1>
          </div>
          <div class="column">
            <h1 class="subtitle">{{ staking.stake }}</h1>
            <h1 class="title">In Staking</h1>
          </div>
          <div class="column" v-if="staking.stake">
            <h1 class="subtitle" v-if="staking.stake > 0">{{ interest }}</h1>
            <h1 class="subtitle" v-if="staking.stake == 0">Nothing in stake</h1>
            <h1 class="title">Interest</h1>
          </div>
        </div>
        <hr />
        <div class="columns">
          <div class="column">
            <h1 class="title">Stake</h1>
            <b-input
              placeholder="Write the amount to stake here"
              rounded
            ></b-input
            ><br />
            <b-button type="is-primary" v-on:click="stake">STAKE</b-button>
          </div>
          <div class="column">
            <h1 class="title">Withdraw</h1>
            <div style="line-height: 35px; padding-top: 5px">
              You will withdraw all the tokens + reward.
            </div>
            <br />
            <b-button type="is-primary" v-on:click="withdraw"
              >WITHDRAW</b-button
            >
          </div>
        </div>
      </div>
      <div v-if="!account">
        Please connect your Metamask wallet first,<br />window should be open
        automatically or click below button.<br /><br />
        <b-button type="is-primary" v-on:click="connect"
          >CONNECT METAMASK</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
var Web3 = require("web3");
const ABI_QDT = require("../abi/qdt.json");
const ABI_STAKING = require("../abi/staking.json");
export default {
  name: "Home",
  components: {},
  data() {
    return {
      web3: new Web3(window.ethereum),
      account: "",
      qdt_balance: 0,
      staking_balance: 0,
      interest: 0,
      abi_qdt: ABI_QDT,
      abi_staking: ABI_STAKING,
      qdt_contract: {},
      staking_contract: {},
      staking: {},
      decimals: 1000000000000000000,
      qdt_address: "0x9adc7710e9d1b29d8a78c04d52d32532297c2ef3",
      staking_address: "0xEC979680B5E8D8c1E541fAbDb32e2A07c1C83a06",
    };
  },
  mounted() {
    const app = this;
    app.connect();
  },
  methods: {
    async connect() {
      const app = this;
      window.ethereum.enable();
      let accounts = await app.web3.eth.getAccounts();
      app.account = accounts[0];
      app.getinfo();
    },
    async getinfo() {
      const app = this;
      // Init contracts
      app.qdt_contract = await new this.web3.eth.Contract(
        app.abi_qdt,
        app.qdt_address
      );
      app.staking_contract = await new this.web3.eth.Contract(
        app.abi_staking,
        app.staking_address
      );

      // Getting balance from QDT Contract
      app.qdt_balance = await app.qdt_contract.methods
        .balanceOf(app.account)
        .call();
      app.qdt_balance = app.qdt_balance / app.decimals;

      // Getting staking info from Staking Contract
      app.staking = await app.staking_contract.methods
        .StakeHolders(app.account)
        .call();
      // Getting interest from Staking Contract
      if (app.staking.stake > 0) {
        app.interest = await app.staking_contract.methods.getInterest().call();
        app.interest = app.interest / app.decimals;
      }
    },
    async stake() {
      const app = this;
      if (app.toStake > 10000) {
        let toStake = app.toStake * app.decimals;
        try {
          let staked = await app.staking_contract.methods
            .stake(toStake)
            .send({ from: app.account });
          console.log(staked);
        } catch (e) {
          alert(e.message);
        }
      }
    },
    async withdraw() {
      const app = this;
       try {
          let withdrew = await app.staking_contract.methods
            .withdraw()
            .send({ from: app.account });
          console.log(withdrew);
        } catch (e) {
          alert(e.message);
        }
    },
  },
};
</script>
