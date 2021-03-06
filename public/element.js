import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'

import {
  Input, Avatar, Badge, Button, InputNumber,
  Carousel, CarouselItem
  , Pagination, Form, FormItem, Backtop,
  Table, TableColumn, Card, Message
  , Alert, Dialog
} from 'element-ui'

Vue.use(Input)
Vue.use(Avatar)
Vue.use(Badge)
Vue.use(Button)
Vue.use(InputNumber)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Backtop)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Card)
Vue.use(Alert)
Vue.use(Dialog)

// 注册为全局组件 通过他的原型 可在任意地方通过 this.$message即可使用
Vue.prototype.$message = Message
