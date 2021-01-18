import Mock from "mockjs";
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body);
    console.log(JSON.parse(config.body));
    // 先判断用户是否存在
    if (username === "admin" || username === "wp") {
      // 判断账号和密码是否对应
      if (username === "admin" && password === "123456") {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: "/home",
                name: "home",
                label: "首页",
                icon: "iconfont icon-shouye icon",
                url: "Home"
              },
              {
                path: "/VideoManage",
                name: "VideoManage",
                label: "视频管理页",
                icon: "iconfont icon-BAI-shiping icon",
                url: "VideoManage"
              },
              {
                path: "/User",
                name: "User",
                label: "用户管理页",
                icon: "iconfont icon-yonghu icon",
                url: "User"
              },
              {
                label: "其他",
                icon: "iconfont icon-qita icon",
                children: [
                  {
                    path: "/pageOne",
                    name: "pageOne",
                    label: "页面1",
                    icon: "iconfont icon-yemian icon",
                    url: "Other/pageOne"
                  },
                  {
                    path: "/pageTwo",
                    name: "pageTwo",
                    label: "页面2",
                    icon: "iconfont icon-yemian1 icon",
                    url: "Other/pageTwo"
                  }
                ]
              }
            ],
            token: Mock.Random.guid(),
            message: "获取成功"
          }
        };
      } else if (username === "wp" && password === "123456") {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: "/home",
                name: "home",
                label: "首页",
                icon: "iconfont icon-shouye icon",
                url: "Home"
              },
              {
                path: "/VideoManage",
                name: "VideoManage",
                label: "视频管理页",
                icon: "iconfont icon-BAI-shiping icon",
                url: "VideoManage"
              }
            ],
            token: Mock.Random.guid(),
            message: "获取成功"
          }
        };
      } else {
        return {
          code: -999,
          data: {
            message: "密码错误"
          }
        };
      }
    } else {
      return {
        code: -999,
        data: {
          message: "用户不存在"
        }
      };
    }
  }
};
