'use strict';

const $medi = {};
/**
 * Search Box Wrap
 * @description 검색 바
*/

$medi.searchBoxWrap = () => {
  const selector = {
    searchBoxWrap: '.search-box-wrap',
    searchBox: '.search-box',
    input: '.search-input',
    clear: '.clear',
    cancel: '.cancel'
  };
  const status = {
    hasValue: 'has-value',
    on: 'on'
  };
  return {
    init: () => {
      const searchBoxWraps = [...document.querySelectorAll(selector.searchBoxWrap)];
      searchBoxWraps.forEach(item => {
        const input = item.querySelector(selector.input);
        const clear = item.querySelector(selector.clear);
        const cancel = item.querySelector(selector.cancel); // input

        if (input) {
          // set has value
          if (input.value) {
            item.classList.add(status.hasValue);
          }

          input.addEventListener('keydown', evt => {
            input.value ? item.classList.add(status.hasValue) : item.classList.remove(status.hasValue);
            if (evt.keyCode === 13) input.blur();
          });
          input.addEventListener('focus', () => {
            item.classList.add(status.on);
            console.log("ddd");
          });
          input.addEventListener('blur', () => {
            setTimeout(() => {
              item.classList.remove(status.on);
            }, 100);
          });
        } // clear


        if (clear) {
          clear.addEventListener('click', () => {
            input.value = '';
          });
        } // cancel


        if (cancel) {
          cancel.addEventListener('click', () => {
            input.blur();
          });
        }
      });
    }
  };
};
/**
 * tabs
 * @description tabmenu on/off
 * @param el: element
 * @param activeTab: selector // '.medical-info' 없으면 index값
 */


$medi.tabs = (el, activeTab) => {
  const selector = {
    tabContentWrp: $(el).closest('section').find('.tab-cont'),
    idx: $(el).closest('li').index()
  };
  $(el).closest('ul').find('li').removeClass('active');
  $(el).closest('li').addClass('active');
  selector.tabContentWrp.hide();

  if (activeTab) {
    $(`${activeTab}`).show();
  } else {
    selector.tabContentWrp.eq(selector.idx).show();
  }
};
/**
 * swiper
 * @description swiper
 * @param el: element
 */


$medi.swiper = el => {
  const swiperTab = new Swiper(`${el} .swiper`, {
    slidesPerView: 'auto',
    freeMode: true,
    spaceBetween: 20,
    pagination: {
      el: `${el} .swiper-pagination`
    }
  });
};
/**
 * swiperGrid
 * @description swiper grid
 * @param el: element
 * @param view: number(1~) / col 개수 
 * @param row: number(2~) / row 개수 
 * @param gap: number
 */


$medi.swiperGrid = (el, view, row, gap) => {
  const swiperGrid = new Swiper(`${el} .swiper`, {
    slidesPerView: view,
    slidesPerGroup: 1,
    spaceBetween: gap,
    grid: {
      rows: row
    },
    navigation: {
      nextEl: `${el} .swiper-button-next`,
      prevEl: `${el} .swiper-button-prev`
    },
    pagination: {
      el: `${el} .swiper-pagination` // type: "fraction",

    }
  });
};
/**
 * swiperTab
 * @description swiper tab
 * @param el: element
 */


$medi.swiperTab = el => {
  const swiperTab = new Swiper(`${el} .tabmenu`, {
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true
  });
  const swiperImg = new Swiper(`${el} .tab-cont`, {
    slidesPerView: "auto",
    spaceBetween: 20,
    pagination: {
      el: `${el} .swiper-pagination`
    },
    thumbs: {
      swiper: swiperTab
    }
  });
};
/**
 * topScrolls
 * @description top 버튼
 */


$medi.topScrolls = () => {
  $('html,body').animate({
    scrollTop: '0'
  }, 300);
}; // Dom element Loaded


document.addEventListener('DOMContentLoaded', evt => {
  console.log('Life Cycle: READY');
  $medi.searchBoxWrap().init();
  $medi.swiper('.lnb');
  $medi.swiper('.web-symposium');
  $medi.swiper('.medical-info');
  $(window).width() < 768 ? $medi.swiperGrid('.training', 1, 2, 0) : $medi.swiperGrid('.training', 2, 2, 0);
  $(window).width() < 768 ? $medi.swiperGrid('.survey', 1, 3, 0) : $medi.swiperGrid('.survey', 2, 3, 0);
  ;
  $medi.swiperGrid('.card-list', 1, 3, 20);
  $medi.swiper('.img-list');
}); // Window resource Loaded

window.onload = () => {
  console.log('Life Cycle: LOADED');
};