import axios from 'axios';

const BASE_URL = "http://127.0.0.1:8000"

const GETGLOBALSTATISTICS_PATH = "/v1/statistics/global/"
const GETSHARES_PATH = "/v1/statistics/shares/"
const GETTOPSTAKERS_PATH = "/v1/statistics/top-stakers/"
const GETMONTHLYACTIVITY_PATH = "/v1/statistics/monthly-activity/"
const GETMONTHLYPOOLSIZE_PATH = "/v1/statistics/monthly-pool-size/"
const GETSTAKERACTIVITY_PATH = "/v1/statistics/staker/activity"
const GETSTAKERMONTHLYACTIVITY_PATH = "/v1/statistics/staker/monthly-activity"
const GETSTAKERTOTALCOLLECTED_PATH ="/v1/statistics/staker/total-collected"
const ax = axios.create();

let StatisticsAPI = {
  async getGlobalStatistics() {
    const response = await ax.get(BASE_URL+GETGLOBALSTATISTICS_PATH)
    return response.data;
  },
  async getShares() {
    const response = await ax.get(BASE_URL+GETSHARES_PATH)
    return response.data;
  },
  async getTopStakers() {
    const response = await ax.get(BASE_URL+GETTOPSTAKERS_PATH)
    return response.data;
  },
  async getMonthlyActivity() {
    const response = await ax.get(BASE_URL+GETMONTHLYACTIVITY_PATH)
    return response.data;
  },
  async getMonthlyPoolSize() {
    const response = await ax.get(BASE_URL+GETMONTHLYPOOLSIZE_PATH)
    return response.data;
  },
  async getStakerActivity(address) {
    const response = await ax.get(BASE_URL+GETSTAKERACTIVITY_PATH,{params: {
      address: address
    }});
    return response.data;
  },
  async getStakerMonthlyActivity(address) {
    const response = await ax.get(BASE_URL+GETSTAKERMONTHLYACTIVITY_PATH,{params: {
      address: address
    }});
    return response.data;
  },
  async getStakerTotalCollected(address) {
    const response = await ax.get(BASE_URL+GETSTAKERTOTALCOLLECTED_PATH,{params: {
      address: address
    }});
    return response.data;
  },
}

export default StatisticsAPI;
