<template>
  <section class="language-switcher-container d-flex">
    <div class="current-language align-items-center" @click="languageSwitch(lang)">
      <!-- <span class="intro">{{currentLanguage}}</span> -->
      <img src="../assets/images/language/language.png" />
      <span class="language-abbrv">{{currentLanguageAbbrv}}</span>
    </div>
  </section>
</template>

<script>
  import data from '../service/data';

  export default {
    name: 'LanguageSwitcher',
    props: ['language'],
    data() {
      return {
        isOpened: false,
        lang: '',
      };
    },
    methods: {
      languageSwitch: function (language) {
        if (language == "en") this.lang = "ch";
        else this.lang = "en";
        this.$emit('languageSwitched', this.lang);
      }
    },
    computed: {
      // currentLanguage() {
      //   return data[this.language || 'en'].nav.language.currentLanguage;
      // },
      currentLanguageAbbrv() {
        return data[this.language || 'en'].nav.language[this.language || 'en'].abbrv;
      }
    },
    mounted() {
      this.lang = JSON.parse(localStorage.getItem('language'));
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../static/css/_util.scss';
  @import '../../static/css/_app.scss';

  $width-wide: 126px;
  $width-thin: 64px;
  $height: 30px;

  .language-switcher-container {
    border-radius: 6px;
    font-family: Gotham-Regular, PingFang SC, Microsoft YaHei, sans-serif;
    font-size: 12px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color:#FFFFFF;
    background-color: none;
    // border: solid 1px rgba(85, 168, 246, 0.6);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    width: #{$width-wide};
    // x <1200
    @media (max-width: #{$_md-lg-width - 1}) {
      width: #{$width-thin};
    }

    .current-language {
      position: relative;
      width: 100%;
      height: #{$height};
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .intro {
        // x <1200
        @media (max-width: #{$_md-lg-width - 1}) {
          display: none;
        }
      }
      .language-abbrv {
        padding-left: 8px;
      }
      .select-btn {
        top: -1px;
        position: relative;
        width: 2px;
        height: 2px;
        &:before {
          display: block;
          content: '';
          width: 5px;
          height: 1px;
          background-color: rgba(116, 127, 147, 0.87);;
          transform-origin: center;
          position: absolute;
          top: 50%;
          left: 0;
        }
        &:before {
          transform: rotate(45deg) translate(50%, 50%);
        }

        &:after {
          display: block;
          content: '';
          width: 6px;
          height: 1px;
          background-color: rgba(116, 127, 147, 0.87);;
          transform-origin: center;
          position: absolute;
          top: 50%;
          left: 0px;
        }
        &:after {
          transform: rotate(-45deg) translate(30%, 500%);
        }
      }
    }

    .menu-wide {
      display: none;
      width: 100%;
      height: #{$height * 2};
      .language-name {
        padding-left: 25px;
        padding-right: 30px;
      }
    }
    .menu-thin {
      display: none;
      width: 100%;
      height: #{$height * 2};
      .language-name {
        padding-left: 21px;
        padding-right: 5px;
      }
    }
    .isWideOpened {
      display: block;
      // x < 1200
      @media (max-width: #{$_md-lg-width - 1px}) {
        display: none;
      }
    }
    .isThinOpened {
      display: block;
      // x>= 1200
      @include md-rd-gt-md() {
        display: none;
      }
    }
    .row {
      position: relative;
      width: 100%;
      height: #{$height};
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0;
      cursor: pointer;

      .language-name {
        text-align: left;
      }

      .selected {
        visibility: hidden;
        top: -1px;
        position: relative;
        width: 2px;
        height: 2px;
        &:before {
          display: block;
          content: '';
          width: 5px;
          height: 1px;
          background-color: rgba(116, 127, 147, 0.87);;
          transform-origin: center;
          position: absolute;
          top: 50%;
          left: 0px;
        }
        &:before {
          transform: rotate(45deg) translate(50%, 50%);
        }

        &:after {
          transform: rotate(-45deg) translate(40%, 500%);
        }
        &:after {
          display: block;
          content: '';
          width: 15px;
          height: 1px;
          background-color: rgba(116, 127, 147, 0.87);;
          transform-origin: center;
          position: absolute;
          top: 50%;
          left: 0;
        }
        &:after {
          transform: rotate(-45deg) translate(20%, 200%);
        }
      }

      .isSelected {
        visibility: visible;
      }
    }
  }

</style>
