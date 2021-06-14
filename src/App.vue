<template>
  <div id="app">
    <b-navbar>
      <template #brand>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
              <img
                  src="https://quadrans.io/assets/brand/logo_quadrans_color.svg"
                  alt="Quadrans Foundation"
                  width="235"
              >
          </b-navbar-item>
      </template>
      <template #end>
          <b-navbar-item href="/">
              Home
          </b-navbar-item>
          <b-navbar-item tag="router-link" to="/about">
              How it works
          </b-navbar-item>
          <b-navbar-dropdown label="Network">
              <b-navbar-item href="https://quadrans.io">
                  Website
              </b-navbar-item>
              <b-navbar-item href="https://status.quadrans.io">
                  Status
              </b-navbar-item>
              <b-navbar-item href="https://explorer.quadrans.io">
                  Explorer
              </b-navbar-item>
              <b-navbar-item href="https://docs.quadrans.io">
                  Documentation
              </b-navbar-item>
          </b-navbar-dropdown>
      </template>
    </b-navbar>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Montserrat', sans-serif !important;
  text-align: center;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.navbar {
  -webkit-box-shadow: 0 8px 12px -6px #999;
  -moz-box-shadow: 0 8px 12px -6px #999;
  box-shadow: 0 8px 12px -6px #999;
  height: 90px;
}
.navbar-item img {
  max-width: 50vw !important; 
  max-height: 65px !important;
}

body {
  background-color: #f4f5f7!important;
}
html, body, h1, h2, h3, h4, h5, h6, button, input, optgroup, select, textarea {
  font-family: 'Montserrat', sans-serif !important;
}
/* TYPO STYLE START*/

p {
  font-size: 0.9rem !important;
  line-height: 1.9rem !important;
  color: #16173D !important;
  font-weight: 400;
}

p.staking {
  font-size: 1.1rem !important;
  line-height: 1.9rem !important;
  color: #16173D !important;
  font-weight: 400;
}

b, .bold {
  font-weight: 700;
}

.nota {
  font-style: italic;
  font-size: 0.8rem !important;
  line-height: 1.3rem;
  font-weight: 300;
}

a {
  font-weight: 500;
  text-decoration: none;
  color: inherit;
}

.navbar-dropdown {
  top: auto;
  color: #262951;
  background-color: #f4f5f7 !important;
  border-top: 0 !important;
  border-radius: 10px;
  -webkit-box-shadow: 0px 20px 30px 0px rgb(103 25 224 / 20%);
  -moz-box-shadow: 0px 20px 30px 0px rgba(103,25,224,0.2);
  box-shadow: 0px 20px 30px 0px rgb(103 25 224 / 20%);
  right: 0 !important;
  left: auto !important;
  top: 80% !important;
}
.navbar-burger {
    width: 4.25rem !important;
    height: auto !important;
}

a.nobold {
  font-weight: 400;
  text-decoration: none;
  color: inherit;
}

a:hover {
  color:inherit !important;
  text-decoration: none;
}

i.fab {
  font-weight: 400 !important;
  font-size: larger;
  
}

h1,h2,h3,h4,h5{
  font-weight: 300 !important;
}

/*
h1,h2,h3,h4{
width: 70%;}
*/


h1{
  font-size: 1.9rem !important;
  line-height: 2.8rem !important;
  color: #16173D !important;
}

h2{
  font-size: 1.7rem !important;
  line-height: 2.6rem !important;
  color: #16173D !important;
}

h3{
  font-size: 1.5rem !important;
  line-height: 2.4rem !important;
  color: #16173D !important;
}

h4{
  font-size: 1.3rem !important;
  line-height: 2.2rem !important;
  color: #16173D !important;
}

h5{
  font-size: 0.8rem !important;
  line-height: 1.8rem !important;
  color: #6719E0 !important;
  text-transform: uppercase;
}
.title {
  font-weight: 600 !important;
  margin-top: 1.5rem;
  margin-bottom: 0 !important;
}
.text-truncate {
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
}
#footerMiddle {
    background-color: #262951;
    padding-top: 1.5rem!important;
}
#footerBottom {
    background-color: #16173D;
    border-top: 66px #6719e0;
    border: 4px #6719e0;
}
.circle-violet {
    width: 40px;
    height: 40px;
    border-radius: 100% !important;
    background-color: rgba(103,25,224,1);
    padding: 10px;
    display: inline-block;
    margin: 10px;
    color: #ffffff !important;
}
.circle-violet i.fab {
  color: #ffffff !important;
}

.circle-violet:hover{
  background-color: rgba(103,25,224,0.8);
  cursor: pointer;
}
.inline-block {
    display: inline-block;
}
#blueRowMap {
  background-image: url(https://quadrans.io/assets/img/oblique_top.png), url(https://quadrans.io/assets/img/oblique_bottom.png),linear-gradient(to bottom, #16173d, #1b1a4a, #211c58, #291e65, #321f72, #38207b, #3f2084, #46208d, #4b2195, #4f229c, #5422a4, #5923ac);
  background-repeat: no-repeat;
  background-position: top, bottom center, bottom;
  margin-top: 30px;
  padding: 50px 12% 12px 12%;
  min-height: calc(100vh - 270px);
}
.box {
  padding: 40px !important;
  margin-bottom: 40px !important;
  border-radius: 10px !important;
  display: block !important;
  -webkit-box-shadow: 0px 20px 30px 0px rgb(103 25 224 / 20%) !important;
  -moz-box-shadow: 0px 20px 30px 0px rgba(103,25,224,0.2) !important;
  box-shadow: 0px 20px 30px 0px rgb(103 25 224 / 20%) !important;
  border: none !important;
  transition: 1s !important;
}
.message {
  margin-top: 20px !important;
}
button, input.button{
  padding: 15px 20px !important;
  border: 2px solid !important;
  border-radius: 50px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  font-size: 0.9rem !important;
  height: auto !important;
}
button:hover, input.button:hover{
  transition: 0.4s !important;
  cursor: pointer;
}
button.fill{
  border:2px solid #13FAC8;
  color:#16173D;
  background-color: #13FAC8;
}
button.fill:hover{
  background-color: rgba(255,255,255,0.4);
  border: 2px solid #16173D;
}
</style>
