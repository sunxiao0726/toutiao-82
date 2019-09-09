<template>
<el-card>
    <bread-crumb slot="header">
        <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list" >
      <el-table-column
        prop="title"
        label="标题"
        width="700">
      </el-table-column>
      <el-table-column
        :formatter="formatter"
        prop="comment_status"
        label="评论状态">
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数">
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数">
      </el-table-column>
      <el-table-column label="操作">
          <template slot-scope="obj">
            <el-button size="small" type="text">修改</el-button>
            <el-button size="small" type="text"
            :style="{color: obj.row.comment_status ? '#E6A23C' : '#409EFF'}"
            @click="openOrClose(obj.row)">
            {{obj.row.comment_status?'关闭评论':'打开评论'}}
            </el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style='margin:15px 0'>
      <el-pagination background layout="prev, pager, next"
      :total="page.total"
      :current-page="page.page"
      :page-size="page.pageSize"
      @current-change='changePage'
      @prev-click='changePage'
      @next-click='changePage'>
      </el-pagination>
    </el-row>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }

    }
  },
  methods: {
    // 改变页码触发的事件
    changePage (newPage) {
      // 给当前页码更新最新值
      this.page.page = newPage
      this.getComments()
    },
    // 打开或者关闭评论
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否要${mess}评论?`, '提示', {
        type: 'warning'
      }).then(() => {
        // 写调用接口
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: { article_id: row.id.toString() }, // 传递articleId参数
          data: { allow_comment: !row.comment_status }// 取反 因为当前如果是true  只能改成false , 如果是false 改成true
        }).then(res => {
          this.getComments()
        })
      })
    },
    formatter (row, column, cellValue, index) {
      return row.comment_status ? '正常' : '关闭'
    },
    getComments () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.page, per_page: this.page.pageSize }
      }).then(res => {
        this.list = res.data.results

        this.page.total = res.data.total_count
      })
    }

  },
  created () {
    this.getComments()
  }

}
</script>

<style>

</style>
