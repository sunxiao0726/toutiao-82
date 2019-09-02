<template>
  <div>
      <el-container>
        <!-- 左侧导航 -->
        <el-aside class="aside" style="width:201px">
          <layout-aside></layout-aside>
        </el-aside>

        <!-- 右侧大盒子 -->
        <el-container>
          <!-- 头部 -->
          <el-header>
            <layout-header></layout-header>
          </el-header>
          <!-- 主体部分 -->
          <el-main>右边</el-main>
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
