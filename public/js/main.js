init();

function init() {
  //pcGnb();
  pcGnb2();
  mGnb();
  slide();
  loopSlide();
  tab();
  accordion();
  arrco2();
  tooltip();
  search();
  sorting();
  tab2();
  lazyload();
  dropdown();
  bookmark();
  tableip();
  toast();
  layerPop();
  category();
}
/* header */
function pcGnb() {
  const header = document.querySelector("header");
  const gnba = document.querySelectorAll(".gnb a");

  for (i = 0; i < gnba.length; i++) {
    gnba[i].addEventListener("mouseenter", function () {
      header.classList.add("on");
    });
    gnba[i].addEventListener("mouseleave", function () {
      header.classList.remove("on");
    });
    gnba[i].addEventListener("focus", function () {
      header.classList.add("on");
    });
    gnba[i].addEventListener("blur", function () {
      header.classList.remove("on");
    });
  }

  /* jQuery

    $('.gnbListSub').slideUp(0);

    $('.gnb a').on('mouseenter focus', function (){
        $('.gnbListSub').slideDown(400);
        $(this).parents('header').addClass('on');
    });
    $('.gnb').on('mouseleave blur', function (){
        $('.gnbListSub').slideUp(400);
        $(this).parents('header').removeClass('on');
    });
    */
}

function pcGnb2() {
  //const dep = document.querySelector('.gnbList');
  const gnba = document.querySelectorAll(".gnbList > li");

  /* mouse event */
  gnba.forEach((i) => {
    i.addEventListener("mouseenter", gnbSubOpen);
    i.addEventListener("mouseleave", gnbSubClose);
  });

  /* tab event */
  gnba.forEach((ii) => {
    ii.addEventListener("focusin", gnbSubOpen);
    ii.addEventListener("focusout", gnbSubClose);
  });

  function gnbSubOpen() {
    this.classList.add("on");
    const dep2 = this.lastElementChild;
    dep2.style.height = dep2.children.length * 36 + "px";
  }

  function gnbSubClose() {
    this.classList.remove("on");
    const dep2 = this.lastElementChild;
    dep2.style.height = 0 + "px";
  }

  /* focus/blur ver */
  /*
    let blurCount = 1;

    function nowFocus() {
        const gnbList = this.parentNode.parentNode;
        const gnbListSub = this.parentNode.lastElementChild
        const gnbListSubLi = this.parentNode.lastElementChild.children;
        
        if (gnbList == dep ) {
            this.parentNode.classList.add('on');
            gnbListSub.style.height = gnbListSubLi.length * 36 + 'px';
        }
    }
    function nowBlur() {
        const gnbListSub = this.parentNode.parentNode;
        const gnbListSubLi = this.parentNode.parentNode.children;

        if (gnbListSub != dep) {
            blurCount += 1;
            if (gnbListSubLi.length < blurCount) {
                gnbListSub.parentNode.classList.remove('on');
                gnbListSub.style.height = 0 + 'px';

                blurCount = 1;
            }
        }  
        console.log(blurCount);
    }
    */
}

function mGnb() {
  const body = document.querySelector("body");
  const gnb = document.querySelector(".gnb");
  const mnavBtn = document.getElementsByClassName("mnavBtn");

  for (a = 0; a < mnavBtn.length; a++) {
    mnavBtn[a].addEventListener("click", function () {
      const gnbCheck = gnb.classList.contains("active");

      if (gnbCheck == true) {
        gnb.classList.remove("active");
        body.classList.remove("bof");
      } else {
        gnb.classList.add("active");
        body.classList.add("bof");
      }
    });
  }

  /* jQuery

    $('.mnavBtn').click(function() {
        if($('.gnb').hasClass('active') == true) {
            $('.gnb').removeClass('active');
        } else {
            $('.gnb').addClass('active');
        }
    });
    */
}

