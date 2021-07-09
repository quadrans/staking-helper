<template>


<div class="container-fluid px-0 pt-0" >

    <div v-if="!account">
      <div class="container-fluid bg-map-grey first-section row-before-blue">
        <div class="row justify-content-center first-section">
          <div class="col-12 col-md-6 text-center">
            <h1>Stake <b>Quadrans Token</b></h1>
            <p>Stake is a process that allows Quadrans Token holders to <b>receive a reward for ther loyalty.</b></p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col text-center d-flex justify-content-end">
            <div class="mr-3">
              <h1 class="violet count mb-0"><b>14%</b></h1>
              <p class="mb-0 font-italic"><b>APY</b></p>
              <p>you can earn</p>
            </div>
          </div>
          <div class="col text-center d-flex justify-content-start">
            <div class="ml-3">
              <h1 class="violet count mb-0"><b>10k</b></h1>
              <p class="mb-0 font-italic"><b>QDT minimum</b></p>
              <p>to join the staking</p>
            </div>
          </div>
        </div>
      </div>
   
      <div class="container-fluid bg-blue-before p-0"><img class="img-fluid" src="/img/oblique_top.png"></div>
      <div class="bg-blue container-fluid">
        <div class="row top-negative-150">
          <div class="col text-center">
            <a href="#" v-scroll-to="'#stakenow'" aria-current="page" class="button router-link-exact-active router-link-active violet" type="button">
              <span>STAKE NOW</span>
            </a>
          </div>
        </div>   
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12 col-lg-6 my-auto pr-xl-5 text-left order-2 order-lg-1">
                <h1 class="white">Getting <b>Started</b></h1>
                <div style="border-left: 8px solid #13fac8; padding-left: 15px;">
                  <h5 class="white font-weight-bold" style="text-transform:none;">Getting started is very easy!</h5>
                  <p class="white mb-0">Click on the button and follow the wizard to transfer the QDTs from your wallet to the Staking Contract.</p>
                </div>
              </div>
              <div class="col-12 col-lg-6 justify-content-center order-1 order-lg-2 d-flex">
                <img class="img-fluid py-3" src="/img/started.png" style="max-height: 300px;">
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center d-none d-lg-flex">
          <div class="col-3">
            <img class="img-fluid py-3" src="/img/arrow.png" style="max-height: 300px;">
          </div>
        </div>
        <div class="row">
          <div class="col-12">
              <div class="row">
                <div class="col-12 col-lg-6 justify-content-center d-flex">
                  <img class="img-fluid py-3" src="/img/reward.png" style="max-height: 300px;">
                </div>
                <div class="col-12 col-lg-6 my-auto pr-xl-5 text-lg-right text-left">
                  <h1 class="white">Earning <b>Reward</b></h1>
                  <div class="d-none" style="border-right: 8px solid #13fac8; padding-right: 15px;">
                    <h5 class="white font-weight-bold" style="text-transform:none;">Participate in staking to receive a 14% annual reward based on the duration of your staking.</h5>
                    <p class="white mb-0">The more time you participate, the more Quadrans Token you will be awarded at the end.</p>
                  </div> 
                  <div class="d-lg-block" style="border-left: 8px solid #13fac8; padding-left: 15px;">
                    <h5 class="white font-weight-bold" style="text-transform:none;">Participate in staking to receive a 14% annual reward based on the duration of your staking.</h5>
                    <p class="white mb-0">The more time you participate, the more Quadrans Token you will be awarded at the end.</p>
                  </div> 
                </div>
              </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
              <div class="row">
                <div class="col-12 col-lg-6 my-auto pr-xl-5 text-left order-2 order-lg-1">
                  <h1 class="white">Fair <b>Exiting</b></h1>
                  <div style="border-left: 8px solid #13fac8;padding-left: 15px;">
                    <h5 class="white font-weight-bold" style="text-transform:none;">Quadrans does not place limits or obligationson participation.</h5>
                    <p class="white mb-0">At any time you can add and remove the QDT in staking to request the reward earned up to that moment.</p>
                  </div>
                </div>
                <div class="col-12 col-lg-6 justify-content-center d-flex order-1 order-lg-2">
                  <img class="img-fluid py-3" src="/img/exiting.png" style="max-height: 300px;">
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="container-fluid bg-blue-after p-0"><img class="img-fluid" src="/img/oblique_bottom.png"></div>
      <div class="container-fluid row-after-blue" id="stakenow">
        <div class="row justify-content-center">
          <div class="col text-center">
            <h2>Connect your wallet to <br /><b>Quadrans Staking Platform</b></h2>
              <div v-if="metamaskFound">
                <p style="margin-top: 20px !important">
                  Please connect your Metamask wallet first,
                  click below button to initiate connection.
                </p>
                <b-button
                  type="violet"
                  style="margin-top: 20px !important"
                  v-on:click="connect"
                  >CONNECT METAMASK</b-button
                >
                <p style="margin-top: 20px !important">
                  For more information about Quadrans Staking and requrements please read the <router-link to="/about">How it works page</router-link>.
                </p>
              </div>
              <div v-if="!metamaskFound">
                <p style="margin-top: 20px !important">
                  Please install Metamask first, download it for Firefox or Chromium
                  based browsers.
                </p>
                <a href="https://addons.mozilla.org/it/firefox/addon/ether-metamask/" target="_blank">
                  <b-button type="fill" style="margin: 20px 10px!important"
                    >FIREFOX</b-button
                  >
                </a>
                <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=it" target="_blank">
                  <b-button type="fill" style="margin: 20px 10px!important;"
                    >CHROME</b-button
                  >
                </a>
                <p style="margin-top: 20px !important">
                  For more information about Quadrans Staking and requrements please read the <router-link to="/about">How it works page</router-link>.
                </p>
              </div>
          </div>
        </div>
      </div>
    </div>


    <div class="container-fluid bg-map-grey first-section row-before-blue" v-if="account">
      <div class="first-section">
        <div class="card card-q">
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
