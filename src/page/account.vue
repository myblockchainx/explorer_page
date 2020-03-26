<template>
  <div class="account">
    <div class="container-inner" >
      <div class="sections">
        <nav-bar  @languageSwitched="listenLangSwitch" :is-show-nav="true"
          currentSection="account" :sectionRefs="$refs" :language="language"/>
        <notice :language="language"></notice>
        <selectinput :language="language"></selectinput>
        <accountdata :language="language"></accountdata>
        <foot :language="language"></foot>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import MiniNotice from "../components/MiniNotice";
import selectinput from "../components/SelectInput";
import accountdata from "../components/account/AccountData";
import foot from "../components/Footer";
export default {
  name: "account",
  components: {
    "nav-bar": NavBar,
    "notice": MiniNotice,
    selectinput: selectinput,
    accountdata: accountdata,
    foot: foot
  },
  data() {
    return {
      language: "",
      currentSection: "account"
    };
  },
  methods: {
    listenLangSwitch: function(language) {
      this.language = language;
      this.$route.query.lang = language;
      let data = { lang: undefined };
      if (language == "ch") {
        data.lang = "ch";
      } else {
        data.lang = "en";
      }
      // this.$router.replace({ path: "/account", query: data });
      localStorage.setItem('language', JSON.stringify(language));
    }
  },
  mounted() {
    // this.componentsIsShown[0] = true;
    // if (JSON.parse(localStorage.getItem('language'))) {
      this.language = JSON.parse(localStorage.getItem('language'));
    // } else {
    //   this.language = "en";
    // }
  },
  computed: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
@import "../../static/css/_util.scss";
@import "../../static/css/_app.scss";
</style>