function slide() {
  const slide = document.querySelector(".slide");
  const slideBox = document.querySelector(".slideBox");
  const slideList = document.getElementsByClassName("slideList");
  const slideMax = slideList.length - 1;
  const slideW = slide.offsetWidth;
  const nowNum = document.getElementById("nowNum");
  const allNum = document.getElementById("allNum");
  const slidePrev = document.querySelector(".slidePrev");
  const slideNext = document.querySelector(".slideNext");
  const slidePage = document.querySelectorAll(".slidePageList li");
  const slidePageBtn = document.querySelectorAll(".slidePageList button");
  let slideIdx = 0;

  slideStart();
  slideSet(0);
  slidePageClick();

  function slideStart() {
    slideBox.style.width = slideW * slideList.length + "px";

    for (f = 0; f < slideList.length; f++) {
      slideList[f].style.width = slideW + "px";
    }
    allNum.innerHTML = slideList.length;
  }

  function slideSet(idx) {
    const slideMove = idx * slideW;

    slideList[idx].classList.add("slideOn");
    slideBox.style.transform = "translateX(-" + slideMove + "px)";

    for (g = 0; g < slidePage.length; g++) {
      slidePage[idx].classList.add("slideBon");
    }

    slideIdx = idx;

    nowNum.innerHTML = slideIdx + 1;

    if (slideIdx == 0) {
      slidePrev.classList.add("disable");
      slideNext.classList.remove("disable");
    } else if (slideIdx == slideMax) {
      slidePrev.classList.remove("disable");
      slideNext.classList.add("disable");
    } else if (slideIdx > 0 && slideIdx < slideMax) {
      slidePrev.classList.remove("disable");
      slideNext.classList.remove("disable");
    }
  }

  slidePrev.addEventListener("click", function () {
    if (slideIdx > 0) {
      slideSet(slideIdx - 1);
      slideList[slideIdx + 1].classList.remove("slideOn");
      slidePage[slideIdx + 1].classList.remove("slideBon");
    } else {
      slideSet(0);
    }
  });

  slideNext.addEventListener("click", function () {
    if (slideIdx < slideMax) {
      slideSet(slideIdx + 1);
      slideList[slideIdx - 1].classList.remove("slideOn");
      slidePage[slideIdx - 1].classList.remove("slideBon");
    } else {
      slideSet(slideMax);
    }
  });

  function slidePageClick() {
    for (g = 0; g < slidePageBtn.length; g++) {
      (function slidePageIdx(pageIdx) {
        slidePageBtn[pageIdx].onclick = function () {
          for (h = 0; h < slidePage.length; h++) {
            slideList[h].classList.remove("slideOn");
            slidePage[h].classList.remove("slideBon");
          }
          slideSet(pageIdx);
        };
      })(g);
    }
  }

  /* jQuery
    const slideW = $('.slide').width();
    const slideCount = $('.slideList').length;
    const slideMax = slideCount - 1;
    let slideIdx = 0;

    slideStart();
    slideSet(0);

    function slideStart() {
        $('.slideBox').css('width', slideW * slideCount);
        $('.slideList').css('width', (slideW * slideCount) / slideCount);

        $('.nowNum').text(slideIdx + 1);
        $('.allNum').text(slideCount);
    }

    function slideSet(idx) {
        const slideMove = idx * slideW;

        $('.slideList').eq(idx).addClass('slideOn');
        $('.slidePageList li').eq(idx).addClass('slideBon');

        $('.slideBox').css({'transform':'translateX(-'+slideMove+'px)'});

        slideIdx = idx;
        
        if (slideIdx == 0) {
            $('.slidePrev').addClass('disable');
            $('.slideNext').removeClass('disable');
        } else if (slideIdx == slideMax) {
            $('.slidePrev').removeClass('disable');
            $('.slideNext').addClass('disable');
        } else if (slideIdx > 0 && slideIdx < slideMax ) {
            $('.slideBtnBox button').removeClass('disable');
        }
    }

    $('.slidePrev').click(function() {
        if ( slideIdx > 0 ) {
            slideSet(slideIdx - 1);
            $('.slideList').eq(slideIdx + 1).removeClass('slideOn');
            $('.slidePageList li').eq(slideIdx + 1).removeClass('slideBon');

            $('.nowNum').text(slideIdx + 1);
        } else if (slideIdx == 0) {
            slideSet(0);
        }
    });

    $('.slideNext').click(function() {
        if ( slideIdx < slideMax ) {
            slideSet(slideIdx + 1);
            $('.slideList').eq(slideIdx - 1).removeClass('slideOn');
            $('.slidePageList li').eq(slideIdx - 1).removeClass('slideBon');

            $('.nowNum').text(slideIdx + 1);
        } else if (slideIdx == slideMax) {
            slideSet(slideMax);
        }
    });

    $('.slidePageList button').click(function() {
        const pageIdx = $(this).closest('li').index();

        $('.slideList').removeClass('slideOn');
        $('.slidePageList li').removeClass('slideBon');

        slideSet(pageIdx);
    });
    */
}

