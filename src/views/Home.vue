<template>


<div class="container-fluid px-0 pt-0" >

  <div class="container-fluid bg-map-grey first-section row-before-blue">
    <div class="container first-section">
      <div class="card card-q">
        <div v-if="account">
          <div style="text-align: left">
            <h3>
              <b>Welcome</b><br />
            <p class="staking">Your Ethereum wallet is: <b>{{ account }}</b></p>
              
            </h3>
          </div>
          <hr />
          <div class="row">
            <div class="col-12 col-md">
              <h3 class="title">QDT Balance</h3>
              <p class="staking">{{ qdt_balance }} QDT</p>
            </div>
            <div class="col-12 col-md">
              <h3 class="title">In Staking</h3>
              <p class="staking">{{ staking_qdt }} QDT</p>
            </div>
            <div class="col-12 col-md" v-if="staking.stake">
              <h3 class="title">Reward</h3>
              <p class="staking" v-if="staking.stake > 0">{{ interest }} QDT</p>
              <p class="staking" v-if="staking.stake == 0">Nothing in stake</p>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-12 col-md-6" v-if="staking_qdt === 0">
              <h3 class="title">Stake</h3>
              <b-input
                placeholder="Write the amount to stake here (min. 10000 QDT)"
                min="10000"
                type="number"
                v-model="toStake"
              ></b-input>
              <div class="text-center">
              <b-button
                v-if="toStake <= qdt_balance && !isApproving && !isStaking"
                type="fill"
                v-on:click="stake"
                >STAKE</b-button
              >
              </div>
              <div v-if="isApproving">
                <b-message type="is-warning" aria-close-label="Close message">
                  Please approve following transaction in order to stake the
                  tokens and wait until confirmed...
                </b-message>
              </div>
              <div v-if="isStaking">
                <b-message type="is-info" aria-close-label="Close message">
                  Please confirm the <b>staking transaction</b> and wait until
                  the transaction is confirmed...
                </b-message>
              </div>
              <div v-if="toStake > qdt_balance">
                <b-message type="is-danger" aria-close-label="Close message">
                  Can't stake more than your balance!
                </b-message>
              </div>
            </div>
            <div class="col-12 col-md-6" v-if="staking_qdt > 0">
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
        </div>
        <div v-if="!account" class="text-center">
          <h1 class="title">
            Connect your wallet to <b>Quadrans Staking Platform</b>
          </h1>
          <br />
          <div v-if="metamaskFound">
            <p>
              Please connect your Metamask wallet first,
              click below button to initiate connection.
            </p>
            <b-button
              type="fill"
              style="margin-top: 50px !important"
              v-on:click="connect"
              >CONNECT METAMASK</b-button
            >
            <p style="margin-top: 50px !important">
              For more information about Quadrans Staking and requrements please read the <router-link to="/about">How it works page</router-link>.
            </p>
          </div>
          <div v-if="!metamaskFound">
            <p>
              Please install Metamask first, download it for Firefox or Chromium
              based browsers.
            </p>
            <a href="https://addons.mozilla.org/it/firefox/addon/ether-metamask/" target="_blank">
              <b-button type="fill" style="margin: 50px 10px!important"
                >FIREFOX</b-button
              >
            </a>
            <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=it" target="_blank">
              <b-button type="fill" style="margin: 50px 10px!important;"
                >CHROME</b-button
              >
            </a>
            <p style="margin-top: 50px !important">
              For more information about Quadrans Staking and requrements please read the <router-link to="/about">How it works page</router-link>.
            </p>
          </div>
        </div>
      </div>
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
      metamaskFound: false,
      staking_balance: 0,
      toStake: "",
      isApproving: false,
      isStaking: false,
      isWithdrawing: false,
      isLoading: true,
      interest: 0,
      staking_qdt: 0,
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
    console.log("eth", window.ethereum);
    if (window.ethereum !== undefined && window.ethereum !== null) {
      app.metamaskFound = true;
      try {
        window.ethereum.on("connect", function () {
          app.connect();
        });
        window.ethereum.on("accountsChanged", async function () {
          let accounts = await app.web3.eth.getAccounts();
          if (accounts.length > 0) {
            app.account = accounts[0];
            app.getinfo();
            setInterval(function () {
              app.getinfo();
            }, 15000);
          } else {
            app.account = "";
          }
        });
        window.ethereum.on("chainChanged", function () {
          app.connect();
        });
      } catch (e) {
        console.log("Wallet errored.");
      }
    } else {
      app.metamaskFound = false;
    }
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
          if (accounts.length > 0) {
            app.account = accounts[0];
            app.getinfo();
            setInterval(function () {
              app.getinfo();
            }, 15000);
          }
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
        app.staking_qdt = app.web3.utils.fromWei(app.staking.stake);
        app.interest = await app.staking_contract.methods
          .getInterest()
          .call({ from: app.account });
        app.interest = app.web3.utils.fromWei(app.interest);
      }
    },
    async approve() {
      const app = this;
      if (app.qdt_balance >= app.toStake && app.toStake >= 10000) {
        let toStake = app.web3.utils.toWei(app.toStake);
        try {
          app.isApproving = true;
          await app.qdt_contract.methods
            .approve(app.staking_address, toStake)
            .send({
              from: app.account,
            });
          app.isApproving = false;
          app.stake();
        } catch (e) {
          app.isApproving = false;
          alert(e.message);
        }
      } else {
        alert("Can't stake less than 10000 QDT");
      }
    },
    async stake() {
      const app = this;
      if (app.qdt_balance >= app.toStake && app.toStake >= 10000) {
        let toStake = app.web3.utils.toWei(app.toStake);
        try {
          let allowance = await app.qdt_contract.methods
            .allowance(app.account, app.staking_address)
            .call();
          let fixed = app.web3.utils.toWei(allowance);
          if (fixed >= toStake) {
            app.isStaking = true;
            await app.staking_contract.methods
              .stake(toStake)
              .send({ from: app.account });
            app.isStaking = false;
            alert("Staking successful!");
            app.getinfo();
          } else {
            app.approve();
          }
        } catch (e) {
          app.isStaking = false;
          alert(e.message);
        }
      } else {
        alert("Can't stake less than 10000 QDT");
      }
    },
    async withdraw() {
      const app = this;
      try {
        app.isWithdrawing = true;
        let withdrew = await app.staking_contract.methods
          .withdraw()
          .send({ from: app.account });
        setTimeout(function () {
          app.getinfo();
        }, 500);
        app.isWithdrawing = false;
      } catch (e) {
        app.isWithdrawing = false;
        alert(e.message);
      }
    },
  },
};
</script>
