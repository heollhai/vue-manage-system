<template>
  <div class="common-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      height="100%"
      stripe
      v-loading="config.loading"
    >
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            (config.page - 1) * config.size + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <!-- 操作栏 -->
      <el-table-column
        align="center"
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        :width="column.width"
      >
        <template slot-scope="scope">
          <el-button
            v-for="btn in column.items"
            size="mini"
            :key="btn.label"
            @click.native.prevent="btn.click(scope.row, scope.$index)"
            >{{ btn.label }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="changePage"
      @size-change="changSize"
      :total="config.total"
      :current-page.sync="config.page"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="config.size"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Array,
    column: Object,
    config: Object
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
    changSize(size) {
      this.$emit("changSize", size);
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
.common-table {
  height: 100%;
}
.el-pagination {
  padding: 10px 5px;
}
</style>
