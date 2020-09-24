import http from "../plugins/http";

const demo = {
  GET_DEMO() {
    return http.get("/v1/bpi/currentprice.json");
  }
};

export default demo;
