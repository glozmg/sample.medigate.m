var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i) == null ? false : true;
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
  },
  IOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
  },
  any: function () {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.IOS() || isMobile.Opera() || isMobile.Windows();
  }
};
var currentLanguage = document.documentElement.lang;
$(function () {
  //안드로이드 체크
  if (isMobile.Android()) {
    $("body").addClass("android");
    $("#reviewText").focusin(function () {
      var posScroll = $(window).scrollTop();
      $(".review-wrap .inner").css("padding-bottom", "20vw");
      $('html, body').stop().animate({
        scrollTop: posScroll + 300
      }, 400, "easeInOutExpo");
    }).focusout(function () {
      var posScroll = $(window).scrollTop();
      $(".review-wrap .inner").css("padding-bottom", "");
      $('html, body').stop().animate({
        scrollTop: posScroll - 50
      }, 400, "easeInOutExpo");
    });
  }

  if (isMobile.IOS()) $("body").addClass("ios");
  /* setLanguage */

  setLanguage();
}); //무조건 상단으로

$(window).load(function () {
  $('html, body').stop().animate({
    scrollTop: 0
  }, 100);
  setTimeout(function () {
    initGameInfo();
  }, 100);
}); //국가별 텍스트 변경

function setLanguage() {
  var currentLanguage = document.documentElement.lang;
  $('[data-lang]').each(function () {
    var $this = $(this);
    $this.html(translang[currentLanguage][$this.data('lang')]);
  });
} //section image 설정


function initSectionImg() {
  var lang = document.documentElement.lang;
  $("section .evt-img").each(function () {
    var t = $(this).data("img"),
        e = t.substring(t.lastIndexOf("/"), 0),
        n = e.substring(e.lastIndexOf("/"), 0),
        i = t.substring(t.lastIndexOf("/") + 1, t.length),
        a = lang,
        s = $(this).next(".evt-desc").find(".tit").text(),
        o = $(this).next(".evt-desc").attr("id"); //캐시 버전 시간으로 넣기

    var today = new Date(),
        year = today.getFullYear(),
        month = ('0' + (today.getMonth() + 1)).slice(-2),
        day = ('0' + today.getDate()).slice(-2),
        hours = ('0' + today.getHours()).slice(-2),
        minutes = ('0' + today.getMinutes()).slice(-2),
        seconds = ('0' + today.getSeconds()).slice(-2),
        nowTime = year + month + month + day + hours + minutes + seconds;
    $(this).attr("data-img", n + "/" + a + "/" + i).html('<img src="' + n + "/" + a + "/" + i + "?ver=" + nowTime + '" alt="' + s + '" aria-describedby="' + o + '">');
  });
}

function menu(that, sectionName) {
  var obj = typeof that; //this == "object"

  if (obj == "object") $(".nav-wrap .nav li").addClass("active").not($(that).parents("li")).removeClass("active");else $(".nav-wrap .nav li").addClass("active").not($(".nav-wrap .nav li" + that)).removeClass("active");
  $("#container section").hide();
  var sec = sectionName.replace("#", "");
  $("#wrapper").removeClass().addClass(sec + "-active");
  $(sectionName).show();
}

function menuNavi(sectionName) {
  $("#container section").hide();
  var sec = sectionName.replace("#", "");
  $("#wrapper").removeClass().addClass(sec + "-active");
  $(sectionName).show();
}

function initNaviScroll() {
  var windowH = $(window).height(),
      nav = $(".nav-wrap .nav"),
      navLiActive = $(".nav-wrap .nav .active"),
      navLiHeight = navLiActive.height(),
      activePos = navLiActive.position().top,
      an = activePos + navLiHeight,
      wn = windowH - navLiHeight;
  if (an > wn) nav.scrollTop(activePos - windowH / 2);
} //로딩


function loading(type) {
  $("body").append('<div id="loading"><em>Loading...</em></div>');
  if (type) $('#loading').addClass(type);
}

function removeLoading() {
  $("#loading").remove();
} //언어 선택


function uiLang(regionCode, langCode) {
  /* UI테스트용 */
  $("#headerImgDesc").append('<div id="selectLang" class="select-lang"></div>');
  var regionCode = ['ko', 'de', 'en', 'es', 'fr', 'pt', 'zh-TW', 'zh-CN', 'th', 'ja'];
  var langCode = ['한국어', 'Deutsch', 'English', 'Español', 'Français', 'Português', '中文 (繁體)', '中文 (簡體)', 'ภาษาไทย', '日本語'];
  /* UI테스트용 */

  selectLang(regionCode, langCode);
  msg = popupLang();
  $(document).on("click", ".select-lang .list-lang li", function () {
    var lang = $(this).data("lang");
    $("html").attr("lang", lang);
    setLanguage(lang);
    initSectionImg();
    msg = popupLang();
    closeLang();

    if (typeof changeEvtLang == 'function') {
      changeEvtLang();
    }
  });
}

function openLang(that) {
  var thisLang = $("html").attr("lang");
  $(that).addClass("open");
  $(".list-lang").addClass("open");
  $(".list-lang li").removeClass("current");
  $(".list-lang [data-lang='" + thisLang + "']").addClass("current");
}