function loopSlide() {
  const swiper = new Swiper(".swiper", {
    loop: true,
    observer: true,
    bserveParents: true,
    speed: 1000,
    centeredSlides: true,
    slidesPerView: "auto",
    slideToClickedSlide: true,
    effect: "coverflow",
  });
}

function tab() {
  const tabList = document.querySelectorAll(".tabList li");
  const tabMenu = document.getElementsByClassName("tabMenu");

  tabList[0].classList.add("tabOn");

  for (c = 0; c < tabMenu.length; c++) {
    function clickIdx(idx) {
      tabMenu[idx].addEventListener("click", function () {
        for (d = 0; d < tabList.length; d++) {
          tabList[d].classList.remove("tabOn");
        }
        tabList[idx].classList.add("tabOn");
      });
    }
    clickIdx(c);
  }

  /* jQuery

    $('.tabList > li:first-child').addClass('tabOn');

    $('.tabMenu').click(function() {
        $('.tabList > li').removeClass('tabOn');
        $(this).closest('li').addClass('tabOn');
    });
    */
}

function accordion() {
  const accoTit = document.getElementsByClassName("accordionTit");

  for (e = 0; e < accoTit.length; e++) {
    accoTit[e].addEventListener("click", function () {
      const accoPr = this.parentNode;
      const accoCheck = accoPr.classList.contains("aaactive");

      const accoSub2 = this.nextElementSibling;
      const accoSub2CC = this.nextElementSibling.children.length;

      if (accoCheck == true) {
        accoPr.classList.remove("aaactive");
        accoSub2.style.height = 0;
      } else {
        accoPr.classList.add("aaactive");
        accoSub2.style.height = 37 * accoSub2CC + "px";

        const accoH = this.getBoundingClientRect().top;
        const winH = window.pageYOffset;
        //window.scrollTo(0, accoH + winH - 90);
        window.scroll({ top: accoH + winH - 90, behavior: "smooth" });
      }
    });
  }

  /* jQuery
    $('.accordionsub2').slideUp(0);

    $('.accordionTit').click(function() {

        var accoHeight = $(this).offset().top;
        $('html, body').animate({scrollTop: (accoHeight - 90)}, 400);

        $(this).closest('.accordionSub').toggleClass('aaactive');

        if ($(this).closest('.accordionSub').hasClass('aaactive') == true) {
            $(this).siblings('.accordionsub2').slideDown(400);
        } else {
            $(this).siblings('.accordionsub2').slideUp(400);
        }
    });
    */
}

function arrco2() {
  const arrcoBtn = document.querySelectorAll(".arrcoBtn");
  const arrcoBtn3 = document.querySelectorAll(".arrcoBtn3");
  const arrcoAllBtn = document.getElementsByClassName("allControl");
  console.log();
  //const arrcoBox = document.getElementsByClassName('arrcoBox');

  /* ?????????????????? ??????
    // ?????? ?????? ul ?????????????????? ???????????? ???????????? ?????????
    arrcoBox[0].addEventListener('click', function(e) {
        const arrcoLi = e.target.parentNode.parentNode;
        console.log(arrcoLi,e.target.parentNode.nodeName, e.currentTarget)
        // target : ???????????? ????????? ??????
        // currentTarget : ???????????? ??????????????? ??????

        if(e.target.parentNode.nodeName == 'BUTTON') {
            console.log(c)
            if(arrcoLi.classList.contains('open') == false) {
                arrcoLi.classList.add('open');
            } else {
                arrcoLi.classList.remove('open');
            }
        }
    });
    */

  arrcoClick(arrcoBtn);
  arrcoClick(arrcoBtn3);

  // foreach ??????
  function arrcoClick(button) {
    button.forEach((aa) => {
      aa.addEventListener("click", function () {
        const arrcoLi = this.parentNode;

        if (arrcoLi.classList.contains("open") == false) {
          arrcoLi.classList.add("open");
        } else {
          arrcoLi.classList.remove("open");
        }
      });
    });
  }

  arrcoAllBtn[0].addEventListener("click", function () {
    const arrcoList = this.nextElementSibling.children;

    if (this.classList.contains("allOpen") == false) {
      this.innerHTML = "<span>????????????</span>";
      this.classList.add("allOpen");
      childAdd("open");
    } else {
      this.innerHTML = "<span>????????????</span>";
      this.classList.remove("allOpen");
      childRemove("open");
    }

    function childAdd(value) {
      for (al = 0; al < arrcoList.length; al++) {
        arrcoList[al].classList.add(value);
      }
    }

    function childRemove(value) {
      for (al = 0; al < arrcoList.length; al++) {
        arrcoList[al].classList.remove(value);
      }
    }
  });
}

