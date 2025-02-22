<template>
  <div class="bio-s-wrapper fh" @keyup.enter="handleSearch">
    <div class="s-body-wrapper fh scrollbar-y" style="overflow-x:hidden;">
      <div style="padding-bottom:8px;">
        <!-- <p>
          当前位置: <a @click="goHome">首页></a>其他生物城
          <span v-if="!$_.isEmpty(searchVal)">>{{ searchVal }}</span>
        </p> -->
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/search">首页</BreadcrumbItem>
          <BreadcrumbItem to="/others/search">其他生物城</BreadcrumbItem>
          <BreadcrumbItem>{{ activedBio.name }}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="s-input-wrapper bg-white">
        <div>
          <Input clearable v-model.trim="searchVal" size="large" placeholder="请输入查询内容" class="s-input" />
          <Button class="hc-ml-16" @click="handleSearch" type="warning" size="large">搜索</Button>
          <Button class="hc-ml-16" size="large" @click="handleReset">重置</Button>
        </div>
      </div>
      <div style="width:60px;background-color:#ff9900; color:white;text-align:center" class="hc-pd-4">
        已开发
      </div>
      <div class="s-condition-wrapper bg-white" style="position:relative;">
        <div class="biotown-others-wrapper ">
          <div :class="{
              'biotown-others-item': true,
              actived: activedBio.name === item.name
            }" v-for="(item, index) in biotowns.filter(b => b.disabled === false)" :key="index" @click="handleSelect(item)">
            <div style="width:45px;height:45px">
              <img style="width:100%;height:100%;" :src="item.img" />
            </div>
            <div class="hc-ml-8">
              <span style="font-size:18px;font-weight:400;">{{
                item.name
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div style="width:60px;background-color:#ff9900; color:white;text-align:center" class="hc-pd-4">
        未开发
      </div>
      <div class="s-condition-wrapper bg-white">
        <div class="biotown-others-wrapper">
          <div :class="{
              'biotown-others-item': true,
              disabled: item.disabled !== false
            }" v-for="(item, index) in biotowns.filter(b => b.disabled !== false)" :key="index">
            <div style="width:45px;height:45px">
              <img style="width:100%;height:100%;" :src="item.img" />
            </div>
            <div class="hc-ml-8">
              <span style="font-size:18px;font-weight:400;">{{
                item.name
              }}</span>
            </div>
          </div>
        </div>
        <!-- <SearchForm ref="searchForm" @on-search="handleSearch"></SearchForm> -->
      </div>
      <Spin v-if="loading" fix large></Spin>
      <div class="s-content-wrapper bg-white">
        <div class="content-list-wrapper">
          <h-empty v-if="$_.isEmpty(results)"></h-empty>
          <div v-else v-for="(r, index) in results" :key="index" class="content-list-item" style="display:flex; ">
            <div class=" hc-pd-16" style="width:240px; flex-shrink: 0">
              <img :src="require(`@/assets/images/doc_1.jpg`)" />
            </div>
            <div style="width:100%;">
              <div class="hc-show-row-1 content-list-item-title " style="padding-top:16px;cursor:pointer" @click="handleClick(r)">
                <div v-html="r.title"></div>
              </div>
              <div class=" hc-pd-16 hc-border content-list-item-content hc-mt-8">
                <div class="hc-show-row-3 " v-html="r.content"></div>
              </div>
              <div class="hc-mt-8">
                <Tag> {{ r.pub_date || '' }}发布</Tag>

                <Tag> {{ r.time_valid || '' }}</Tag>
                <Tag> {{ r.pub_dept || '' }}</Tag>

                <Tag> {{ r.force_level || '' }}</Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="s-footer-wrapper hc-pd-8" v-if="results.length < pageOption.total">
      <Page :total="pageOption.total" :current="pageOption.pageIndex" show-total :page-size="pageOption.pageSize" transfer @on-page-size-change="handlePageSizeChange" @on-change="handlePageIndexChange" />
    </div>
  </div>
</template>

<script>
import TableMixin from '@/mixins/table-mixin'
// import SearchForm from './search-form'
export default {
  mixins: [TableMixin],
  components: {
    // SearchForm
  },
  data() {
    return {
      loading: false,
      activedBio: {},
      searchVal: '',
      biotowns: [
        {
          img: `${process.env.BASE_URL}other-biotowns/190715144029647.png`,
          name: '北京亦庄生物医药'
        },
        {
          img: `${process.env.BASE_URL}other-biotowns/190715144158850.jpeg`,
          name: '上海国际医学园区'
        },
        {
          img: `${process.env.BASE_URL}other-biotowns/190715144225710.png`,
          name: '广州国际生物岛'
        },
        {
          img: `${process.env.BASE_URL}other-biotowns/190715133559174.jpg`,
          name: '光谷生物城',
          disabled: false
        },
        {
          img: `${process.env.BASE_URL}other-biotowns//180507140306533.png`,
          name: '重庆两江新区大地生物医药产业园'
        },
        {
          img: `${process.env.BASE_URL}other-biotowns/190715133146792.png`,
          name: '南京生物医药谷'
        },
        {
          img: `${process.env.BASE_URL}other-biotowns/190715133356153.png`,
          name: '苏州生物医药产业园'
        },
        {
          img: `${process.env.BASE_URL}other-biotowns/190715133251304.png`,
          name: '山东国际生物科技'
        }
      ],

      // 热词列表
      // hotWords: [],
      // 搜索结果
      results: []
    }
  },
  computed: {},
  mounted() { },
  methods: {
    handleSelect(bio) {
      this.activedBio = bio
    },
    handleClick(item) {
      window.open(item.url)
    },
    handleReset() {
      this.searchVal = ''
      this.$refs.searchForm.reset()
    },
    // 按条查询内容
    async queryDatas() {
      if (this.searchVal && !this.$_.isEmpty(this.searchVal)) {
        this.loading = true
        this.results = []
        // 组装查询参数
        const filterConditions = this.$refs.searchForm.getDatas()
        const qc = {
          keywords: this.searchVal,
          filters: filterConditions,
          pageIndex: this.pageOption.pageIndex,
          pageSize: this.pageOption.pageSize,
          db: 'bio_policy'
        }
        this.$http
          .post('/api-gdss/search/query', qc)
          .then(rb => {
            if (rb.isOk === true) {
              this.results = rb.data.records || []
              this.pageOption.total = rb.data.total
            }
            this.loading = false
          })
          .catch(e => {
            this.loading = false
          })
      } else {
        this.results = []
        this.pageOption.total = 0
        this.$Message.info('请输入查询内容')
      }
    },
    handleSearch() {
      this.pageOption.pageIndex = 1
      this.queryDatas()
    },
    goHome() {
      this.$router.push({
        name: 'biotown_search_route'
      })
    }
  }
}
</script>
<style lang="less">
.biotown-others-wrapper {
  display: flex;
  width: 100%;
  justify-items: center;
  align-items: center;
  flex-wrap: wrap;
  .biotown-others-item {
    display: flex;
    justify-items: center;
    align-items: center;
    cursor: pointer;
    border: 1px solid #9e9e9e4f;
    padding: 16px;
    margin-bottom: 8px;
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
  .actived {
    border: 2px solid #5c6bc0;
  }
  .disabled {
    border: none;
    color: #dcdee2;
    pointer-events: none;
  }
}

@import url('./index.less');
</style>
