<!-- 
	inline			表单是是不是行内样式
	config			宽度  可以不填
		传值方式:config: {
					width: "80px"
				  },
	rules				表单的验证规则		
		传值方式:
		rules: {
		  username: [
		    { required: true, message: "请输入账号", trigger: "blur" },
		    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
		  ],
		  password: [		
		    { required: true, message: "请输入密码", trigger: "blur" },
		    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
		  ]
		}
    form				表单的 v-model  需要绑定的值
		传值方式:
		loginFrom: {			必须要有		有多少字段有多少个值
		  username: "",			
		  password: ""
		},
	formLabel	
		传值方式:
			formLabel: [
			  {
			    label: "账号 :",					可以没有		
			    model: "username",		主要用于		必须有		使用 form[item.model]	绑定值   必须有
			    rules: "password"		验证		可以没有	
			  },
			  {
			    label: "密码 :",
			    model: "password",
			    rules: "password",
			    type: "password"
			  }
			],
	
 -->
<template>
  <el-form
    ref="form"
    :inline="inline"
    :label-width="config !== undefined ? config.width : '100px'"
    :rules="rules"
    :model="form"
  >
    <el-form-item
      v-for="item in formLabel"
      :label="item.label"
      :key="item.model"
      :prop="item.rules"
    >
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
    formLabel: Array,
    rules: Object
  },
  data() {
    return {
      modelValue: {}
    };
  },
  methods: {
    getModel() {
      this.$emit("getModel", this.form);
    }
  }
};
</script>

<style></style>