function tooltip() {
  const tooltip = document.querySelector(".tooltip");
  const toolPop = document.querySelector(".toolpopBox");
  const toolBtn = document.querySelector(".toolBtn");
  const tooltipClose = document.querySelector(".tooltipClose");
  const winH = window.pageYOffset;
  const toolH = tooltip.getBoundingClientRect().top;
  const toolS = winH + toolH - 130;

  window.addEventListener("scroll", function () {
    const scroll = window.scrollY;

    if (toolS > scroll) {
      toolPop.classList.add("top");
    } else {
      toolPop.classList.remove("top");
    }
  });

  toolBtn.addEventListener("click", function () {
    tooltip.classList.add("toolOn");
  });

  tooltipClose.addEventListener("click", function () {
    tooltip.classList.remove("toolOn");
  });

  /* jQuery
    const toolH = $('.tooltip').offset().top;

    $(window).scroll(function() {
        const scroll = $(document).scrollTop();

        if (toolH + 50 > scroll + 160) { // margin , header??? ?????????
            $('.toolpopBox').css({'bottom':'auto','top':-+'10','transform':'translateY(-100%)'});
        } else {
            $('.toolpopBox').removeAttr('style');
        }
    }); 

    $('.toolBtn').click(function() {
        $('.toolpopBox').show();
    });

    $('.tooltipClose').click(function() {
        $('.toolpopBox').hide();
    });
    */
}

function search() {
  const search = document.querySelector(".search");
  const searchInput = document.querySelector(".searchInput");
  const searchRemove = document.querySelector(".searchRemove");

  searchInput.addEventListener("keyup", function () {
    if (searchInput.value == "") {
      search.classList.remove("searchOn");
    } else {
      search.classList.add("searchOn");
    }
  });

  searchRemove.addEventListener("click", function () {
    searchInput.value = "";
    search.classList.remove("searchOn");
  });

  /* jQuery
    $('.searchInput').on('propertychange change keyup paste input', function(){
        if ($('.searchInput').val() == '') {
            $('.search').removeClass('searchOn');
        } else {
            $('.search').addClass('searchOn');
        }
    });

    $('.searchRemove').click(function() {
        $('.searchInput').val('');
        $('.search').removeClass('searchOn');
    });
    */
}

function sorting() {
  const tbody = document.querySelector(".sorting tbody");
  const sortBtn = document.querySelectorAll(".sortBtn");

  const table = [
    { score: 8, name: "Love Poem", artist: "?????????", date: 20200302 },
    { score: 1, name: "Darling", artist: "?????????", date: 20220423 },
    { score: 3, name: "Tomboy", artist: "?????????", date: 20220516 },
    { score: 10, name: "?????? ?????? ????????????", artist: "?????????", date: 20200915 },
    { score: 6, name: "????????????", artist: "??????", date: 20190821 },
    { score: 2, name: "LOVE DIVE", artist: "IVE", date: 20220517 },
    { score: 9, name: "???????????????", artist: "??????", date: 20170808 },
    { score: 5, name: "Feel My Rhythm", artist: "????????????", date: 20220221 },
    { score: 7, name: "Savage", artist: "aespa", date: 20211231 },
    { score: 4, name: "?????????", artist: "?????????", date: 20210819 },
  ];

  function tableM(table) {
    tr = "";
    table.forEach((item) => {
      tr +=
        "<tr>" +
        "<td>" +
        item.score +
        "</td>" +
        "<td>" +
        item.name +
        "</td>" +
        "<td>" +
        item.artist +
        "</td>" +
        "<td>" +
        item.date +
        "</td>" +
        "</tr>";
    });

    return tr;
  }

  const tableData = tableM(table);
  tbody.innerHTML = tableData;

  /* ????????? ?????? */
  let sortType = "init";
  let existItemId = "none";

  for (k = 0; k < sortBtn.length; k++) {
    sortBtn[k].addEventListener("click", function () {
      const itemId = this.id;
      const itemType = typeof table[0][itemId];
      //if(existItemId == 'none') {existItemId =  itemId};

      console.log(itemId, existItemId);

      if (existItemId == itemId) {
        sortTable();
      } else {
        sortType = "init";
        sortTable();
      }

      function sortTable() {
        if (itemType == "number") {
          if (sortType === "init") {
            sortType = "asc";
            table.sort(function (a, b) {
              return a[itemId] - b[itemId];
            });
            tbody.innerHTML = tableM(table);
          } else if (sortType === "asc") {
            sortType = "desc";
            table.sort(function (a, b) {
              return b[itemId] - a[itemId];
            });
            tbody.innerHTML = tableM(table);
          } else {
            sortType = "init";
            tbody.innerHTML = tableData;
          }
        } else if (itemType == "string") {
          if (sortType === "init") {
            sortType = "asc";
            table.sort(function (a, b) {
              let x = a[itemId].toLowerCase();
              let y = b[itemId].toLowerCase();

              if (x < y) {
                return -1;
              }

              if (x > y) {
                return 1;
              }
              return 0;
            });
            tbody.innerHTML = tableM(table);
          } else if (sortType === "asc") {
            sortType = "desc";
            table.sort(function (a, b) {
              let x = a[itemId].toLowerCase();
              let y = b[itemId].toLowerCase();

              if (x > y) {
                return -1;
              }

              if (x < y) {
                return 1;
              }
              return 0;
            });
            tbody.innerHTML = tableM(table);
          } else {
            sortType = "init";
            tbody.innerHTML = tableData;
          }
        }

        existItemId = itemId;
      }
    });
  }
}

