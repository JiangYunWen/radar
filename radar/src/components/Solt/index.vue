<template>
  <div class="container">
    <lowpower :item="item" v-if="this.subtype == 1" />
    <CountSolt :item="item" v-if="this.subtype == 2" />
    <ExchangeSolt :item="item" v-if="this.subtype == 3" />
    <Exchangeapi :item="item" v-if="this.subtype == 4" />
    <recordSolt :item="item" v-if="this.subtype == 7" />
    <!--blades v-else /-->
  </div>
</template>

<script>
import CountSolt from "@/components/CountSolt";
import recordSolt from "@/components/recordSolt";
import ExchangeSolt from "@/components/ExchangeSolt";
import Exchangeapi from "@/components/Exchangeapi";
import lowpower from "@/components/Lowpower";
import blades from "@/components/blades";
export default {
  components: {
    CountSolt,
    recordSolt,
    ExchangeSolt,
    Exchangeapi,
    lowpower,
    blades,
  },
  inject: ["reload"],
  data() {
    return {
      item: "",
      subtype: "",
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
    if (this.$route.query.item) {
      this.item = this.$route.query.item;
      this.subtype = this.$route.query.subtype;
    }
  },
  methods: {},
  created: function () {
    // this.subtype=localStorage.getItem('subtype');
    // this.item=localStorage.getItem('menuId');
    this.item = this.$route.query.item;
    this.subtype = this.$route.query.subtype;
  },
};
</script>
