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
</el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否要${mess}评论?`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: '/comments/status',
          methon: 'put',
          params: { article_id: row.id },
          data: { allow_comment: !row.comment_status }
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
        params: { response_type: 'comment' }
      }).then(res => {
        this.list = res.data.results
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
