<template>
   <el-card>
        <bread-crumb slot="header">
            <!-- 面包屑的具名插槽 -->
            <template slot="title">素材管理</template>
        </bread-crumb>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部素材" name="first">
          </el-tab-pane>
          <el-tab-pane label="收藏图片" name="second">
          </el-tab-pane>
        </el-tabs>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first'
    }
  }

}
</script>

<style>

</style>
