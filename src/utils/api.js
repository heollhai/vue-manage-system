import require from "./config.js";

export function getHomeDate() {
  return require({
    url: "/home/getData",
    method: "get"
  });
}
