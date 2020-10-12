import http from "../plugins/http";

export function GET_DEMO() {
  return http.get("/v1/bpi/currentprice.json");
}