function tab2() {
  const tab2img = document.getElementsByClassName("tab2img");
  const tab2box = document.querySelector(".tab2box");
  const tab2list = document.getElementsByClassName("tab2list");
  const tab2tab = document.getElementsByClassName("tab2tab");
  const winH = window.pageYOffset;

  // ????????? ??????
  for (l = 0; l < tab2img.length; l++) {
    if (tab2box.offsetWidth < tab2img[l].offsetWidth) {
      tab2img[l].style.width = "100%";
    }
  }

  // ??? ??????
  for (m = 0; m < tab2tab.length; m++) {
    tab2tab[m].addEventListener("click", function () {
      const tabBoxListLoca = this.offsetTop;
      const tabBoxListH = this.offsetHeight;
      console.log(tabBoxListLoca);
      window.scroll({
        top: tabBoxListLoca + tabBoxListH - 159,
        behavior: "smooth",
      });
    });
  }

  // ??? ?????????
  window.addEventListener("scroll", function () {
    for (n = 0; n < tab2list.length; n++) {
      const tabBoxListLoca = tab2list[n].getBoundingClientRect().top;
      const tabBoxListH = tab2list[n].offsetHeight;

      if (tabBoxListLoca < 160 && tabBoxListLoca + tabBoxListH > 160) {
        tab2list[n].classList.add("tab2on");
      } else {
        tab2list[n].classList.remove("tab2on");
      }
    }
  });
}

function lazyload() {
  document.addEventListener("DOMContentLoaded", function () {
    let lazyloadImg = document.querySelectorAll("img.lazy");
    let lazyloadThrottleTimeout;

    function lazyloading() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function () {
        let scrollTop = window.pageYOffset;
        lazyloadImg.forEach(function (img) {
          if (
            img.offsetTop < window.innerHeight + scrollTop &&
            img.offsetTop + img.offsetHeight > scrollTop
          ) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
          } /* else if (img.offsetTop + img.offsetHeight < scrollTop + 90) {
                        img.src = '';
                        img.classList.add('lazy');
                    } */
        });
        if (lazyloadImg.length == 0) {
          document.removeEventListener("scroll", lazyloading);
          window.removeEventListener("resize", lazyloading);
          window.removeEventListener("orientationChange", lazyloading);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyloading);
    window.addEventListener("resize", lazyloading);
    window.addEventListener("orientationChange", lazyloading);
  });
}

function dropdown() {
  const dropBox = document.querySelector(".dropDown");
  const dropBtn = document.querySelector(".dropBtn button");
  const optionBox = document.querySelector(".optionBox");
  const optionBtn = document.getElementsByClassName("optionBtn");

  function dropCreate() {
    optionBox.style.display = "block";
    setTimeout(function () {
      dropBox.classList.add("dropOn");
    });
    window.scrollTo({
      top: window.scrollY + optionBox.offsetHeight,
      behavior: "smooth",
    });
  }

  function dropRemove() {
    dropBox.classList.remove("dropOn");
    setTimeout(function () {
      optionBox.style.display = "none";
    }, 500);
  }

  dropBtn.addEventListener("click", function () {
    const dropChk = dropBox.classList.contains("dropOn");
    if (dropChk == false) {
      dropCreate();
    } else {
      dropRemove();
    }
  });

  dropBtn.addEventListener("blur", function () {
    dropRemove();
  });

  for (o = 0; o < optionBtn.length; o++) {
    optionBtn[o].addEventListener("click", function () {
      dropBtn.value = this.value;
      dropBtn.innerHTML = this.value;

      dropRemove();
    });
  }
}

