<template>
  <div>
      <el-container>
        <!-- 左侧导航 -->
        <el-aside class="aside" style="width:201px">
          <layout-aside></layout-aside>
        </el-aside>

        <!-- 右侧大盒子 -->
        <el-container style="height=100vh,overflow:hidden">
          <!-- 头部 -->
          <el-header>
            <layout-header></layout-header>
          </el-header>
          <!-- 主体部分 -->
          <el-main style='margin:0;padding:0'>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
