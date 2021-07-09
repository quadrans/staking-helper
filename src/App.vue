<template>
  <div id="app">

<div id="navigation">
    <nav class="navbar navbar-light navbar-expand-lg py-0 fixed-top">
      <a class="navbar-brand" href="/">
        <div id="logo">
          <img src="https://quadrans.io/assets/brand/logo_quadrans_color.svg" alt="Quadrans Foundation" class="logo">
        </div>
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- START NAVBAR LINKS -->
      
      <div class="collapse navbar-collapse mt-auto" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto ml-lg-3 mt-auto mr-auto">
            <li class="nav-item text-center">
            <router-link to="/" class="nav-link" >Home<div></div></router-link>
          </li>
          <li class="nav-item text-center">
            <router-link to="/about" class="nav-link" >How it works<div></div></router-link>
          </li>
        </ul>
      </div>

     
      <!-- END NAVBAR LINKS -->
    </nav>
</div>
      <router-view/>
  </div>
</template>

<style>
input.input {
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin: 0;
}

hr {
  height: 1px !important;
}

.title {
  font-weight: 600 !important;
  margin-top: 1.5rem;
  margin-bottom: 0 !important;
}

.button.fill, button.fill{
  padding: 15px 20px !important;
  border: 2px solid !important;
  border-radius: 50px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  font-size: 0.9rem !important;
  height: auto !important;
  border:2px solid #13FAC8 !important;
  color:#16173D;
  background-color: #13FAC8;
}
.button.fill:hover, button.fill:hover{
  transition: 0.4s !important;
  cursor: pointer;
  background-color: rgba(255,255,255,0.4);
  border: 2px solid #16173D !important;
}

.button.violet{
  padding: 15px 20px !important;
  border: 2px solid !important;
  border-radius: 50px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  font-size: 0.9rem !important;
  height: auto !important;
  border:2px solid rgba(103,25,224,1) !important;
  color:#FFFFFF !important;
  background-color: rgba(103,25,224,1);
}

.button.violet:hover{
  border:2px solid rgba(103,25,224,1) !important;
  transition: 0.4s !important;
  cursor: pointer;
  color:rgba(103,25,224,1) !important;
  background-color: #FFFFFF;
}

.bg-map-grey{ 
  background-image: url(/img/map.png);
  background-repeat: no-repeat;
  background-position: center;
}

.first-section{
  padding-top:80px;
}
.row-before-blue{
  padding-bottom:80px;
}
.bg-blue{
    background-image:  linear-gradient(to bottom, #16173d, #1b1a4a, #211c58, #291e65, #321f72, #38207b, #3f2084, #46208d, #4b2195, #4f229c, #5422a4, #5923ac);
    background-repeat: no-repeat;
    background-position: top, bottom center, bottom;
    padding-top: 80px;
    padding-bottom: 40px;
}
.bg-blue-after{
  margin-top: -7px;
}
.bg-blue-before{
  margin-bottom: -7px;
  margin-top: -60px;
}
.row-after-blue{
  padding-top:80px;
}

.bg-blue-2{
  background-image: url(/img/oblique_bottom.png);
  background-repeat: no-repeat;
  width: 100vw;
  background-size:contain;
  height: 84px;
}
.logo-footer{
  max-height:65px;
}
.card-q-topspecial{margin-top:100px;}
.top-negative-150{margin-top: -150px;}
.top-negative-190{margin-top: -190px;}

.list-style{list-style:disc;margin-left: 17px;}

.card-link{background-color:#6719E01A; padding:20px 30px; border-radius:15px;height:100px;flex-direction: column;}

@media (min-width: 600px) {
  .bg-blue-after{
  margin-top: -3px;
}
.bg-blue-before{
  margin-bottom: -2px;
  margin-top: -60px;
}
}
@media (min-width: 900px) {
  .bg-blue-after{
  margin-top: -3px;
}
.bg-blue-before{
  margin-bottom: -2px;
  margin-top: -60px;
}
}
@media (min-width: 1000px) {
  .bg-blue-after{
  margin-top: -1px;
}
.bg-blue-before{
  margin-bottom: -1px;
  margin-top: -60px;
}
}


</style>
