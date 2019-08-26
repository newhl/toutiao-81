<template>
  <div class="cover-image">
      <!-- 循环生成封面 -->
      <div @click="clickImg(index)" class="cover-item" v-for="(item,index) in images" :key="index">
          <img :src="item ? item : defaultImg" alt="">
      </div>
      <el-dialog :visible="showDialog" @close='showDialog=false'>
          <!-- 监听事件 -->
          <select-images @selectOneImg="selectImg" ></select-images>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['type', 'images'],
  data () {
    return {
      selectIndex: -1,
      showDialog: false,
      defaultImg: require('../../assets/img/pic_bg.png')
    }
  },
  methods: {
    clickImg (index) {
      this.showDialog = true
      this.selectIndex = index
    },

    // 拿到图片地址
    selectImg (url) {
      // 显示图片 => 图片来源 => 上层 = >props
      this.$emit('updateImages', url, this.selectIndex)
      this.showDialog = false
    }
  }
}
</script>

<style lang='less' scoped>
    .cover-image{
        display: flex;
        .cover-item{
             width: 200px;
             height: 200px;
             border: 1px solid #ccc;
             padding: 20px;
             img{
                 width: 100%;
                 height: 100%;
             }
        }
    }

</style>
