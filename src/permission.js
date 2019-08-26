import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 导航守卫
router.beforeEach(function (to, from, next) {
  nprogress.start() // 开始进度条
  if (to.path.startsWith('/home')) {
    let result = window.localStorage.getItem('user-info')
    if (result) {
      let userInfo = JSON.parse(result)
      if (userInfo.token) {
        next()
      } else {
        next('/login')
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  // ...
  nprogress.done()
})

export default router