function bookmark() {
  const body = document.querySelector("body");
  const markBtnList = document.querySelector(".markBtnList");
  const markAdd = document.querySelector(".markAdd");
  const markChange = document.querySelector(".markChange");
  const markPopWrap = document.querySelector(".markPopWrap");
  const markPopCancel = document.querySelector(".markPopCancel");
  const markPopSave = document.querySelector(".markPopSave");
  const markCheck = document.getElementsByClassName("mark");

  let markList = new Array();

  for (p = 0; p < markCheck.length; p++) {
    markCheck[p].addEventListener("change", function () {
      // ???????????? ?????? ??????, ?????? ?????? ??????
      const checkId = this.id;
      const checkValue = this.value;

      let markListCk = {
        id: checkId,
        value: checkValue,
      };

      if (this.checked == true) {
        markList.push(markListCk);
        if (markList.length > 6) {
          // 6??? ?????? ?????????, ????????? ?????? ?????? ?????? + ?????? ??????
          alert("6??? ?????? ???????????? ??? ????????????.");
          markList.splice(markList.length - 1, 1);
          this.checked = false;
        }
      } else {
        const markcckk = markList.findIndex(function (key) {
          return key.value === checkValue;
        });
        markList.splice(markcckk, 1);
      }
    });
  }

  function markPopInit() {
    // ?????? ??????, ???????????? ???????????? + ?????? ?????? ?????????
    markList.splice(0, markList.length);
    for (q = 0; q < markCheck.length; q++) {
      markCheck[q].checked = false;
    }
  }

  function markPopClose() {
    // ?????? ??????
    markPopWrap.classList.remove("markpopOn");
    body.classList.remove("bof");
  }

  markAdd.addEventListener("click", function () {
    // ?????? ??????
    markPopWrap.classList.add("markpopOn");
    body.classList.add("bof");
  });

  markChange.addEventListener("click", function () {
    // ?????? ??????
    markPopInit();
    markPopWrap.classList.add("markpopOn");
    body.classList.add("bof");
  });

  markPopCancel.addEventListener("click", function () {
    // ?????? ??????
    markPopClose();
  });

  markPopSave.addEventListener("click", function () {
    // ?????? ??????
    function markArray(markList) {
      mark = "";
      markList.forEach((item) => {
        mark +=
          '<li class="' +
          item.id +
          '">' +
          '<a href="javascript:;" class="markCheck">' +
          "<span>" +
          item.value +
          "</span>" +
          "<button>??????</button>" +
          "</a>" +
          "</li>";
      });

      return mark;
    }

    const markData = markArray(markList);
    markBtnList.innerHTML = markData;

    markPopClose();
    markDelete();
  });

  function markDelete() {
    let markDeleteBtn = document.querySelectorAll(".markBtnList button");

    for (pp = 0; pp < markDeleteBtn.length; pp++) {
      markDeleteBtn[pp].addEventListener("click", function () {
        if (markList.length > 0) {
          let Bm = this.parentNode.parentNode;
          let BmText = Bm.className;
          let BmIdx = markList.findIndex(function (key) {
            return key.id === BmText;
          });
          let BmCheck = markCheck.namedItem(BmText);
          markList.splice(BmIdx, 1);
          BmCheck.checked = false;
          Bm.remove();

          markDeleteBtn = document.querySelectorAll(".markBtnList button");
        }
        //console.log(markList, markDeleteBtn);
      });
    }
  }
}

