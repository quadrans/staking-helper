<template>
  <div class="container">
    <div class="box">
      <div v-if="account">
        <div style="text-align: left">
          Welcome back:<br />
          {{ account }}
        </div>
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
              placeholder="Write the amount to stake here (min. 10000 QDT)"
              rounded
              min="10000"
              type="number"
              v-model="toStake"
            ></b-input
            ><br />
            <b-button v-if="toStake <= qdt_balance" type="is-primary" v-on:click="stake">STAKE</b-button>
            <div style="color:#f00" v-if="toStake > qdt_balance">Can't stake more than your balance!</div>
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
      toStake: "",
      interest: 0,
      abi_qdt: ABI_QDT,
      abi_staking: ABI_STAKING,
      qdt_contract: {},
      staking_contract: {},
      staking: {},
      qdt_address: "",
      staking_address: "",
    };
  },
  mounted() {
    const app = this;
    if (typeof window.ethereum !== "undefined") {
      try {
        window.ethereum.on("connect", function () {
          app.connect();
        });
        window.ethereum.on("disconnect", function () {
          app.connect();
        });
        window.ethereum.on("accountsChanged", function () {
          app.connect();
        });
        window.ethereum.on("chainChanged", function () {
          app.connect();
        });
      } catch (e) {
        console.log("Wallet errored.");
      }
    }
    app.connect();
  },
  methods: {
    async connect() {
      const app = this;
      if (typeof window.ethereum !== "undefined") {
        try {
          window.ethereum.enable();
          let network = await app.web3.eth.net.getNetworkType();
          if (network === "ropsten") {
            app.qdt_address = process.env.VUE_APP_ROPSTEN_QDT_CONTRACT;
            app.staking_address = process.env.VUE_APP_ROPSTEN_STAKING_CONTRACT;
          } else {
            app.qdt_address = process.env.VUE_APP_MAINNET_QDT_CONTRACT;
            app.staking_address = process.env.VUE_APP_MAINNET_STAKING_CONTRACT;
          }
          let accounts = await app.web3.eth.getAccounts();
          app.account = accounts[0];
          app.getinfo();
        } catch (e) {
          console.log(e.message);
        }
      }
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
      app.qdt_balance = app.web3.utils.fromWei(app.qdt_balance);

      // Getting staking info from Staking Contract
      app.staking = await app.staking_contract.methods
        .StakeHolders(app.account)
        .call();
      // Getting interest from Staking Contract
      if (app.staking.stake > 0) {
        app.interest = await app.staking_contract.methods.getInterest().call();
        app.interest = app.web3.utils.fromWei(app.interest);
      }
    },
    async stake() {
      const app = this;
      if (app.qdt_balance >= app.toStake && app.toStake >= 10000) {
        let toStake = app.web3.utils.toWei(app.toStake);
        try {
          let staked = await app.staking_contract.methods
            .stake(toStake)
            .send({ from: app.account });
          console.log(staked);
        } catch (e) {
          alert(e.message);
        }
      } else {
        alert("Can't stake less than 10000 QDT");
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
