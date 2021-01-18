<!-- 
	inline: Boolean,   		表单是否为行内样式
	form: Object,			表单里面的字段   v-model   绑定的值
	formLabel: Array 		表单里面的参数
 
 -->

<template>
  <el-form
    ref="form"
    :inline="inline"
    :label-width="config !== undefined ? config.width : '100px'"
  >
    <el-form-item
      v-for="item in formLabel"
      :label="item.label"
      :key="item.model"
    >
      <!-- .substring(0, item.label.length - 1) -->
      <el-input
        v-model="form[item.model]"
        :placeholder="
          '请输入' +
            (item.label.indexOf(':') == -1
              ? item.label
              : item.label.substring(0, item.label.length - 1))
        "
        v-if="!item.type"
      ></el-input>
      <el-input
        type="password"
        v-model="form[item.model]"
        :placeholder="
          '请输入' +
            (item.label.indexOf(':') == -1
              ? item.label
              : item.label.substring(0, item.label.length - 1))
        "
        v-if="item.type === 'password'"
      ></el-input>
      <el-select
        v-if="item.type === 'select'"
        v-model="form[item.model]"
        :placeholder="'请输入' + item.label"
      >
        <el-option
          v-for="item in item.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-switch
        v-model="form[item.model]"
        v-if="item.type === 'switch'"
      ></el-switch>
      <el-date-picker
        v-if="item.type === 'data'"
        v-model="form[item.model]"
        type="date"
        :placeholder="'请输入' + item.label"
      >
      </el-date-picker>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
export default {
  props: {
    inline: Boolean,
    form: Object,
    config: Object,
    formLabel: Array
  }
};
</script>

<style></style>
