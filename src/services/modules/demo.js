import http from "@/plugins/http";
export const getData = () => http.get("/v1/bpi/currentprice.json");
