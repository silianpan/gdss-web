<template>
  <div class="bio-s-wrapper fh">
    <div style="position:absolute;right:10px;top:0;color:white">
      <User :userInfo="userInfo"></User>
    </div>
    <div class="bg-white " style="display:flex;width:100%;">
      <div class="search-head-bg" style="height:400px;width:100%;"></div>
    </div>
    <div class="bio-s-db-wrapper">
      <!-- style="min-width:1154px;" -->
      <div class="h-row" v-for="(i, index) in dbs.length / rowCnt" :key="index">
        <div class=" h-col hc-mb-16 " v-for="(j, j_index) in rowCnt" :key="j_index">
          <div @click="goTargePage(dbs[(i - 1) * rowCnt + j - 1])" class="bg-white pointer" style="width:253px;height:115px;display:flex;align-items:center">
            <div>
              <icon-svg :icon-class="dbs[(i - 1) * rowCnt + j - 1].svg" width="80px" height="80px"></icon-svg>
            </div>
            <div style="flex:auto;" class="hc-pd-16">
              <div style="color:#646464;font-size:18px;">
                {{ dbs[(i - 1) * rowCnt + j - 1].title }}
              </div>
              <div style="color:#3892df;font-size:22px;font-weight:600;">
                <count-to :startVal="0" :endVal="dbs[(i - 1) * rowCnt + j - 1].nums || 0" :duration="8000"></count-to>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from '@/views/layout/components/user'
import CountTo from 'vue-count-to'
export default {
  components: {
    User,
    CountTo
  },
  data() {
    return {
      rowCnt: 4,
      searchVal: '',
      dbs: [
        {
          title: '政策法规',
          svg: 'fa-lv',
          nums: 2376,
          routeName: 'zheng_ce_fa_gui_search_route'
        },
        {
          title: '行业资讯',
          svg: 'shu-ju',
          routeName: 'hang_ye_zi_xun_search_route',
          nums: 29849
        },
        {
          title: '生物城汇',
          svg: 'lei-da',
          nums: 1368,
          routeName: 'others_biotown_search_route'
        },
        {
          title: '研究成果',
          svg: 'yi-yao',
          routeName: 'bio_logy_search_route',
          nums: 497
        },
        {
          title: '生物医药',
          svg: 'yi-yao',
          routeName: 'bio_medical_search_route',
          nums: 161428
        },
        {
          title: '医疗器械',
          svg: 'sheng-wu',
          nums: 32130,
          routeName: 'medical_qi_xie_search_route'
        },

        {
          title: '医药企业',
          svg: 'ji-gou',
          routeName: 'ru_zhu_qi_ye_search_route',
          nums: 7892
        },

        {
          title: '医药服务',
          svg: 'fu-wu',
          routeName: 'medical_server_manage_route',
          nums: 554
        }
      ]
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  mounted() {},
  methods: {
    goTargePage(m) {
      const { routeName } = m
      if (routeName) {
        this.$router.push({
          name: routeName
        })
      }
    }
  }
}
</script>

<style lang="less">
body {
  background: #e8ecf1;
}
.search-head-bg {
  background: url('~@/assets/images/hi-tech-bio-town.png') no-repeat;
  background-size: 100% 100%;
}
.bio-s-wrapper {
  img {
    width: 100%;
  }
  .ivu-input {
    border-radius: 0px !important;
  }
  .ivu-btn-large {
    border-radius: 0px !important;
  }
  .bio-s-input-wrapper {
    margin-top: 2%;
    width: 100%;
    position: relative;
  }
  .bio-s-db-wrapper {
    margin-top: 4%;
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: column;
  }
  .pointer {
    cursor: pointer;
  }
}
.h-row {
  display: flex;
  align-items: center;
  justify-items: center;
  flex-wrap: wrap;
  .h-col {
    padding: 0px 32px;
  }
}
</style>
