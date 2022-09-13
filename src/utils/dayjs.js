// dayjs默认的语言是英语
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
// 引入修改成中文
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn') // 全局使用简体中文
export default dayjs
