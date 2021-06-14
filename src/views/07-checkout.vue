<template>
  <div class="w">
    <div class="top">
      <h3>收货信息</h3>
    </div>
    <el-card class="box-card" shadow="always" width="100%">
      <div class="address">
        <ul>
          <li
            v-for="(item, i) in addressList"
            :key="item.id"
            :class="{ active: receiveIndex === i }"
            @click="receive(item, i)"
          >
            <p>收货人:{{ item.name }}</p>
            <p>手机号:{{ item.phone }}</p>
            <p>地&nbsp;&nbsp;&nbsp;址:{{ item.address }}</p>
            <div class="bottom">
              <span @click="editAddress(item)">修改</span>
              <span @click="delAddress(item)">删除</span>
            </div>
          </li>
          <li class="add-address" @click="addAddress()">
            <i class="el-icon-circle-plus"></i>
            <p>添加新地址</p>
          </li>
        </ul>
      </div>
    </el-card>
    <div class="top">
      <h3>购物清单</h3>
    </div>
    <el-table style="width: 100%" border :data="checkoutList">
      <el-table-column prop="date" label="图片" width="180" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="480" align="center">
      </el-table-column>
      <el-table-column prop="price" label="单价" width="100" align="center">
      </el-table-column>
      <el-table-column prop="num" label="数量" width="250" align="center">
      </el-table-column>
      <el-table-column prop="" label="总计" max-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.price * scope.row.num }}
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 100%; height: 60px; line-height: 60px; background: #fff">
      <div style="float: right">
        &nbsp; &nbsp; &nbsp;
        <span
          >一共 &nbsp;<b style="color: red">{{ prices }}</b
          >&nbsp;元</span
        >
        <el-button style="margin: 5px" type="primary" @click="submit()"
          ><a href="#/checkout">提交订单</a></el-button
        >
      </div>
    </div>
    <!-- 添加地址的弹框 -->

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      @close="closeAdd"
    >
      <!-- <span>这是一段信息</span> -->
      <!-- 添加信息的表单 -->
      <el-form
        :model="addData"
        :rules="addRules"
        ref="addData"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="收货人" prop="name">
          <el-input v-model="addData.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addData.phone" type="munber"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="addData.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改地址的弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="editDialog"
      width="30%"
      @close="closeAdd"
    >
      <!-- <span>这是一段信息</span> -->
      <!-- 添加信息的表单 -->
      <el-form
        :model="addData"
        :rules="addRules"
        ref="editData"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="收货人" prop="name">
          <el-input v-model="addData.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addData.phone" type="munber"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="addData.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      // 选择的地址
      receiveIndex: 0,
      receiveList: [],
      // 默认的地址
      addressList: [
        {
          id: 1,
          name: '张三',
          phone: '13411234555',
          address: '广东省惠州市惠城区小金口街道'
        },
        {
          id: 2,
          name: '李四',
          phone: '15876752025',
          address: '广东省惠州市惠城区小金口街道'
        }
      ],
      // 商品的列表
      checkoutList: [],
      // 添加弹框
      dialogVisible: false,
      // 修改
      editDialog: false,
      // 总价格
      prices: 0,
      // 添加地址的数据
      addData: {
        name: '',
        phone: '',
        address: ''
      },
      // 添加的规则
      addRules: {
        name: [{ required: true, message: '请输入收货人', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在 11个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入收货地址', trigger: 'blur' },
          { min: 5, max: 40, message: '长度最低在 5个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.showNav(false)
    this.checkoutList = this.submitList
    this.prices = this.checkoutList[0].prices
  },
  methods: {
    ...mapMutations(['showNav', 'delCart', 'commit']),
    // 选择地址的时候
    receive (data, i) {
      // console.log(data);
      this.receiveIndex = i
      // console.log(data);
      this.receiveList = data
    },
    // 点击添加地址的时候
    addAddress () {
      // 如果地址超过3个不然添加了
      if (this.addressList.length === 3) {
        this.$message.error('已经超过添加的数量')
      } else {
        this.dialogVisible = true
      }
    },
    // 关闭添加的弹框
    closeAdd () {
      this.addData = {} // 清空表单的数据
    },
    // 确定添加的事件
    confirmAdd () {
      if (
        this.addData.name === '' ||
        this.addData.phone === '' ||
        this.addData.address === ''
      ) {
        this.$message.error('请输入内容')
      } else {
        // 如果添加的地址不为空的话就给他push到地址上去
        this.addressList.push(this.addData)
        this.dialogVisible = false
        this.$message.success('添加成功')
      }
    },
    // 点击修改
    editAddress (data) {
      console.log(data)
      // this.dialogVisible = true
      this.editDialog = true
      this.addData = data
    },
    // 点击删除地址
    delAddress (data) {
      // 如果剩下最后一个不能删除
      if (this.addressList.length < 2) {
        this.$message.error('不能删除了')
      } else {
        // 点击删除的id和地址里面的匹配就删除
        this.addressList.forEach((item) => {
          if (item.id === data.id) {
            this.addressList.splice(0, 1)
          }
        })
        this.$message.success('删除成功')
      }
    },
    // 确定修改
    editConfirm () {
      this.editDialog = false
      this.$message.success('修改成功')
    },
    // 提交订单
    submit () {
      // console.log(this.receiveList);
      // console.log(this.submitList);
      // let obj = this.receiveList.concat(this.submitList);
      const obj = [this.receiveList, this.submitList]
      // console.log(obj);
      this.commit(obj)
    }
  },

  computed: {
    ...mapState(['submitList'])
  },

  beforeDestroy () {
    this.showNav(true)
  }
}
</script>
<style lang="scss" scoped>
.box-card {
  width: 100%;
  // margin-top: 25px;
}
.address {
  overflow: hidden;
  // margin-top: 15px;
  width: 100%;
  height: 200px;

  ul {
    width: 100%;
    height: 100%;
    li {
      float: left;
      width: 241px;
      height: 137px;
      background: #f2f2f2;
      padding: 19px 14px 1px 19px;
      margin: 0 0 30px 16px;
      color: #626262;
      line-height: 23px;
      position: relative;
      font-size: 14px;
    }
  }
}
.add-address {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.top {
  overflow: hidden;
  height: 60px;
  width: 100%;
  background: linear-gradient(#fbfbfb, #ececec);
  line-height: 60px;
  border-radius: 15px 15px 0 0;
  margin-top: 20px;
  border-bottom: 1px solid #ccc;
  h3 {
    margin-left: 20px;
    font-weight: 500;
  }
}
img {
  width: 100px;
  height: 100px;
}
.active {
  border: 1px solid blue;
  background: #fff !important;
}
.bottom {
  width: 100%;
  // height: 40px;
  position: absolute;
  bottom: -20px;
  left: 0;
  opacity: 0;
  -webkit-transition: bottom 0.3s;
  span {
    width: 49%;
    text-align: center;
    display: inline-block;
    border: 1px solid #ccc;
    font-size: 12px;
    cursor: pointer;
  }
}
li:hover .bottom {
  opacity: 1;
  bottom: 0;
}
.bottom span:hover {
  background-color: #ccc;
}
</style>