function tableip() {
  const tableIadd = document.querySelector(".tableIadd");
  const tableIdel = document.querySelector(".tableIdel");
  const inputProd = document.getElementById("prod");
  const inputCate = document.getElementById("cate");
  const inputSale = document.getElementById("sale");
  const tbody = document.querySelector(".tableip tbody");
  const ipsortBtn = document.getElementsByClassName("sortBtn2");
  let inputNum = 0;

  let tableipA = new Array(); // ??????, ????????? ??????

  function tableipAdd(tableipA) {
    ipv = "";

    for (r = 0; r < tableipA.length; r++) {
      ipv +=
        "<tr>" +
        "<td>" +
        (tableipA[r].num + 1) +
        "</td>" +
        '<td><input type="checkbox" class="tableipCheck" value="' +
        tableipA[r].num +
        '"></td>' +
        "<td>" +
        tableipA[r].prod +
        "</td>" +
        "<td>" +
        tableipA[r].cate +
        "</td>" +
        "<td>" +
        tableipA[r].sale +
        "</td>" +
        "</tr>";
    }

    return ipv;
  }

  let tableipS = new Array(); // ????????? ??????

  function tableipSort(tableipS) {
    ipv = "";

    for (r = 0; r < tableipS.length; r++) {
      ipv +=
        "<tr>" +
        "<td>" +
        (tableipS[r].num + 1) +
        "</td>" +
        '<td><input type="checkbox" class="tableipCheck" value="' +
        tableipS[r].num +
        '"></td>' +
        "<td>" +
        tableipS[r].prod +
        "</td>" +
        "<td>" +
        tableipS[r].cate +
        "</td>" +
        "<td>" +
        tableipS[r].sale +
        "</td>" +
        "</tr>";
    }

    return ipv;
  }

  tableIadd.addEventListener("click", function () {
    let tableipValue = {
      num: inputNum,
      prod: inputProd.value,
      cate: inputCate.value,
      sale: inputSale.value,
    };

    if (
      inputProd.value != "" &&
      inputCate.value != "" &&
      inputSale.value != ""
    ) {
      tableipA.push(tableipValue);
      tableipS.push(tableipValue);

      const ipvData = tableipAdd(tableipA);
      tbody.innerHTML = ipvData;

      inputProd.value = "";
      inputCate.value = "";
      inputSale.value = "";

      inputNum += 1;
    } else {
      alert("?????? ????????? ??????????????????.");
    }
  });

  tableIdel.addEventListener("click", function () {
    const tableipCheck = document.querySelectorAll(".tableipCheck");
    for (s = 0; s < tableipCheck.length; s++) {
      if (tableipCheck[s].checked == true) {
        var checkat = parseInt(tableipCheck[s].value);

        let cccc = tableipA.findIndex(function (key) {
          return key["num"] === checkat;
        });
        tableipA.splice(cccc, 1);
        tableipS.splice(cccc, 1);

        const aaaa = tableipAdd(tableipA);
        tbody.innerHTML = aaaa;
      }
    }

    for (t = 0; t < tableipA.length; t++) {
      tableipA[t].num = t;

      inputNum = tableipA.length;
    }

    const bbbb = tableipAdd(tableipA);
    tbody.innerHTML = bbbb;
  });

  // ????????? ??????
  let sortType = "init";

  for (u = 0; u < ipsortBtn.length; u++) {
    ipsortBtn[u].addEventListener("click", function () {
      const itemId = this.id;
      const itemType = typeof tableipS[0][itemId];

      if (itemType == "number") {
        if (sortType === "init") {
          sortType = "asc";
          tableipS.sort(function (a, b) {
            return a[itemId] - b[itemId];
          });
          tbody.innerHTML = tableipSort(tableipS);
        } else if (sortType === "asc") {
          sortType = "desc";
          tableipS.sort(function (a, b) {
            return b[itemId] - a[itemId];
          });
          tbody.innerHTML = tableipSort(tableipS);
        } else {
          sortType = "init";
          tbody.innerHTML = tableipAdd(tableipA);
        }
      } else if (itemType == "string") {
        if (sortType === "init") {
          sortType = "asc";
          tableipS.sort(function (a, b) {
            let x = a[itemId].toLowerCase();
            let y = b[itemId].toLowerCase();

            if (x < y) {
              return -1;
            }

            if (x > y) {
              return 1;
            }
            return 0;
          });
          tbody.innerHTML = tableipSort(tableipS);
        } else if (sortType === "asc") {
          sortType = "desc";
          tableipS.sort(function (a, b) {
            let x = a[itemId].toLowerCase();
            let y = b[itemId].toLowerCase();

            if (x > y) {
              return -1;
            }

            if (x < y) {
              return 1;
            }
            return 0;
          });
          tbody.innerHTML = tableipSort(tableipS);
        } else {
          sortType = "init";
          tbody.innerHTML = tableipAdd(tableipA);
        }
      }
    });
  }
}

