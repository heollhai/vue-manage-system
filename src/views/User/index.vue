<template>
  <div class="user">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
      width="392px"
    >
      <component-from inline :formLabel="operateTable" :form="operateForm">
      </component-from>
      <div slot="footer" class="user_footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="userFrom">
      <el-button type="primary" @click="addUser">+ 增加</el-button>
      <component-from inline :formLabel="formLabel" :form="searchfrom">
        <el-button type="primary" @click="search">搜索</el-button>
      </component-from>
    </div>
    <!-- 表格用户数据 -->
    <div class="user_table">
      <component-table
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        :column="column"
        @changePage="getList"
        @changSize="changSize"
      ></component-table>
    </div>
  </div>
</template>
<script>
import ComponentFrom from "@/components/componentForm";
import ComponentTable from "@/components/componentTable";
import { userGetUser } from "@/utils/api";
export default {
  components: {
    ComponentFrom,
    ComponentTable
  },
  data() {
    return {
      // 弹框标题
      operateType: "add",
      //弹框是否显示
      isShow: false,
      // 弹框里面的字段   v-model   绑定的值
      operateForm: {
        name: "",
        age: "",
        addr: "",
        birth: "",
        sex: ""
      },
      //  弹框里面的字段
      operateTable: [
        {
          model: "sex",
          label: "姓别",
          type: "select",
          options: [
            {
              label: "男",
              value: 1
            },
            {
              label: "女",
              value: 0
            }
          ]
        },
        {
          model: "birth",
          label: "出生日期",
          type: "data"
        },
        {
          model: "name",
          label: "姓名"
        },
        {
          model: "age",
          label: "年龄"
        },
        {
          model: "addr",
          label: "地址"
        }
      ],
      //表格里面的数据
      tableData: [],
      // 表格分页的一些数据
      config: {
        page: 1, // 第几页
        size: 20, // 一页显示多少
        total: 0, //总条数
        loading: false //loading   是否加载中
      },
      // 表格的操作栏
      column: {
        width: "180",
        items: [
          {
            label: "编辑",
            click: scope => {
              this.operateType = "edit";
              this.isShow = true;
              this.operateForm = scope;
            }
          },
          {
            label: "删除",
            click: scope => {
              this.$confirm(
                `将永久删除 ${scope.name} 用户, 是否继续?`,
                "提示",
                {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }
              )
                .then(() => {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消删除"
                  });
                });
            }
          }
        ]
      },
      // 表格中头部信息
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
          width: "140"
        },
        {
          prop: "age",
          label: "年龄",
          width: "140"
        },
        {
          prop: "sex",
          label: "性别",
          width: "140"
        },
        {
          prop: "birth",
          label: "出生日期"
        },
        {
          prop: "addr",
          label: "地址"
        }
      ],
      // v-modle   绑定的参数
      searchfrom: {
        keyword: "",
        switch: ""
      },
      // 表单里面的参数
      formLabel: [
        {
          model: "keyword",
          label: ""
        }
        /* 
			下面这个是多选的测试数据
		 */
        // {
        //   model: "select",
        //   label: "测试",
        //   type: "select",
        //   options: [
        //     {
        //       value: "1",
        //       label: "你好"
        //     },
        //     {
        //       value: "12",
        //       label: "你好么"
        //     }
        //   ]
        // }
        // {
        //   model: "switch",
        //   label: "",
        //   type: "switch"
        // }
      ]
    };
  },
  methods: {
    // 获取表格里面的数据
    getList() {
      return new Promise(reject => {
        console.log(1);
        this.config.loading = true;
        userGetUser(this.config.size).then(res => {
          console.log(res, "res");
          this.tableData = res.data.list.map(item => {
            item.sex === 0 ? (item.sex = "女") : (item.sex = "男");
            return item;
          });
          this.config.total = res.data.count;
          this.config.loading = false;
          reject();
        });
      });
    },
    // 每页显示的数量
    async changSize(size) {
      await this.getList();
      await this.size(size);
    },
    size(size) {
      return new Promise(reject => {
        let newData = [];
        this.tableData.map((item, index) => {
          if (index < size) {
            newData.push(item);
            return newData;
          }
        });
        this.tableData = JSON.parse(JSON.stringify(newData));
        reject();
      });
    },
    // 增加用户信息
    addUser() {
      this.operateType = "add";
      this.isShow = true;
      // 清空字段里面的参数
      for (let i in this.operateForm) {
        this.operateForm[i] = "";
      }
    },
    // 编辑用户信息
    confirm() {
      if (this.operateType === "add") {
        this.$message({
          message: "添加成功",
          type: "success"
        });
      } else if (this.operateType === "edit") {
        this.$message({
          message: "编辑成功",
          type: "success"
        });
      }
      this.isShow = false;
      this.getList();
    },
    // 搜索
    search() {
      if (this.searchfrom.keyword !== "") {
        this.tableData = this.tableData.filter(item => {
          return (
            JSON.stringify(item.age).indexOf(this.searchfrom.keyword) !== -1
          );
        });
      } else {
        this.getList();
      }
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="scss" scoped="scoped">
@import "./scss/index";
</style>
