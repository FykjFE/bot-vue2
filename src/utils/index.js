const baseUrl = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return "/api";
    case "test":
      return "http://baidu.com";
    default:
      return "http://baidu.com";
  }
};
export default baseUrl();