function closeLang() {
  $(".btn-lang").removeClass("open");
  $(".list-lang").removeClass("open");
}

function selectLang(regionCode, langCode, currentLang) {
  var total = regionCode.length;
  var selectHtml = "";
  selectHtml += '<button type="button" class="btn-lang" onclick="openLang(this)">languge</button>';
  selectHtml += '<div class="list-lang">';
  selectHtml += '    <ul>';

  for (var i = 0; i < total; i++) {
    selectHtml += '        <li data-lang="' + regionCode[i] + '"><a href="#">' + langCode[i] + '</a></li>';
  }

  selectHtml += '    </ul>';
  selectHtml += '    <button type="button" class="btn-close" onclick="closeLang(this)">X</button>';
  selectHtml += '</div>';
  $("#selectLang").html(selectHtml);
} //미션 게이지
//HTML <div class="gage-area" data-range="[0,5,10,15,20]"> 


function fnGage(target, gageNum, countYN) {
  let divRange = $(target).data("range");
  let total = divRange.length,
      totalZero = total - 1,
      i = 1;
  fnGageDiv(target); //게이지 단위 구분선
  //게이지 범위 넣기

  $(target).closest('div').prepend(`<div class="gauge-range"></div>`);

  for (j = 1; j < total; j++) {
    let rangeNum = divRange[j].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let gaugeRange = `<span class="range${j}">${rangeNum}</span>`;
    $(target).find('.gauge-range').append(`${gaugeRange}`);
  } //0일때


  if (gageNum > 0) $(target + " .gage").css("opacity", "1"); //첫번째 배열

  if (gageNum <= divRange[1]) percent = 100 / totalZero / divRange[1] * gageNum; //2번째부터 반복

  do {
    range = divRange[i + 1] - divRange[i];

    if (gageNum > divRange[i] && gageNum <= divRange[i + 1]) {
      percent = (gageNum - divRange[i]) / range * 100 / totalZero + 100 / totalZero * i;
    }

    i++;
  } while (i < totalZero); //마지막 배열


  if (gageNum >= divRange[divRange.length - 1]) {
    percent = 100;
    $(target).addClass('max');
    ;
  } //게이지 width 그리기


  $(target + " .gage").css("width", percent + "%");
  $(target).addClass("gage" + (total - 1)); //최소값 주기

  if (percent < 4) var percent = "4"; //게이지 안 카운트 노출 유무

  if (countYN == 1) {
    let countNum = gageNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    $(target).find('.cnt').html(countNum).show().css("width", percent + "%");
  } else {
    $(target).find('.cnt').hide();
  }
} //미션 게이지 구분선


function fnGageDiv(target) {
  const divRange = $(target).data("range");
  const total = divRange.length - 1;
  divHtml = '<span class="div">';

  for (var i = 1; i <= total; i++) {
    var pos = 100 / total * i;
    divHtml += '<i class="div' + i + '" style="left:' + pos + '%"></i>';
  }

  divHtml += '</span>';
  $(target).append(divHtml);
} //random number


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function androidKeypad(obj, padding, num) {
  var userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.indexOf('android') > -1) {
    $(obj).focusin(function () {
      console.log("ddd");
      var posScroll = $(window).scrollTop();
      $(padding).css("padding-bottom", num);
      $('html, body').stop().animate({
        scrollTop: posScroll + 300
      }, 400, "easeInOutExpo");
    }).focusout(function () {
      var posScroll = $(window).scrollTop();
      $(padding).css("padding-bottom", "");
      $('html, body').stop().animate({
        scrollTop: posScroll - 50
      }, 400, "easeInOutExpo");
    });
  }
}

var posY;

function popup(obj, msgNum, item) {
  posY = $(window).scrollTop();
  $("body").addClass("dimmed");
  $("#wrapper").css("top", -posY);
  $(obj).addClass("show");
  $(obj).find("p").html(msgNum);

  if (obj == "[data-type=confirm]") {
    var name = $(".challenger-list li.on button").text();
    $(obj).find("p strong em").text(name);
  }

  if (item) {
    $(obj).find(".item-name").text(item);
  } //return false;

}

function popupClose(that) {
  $("body").removeClass("dimmed").unbind('touchmove');
  var obj = typeof that; //this == "object"

  if (obj == "object") {
    $(that).parents('.popup').removeAttr("style").removeClass("show");
    if (obj == ".popup-char") $(that).parents('.popup-char').removeAttr("style").removeClass().addClass('popup-char');
    if (obj == ".popup-youtube") $(that).parents('.popup-youtube').find(".frame iframe").remove();
  } else {
    $(that).removeAttr("style").removeClass("show");
  }

  posY = $(window).scrollTop(posY); //return false;
}

function link(url) {
  location.href = url;
}

function placeholder(input) {
  if ($(input).val() == 0) {
    $(input).parent().find(".i-label").show();
  }

  $(input).focus(function () {
    $(this).parent().find(".i-label").hide();
  }).blur(function () {
    if ($(this).val() == '') $(this).parent().find(".i-label").show();else {
      $(this).parent().find(".i-label").hide();
    }
  });
}