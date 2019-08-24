<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form>
      <!-- 文章状态 -->
      <el-form-item label="文章状态">
        <el-radio-group v-model="radio">
          <el-radio :label="1">全部</el-radio>
          <el-radio :label="2">草稿</el-radio>
          <el-radio :label="3">待审核</el-radio>
          <el-radio :label="4">审核成功</el-radio>
          <el-radio :label="5">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 频道列表 -->
      <el-form-item label="频道列表">
        <el-select placeholder="请选择">
          <el-option
            v-model="value"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            value="shanghai"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 活动日期 -->
      <el-form-item label="时间选择">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="|"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="total-title">
        共找到56789符合条件的内容
    </div>
    <!-- 内容列表 -->
    <div class="content-list">
        <div class="content-item" v-for="(item,index) in list" :key="index">
            <!-- 左侧内容 -->
            <div class="left">
                <img src="" alt="">
                <div class="info">
                    <span>我是标题</span>
                    <el-tag>标签一</el-tag>
                    <span class="date">15165165</span>
                </div>
            </div>
            <!-- 右侧内容 -->
            <div class="right">
                <span>
                    <i class="el-icon-edit"></i>
                    修改
                </span>
                <span>
                    <i class="el-icon-delete"></i>
                    删除
                </span>
            </div>
        </div>
    </div>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio: '1',
      value: '',
      value1: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      list: [1, 2, 3, 4, 5, 6, 7] // 内容列表
    }
  }
}
</script>

<style lang="less" scoped>
.total-title{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px dashed #ccc;
}
    .content-list{
       .content-item{
           display: flex;
           justify-content: space-between;
           padding: 10px;
           border-bottom: 1px solid  #f2f3f5;
           .left{
               display: flex;
               align-items: center;
               img{
                   width: 150px;
                   height: 100px;
                   border-radius: 4px;
               }
               .info{
                   margin-left: 10px;
                   height: 100px;
                   padding: 5px 0;
                   display: flex;
                   flex-direction: column;
                   justify-content: space-between;
                   .date{
                       font-size: 12px;
                       color: #999;
                   }
               }
           }
           .right{
               span, span i {
                   font-size: 12px;
                   color: #333;
               }
               span{
                   margin-right: 5px
               }
           }
       }
    }
</style>
