import require from "./config.js";

export function getHomeDate(a) {
  return require({
    url: "/home/getData",
    method: "get",
    params: {
      a
    }
  });
}
export function userGetUser(limt) {
  return require({
    url: "/user/getUser",
    method: "get",
    params: {
      limt
    }
  });
}
export function getMenu(login) {
  return require({
    url: "/permission/getMenu",
    method: "post",
    data: {
      username: login.username,
      password: login.password
    }
  });
}
