<template>
   <el-card class="material">
        <bread-crumb slot="header">
            <template slot="title">素材管理</template>
        </bread-crumb>
        <el-tabs v-model="activeName" @tab-click="changeTab">
          <el-tab-pane label="全部素材" name="all">
            <div class="card-list">
              <el-card v-for="item in list" :key="item.id" class="img-card">
                <img :src="item.url" alt="">
                <el-row type="flex" justify="space-around" class="operate" align="middle">
                  <i class="el-icon-star-on" :style="{color: item.is_collected ? 'red' : ''}"></i>
                  <i class="el-icon-delete-solid"></i>
                </el-row>
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="收藏图片" name="collect">
            <div class="card-list">
              <el-card v-for="item in list" :key="item.id" class="img-card">
                <img :src="item.url" alt="">
              </el-card>
            </div>
          </el-tab-pane>
        </el-tabs>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: []
    }
  },
  methods: {
    // 切换页签
    changeTab () {
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect'
        }
      }).then(res => {
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.material{
  .card-list {
    display:flex;
    flex-wrap : wrap;
    justify-content: center;
    .img-card{
      width: 180px;
      height: 180px;
      margin: 30px;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      .operate {
        position: absolute;
        width: 100%;
        bottom: 0;
        left:0;
        height: 30px;
        background-color: #f4f5f6;
        font-size: 18px;
      }
    }
  }
}

</style>