function toast() {
  const toastBtn = document.getElementsByClassName("toastBtn");
  const toastMax = 4;
  for (v = 0; v < toastBtn.length; v++) {
    toastBtn[v].addEventListener("click", function () {
      const toastPop = document.querySelector(".toastPop");
      const toastPopTxt = document.querySelectorAll(".toastPopTxt");

      let message = this.value;
      let p = document.createElement("p");

      p.classList.add("toastPopTxt");
      p.append(message);
      toastPop.append(p);

      p.style.display = "block";
      setTimeout(function () {
        p.classList.add("on");
      });

      if (toastMax < toastPopTxt.length) {
        toastPop.removeChild(toastPop.childNodes[1]);
      }

      setTimeout(function () {
        removeToast();
      }, 3000);

      function removeToast() {
        p.classList.remove("on");
        setTimeout(function () {
          p.style.display = "none";
          p.remove(0);
        }, 300);
      }
    });
  }
}

function layerPop() {
  const layerPopOpen = document.getElementsByClassName("layerPopOpen");
  const layerPopClose = document.getElementsByClassName("layerPopClose");
  const layerPopBox = document.getElementsByClassName("layerPopBox");
  const body = document.querySelector("body");

  function layerOC(a) {
    layerPopBox[0].style.display = a;
  }

  layerPopOpen[0].addEventListener("click", function () {
    layerOC("block");
    layerPopBox[0].classList.add("layerOn");
    body.classList.add("bof");
    layerPopClose[0].focus();
  });

  layerPopClose[0].addEventListener("click", function () {
    layerOC("none");
    layerPopBox[0].classList.remove("layerOn");
    body.classList.remove("bof");
    this.closest(".layerPopBox").parentNode.children[0].focus();
  });
}

function category() {
  const cate = document.getElementsByClassName("cateList");
  const cateList = document.querySelectorAll(".cateList > li");
  const cateTab = document.querySelectorAll(".cateList button");
  const cateCont = document.getElementsByClassName("cateCont");
  const cateDetail = document.querySelectorAll(".cateDetail");
  let detailCount = 0;

  console.log(cateDetail);

  cateList.forEach(function (list) {
    cateDetail.forEach(function (detail) {
      detail.getAttribute("cate-name");
      if (list.getAttribute("cate-name") == detail.getAttribute("cate-name")) {
        detailCount++;
      }
    });
    if (list.getAttribute("cate-name") == "??????") {
      list.children[0].children[0].innerText = cateDetail.length;
    } else {
      list.children[0].children[0].innerText = detailCount;
    }
    detailCount = 0;
  });

  cateTab.forEach(function (tab) {
    tab.addEventListener("click", function (e) {
      if (e.target.tagName == "BUTTON") {
        const detailList = e.target.parentNode;

        cateList.forEach(function (list) {
          list.removeAttribute("class");
        });
        detailList.classList.add("cateNow");

        cateCont[0].replaceChildren();

        if (
          detailList.getAttribute("cate-name") == "??????" &&
          e.target.children[0].innerText > 0
        ) {
          cateDetail.forEach(function (detail) {
            cateCont[0].append(detail);
          });
        } else if (e.target.children[0].innerText == 0) {
          cateCont[0].innerHTML =
            "<p>????????? " + e.target.children[0].innerText + "??? ?????????.</p>";
        } else {
          const details = [...cateDetail].filter(
            (obj) =>
              obj.getAttribute("cate-name") ==
              detailList.getAttribute("cate-name")
          );
          details.forEach(function (detail) {
            cateCont[0].append(detail);
          });
        }
      }
    });
  });
}

var ?????? = {
  name: "?????????",
  sayHi: function () {
    //console.log('?????? ?????? ' + this.name)
  },
};

??????.sayHi();

var ?????? = {
  data: [1, 2, 3, 4, 5],
};

??????????????? = function () {
  let sum = 0;
  ??????.data.forEach((a) => {
    sum += a;
  });
  console.log(sum);
};

???????????????();

/*
function ???????????????(data) {
    let sum = 0
    data.forEach(function (e) {
        sum = sum + e
    })
    console.log(sum)
}

???????????????(??????.data)
*/

var pants = 0;
var socks = 100;

function ???????????????(str, val1, val2) {
  if (val1 == 0) {
    console.log(str[0] + " ??? ????????????" + str[1] + val2);
  } else {
    console.log(str[0] + val1 + str[1] + val2);
  }
}
???????????????`??????${pants} ??????${socks}`;
