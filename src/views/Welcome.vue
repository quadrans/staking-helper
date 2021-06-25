<template>
  <div id="blueRowMap">
    <div class="container">
      <div class="box" style="text-align: left; ">
        <h3 class="title">Quadrans Staking</h3>
        <h4 class="staking">Staking is a process that allows Quadrans Token holders to receive a reward for their loyalty.</h4>
          <div class="columns mt-3 is-vcentered">
            <div class="column has-text-centered-mobile has-text-right-desktop">
              <img src="/img/started.png" style="max-width: 300px; width: 100%;">
            </div>
            <div class="column">
              <h3>Getting <b>started</b></h3>
              <h4 class="staking">Getting started is very easy! Click on the button and follow the wizard to transfer the QDTs from your wallet to the Staking Contract.</h4>
            </div>
          </div>
          <div class="columns mt-3 is-vcentered">
            <div class="column is-hidden-desktop has-text-centered-mobile">
              <img src="/img/reward.png" style="max-width: 300px; width: 100%;">
            </div>
            <div class="column has-text-right-desktop">
              <h3>Earing <b>Reward</b></h3>
              <h4 class="staking">Participate in staking to receive a 14% annual reward based on the duration of your staking. The more time you participate, the more Quadrans Token you will be awarded at the end.</h4>
            </div>
            <div class="column is-hidden-touch has-text-left-desktop">
              <img src="/img/reward.png" style="max-width: 300px; width: 100%;">
            </div>
          </div>
          <div class="columns mt-3 is-vcentered is-hidden-desktop">
            <div class="column has-text-centered-mobile has-text-right-desktop">
              <img src="/img/exiting.png" style="max-width: 300px; width: 100%;">
            </div>
            <div class="column">
              <h3>Fair <b>Exiting</b></h3>
              <h4 class="staking">Quadrans does not place limits or obligations on participation. At any time you can add and remove the QDT in staking to request the reward earned up to that moment.</h4>
            </div>
          </div>
          <div style="text-align: center;" class="is-hidden-desktop">
            <b-button
              type="fill"
              style="margin-top: 50px !important"
              tag="router-link" to="/staking" 
              >STAKING NOW</b-button
            >
          </div>
          <div class="columns mt-3 is-vcentered is-hidden-touch ">
            <div class="column has-text-centered">
              <h3>Fair <b>Exiting</b></h3>
              <h4 class="staking">Quadrans does not place limits or obligations on participation.<br>At any time you can add and remove the QDT in staking to request the reward earned up to that moment.</h4>
            </div>
          </div>
          <div class="columns mt-3 is-hidden-touch ">
            <div class="column has-text-centered-mobile has-text-right-desktop">
              <img src="/img/exiting_left.png" style="max-width: 300px; width: 100%;">
            </div>
            <div class="column has-text-centered" style="max-width: 155px; padding: 0px;">
              <b-button
                type="violet"
                style="margin-top: 50px !important"
                tag="router-link" to="/staking" 
                >STAKING NOW</b-button
              >
            </div>
            <div class="column has-text-centered-mobile has-text-left-desktop">
              <img src="/img/exiting_right.png" style="max-width: 300px; width: 100%;">
            </div>
          </div>
          <div style="text-align: center;">
          </div>
      </div>
    </div>
  </div>
</template>
