<template>
  <div class="hello">
    <div class="container-inner" >
      <div class="sections">
        <nav-bar  @languageSwitched="listenLangSwitch" :is-show-nav="true"
          currentSection="home" :sectionRefs="$refs" :language="language"/>
        <notice :language="language"></notice>
        <selectinput :language="language"></selectinput>
        <home :language="language"></home>
        <message :language="language"></message>
        <foot :language="language"></foot>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import MiniNotice from "../components/MiniNotice";
import selectinput from "../components/SelectInput";
import home from "../components/index/Home";
import message from "../components/index/message";
import foot from "../components/Footer";
export default {
  name: "index",
  components: {
    "nav-bar": NavBar,
    "notice": MiniNotice,
    selectinput: selectinput,
    home: home,
    message: message,
    foot: foot
  },
  data() {
    return {
      language: "",
      currentSection: "home"
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
