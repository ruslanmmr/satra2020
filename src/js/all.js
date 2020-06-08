var flag = 1;
var init_ind = 1;
var c_with_static = $(".brand_categories_block .categories_list").width();
$(document).ready(function () {
  navCategories();
  //calls functions
  headerNavigationDrop();
  headerCityDrop();
  navigation();
  showMoreCategory();
  sliderMobileSlick();
  navMobileCollapse();
  carouselProduct();
  
  //sliderGalleryProduct();
  //sliderWatched();
  btnLangMobile();
  sliderWith();
  scrollPanelBottom();
  sliderSimilar();
  // fixErAllUpThere();
  tabTopLine();
  dropSet();
  tabGalleryInformation();
  buttonManual();
  composition();
  selectCustomWidth();
  showMoreCharacteristics();
  modalMagnificBasket();
  tabMobileInfo();
  buttonOnClick();
  onScrollTab();
  buttonComparison();
  sliderGalleryProductModal();
  hoverList();
  colorChoice();
  tabsModal();
  toggleSearch();
  $.when(sliderGalleryProduct()).then(function () {
    setTimeout(function () {
      $(".modal_container").addClass("mfp-hide");
    }, 1000);
  });
  slider_init();
  fancybox_init();
  checkbox_plain_init();
  validate_init();
  mask_init();
  accordeon();
  handlers();
  //Brands
  showMoreTxt();
  itemPrev();
  //Brands collection
  if (document.documentElement.clientWidth > 578) {
    navFixed();
  }
  if (document.documentElement.clientWidth < 578) {
    mobileTabs();
  }
  slider();
  brandSlider();
  brandSliderInit();
  moreCards();
  tabs();
  //_________
  //Compare
  fixedCompare();
  compareSlider();
  autoPadding();
  if ($('.compare-header').length > 0) {
    blockTop = $('.compare-header').offset().top;
  }

  //_________

  //LC
  passShow();
  transform();
  linksUnav();
  mobileTabsLC();
  filter();
  orgButton();

  viewCards();
  //_________

  $header.init();
  //StickyOrderSummary();

});

$(window).on('load', function () {
  //calls functions
  panelScrollHorizontal();
  resizeHeader();
  resizeGallery();
  resizeNotification();
});

$(window).on('resize', function () {
  //calls functions
  resizeHeader();
  resizeGallery();
  btnLangMobile();
  // resizeNotification();
  nanoScrollModal();
  slider();
}).trigger('resize');

// $(window).scroll(function() {
// 	//calls functions
// });
$(window).on('resize', function () {
  // panelScrollHorizontal();
  resizeNotification();
  tabMobileInfo();
  modalMagnificBasket();

  slider();
  brandSliderInit();
  var c_with_static = $(".brand_categories_block .categories_list").width();

  if (!is.mobile()) {
    panelScrollHorizontalModal();
  }

  // close popup on resize
  $.magnificPopup.close();

  setTimeout(function () {
    if ($('.compare-header').length > 0) {
      blockTop = $('.compare-header').offset().top;
    }
    autoPadding();
    fixedCompare();
  }, 300);

  if (document.documentElement.clientWidth > 576) {
    $(".link_container .txt").css("height", "auto");
    mh = 0;
    setTimeout(function () {
      HeightTxt();
    }, 200);
  }
  transform();

});
$(window).scroll(function () {
  scrollTopLine();
  onScrollTab();
});

function print_doc() {
  window.print();
}


function handlers() {
  $('#asd_subscribe_submit').click(function () {
    if (!$.trim($('#asd_subscribe_form input[name$="asd_email"]').val()).length) {
      return false;
    }
    var arPost = {};
    $.each($('#asd_subscribe_form input'), function () {
      if ($(this).attr('type') != 'checkbox' || ($(this).attr('type') == 'checkbox' && $(this).is(':checked'))) {
        arPost[$(this).attr('name')] = $(this).val();
      }
    })
    $('#asd_subscribe_res').hide();
    $('#asd_subscribe_submit').attr('disabled', 'disabled');
    $.post('/local/components/satra/subscribe.quick.form/action.php', arPost,
      function (data) {
        $('#asd_subscribe_submit').removeAttr('disabled');
        if (data.status == 'error') {
          $('#asd_subscribe_res').css('color', 'red');
        } else {
          $('#asd_subscribe_res').css('color', 'green');
        }
        $('#asd_subscribe_res').html(data.message);
        $('#asd_subscribe_res').show();
      }, 'json');
    return false;
  });

  $(document).on('click', '.clear-input', function (e) {
    e.preventDefault();
    $(this).parents('.input-container').find('input').val('');
    $(this).parents('.input-container').removeClass('inp-filled')
  });

  $(document).on("click", ".city-header-val", function () {

    $.ajax({
      type: "POST",
      url: "/ajax/city_popup.php",
      success: function (res) {
        $.fancybox.open(res);
      }
    });

  });

  $(document).on("click", ".callback_link", function () {

    $.ajax({
      type: "POST",
      url: "/ajax/callback.php",
      success: function (res) {
        $.fancybox.open(res);
      }
    });

  });

  $(document).on("keyup", ".cities-search input", function () {
    var search_string = $(this).val();
    if (search_string.length > 2 || search_string.length == 0) {
      var data = {
        "search_str": search_string
      };
      $.ajax({
        data: data,
        type: "POST",
        url: "/ajax/search_city.php",
        success: function (res) {
          $(".popup-cities-list").html(res);
        }
      });
    }

    /*
    if (search_string!="") {
        var need_link = $(".popup-cities-list a[rel^="+search_string.toLowerCase()+"]");
        need_link.parent("li").siblings("li").css("display","none");
        need_link.parent("li").css("display","block");
    }
    else {
        $(".popup-cities-list li").css("display","block");
    }*/
  });

  $(document).on("click", ".cities-search .clear-input", function () {
    $(".popup-cities-list li").css("display", "block");
  });

  $(document).on("click", ".select-city-handler", function () {
    var locID = $(this).data("locid");
    var city = $(this).text();


    $(".city-header-val span").text(city);
    $(".mobile-city-header-val span").text(city);

    var $this = $(".navigation_side.mobile_navigation_side");
    $this.removeClass("show");

    $.fancybox.close();

    var data = {
      "city": city,
      "locID": locID
    };

    if ($("#ORDER_PROP_6").length > 0) {
      $("#ORDER_PROP_6").val(locID);
      submitForm("N");
    }

    $.ajax({
      data: data,
      type: "POST",
      url: "/ajax/set_city.php",
      success: function (res) {}
    });

  });

  $(document).on("click", ".clear_viewed_handler", function () {

    $("#viewed_products").remove();

    $.ajax({
      type: "POST",
      url: "/ajax/clear_viewed.php",
      success: function (res) {}
    });

  });

  $(document).on("click", ".loadmore-event", function (e) {
    e.preventDefault();

    $(this).text("Загрузка...");

    var url = $(this).data("str");

    $.ajax({
      type: "POST",
      url: url + "&AJAX_PAGER=Y",
      success: function (res) {
        $(".pagination-container").remove();
        $("#pager-out").append(res);
        history.pushState(null, null, url);
      }
    });

  });

  $(document).on("click", ".paginator a", function (e) {
    e.preventDefault();

    $(this).text("Загрузка...");

    var url = $(this).attr("href");

    var top = $(".filter-output").offset().top - 100;

    $.ajax({
      type: "POST",
      url: url + "&AJAX_PAGER=Y",
      success: function (res) {
        $("html, body").animate({
          scrollTop: top
        }, 500);

        $(".filter-output").html(res);
        history.pushState(null, null, url.replace('AJAX_PAGER=Y', ''));
      }
    });

  });

  $(".filter .tab_title .open_button, .filter .tab_title .section_title").on('click', function (e) {

    e.preventDefault();
    $(this).parents(".tab_title").toggleClass("title_active");
    if ($(this).parents(".tab_title").hasClass("title_active")) {
      $(this).parents(".tab_title").siblings().slideDown(300);
    } else {
      $(this).parents(".tab_title").siblings().slideUp(300);
    }
  });
  $(".filter .param_more").on('click', function (e) {
    e.preventDefault();
    $(this).siblings(".drop_down_list").slideToggle(300);
    $(this).toggleClass("param_more_active");
    if ($(this).hasClass("param_more_active")) {
      $(this).text("Свернуть");
    } else {
      $(this).text("Показать все");
    }
  });
  
  $(".filter_show_btn").on('click', function (e) {
    e.preventDefault();
    $(".left-sidebar").addClass("f_active");
    $('body').css('overflow', 'hidden');
  });


  $(".mobile_cat_show_btn").on('click', function (e) {
    e.preventDefault();
    $(".mobile_cat_list").slideToggle(300).toggleClass("f_active");
    if ($(".mobile_cat_list").hasClass("f_active")) {
      $(this).text("Скрыть категории");
    } else {
      $(this).text("Категории");
    }
  });

  $('.input_end, .input_start').on('input keyup', function (e) {
    $(this).addClass('active');
  });


  $(document).on("click", ".checkbox_item_filter", function (e) {

    var width = $(this).parents(".checkbox").width();
    var posTop = $(this).parents(".checkbox").position().top + 13;
    //var posTop2 = $(this).parents(".tab_content").position().top + posTop;
    var posLeft = $(this).parents(".checkbox").position().left + width + 24;
    $('.found_amount').css("top", posTop).css("left", posLeft).show();

  });

  $(document).on("click", ".all_filters", function(e) {
    e.preventDefault();
    $(".hidden-filters").slideToggle(300);
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      $(this).text("Скрыть все фильтры");
    } else {
      $(this).text("Показать все фильтры");
    }
  });


  $(document).on("submit.valid", ".form-ajax form", function (e) {
    e.preventDefault();

    var form = $(this);
    var action = form.find('.form-action').val();
    var place = form.find('.form-place').val();

    var data = form.serialize();


    $.ajax({
      type: "POST",
      url: action,
      data: data + "&web_form_submit=Y&submit=Y",
      success: function (data) {
        if (place == "popup") {
          $.fancybox.close();
          $.fancybox.open(data);
        } else {
          $("#" + place).html(data);
        }

      },
      error: function (data) {
        $(form).find('.js-form-submit').text('Произошла ошибка');
        setTimeout(function () {
          $(form).find('.js-form-submit').text('Отправить');
        }, 2000);
      }
    });


  });


  $(document).on("click", ".share-handler", function (e) {
    $(".share-modal").fadeToggle(200);
  });

  $(document).on("click", ".share-input .btn", function (e) {
    e.preventDefault();
    var link = $(this).prev();

    focus = document.activeElement;

    if (link) {
      link.select();
      document.execCommand('copy');
      focus.focus();

      $(this).text("Скопировано!");
    }

  });

  $(document).on("click", ".one-click-handler", function () {

    var data = {
      id: $(this).data("id")
    };

    $.ajax({
      type: "POST",
      data: data,
      url: "/ajax/one_click.php",
      success: function (res) {
        $.fancybox.open(res);
      }
    });

  });


  $(document).on("click", ".upsale-open-handler", function (e) {
    e.preventDefault();

    var data = {
      id: $(this).data("upsaleid"),
      name: $(this).data("group"),
    };

    $.ajax({
      type: "POST",
      data: data,
      url: "/ajax/open_upsale.php",
      success: function (res) {
        $.fancybox.open(res);
      }
    });

  });

  $(document).on("click", ".compare-all-params", function (e) {
    e.preventDefault();

    $(".modal_comparison_js .modal_nav_mobile .item").removeClass("active");
    $(".modal_comparison_js .list.parent .item").removeClass("active");

    $(this).parent().addClass("active");

    $(".modal_comparison_js .modal_nav .list_items .item").show();
    $(".modal_comparison_js .holder .onitem").show();
    $(".modal_comparison_js .holder-slider .onitem").show();

  });

  $(document).on("click", ".compare-main-params", function (e) {
    e.preventDefault();

    $(".modal_comparison_js .modal_nav_mobile .item").removeClass("active");
    $(".modal_comparison_js .list.parent .item").removeClass("active");

    $(this).parent().addClass("active");

    $(".modal_comparison_js .modal_nav .list_items .item").hide();
    $(".modal_comparison_js .modal_nav .list_items .item.main-params").show();

    $(".modal_comparison_js .holder .onitem").hide();
    $(".modal_comparison_js .holder-slider .onitem").hide();
    $(".modal_comparison_js .holder .onitem.main-params").show();
    $(".modal_comparison_js .holder-slider .onitem.main-params").show();


  });

  $(document).on("click", ".compare-raz-params", function (e) {
    e.preventDefault();

    $(".modal_comparison_js .modal_nav_mobile .item").removeClass("active");
    $(".modal_comparison_js .list.parent .item").removeClass("active");

    $(this).parent().addClass("active");

    $(".modal_comparison_js .modal_nav .list_items .item").hide();
    $(".modal_comparison_js .modal_nav .list_items .item.different").show();

    $(".modal_comparison_js .holder .onitem").hide();
    $(".modal_comparison_js .holder-slider .onitem").hide();
    $(".modal_comparison_js .holder .onitem.different").show();
    $(".modal_comparison_js .holder-slider .onitem.different").show();

  });

  $(document).on("click", ".alpha-handler a:not(.unactive)", function (e) {
    e.preventDefault();

    $(".alpha-handler a").removeClass("active_sort");
    $(this).addClass("active_sort");

    var url = "/brands/?liter=" + $(this).data("liter");

    var tile_handler = $(".sort-line .linage .block.link6");
    if (tile_handler.hasClass("active_sort")) {
      url += "&view=tile";
    }

    $.ajax({
      type: "POST",
      url: url + "&AJAX_PAGER=Y",
      success: function (res) {
        $(".filter-output").html(res);
        history.pushState(null, null, url.replace('AJAX_PAGER=Y', ''));
      }
    });

  });

  $(document).on("click", ".brand_country a", function (e) {
    e.preventDefault();

    $(".brand_country a").removeClass("active_sort");
    $(this).addClass("active_sort");

    var url = "/brands/?country=" + $(this).data("id");

    var tile_handler = $(".sort-line .linage .block.link6");
    if (tile_handler.hasClass("active_sort")) {
      url += "&view=tile";
    }

    $.ajax({
      type: "POST",
      url: url + "&AJAX_PAGER=Y",
      success: function (res) {
        $(".filter-output").html(res);
        history.pushState(null, null, url.replace('AJAX_PAGER=Y', ''));
      }
    });

  });

  $(document).on("click", ".brands-view-handler a", function (e) {
    e.preventDefault();

    $(".brands-view-handler a").removeClass("active_sort");
    $(this).addClass("active_sort");

    var url = "/brands/?view=" + $(this).data("view");

    var liter_handler = $(".alpha-handler a.active_sort").data("liter");
    url += "&liter=" + liter_handler;

    $.ajax({
      type: "POST",
      url: url + "&AJAX_PAGER=Y",
      success: function (res) {
        $(".filter-output").html(res);
        history.pushState(null, null, url.replace('AJAX_PAGER=Y', ''));
      }
    });

  });

  $(document).on('click', '.add-handler', function (e) {

    var data = {
      id: $(this).data("id"),
    };

    $.ajax({
      type: "POST",
      url: "/ajax/add_cart.php",
      data: data,
      dataType: "html",
      success: function (out) {

        $.ajax({
          type: "POST",
          url: "/ajax/thx_cart.php",
          data: data,
          dataType: "html",
          success: function (out) {
            $.fancybox.open(out);
          }
        });

        $.ajax({
          type: "POST",
          url: "/ajax/reloadsmallcart.php",
          data: '',
          dataType: "json",
          success: function (res) {
            $(".cart-quantity").html(res.QUANTITY);
            $(".cart-price").html(res.PRICE);
          }
        });

      }
    });

  });

  $(document).on('click', '.add_cart_upsale', function (e) {

    var upsaleid = $("#" + $(this).data("upsaleid"));
    var container = $(this).parents(".upsale_container");

    var checked = 0;
    var sum = 0;

    var data = {
      id: $(this).data("id")
    };

    $(this).removeClass("add_cart_upsale").addClass("del_cart_upsale");
    $(this).next().find("span").text("В корзине");

    container.find(".del_cart_upsale").each(function (index) {
      checked++;
      sum = sum + parseInt($(this).data("price"));
    });

    if (checked > 0) {
      upsaleid.addClass("selected").find(".button").text("Выбрано");
      upsaleid.find(".price.no_added").css("display", "none");
      upsaleid.find(".price.added").css("display", "block").html('<span><strong>Выбрано ' + checked + ' шт. <br> на ' + (sum).toLocaleString('ru') + ' <span class="rub">руб.</span></strong></span>');
    } else {
      upsaleid.removeClass("selected").find(".button").text("Выбрать");
      upsaleid.find(".price.no_added").css("display", "block");
      upsaleid.find(".price.added").css("display", "none").html('');
    }

    $.ajax({
      type: "POST",
      url: "/ajax/add_cart.php",
      data: data,
      dataType: "html",
      success: function (out) {

        $.ajax({
          type: "POST",
          url: "/ajax/reloadsmallcart.php",
          data: '',
          dataType: "json",
          success: function (res) {
            $(".cart-quantity").html(res.QUANTITY);
            $(".cart-price").html(res.PRICE);
          }
        });

      }
    });

  });

  $(document).on('click', '.del_cart_upsale', function (e) {

    var upsaleid = $("#" + $(this).data("upsaleid"));
    var container = $(this).parents(".upsale_container");

    var checked = 0;
    var sum = 0;

    var data = {
      id: $(this).data("id")
    };

    $(this).removeClass("del_cart_upsale").addClass("add_cart_upsale");
    $(this).next().find("span").text("Добавить в корзину");

    container.find(".del_cart_upsale").each(function (index) {
      checked++;
      sum = sum + parseInt($(this).data("price"));
    });

    if (checked > 0) {
      upsaleid.addClass("selected").find(".button").text("Выбрано");
      upsaleid.find(".price.no_added").css("display", "none");
      upsaleid.find(".price.added").css("display", "block").html('<span><strong>Выбрано ' + checked + ' шт. <br> на ' + (sum).toLocaleString('ru') + ' <span class="rub">руб.</span></strong></span>');
    } else {
      upsaleid.removeClass("selected").find(".button").text("Выбрать");
      upsaleid.find(".price.no_added").css("display", "block");
      upsaleid.find(".price.added").css("display", "none").html('');
    }

    $.ajax({
      type: "POST",
      url: "/ajax/del_cart_by_product.php",
      data: data,
      dataType: "html",
      success: function (out) {

        $.ajax({
          type: "POST",
          url: "/ajax/reloadsmallcart.php",
          data: '',
          dataType: "json",
          success: function (res) {
            $(".cart-quantity").html(res.QUANTITY);
            $(".cart-price").html(res.PRICE);
          }
        });

      }
    });

  });

  $(document).on('click', '.add-handler-detail', function (e) {

    e.preventDefault();

    var form = $(".detail-add-container");

    var data = form.serialize();



    $.ajax({
      type: "POST",
      url: "/ajax/add_cart_detail.php",
      data: data,
      dataType: "html",
      success: function (out) {

        $.ajax({
          type: "POST",
          url: "/ajax/thx_cart.php",
          data: data,
          dataType: "html",
          success: function (out) {
            $.fancybox.open(out);
          }
        });

        $.ajax({
          type: "POST",
          url: "/ajax/reloadsmallcart.php",
          data: '',
          dataType: "json",
          success: function (res) {
            $(".cart-quantity").html(res.QUANTITY);
            $(".cart-price").html(res.PRICE);
          }
        });

      }
    });

  });


  $(document).on('click', '.complect_or_handler', function (e) {

    var self = $(this);

    var id = $(this).data("id");
    var price = $(this).data("price");

    $(".complect_or_data").remove();

    $(".complect_or_item").find(".button").removeClass("selected").addClass("complect_or_handler").html("<i>+</i><span>В комплект</span>")
    $(this).removeClass("complect_or_handler").addClass("selected").html("<span>В комплекте</span>");

    $(".detail-add-container").append('<input type="hidden" class="complect_or_data" name="item_id[]" id="el_' + id + '" value="' + id + '">');
    $(".detail-add-container").append('<input type="hidden" class="complect_or_data" name="item_price[]" id="price_' + price + '" value="' + price + '">');


    var curVal = parseInt($("[name='items_quantity']").val());
    SetComplectPrice(curVal);
    SetComplectInfo(self, "or");

  });

  $(document).on('click', '.complect_and_handler', function (e) {

    var self = $(this);

    var id = $(this).data("id");
    var price = $(this).data("price");

    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected").html("<i>+</i><span>В комплект</span>");
      $("#el_" + id).remove();
      $("#price_" + id).remove();
    } else {
      $(this).addClass("selected").html("<span>В комплекте</span>");
      $(".detail-add-container").append('<input type="hidden" name="item_id[]" id="el_' + id + '" value="' + id + '">');
      $(".detail-add-container").append('<input type="hidden" name="item_price[]" id="price_' + id + '" value="' + price + '">');
    }

    var curVal = parseInt($("[name='items_quantity']").val());
    SetComplectPrice(curVal);
    SetComplectInfo(self, "and");

  });

  $(document).on('click', '.quantity_pl', function (e) {
    e.preventDefault();
    $(this).parent().find('.min').removeClass('disabled');
    var maxVal = $(this).parent().find('input').data("max");
    var curVal = parseInt($(this).parent().find('input').val()) + 1;

    $(this).parent().find('input').val(curVal);
    if (curVal === maxVal) {
      $(this).addClass('disabled');
    }

    SetComplectPrice(curVal);

  });

  $(document).on('click', '.quantity_min', function (e) {
    event.preventDefault();

    var curVal = parseInt($(this).parent().find('input').val()) - 1;

    $(this).parent().find('.quantity_pl').removeClass('disabled');
    if (curVal < 2) {
      curVal = 1;
      $(this).addClass('disabled')
    }

    $(this).parent().find('input').val(curVal);

    SetComplectPrice(curVal);

  });

  function SetComplectPrice(curVal) {
    var current_price;

    if ($("[name='nabor']").val() == "Y") {
      var total_price = 0;
      var quantity = 0;


      $("[name='item_price[]']").each(function (index) {
        total_price += parseInt($(this).val());
        quantity++;
      });

      quantity = quantity * curVal;

      $("[name='main_price']").val(total_price);

      current_price = (total_price * curVal).toLocaleString('ru') + '<span class="rub">руб.</span>';
      $(".complect_price").html(current_price);
      $(".complect_quantity").html(quantity);
    } else {
      current_price = (parseInt($("[name='main_price']").val()) * curVal).toLocaleString('ru') + '<span class="rub">руб.</span>';
      $(".complect_price").html(current_price);
      $(".complect_quantity").html(curVal);
    }
  }

  function SetComplectInfo(self, type) {

    var total_price = 0;
    var quantity = 0;


    $("[name='item_price[]']").each(function (index) {
      total_price += parseInt($(this).val());
      quantity++;
    });

    $(".price_main_text").html((total_price).toLocaleString('ru') + '<span class="rub">руб.</span>');
    $(".complect-info-quant").html(quantity);
    $(".complect-info-price").html((total_price).toLocaleString('ru'));

    var name = self.parents(".fixed_item").find(".title").find("a").text();
    var url = self.parents(".fixed_item").find(".title").find("a").attr("href");
    var img = self.parents(".fixed_item").find(".image_wrap").find("img").attr("src");
    var price = self.parents(".fixed_item").find(".price").children("span").html();
    var element;
    if (type == "or") {
      element = '<div class="thumb complect_or_thumb" id="thumb_"' + self.data("id") + '>\n';
    } else {
      element = '<div class="thumb" id="thumb_"' + self.data("id") + '>\n';
    }
    element +=
      '    <div class="headline">\n' +
      '        <span><a href="' + url + '" target="_blank">' + name + '</a></span>\n' +
      '    </div>\n' +
      '    <a href="' + url + '" class="image_wrap" target="_blank">\n' +
      '        <img src="' + img + '" alt="' + name + '">\n' +
      '    </a>\n' +
      '    <div class="price">' + price + '</div>\n' +
      '</div>';

    if (type == "or") {
      $(".complect_or_thumb").remove();
      $(".container_your_set").find(".thumbs_small").append(element);
    } else {
      if (self.hasClass("selected")) {
        $(".container_your_set").find(".thumbs_small").append(element);
      } else {
        $("#thumb_" + self.data("id")).remove();
      }
    }
  }


  $(document).on('click', '.compare-handler', function (e) {

    var data = {
      id: $(this).data("id"),
      action: "ADD_TO_COMPARE_LIST"
    };

    $(this).find("span").text("Добавлено");

    $.ajax({
      type: "POST",
      url: "/ajax/thx_compare.php",
      data: data,
      dataType: "html",
      success: function (out) {
        $.fancybox.open(out);
      }
    });

    $.ajax({
      type: "POST",
      url: "/ajax/addcompare.php",
      data: data,
      dataType: "html",
      success: function (out) {
        $('.small-compare-box').load('/ajax/reload_small_compare.php', function (r) {});
      }
    });

  });

  $(document).on('change', '.select-compare-list-handler', function (e) {

    $(this).val();

    var data = {
      CAT: $(this).val(),
      AJAX_FILTER: "Y"
    };

    $.ajax({
      type: "POST",
      url: "/compare/",
      data: data,
      dataType: "html",
      success: function (out) {
        $("#compare-out").html(out);
      }
    });

  });

  $(document).on('click', '.wish-handler', function (e) {
    e.preventDefault();
    var data = {
      id: $(this).data("id"),
    };

    $(this).find("span").text("Добавлено");

    $.ajax({
      type: "POST",
      url: "/ajax/thx_wish.php",
      data: data,
      dataType: "html",
      success: function (out) {
        $.fancybox.open(out);
      }
    });

    $.ajax({
      type: "POST",
      url: "/ajax/addwish.php",
      data: data,
      dataType: "html",
      success: function (out) {
        $('.small-wishlist-box').load('/ajax/reloadwish.php', function (r) {});
      }
    });

  });

  $(document).on('click', '.del-wish-handler', function (e) {
    e.preventDefault();
    var data = {
      id: $(this).data("id"),
    };


    var parent = $(this).parents(".block");

    parent.removeClass("active");
    parent.children(".overlay").fadeIn(300);
    if ($(window).width() > 576) {
      parent.find(".more_block").fadeOut(300);
    }

    $.ajax({
      type: "POST",
      url: "/ajax/del_wishlist.php",
      data: data,
      dataType: "html",
      success: function (out) {
        $('#small-wishlist-box').load('/ajax/reloadwish.php', function (r) {});
      }
    });

  });

  $(document).on('change', '.wish-filter-handler', function (e) {

    var data = {
      section: $(this).val(),
      custom_ajax: "Y"
    };


    $.ajax({
      type: "POST",
      url: "/wishlist/",
      data: data,
      dataType: "html",
      success: function (out) {
        $(".wishlist-out").html(out);
        if ($(".view-section a.active").text() == "Подробно") {
          $(".block_content_short").hide();
          $(".block_content_more").show();
          HeightCardsLC();
        }
      }
    });

  });

  $(document).on('click', '.wish-handler-list', function (e) {
    e.preventDefault();
    var data = {
      id: $(this).data("id"),
    };

    var parent = $(this).parents(".block");

    parent.addClass("active");
    parent.children(".overlay").fadeOut(300);
    if ($(window).width() > 576) {
      parent.find(".more_block").fadeIn(300);
    }

    $.ajax({
      type: "POST",
      url: "/ajax/addwish.php",
      data: data,
      dataType: "html",
      success: function (out) {
        $('#small-wishlist-box').load('/ajax/reloadwish.php', function (r) {});
      }
    });

  });


  $(document).on('keydown', '.filter .range .extra-controls input', function (e) {
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||

      (event.keyCode == 65 && event.ctrlKey === true) ||

      (event.keyCode >= 35 && event.keyCode <= 39) || event.keyCode == 190 || event.keyCode == 110 || event.keyCode == 188) {

      this.value = this.value.replace(/,/g, ".");

      if (this.value.match(/\./g).length >= 1) {
        this.value = this.value.substr(0, this.value.lastIndexOf("."));
      }

      return;
    } else {

      if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
        event.preventDefault();
      }
    }
  });

  $(document).on('change', '.with_old_price', function (e) {
    var self = $(this);
    setTimeout(function () {
      if (self.prop("checked")) {
        $(".old-price-min").val("1");
        $(".old-price-max").val("2000000");
        $(".input_s-filter_P1_MIN").keyup();
        $("[name='base_from']").change();
      } else {
        $(".old-price-min").val("");
        $(".old-price-max").val("");
        $(".input_s-filter_P1_MIN").keyup();
        $("[name='base_from']").change();
      }
    }, 10);

  });

  $(document).on('click', '.dropdown_serie', function (e) {
    console.log("a");
    $(this).toggleClass("active-drop");
    $(this).next(".param_list").slideToggle();
  });

  $(document).on('click', '.dropdown_serie label, .dropdown_serie input', function (e) {
    e.stopPropagation();
  });



  $(document).on('submit', '.register-form', function (e) {
    var form = $(this);

    var login = form.find("[name='PERSONAL_PHONE']").val();
    form.find("[name='USER_LOGIN']").val(login);
    return true;

  });

  $(document).on('click', '.password_resend_btn', function (e) {
    e.preventDefault();

    var phone = $("[name='USER_LOGIN']").val();

    if (phone != "") {

      $(this).prop("disabled", true);

      var data = {
        "login": phone
      };

      $.ajax({
        type: "POST",
        url: "/ajax/change_password.php",
        data: data,
        dataType: "html",
        success: function (out) {
          $(".password_sended").html(out).show();
        }
      });
    }
  });

  $(document).on("scroll", ".similar_box .columns_similar .scroll-pane", function () {

    $(".similar_box .single_similar .jspPane").css("top", $(this).find(".jspPane").css("top"));

  });

  $(document).on("scroll", ".similar_box .single_similar .scroll-pane", function () {

    $(".similar_box .columns_similar .jspPane").css("top", $(this).find(".jspPane").css("top"));

  });


  $('.dostavka-category-selector').hover(function () {

    $(this)
      .addClass("text-bold")
      .siblings()
      .removeClass("text-bold");

    $(this).closest('.dostavka-category-card').find(".dostavka-category-item-list")
      .removeClass('dostavka-category-item-list-active')
      .eq($(this).index())
      .addClass('dostavka-category-item-list-active');
  });

  var rightListItems = $('.dostavka-item-list-block');

  rightListItems.hover(function () {
    $(this).addClass('text-blue-active').siblings().removeClass('text-blue-active');

    $(this).find('div:last-child').addClass('display-none');

    $(this).find('.dostavka-list-item-sub-menu').addClass('dostavka-list-item-sub-menu-active');
  });

  rightListItems.mouseleave(function () {
    $(this).removeClass('text-blue-active');

    $(this).find('.dostavka-list-item-sub-menu').removeClass('dostavka-list-item-sub-menu-active');

    $(this).find('div:last-child').removeClass('display-none');
  });

  $('.group-link').click(function () {
    var linkId = $(this)[0].id;

    var tableGroupId = "#table-group-${linkId[linkId.length-1]}";

    $(tableGroupId).toggleClass('active-table-group');

    $(this).find('.group-link-arrow').toggleClass('group-link-arrow-closed');
  });

  $(document).on("click", ".price-card-pointer", function () {
    $(this).toggleClass("active");
    $(this).next(".price-card-hidden").slideToggle();
  });

  $(document).on("click", ".mitr .header-tab-item", function () {
    $(this).addClass("header-tab-item-active")
      .siblings()
      .removeClass("header-tab-item-active");

    $(this).closest('.content-body-mitr').find('.tab-content')
      .removeClass('tab-content-active')
      .eq($(this).index())
      .addClass('tab-content-active')
  });

  $(document).on("click", ".go-to-complect-handler", function (e) {
    e.preventDefault();
    window.location.href = $(this).data("url");
  });

  $(document).on("click", ".go-to-complects-handler", function (e) {
    e.preventDefault();

    $(".complect-tab").click();

    $('html, body').animate({
      scrollTop: $(".detail-main-tabs").offset().top - 50
    }, 800, function () {});

  });


  $(document).on("click", ".detail-main-tabs--item", function () {
    $(this).addClass("active")
      .siblings()
      .removeClass("active");

    $(this).closest('.product-wrap').find('.tab-content-product')
      .removeClass('active')
      .eq($(this).index())
      .addClass('active');

    $('.scroll-pane.horizontal-only.def').jScrollPane();

  });

  $(document).on("click", ".modal_picture-har-handler", function () {

    $(this).toggleClass("opened");
    $(".modal_picture-har").toggleClass("opened");
    $(".modal_picture-slider-wrap").toggleClass("opened");

    delay_slider_resize(function () {
      $(".swiper-slider.slider-events-added").each(function () {
        if ($(this).data("reinitialize-on-resize") && typeof $(this).find(".swiper-container")[0].swiper !== "undefined") {
          var swiper = $(this).find(".swiper-container")[0].swiper;
          swiper.destroy(true, true);
          slider_swiper_init($(this));
        }
      });
    }, 10);

  });


};

function ShowLoader() {

  $("body").append('<div class="loader-overlay"></div><svg version="1.1" id="svgloader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"></svg>');

  var s = Snap("#svgloader");

  s.attr({
    viewBox: "0 0 100 100"
  });

  var square = s.rect(10, 0, 100, 100);
  square.attr({
    fill: "#bdbdbd"
  });

  var clipG = s.path("M9.603,91.074V50.517c0-24.382-2.55-16.812,24.541-39.442C42.669,3.984,46.335,0.319,49.92,0H50 c3.585,0.239,7.33,3.905,15.856,11.075c27.091,22.629,24.542,15.06,24.542,39.442v40.557c0,0.319,0.079,0.717,0.079,1.036 c0,4.382-3.505,7.89-7.888,7.89H49.92V81.194c12.59-0.08,25.179-7.81,23.028-22.948c-0.558-4.222-2.55-8.446-5.817-12.589 c-1.992-2.63-4.223-5.339-6.374-8.367c-2.949-4.064-5.498-7.251-7.729-11.553l-0.957-1.913l-0.877-1.992l-0.876-1.992L50,18.804 l-0.08,0.16V0v18.965l-0.319,0.876l-0.877,1.992l-0.876,1.992l-0.877,1.913c-2.231,4.302-4.781,7.489-7.729,11.553 c-2.231,3.028-4.462,5.737-6.454,8.367c-3.426,4.382-5.418,8.844-5.896,13.306c-1.514,14.9,10.756,22.231,23.027,22.231v18.804 H17.411c-4.383,0-7.889-3.507-7.889-7.89v-0.123C9.524,91.693,9.533,91.353,9.603,91.074L9.603,91.074z");
  clipG.attr({
    fill: "#ffffff"
  });

  var rect = s.rect(10, 99, 99, 99).attr({
    fill: '#2A69A5',
    opacity: 1
  });

  var g = s.group(square, rect);

  var endAnim = function () {
    rect.animate({
      height: 0
    }, 500, mina.ease, function () {
      rect.attr({
        y: 100
      });
    });
  };

  rect.attr({
    height: 100
  });
  rect.animate({
    y: 0
  }, 500, mina.ease, endAnim);

  g.attr({
    mask: clipG
  });

  var timerId = setInterval(function () {
    rect.attr({
      height: 100
    });
    rect.animate({
      y: 0
    }, 500, mina.ease, endAnim);
  }, 1100);

  setTimeout(function () {
    clearInterval(timerId);
  }, 6000);

}

function HideLoader() {
  $(".loader-overlay").remove();
  $("#svgloader").remove();
}

$(document).ready(function () {
  sliderSidebar();
  moreSidebar();
  selectedSort();
  showMoreInfo();
});


function StickyOrderSummary() {
  if ($('.order-summary').length > 0) {

    var a = document.querySelector('.order-summary'),
      b = null,
      P = 0;
    Ascroll();
    window.addEventListener('scroll', Ascroll, false);
    document.body.addEventListener('scroll', Ascroll, false);

    function Ascroll() {
      if (document.documentElement.clientWidth > 980) {
        if (b == null) {
          var Sa = getComputedStyle(a, ''),
            s = '';
          for (var i = 0; i < Sa.length; i++) {
            if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
              s += Sa[i] + ': ' + Sa.getPropertyValue(Sa[i]) + '; '
            }
          }
          b = document.createElement('div');
          b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
          a.insertBefore(b, a.firstChild);
          var l = a.childNodes.length;
          for (var i = 1; i < l; i++) {
            b.appendChild(a.childNodes[1]);
          }
          a.style.height = b.getBoundingClientRect().height + 'px';
          a.style.padding = '0';
          a.style.border = '0';
        }
        var Ra = a.getBoundingClientRect(),
          R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('.order-left').getBoundingClientRect().bottom);
        if ((Ra.top - P) <= 0) {
          if ((Ra.top - P) <= R) {
            b.className = 'stop';
            b.style.top = -R + 'px';
          } else {
            b.className = 'sticky';
            b.style.top = P + 'px';
          }
        } else {
          b.className = '';
          b.style.top = '';
        }
        window.addEventListener('resize', function () {
          a.children[0].style.width = getComputedStyle(a, '').width
        }, false);
      }
    }
  }
}

//слайдер сайдбара
function sliderSidebar() {
  $('.slider_sidebar').slick({
    dots: true,
    infinite: true,
    speed: 300,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  });
};

//кнопки
function moreSidebar() {
  $(".popular_categories_block .param_more").on('click', function () {
    $(this).siblings(".dropdown_list").slideToggle(300);
    $(this).toggleClass("param_more_active");
    if ($(this).hasClass("param_more_active")) {
      $(this).text("Свернуть");
    } else {
      $(this).text("Все бренды");
    }
  });
};

function selectedSort() {
  $(".sort-line .selected_btn").on('click', function () {
    var drop = $(this).siblings(".sort_dropdown");
    if (drop.hasClass("open")) {
      drop.removeClass("open")
    } else {
      $('.sort_dropdown').removeClass("open");
      drop.addClass("open");
    }
  });
};

function showMoreInfo() {
  var nav = $('.block_more_info .category_list'),
    animateTime = 500,
    navLink = $('.block_more_info .button_more');

  navLink.on('click', function () {
    if (nav.height() === 72) {
      autoHeightAnimate(nav, animateTime);
    } else {
      nav.stop().animate({
        height: '72'
      }, animateTime);
    }
  });
};

function discharge() {
  $('input').val(String($('input').val().replace(/[^0-9.]/g, '')).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
}

function headerNavigationDrop() {
  $(".selected").on('click', function () {
    var $this = $(this).parent();

    if ($this.hasClass("open")) {
      $this.removeClass("open");
    } else {
      $this.addClass("open");
    }
  });

  $(".wrapper").on("click", function (event) {
    if (!$(event.target).closest(".selected, .header_dropdown").length) {
      if ($(".header_navigation .item").hasClass("open")) {
        $(".header_navigation .item").removeClass("open");
      }
    }
  });
}

function headerCityDrop() {
  $(".city_label").on('click', function () {
    var $this = $(this).parent();

    if ($this.hasClass("open")) {
      $this.removeClass("open");
    } else {
      $this.addClass("open");
    }
  });

  $(".wrapper").on("click", function (event) {
    if (!$(event.target).closest(".city_label, .header_dropdown").length) {
      if ($(".header_city_select").hasClass("open")) {
        $(".header_city_select").removeClass("open");
      }
    }
  });
}

function resizeHeader() {
  var scrollDiv = document.createElement("div");

  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  if ($(window).width() < (993 - scrollbarWidth)) {
    $('.header_city_select').prependTo('.header .holder');
  } else {
    $('.header_city_select').insertBefore('.header .header_phones');
  }
}

function resizeGallery() {
  var scrollDiv = document.createElement("div");

  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  if ($(window).width() < (1001 - scrollbarWidth)) {
    // $('.gallery_information').appendTo('.container_gallery');

    //$('.gallery_information_tabs').insertBefore('.information_product_box');
    $('.gallery_information_tabs').hide();
    $('.modal_information_tabs').insertAfter('.modal_main');
    // $('.inform_gallery').appendTo('.form_cash');
  } else {
    //$('.gallery_information_tabs').appendTo('.gallery_information');
    $('.gallery_information_tabs').show();
    $('.modal_information_tabs').insertAfter('.modal_information .columns');
    // $('.inform_gallery').prependTo('.gallery_information_columns');
  }
}

function resizeNotification() {
  var scrollDiv = document.createElement("div");

  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  if ($(window).width() < (568 - scrollbarWidth)) {
    $('#notification_container').insertAfter('#gallery_info_mobile');
    // console.log(1);
  } else {
    $('#notification_container').insertAfter('#gallery');
    // console.log(2);
  }
}

function tabMobileInfo() {
  $(".tabs_info_mobile .tab_title").on('touch click', function () {
    var $this = $(this);
    $this.parent('.tab_info_item').siblings().removeClass('active');
    $this.parent('.tab_info_item').addClass('active');

    // if ($this.parent('.tab_info_item').hasClass('active')) {
    // 	$this.parent('.tab_info_item').removeClass('active');
    // } else {
    // 	$this.parent('.tab_info_item').addClass('active');
    // }
  });
}

function navMobileCollapse() {
  $('.mobile_categories_list .button').on('click', function () {
    var $this = $(this);
    var nav = $this.parent().find(".drop"),
      animateTime = 500;

    if ($this.parent(".item").hasClass("open")) {
      $this.parent('.item').removeClass('open');
      nav.stop().animate({
        height: '0'
      }, animateTime);
    } else {
      $this.parent('.item').addClass('open');
      autoHeightAnimate(nav, animateTime);
    }

    return false;
  });
}

function showMoreCharacteristics() {
  $(".show_characteristics").on('click', function () {

    $(".information_product_box table tr.hid").toggle();
    $(".information_product_box .headline.hid").toggle();

    if ($(this).text() == "Показать все") {
      $(this).text("Скрыть");
    } else {
      $(this).text("Показать все");
    }

  });
}

function showMoreCategory() {
  var nav = $('.category_list'),
    animateTime = 500,
    navLink = $('.button_more');

  navLink.on('click', function () {
    if (nav.height() === 72) {
      autoHeightAnimate(nav, animateTime);
    } else {
      nav.stop().animate({
        height: '72'
      }, animateTime);
    }
  });

  //
  $(".button_more").on('click', function () {
    var $this = $(this);
    var $thisParent = $(this).parent().find(".category_list");
    var button = $(this).find("span");

    if ($thisParent.hasClass("open")) {
      $this.removeClass("open");
      $thisParent.removeClass("open");
      button.text('Развернуть');
    } else {
      $this.addClass("open");
      $thisParent.addClass("open");
      button.text('Свернуть');
    }
  });
}

/* Function to animate height: auto */
function autoHeightAnimate(element, time) {
  var curHeight = element.height(), // Get Default Height
    autoHeight = element.css('height', 'auto').height(); // Get Auto Height

  element.height(curHeight); // Reset to Default Height
  element.stop().animate({
    height: autoHeight
  }, time); // Animate to Auto Height
}

function sliderMobileSlick() {
  $('.slider_mobile').slick({
    dots: true,
    infinite: false,
    speed: 300,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1
  });
}

function carouselProduct() {
  $('#carousel').on('slide.bs.carousel', function () {
    $('#carousel .carousel-inner').css('overflow', 'hidden');
  });

  $('#carousel').on('slid.bs.carousel', function () {
    $('#carousel .carousel-inner').css('overflow', 'visible');
  });
}

function modalMagnificBasket() {
  $('a.hinge').magnificPopup({
    mainClass: 'mfp-move-horizontal',
    removalDelay: 1000, //delay removal by X to allow out-animation
    closeBtnInside: true,
    callbacks: {
      // beforeOpen: function() {
      // 	$('.scroll-pane.horizontal-only').jScrollPane({
      // 		autoReinitialise: true
      // 	});
      // 	console.log(3);
      // },
      beforeClose: function () {
        this.content.addClass('hinge');
      },
      open: function () {
        // change: function() {

        //height comparison
        heightComparison();

        //nano modal
        nanoScrollModal();

        //scrollpane modal
        if (!is.mobile()) {
          panelScrollHorizontalModal();
        }

        // positionModalOption();

        // sliderGalleryProductModal();
        // buttonListModalOption();

        $('.closeMagnificButton').on('click', function () {
          $.magnificPopup.close();
        });

        //hint called
        if ($("div").is(".hint")) {
          hint();
        } else {
          return false;
        }

        if ($("div").is(".hint_comparison")) {
          hintComparison();
        } else {
          return false;
        }

        $(window).on('resize', function () {
          if ($("div").is(".hint")) {
            hint();
          } else {
            return false;
          }

          if ($("div").is(".hint_comparison")) {
            hintComparison();
          } else {
            return false;
          }
        });
        //

        //
        $('.slider_gallery').slick('setPosition');
        var slideIndex = this.index;
        // console.log(slideIndex);
        setTimeout(function () {
          $('.slider_gallery').slick('slickGoTo', parseInt(slideIndex), true);
        }, 100);
      },
      close: function () {
        this.content.removeClass('hinge');
        $('.gallery_modal').slick('unslick');

        //
        $(".preview_comparison_list").hide();
        $(".button_item").removeClass("accept");
        $(".button.dropped_b").removeClass('open');
        $(".comparison_item").removeClass('selected');
        $(".comparison_list").removeClass('hidden_list');
        $("body").removeClass('none_scroll');

      }
    },
    midClick: true,
    fixedContentPos: true
  });
}

function nanoScrollModal() {
  var width = $(window).width();
  // var height = $(window).height();
  $(".nano").nanoScroller({
    alwaysVisible: true
  });
  if (is.mobile()) {
    $(".nano").nanoScroller({
      destroy: true
    });
  }

  // if (width < 1025) {
  // 	// $(".nano").nanoScroller({
  // 	// 	destroy: true,
  // 	// 	alwaysVisible: false
  // 	// });
  // 	// console.log(1);
  // 	$(".modal_comparison .nano-pane").css("transform", "translateX(100%)");
  // } else {

  // 	$(".modal_comparison .nano-pane").css("transform", "translateX(0%)");
  // 	// console.log(2);
  // }
  // $(".nano").nanoScroller({
  // 	alwaysVisible: true
  // });
}

function sliderGalleryProduct() {
  $('.slider_gallery').slick({
    dots: false,
    infinite: false,
    speed: 300,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider_gallery_nav'
  });
  $('.slider_gallery_nav').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.slider_gallery',
    dots: false,
    arrows: false,
    infinite: false,
    focusOnSelect: true,
    responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 4
        }
      },
    ]
  });

  // $(window).on('resize', function () {
  // 	if ($(window).width() < 1001) {
  // 		carouselNav.slick("unslick");
  // 	} else {
  // 		carouselNav.slick();
  // 	}
  // });
}

function sliderWatched() {
  $('.slider_watched').slick({
    dots: true,
    infinite: true,
    speed: 300,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      // {
      // 	breakpoint: 568,
      // 	settings: "unslick"
      // },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  });

  $('.slider_brands').slick({
    dots: false,
    infinite: true,
    speed: 300,
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      // {
      // 	breakpoint: 568,
      // 	settings: "unslick"
      // },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  });
}

function btnLangMobile() {
  $(".btn_lang").on('click', function () {
    var $this = $(this).parents(".navigation_side");
    $this.addClass("show");
  });
  $(".btn_back.btn_back_city").on('click', function () {
    var $this = $(this).parents(".navigation_side");
    $this.removeClass("show");
  });

  $(".mobile-catalog-menu-root-handler a").on('click', function () {
    var $this = $(this).parents(".mobile-catalog-menu-root-handler").addClass("opened");
  });

  $(".btn_back.btn_back_catalog").on('click', function () {
    $(this).parents(".mobile-catalog-menu-root-handler").removeClass("opened");
  });

  $(".btn_back.btn_back_filter").on('click', function(event) {
    event.preventDefault();
    $(".left-sidebar").removeClass("f_active");
    $("body").css('overflow', 'auto');
  });
}

function sliderWith() {
  let $sliders = $('.slider_with');
  $sliders.each(function(){
    let $slider = $(this),  
        $prev = $slider.siblings('.arr_left_with'),
        $next = $slider.siblings('.arr_right_with');

    $slider.slick({
      dots: false,
      infinite: true,
      speed: 300,
      arrows: true,
      prevArrow: $prev,
      nextArrow: $next,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1275,
          settings: {
            dots: true,
            arrows: false
          }
        },
        {
          breakpoint: 992,
          settings: {
            dots: true,
            arrows: false,
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            dots: true,
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    });
  })
}

function scrollPanelBottom() {
  $(window).scroll(function () {
    var winHeight = $(this).height();
    var scrollTop = $(this).scrollTop();

    console.log('++')

    $(".footer").each(function (index) {
      var elemHeight = $(this).height();
      var elementTop = $(this).position().top + 60;

      if (elementTop < scrollTop + winHeight && scrollTop < elementTop + elemHeight) {
        $(this).addClass("unfixed");
      } else {
        $(this).removeClass("unfixed");
      }
    });
  });
}

function hoverList() {
  // $(".list_items .item").on('mouseenter', function(){
  // 	var itemIndex = $(this).index();
  // 	$(this).css('background', '#fafafa');

  // 	$(".comparison_list").each(function(){
  // 		$(this).find(".item").eq(itemIndex).css('background', '#fafafa');
  // 	});
  // }).on('mouseleave', function(e){
  // 	var itemIndex = $(this).index();
  // 	$(this).css('background', 'none');

  // 	$(".comparison_list").each(function(){
  // 		$(this).find(".item").eq(itemIndex).css('background', 'none');
  // 	});
  // });
  $(".onitem").on('mouseenter', function () {
    var itemIndex = $(this).index();
    // $(this).css('background', '#fafafa');

    $(".list_items").each(function () {
      $(this).find(".onitem").eq(itemIndex).css('background', '#fafafa');
    });
    $(".comparison_list").each(function () {
      $(this).find(".onitem").eq(itemIndex).css('background', '#fafafa');
    });
  }).on('mouseleave', function (e) {
    var itemIndex = $(this).index();
    $(this).css('background', 'none');

    $(".list_items").each(function () {
      $(this).find(".onitem").eq(itemIndex).css('background', 'none');
    });
    $(".comparison_list").each(function () {
      $(this).find(".item").eq(itemIndex).css('background', 'none');
    });
  });
}

// //jscrollpane horizontal
function panelScrollHorizontal() {
  $('.scroll-pane.horizontal-only.def').jScrollPane({
    //autoReinitialise: true,
    //autoReinitialiseDelay: 5000
  });
}

// tabsModal
function tabsModal() {
  $(".button_tab").on('click', function () {
    var $this = $(this);
    var linkId = $this.attr('href');

    $this.closest('.parent').find('.item').removeClass('active');
    $this.parent().addClass('active');

    $this.parents('.modal_comparison').find('.tab_pane').removeClass('active');
    $(linkId).addClass('active');

    // console.log(linkId);

    $(".comparison_list").removeClass("hidden_list");
    heightComparison();
    $(".preview_comparison_list").hide();
    $(".button_item").removeClass("accept");
    $(".button.dropped_b").removeClass('open');
    $(".comparison_item").removeClass('selected');
    $(".comparison_list").removeClass('hidden_list');
    $("body").removeClass('none_scroll');

    if (!is.mobile()) {
      panelScrollHorizontalModal();
    }

    // if (tabContent.is(':visible') == true) {
    // 	panelScrollHorizontalModal();
    // }

    return false;
  });
}

//scrollpane hor modal
function panelScrollHorizontalModal() {

  var element = $('.scroll-pane.horizontal-only.modal-mod').jScrollPane({
    // autoReinitialise: true
  });
  // var api = element.data('jsp');

  // var width = $(window).width();
  // var height = $(window).height();
  // if (is.mobile()){

  // }

  // if (width < 1025) {
  // 	api.destroy();
  // } else {
  // 	element.data('jsp');
  // 	// api.reinitialise();
  // }
  // $('.scroll-pane.horizontal-only.modal-mod').jScrollPane({
  // 	autoReinitialise: true
  // });
}

//
function heightComparison() {
  var heightItem = $(".modal_comparison .holder").height();

  $(".modal_comparison .jspContainer").css("height", heightItem);
}

// //jscrollpane vertical
// function panelScrollModal() {
// 	console.log(1);
// 	$('.scroll-pane').jScrollPane({
// 		autoReinitialise: true
// 	});
// }

function sliderSimilar() {
  $('.slider_similar').slick({
    dots: true,
    infinite: true,
    speed: 300,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1
  });
}

// function fixErAllUpThere() {
// 	var leftovers = $(".thumbs_small .thumb").removeAttr("style").length % 4;

// 	if (leftovers > 0) {
// 		var newWidth = 100 / leftovers;
// 		var fromHere = $(".thumbs_small .thumb").length - leftovers + 1;
// 		$(".thumbs_small .thumb:nth-child(n+" + fromHere + ")").css("width", newWidth + "%");

// 		console.log(1);
// 	}
// };

function scrollTopLine() {
  if ($(window).scrollTop() > 120) {
    $('.top-line').addClass('fixed');
  } else if ($(window).scrollTop() <= 120) {
    $('.top-line').removeClass('fixed');
  }
}

function tabTopLine() {
  $(".scroll-link").on('click', function (event) {
    var $this = $(this);

    $this.parent('.item').siblings().removeClass('active');
    if ($this.parent('.item').hasClass('active')) {
      $this.parent('.item').removeClass('active');
    } else {
      $this.parent('.item').addClass('active');
    }

    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top - 50
      }, 800, function () {});
    }
  });
}

function onScrollTab(event) {
  /*var scrollPos = $(document).scrollTop() + 60;

  $('.top-line-menuu .item').each(function () {
  	var currLink = $(this);
  	var refElement = $(currLink.find(".scroll-link").attr("href"));

  	if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
  		$('.top-line-menuu .item').removeClass("active");
  		currLink.addClass("active");
  	}
  	else{
  		currLink.removeClass("active");
  	}
  });*/
}

function dropSet() {
  $(".button_setting .button").on('click', function () {
    var $this = $(this);
    $this.parents('.thumb').siblings().removeClass('show');

    if ($this.parents('.thumb').hasClass('show')) {
      $this.parents('.thumb').removeClass('show');
    } else {
      $this.parents('.thumb').addClass('show');
    }
  });
  $(".wrapper").on("click", function (event) {
    if (!$(event.target).closest(".button_setting .button, .droppable_setting").length) {
      if ($(".thumbs_small .thumb").hasClass("show")) {
        $(".thumbs_small .thumb").removeClass("show");
      }
    }
  });
}

//tabs gallery
function tabGalleryInformation() {
  // $(".list_tabs a").on('click', function(){

  // 	var $this = $(this);
  // 	var linkId = $this.attr('href');

  // 	$this.parent('.item_tab').siblings().removeClass('selected');
  // 	$this.parent('.item_tab').addClass('selected');

  // 	$('.box_tab').removeClass('active');
  // 	$(linkId).addClass('active');

  // 	return false;
  // });

  $(".gallery_information_tabs .list_tabs a").on('click', function () {

    var $this = $(this);
    var linkId = $this.attr('href');

    $this.parent('.item_tab').siblings().removeClass('selected');
    $this.parent('.item_tab').addClass('selected');

    $('.gallery_information_tabs .box_tab').removeClass('active');
    $(linkId).addClass('active');

    return false;
  });

  $(".modal_information_tabs .list_tabs a").on('click', function () {

    var $this = $(this);
    var linkId = $this.attr('href');

    $this.parent('.item_tab').siblings().removeClass('selected');
    $this.parent('.item_tab').addClass('selected');

    $('.modal_information_tabs .box_tab').removeClass('active');
    $(linkId).addClass('active');

    return false;
  });
}

//tabs gallery
function buttonManual() {
  $(".button_manual").on('click', function () {
    var $this = $(this).parents(".button_section");

    if ($this.hasClass('show')) {
      $this.removeClass('show');
    } else {
      $this.addClass('show');
    }
  });
  $(".wrapper").on("click", function (event) {
    if (!$(event.target).closest(".button_manual, .dropdown_menu").length) {
      if ($(".button_section").hasClass("show")) {
        $(".button_section").removeClass("show");
      }
    }
  });
}

//
function composition() {
  $(".name_collapse").on('click', function () {
    var $this = $(this);
    $this.parents('.group_collapse .group_item').siblings().removeClass('open');

    if ($this.parents('.group_collapse .group_item').hasClass('open')) {
      $this.parents('.group_collapse .group_item').removeClass('open');
    } else {
      $this.parents('.group_collapse .group_item').addClass('open');
    }

    return false;
  });

  // $(".wrapper").on("click", function(event) { 
  // 	if(!$(event.target).closest(".name_collapse, .group_main").length) {
  // 		if($(".group_collapse .group_item").hasClass("open")) {
  // 			$(".group_collapse .group_item").removeClass("open");
  // 		}
  // 	}
  // });
}

function selectCustomWidth() {
  $('.select_width').select2({
    minimumResultsForSearch: Infinity
  });
}

function buttonOnClick() {
  $(".addOnClick").on('click', function () {
    var $this = $(this);
    var parent = $this.parent();
    var drop = $this.parent().find(".btn");

    if (parent.hasClass("active")) {
      parent.removeClass("active");
      $this.text('Добавить в комплект');
      drop.text('Добавить в комплект');
    } else {
      parent.addClass("active");
      $this.text('Добавлено в комплект');
      drop.text('Удалить');
    }
  });

  $(".delOnClick").on('click', function () {
    var $this = $(this);
    var parent = $this.parents(".button_field");

    // parent.removeClass("active");
    // $(".addOnClick").text('Добавить в комплект');

    if (parent.hasClass("active")) {
      parent.removeClass("active");
      $this.text('Добавить в комплект');
    } else {
      parent.addClass("active");
      $this.text('Удалить');
    }
  });
}

//hint
function hint() {
  var $tableWrap = $(".table_wrapped").width();
  var $table = $(".variations_table").width();
  var hint = $(".hint");

  if ($table > $tableWrap) {
    hint.show();
    $(".option_mod .nano-pane").css("transform", "translateX(100%)");
    // console.log($tableWrap);
    // console.log($table);
    hint.on('touchstart click', function () {
      $(this).fadeOut();
    });
  } else {
    hint.hide();
    $(".option_mod .nano-pane").css("transform", "translateX(0%)");
  }
}

function hintComparison() {
  var width = $(window).width();

  var hint = $(".hint_comparison");
  var modalNav = $(".modal_nav").outerWidth();

  // hint.css('left', modalNav);

  if (width < 1025) {
    hint.show();
    hint.on('touchstart click', function () {
      $(this).fadeOut();
    });
  } else {
    hint.hide();
  }
}

//button comparison
function buttonComparison() {
  $(".comparison_tools .button").on('click', function () {
    var $this = $(this).parent();
    var drop = $this.find(".btn");
    // console.log(0);

    if ($this.hasClass('accept')) {
      $this.removeClass('accept');
      drop.text('Добавить в комплект');
      // console.log(1);
    } else {
      $this.addClass('accept');
      // console.log(2);
      drop.text('Удалить');
    }
  });
  $(".btnCancel").on('click', function () {
    var $this = $(this);
    var parent = $this.parents(".button_item");

    if (parent.hasClass("accept")) {
      parent.removeClass("accept");
      $this.text('Добавить в комплект');
    } else {
      parent.addClass("accept");
      $this.text('Удалить');
    }
  });
}

function sliderGalleryProductModal() {
  var slider = $('.gallery_modal').slick({
    dots: true,
    infinite: true,
    speed: 300,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand'
  });

  $(".button.dropped_b").on('click', function () {
    var body = $('body');

    // if (body.hasClass("none_scroll")) {
    // 	body.addClass('none_scroll');
    // } else {
    // 	body.removeClass('none_scroll');
    // }


    //onclick
    var $this = $(this);
    var $thisParent = $this.parents(".comparison_item");
    var mainParent = $thisParent.find(".comparison_list");

    //height gallery modal
    var comparisonList = $(".comparison_list").outerHeight();
    $(".comparison_block").css("min-height", comparisonList);

    //filter fields
    var linkId = $(this).attr('href').replace('#', '');
    $(".preview_comparison_list").hide();

    //
    if ($this.hasClass('open')) {
      $this.removeClass('open');

      //change arrow button
      $this.parents(".comparison_item").removeClass('selected');

      //change hidden list
      $(".comparison_list").removeClass("hidden_list");
      heightComparison();
      body.removeClass('none_scroll');
    } else {
      $(".button.dropped_b").removeClass('open');
      $this.addClass('open');

      //slider
      slider.slick("refresh");

      //change arrow button
      $this.parents(".comparison_item").siblings().removeClass('selected');
      $this.parents(".comparison_item").addClass('selected');
      body.addClass('none_scroll');

      $(".comparison_list").addClass("hidden_list");
      heightComparison();

      //filter
      $(".preview_comparison_list").filter(function () {
        var id = $(this).attr('id');
        slider.css('display', 'block');
        // slider.get(0).slick.setPosition();
        return id == linkId;
      }).show();
    }

    return false;
  });
}

function colorChoice() {
  $(".table_color_inner tr").on('click', function () {
    $(this).siblings().removeClass('choice');
    $(this).addClass('choice');
  });
}

// height tab content
// function tabContent(){
// 	var modalContent = $(".modal_comparison");
// 	var heightModalContent = $(".modal_comparison").height();

// 	modalContent.css('height', heightModalContent);
// }

//photoswipe gallery
var initPhotoSwipeFromDOM = function (gallerySelector) {

  // parse slide data (url, title, size ...) from DOM elements 
  // (children of gallerySelector)
  var parseThumbnailElements = function (el) {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;

    for (var i = 0; i < numNodes; i++) {

      figureEl = thumbElements[i]; // <figure> element

      // include only element nodes 
      if (figureEl.nodeType !== 1) {
        continue;
      }

      linkEl = figureEl.children[0]; // <a> element

      size = linkEl.getAttribute('data-size').split('x');

      // create slide object
      item = {
        src: linkEl.getAttribute('href'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10)
      };



      if (figureEl.children.length > 1) {
        // <figcaption> content
        item.title = figureEl.children[1].innerHTML;
      }

      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute('src');
      }

      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }

    return items;
  };

  // find nearest parent element
  var closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };

  // triggers when user clicks on thumbnail
  var onThumbnailsClick = function (e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;

    var eTarget = e.target || e.srcElement;

    // find root element of slide
    var clickedListItem = closest(eTarget, function (el) {
      return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
    });

    if (!clickedListItem) {
      return;
    }

    // find index of clicked item by looping through all child nodes
    // alternatively, you may define index via data- attribute
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedListItem.parentNode.childNodes,
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;

    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }

      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }



    if (index >= 0) {
      // open PhotoSwipe if valid index found
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };

  // parse picture index and gallery index from URL (#&pid=1&gid=2)
  var photoswipeParseHash = function () {
    var hash = window.location.hash.substring(1),
      params = {};

    if (hash.length < 5) {
      return params;
    }

    var vars = hash.split('&');
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split('=');
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }

    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }

    return params;
  };

  var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
    var pswpElement = document.querySelectorAll('.pswp')[0],
      gallery,
      options,
      items;

    items = parseThumbnailElements(galleryElement);

    // define options (if needed)
    options = {

      // define gallery index (for URL)
      galleryUID: galleryElement.getAttribute('data-pswp-uid'),

      getThumbBoundsFn: function (index) {
        // See Options -> getThumbBoundsFn section of documentation for more info
        var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
          pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width
        };
      },
      // showHideOpacity: true,
      // showAnimationDuration: 0,
      // hideAnimationDuration: 0, 
      bgOpacity: 0.85,
      showHideOpacity: true,

      //panel
      // counterEl: false,
      shareEl: false,
      fullscreenEl: false
      // loop: false
      // zoomEl: false
    };

    // PhotoSwipe opened from URL
    if (fromURL) {
      if (options.galleryPIDs) {
        // parse real index when custom PIDs are used 
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        // in URL indexes start from 1
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }

    // exit if index not found
    if (isNaN(options.index)) {
      return;
    }

    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }

    // Pass data to PhotoSwipe and initialize it
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
    gallery.listen('beforeChange', function () {
      var idx = gallery.getCurrentIndex();
      // console.log(idx)
      $('.slider_gallery').get(0).slick.slickGoTo(idx, true);
    });

  };

  // loop through all gallery elements and bind events
  var galleryElements = document.querySelectorAll(gallerySelector);

  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute('data-pswp-uid', i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }
};
// execute above function
initPhotoSwipeFromDOM('.slider_gallery');

function accordeon() {
  $(function () {
    $('.alphabet .static').click(function (event) {
      event.preventDefault();
      if (!$(this).parent().hasClass("active_section")) {
        $(".alphabet").toggleClass("active_section");
      }
    });
  });
};

function showMoreTxt() {
  var nav = $('.description_block .text_content'),
    animateTime = 500,
    navLink = $('.brand_heading .more'),
    lngs = 0;
  $(".description_block .text_content p").each(function (i) {
    lngs += $(this).text().length;
    if (lngs > 700) {
      $('.brand_heading').addClass("somuch_text");
    }
  });
  navLink.on('click', function (e) {
    e.preventDefault();
    if (nav.height() === 140 && lngs > 28) {
      autoHeightAnimate(nav, animateTime);
      navLink.find("span").text('Свернуть');
      nav.addClass("open");
    } else {
      nav.stop().animate({
        height: '140'
      }, animateTime);
      navLink.find("span").text('Развернуть');
      nav.removeClass("open");
    }
  });
};

function itemPrev() {
  $(document).mousemove(function (e) {
    var X = e.pageX;
    var Y = $('.wrapper').width();
    var Z = Y - X;
    if (Z < 250) {
      $(".droppable_preview").addClass("left_var");
    } else if (Z > 250) {
      $(".droppable_preview").removeClass("left_var");
    }
  });
};




function mobileTabs() {
  $(".mobile_current_slide").click(function () {
    $(".brand_categories_block ul.categories_list").fadeToggle(300);
  });
  $(".brand_categories_block ul.categories_list a").click(function () {
    var txt = $(this).find("span").text();
    $(".brand_categories_block ul.categories_list").fadeOut(300);
    $(".mobile_current_slide").text(txt);
  });
}

function tabs() {
  var i = true;
  if (document.documentElement.clientWidth > 578) {
    $(".categories_list li:first-child").addClass("active_nav_link");
  }
  $(".categories_list li a").click(function (e) {
    e.preventDefault()
    if (i == true) {
      if (document.documentElement.clientWidth > 578) {
        $(".categories_list li").removeClass("active_nav_link").eq($(this).parent().index()).addClass("active_nav_link");
      }
      var slideno = $(this).data('slide');
      $('.content_categories').slick('slickGoTo', slideno - 1);
      i = false;
      setTimeout(function () {
        i = true;
      }, 450);
    }
  });

  $('.content_categories').slick({
    dots: false,
    infinite: false,
    speed: 450,
    arrows: false,
    draggable: false,
    swipe: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  $(".categories_list li a").click(function () {
    var scroll = $('.content_categories').offset().top;
    if ($(window).scrollTop() > scroll) {
      $("html, body").animate({
        scrollTop: scroll + 17
      }, 500);
    }
  });
}


function moreCards() {
  var i = 0;
  $(".brand_categories_block .button_more, .detail-collections .button_more").on('click', function () {
    var start = i;
    var end = i + 6;
    var length = $(this).siblings(".dropdown_list").find('.slider-item-container').length;
    console.log(length);
    console.log(i);
    if (i < length) {
      $(this).siblings(".dropdown_list").find(".slider-item-container").slice(start, end).slideDown(0);
      i = i + 6;
      if (i >= length) {
        $(this).text("Свернуть");
      }
    } else if (i >= length) {
      $(this).siblings(".dropdown_list").find(".slider-item-container").slideUp(0);
      $(this).text("Показать еще");
      i = 0;
    }
    setTimeout(function () {
      $('.content_categories').slick("setPosition");
    });
  });

  $(".container_inset .button_more").on('click', function () {
    var start = i;
    var end = i + 6;
    var length = $(this).siblings(".dropdown_list").find('.inset_item').length;
    console.log(length);
    console.log(i);
    if (i < length) {
      $(this).siblings(".dropdown_list").find(".inset_item").slice(start, end).css("display", "inline-block");
      i = i + 6;
      if (i >= length) {
        $(this).text("Свернуть");
      }
    } else if (i >= length) {
      $(this).siblings(".dropdown_list").find(".inset_item").css("display", "none");
      $(this).text("Показать еще");
      i = 0;
    }

  });

  $(".variations_box .button_more").on('click', function () {
    var start = i;
    var end = i + 5;
    var length = $(".variations_box").find('.hidden-agregat').length;
    console.log(length);
    console.log(i);
    if (i < length) {
      $(".variations_box").find('.hidden-agregat').slice(start, end).css("display", "table-row");
      i = i + 5;
      if (i >= length) {
        $(this).text("Свернуть");
      }
    } else if (i >= length) {
      $(".variations_box").find('.hidden-agregat').css("display", "none");
      $(this).text("Показать еще");
      i = 0;
    }

  });
};

//слайдер популярных коллекций
function sliderInit() {
  $('.popular_collections_content').slick({
    dots: true,
    infinite: true,
    speed: 300,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $('.arrow_left'),
    nextArrow: $('.arrow_right')
  });
};

function brandsInit() {
  $('.brand_categories_block .additional_cards').slick({
    dots: true,
    infinite: true,
    speed: 300,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });
};

function slider() {

};

function brandSlider() {
  $('.brand_slider').slick({
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1
  });
};


function brandSliderInit() {
  var p_with = $(".brand_categories_block .categories_nav").width();
  var c_with = $(".brand_categories_block .categories_list").width();
  var list = $(".brand_categories_block .categories_list");
  if (c_with > p_with && document.documentElement.clientWidth > 0) {
    if (init_ind == 1) {
      brandNavSlider();
      list.addClass("init");
      init_ind = 2;
    }
  } else if (c_with_static < p_with && document.documentElement.clientWidth > 0) {
    if (init_ind == 2) {
      $(".categories_list").slick('unslick');
      list.removeClass("init");
      init_ind = 1;
    }
  }
}

function brandNavSlider() {
  $('.categories_list').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true,
    slidesToScroll: 5,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToScroll: 2
        }
      }
    ]
  });
}

function navFixed() {
  $(function () {
    if ($('.brand_categories_block .categories_nav').length > 0) {
      var jqBar = $('.brand_categories_block .categories_nav').position().top;
      var jqBarHeight = $('.content_categories').height();
      var nav = $('.brand_categories_block .categories_nav');
      var height = nav.height();
      var brand = $('.brand_categories_block');
      var jqBarStatus = true;
      $(window).scroll(function () {
        var jqBarHeight = $('.content_categories').height();
        if (($(window).scrollTop() > jqBar + 60) && ($(window).scrollTop() < (jqBar + jqBarHeight)) && jqBarStatus) {
          jqBarStatus = false;
          brand.addClass("brand_categories_fixed");
          nav.addClass("fixed");
          nav.removeClass("hidden");
        } else if (($(window).scrollTop() < jqBar + 60) && jqBarStatus == false) {
          jqBarStatus = true;
          brand.removeClass("brand_categories_fixed");
          nav.removeClass("hidden");
          nav.removeClass("fixed");
        } else if (($(window).scrollTop() > (jqBar + jqBarHeight)) && jqBarStatus == false) {
          nav.addClass("hidden");
          jqBarStatus = true;
        }
      });
    }


    var clonedHeaderRow;

    $(".persist-area").each(function () {
      clonedHeaderRow = $(".persist-header", this);
      clonedHeaderRow
        .before(clonedHeaderRow.clone())
        .css("width", clonedHeaderRow.width())
        .addClass("floatingHeader");

      $(".variations_box_header:not(.floatingHeader)").find("th").each(function (index) {
        var wid = $(this).outerWidth();
        console.log(wid);
        var d = index + 1;
        clonedHeaderRow.find("th:nth-child(" + d + ")").css("width", wid);
      });

    });

    $(window)
      .scroll(UpdateTableHeaders)
      .trigger("scroll");


  });
}

function UpdateTableHeaders() {
  $(".persist-area").each(function () {

    var el = $(this),
      offset = el.offset(),
      scrollTop = $(window).scrollTop(),
      floatingHeader = $(".floatingHeader", this);

    if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height())) {
      floatingHeader.css({
        "visibility": "visible"
      });
    } else {
      floatingHeader.css({
        "visibility": "hidden"
      });
    };
  });
}



function compareSlider() {
  var slider1 = '.compare-header .holder-slider';
  var slider2 = '.compare-content .holder-slider';
  $(slider1).slick({
    dots: true,
    infinite: false,
    speed: 300,
    arrows: false,
    slidesToScroll: 1,
    slidesToShow: 4,
    touchThreshold: 20,
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 936,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  });
  $(slider2).slick({
    dots: false,
    infinite: false,
    speed: 300,
    arrows: false,
    slidesToScroll: 1,
    slidesToShow: 4,
    touchThreshold: 20,
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 936,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  });
  $('.left_slide').click(function () {
    $(".holder-slider").slick('slickPrev');
  });
  $('.right_slide').click(function () {
    $(".holder-slider").slick('slickNext');
  });
  $(".compare-header .modal_comparison").on("mouseleave mouseenter", function (event) {
    if (event.type == "mouseenter") {
      $(".compare-header .holder-slider").addClass("showed");
      arrows();
    } else if (event.type == "mouseleave") {
      $(".compare-header .holder-slider").removeClass("showed");
    }
  });
  $('.holder-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    arrows();
  });

  function arrows() {
    var slideCount = $('.compare-header .slick-dots li').length;
    var leftSlide = $('.tab_pane .left_slide');
    var rightSlide = $('.tab_pane .right_slide');
    if (slideCount > 1) {
      if ($(".compare-header .holder-slider").hasClass("showed")) {
        if ($('.compare-header .slick-dots li:first-child').hasClass("slick-active")) {
          leftSlide.fadeOut(100);
          rightSlide.fadeIn(100);
        } else if ($('.compare-header .slick-dots li:last-child').hasClass("slick-active")) {
          leftSlide.fadeIn(100);
          rightSlide.fadeOut(100);
        } else {
          leftSlide.fadeIn(100);
          rightSlide.fadeIn(100);
        }
      } else {
        leftSlide.fadeOut(100);
        rightSlide.fadeOut(100);
      }
    }
  }
  var trigger = 0;
  $(document).on("touchmove mousemove touchend mouseleave mousedown mouseup", ".holder-slider", function (event) {
    if (event.type == "touchmove") {
      style = $(this).find(".slick-track").css("transform");
      $(".holder-slider").find(".slick-track").css("transform", style);
    } else if (event.type == "mousemove" && trigger == 0) {
      style = $(this).find(".slick-track").css("transform");
      $(".holder-slider").find(".slick-track").css("transform", style);
    } else if (event.type == "touchend") {
      var currentSlide = $(this).slick('slickCurrentSlide');
      $('.holder-slider').slick('slickGoTo', currentSlide);
    } else if (event.type == "mouseleave") {
      var currentSlide = $(this).slick('slickCurrentSlide');
      $('.holder-slider').slick('slickGoTo', currentSlide);
    } else if (event.type == "mouseup") {
      trigger = 1;
      var currentSlide = $(this).slick('slickCurrentSlide');
      $('.holder-slider').slick('slickGoTo', currentSlide);
      setTimeout(function () {
        trigger = 0
      }, 300);
    }
    //event.stopPropagation();
    //event.preventDefault();
  });
};

function autoPadding() {
  var heightEl = $(".compare-page_container .compare-header").height();
  $(".compare-content").css("padding-top", heightEl);
}
if ($('.compare-header').length > 0) {
  var blockTop = $('.compare-header').offset().top;
}

//фиксированная шапка сравнения при прокрутке
function fixedCompare() {
  var CountUpFlag = 0;
  var $window = $(window);
  var top = $window.scrollTop();
  var heightContent = $("#compare-content .tab_pane").height();
  $window.on('scroll', function () {
    top = $window.scrollTop();
    heightContent = $("#compare-content .tab_pane").height();
    if (top >= blockTop && CountUpFlag == 0) {
      CountUpFlag = 1;
      $('.compare-header').addClass("fixed");
      $('.compare-content').addClass("modify_pos");
    } else if (top < blockTop && CountUpFlag == 1) {
      CountUpFlag = 0;
      $('.compare-header').removeClass("fixed");
      $('.compare-content').removeClass("modify_pos");
    }
    if (top > (blockTop + heightContent)) {
      $(".compare-header").addClass("hidden");
    } else {
      $(".compare-header").removeClass("hidden");
    }
  });
}



! function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function (a) {
  var b, c = navigator.userAgent,
    d = /iphone/i.test(c),
    e = /chrome/i.test(c),
    f = /android/i.test(c);
  a.mask = {
    definitions: {
      9: "[0-9]",
      a: "[A-Za-z]",
      "*": "[A-Za-z0-9]"
    },
    autoclear: !0,
    dataName: "rawMaskFn",
    placeholder: "_"
  }, a.fn.extend({
    caret: function (a, b) {
      var c;
      if (0 !== this.length && !this.is(":hidden")) return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function () {
        this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select())
      })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), {
        begin: a,
        end: b
      })
    },
    unmask: function () {
      return this.trigger("unmask")
    },
    mask: function (c, g) {
      var h, i, j, k, l, m, n, o;
      if (!c && this.length > 0) {
        h = a(this[0]);
        var p = h.data(a.mask.dataName);
        return p ? p() : void 0
      }
      return g = a.extend({
        autoclear: a.mask.autoclear,
        placeholder: a.mask.placeholder,
        completed: null
      }, g), i = a.mask.definitions, j = [], k = n = c.length, l = null, a.each(c.split(""), function (a, b) {
        "?" == b ? (n--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1), k > a && (m = j.length - 1)) : j.push(null)
      }), this.trigger("unmask").each(function () {
        function h() {
          if (g.completed) {
            for (var a = l; m >= a; a++)
              if (j[a] && C[a] === p(a)) return;
            g.completed.call(B)
          }
        }

        function p(a) {
          return g.placeholder.charAt(a < g.placeholder.length ? a : 0)
        }

        function q(a) {
          for (; ++a < n && !j[a];);
          return a
        }

        function r(a) {
          for (; --a >= 0 && !j[a];);
          return a
        }

        function s(a, b) {
          var c, d;
          if (!(0 > a)) {
            for (c = a, d = q(b); n > c; c++)
              if (j[c]) {
                if (!(n > d && j[c].test(C[d]))) break;
                C[c] = C[d], C[d] = p(d), d = q(d)
              } z(), B.caret(Math.max(l, a))
          }
        }

        function t(a) {
          var b, c, d, e;
          for (b = a, c = p(a); n > b; b++)
            if (j[b]) {
              if (d = q(b), e = C[b], C[b] = c, !(n > d && j[d].test(e))) break;
              c = e
            }
        }

        function u() {
          var a = B.val(),
            b = B.caret();
          if (o && o.length && o.length > a.length) {
            for (A(!0); b.begin > 0 && !j[b.begin - 1];) b.begin--;
            if (0 === b.begin)
              for (; b.begin < l && !j[b.begin];) b.begin++;
            B.caret(b.begin, b.begin)
          } else {
            for (A(!0); b.begin < n && !j[b.begin];) b.begin++;
            B.caret(b.begin, b.begin)
          }
          h()
        }

        function v() {
          A(), B.val() != E && B.change()
        }

        function w(a) {
          if (!B.prop("readonly")) {
            var b, c, e, f = a.which || a.keyCode;
            o = B.val(), 8 === f || 46 === f || d && 127 === f ? (b = B.caret(), c = b.begin, e = b.end, e - c === 0 && (c = 46 !== f ? r(c) : e = q(c - 1), e = 46 === f ? q(e) : e), y(c, e), s(c, e - 1), a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault())
          }
        }

        function x(b) {
          if (!B.prop("readonly")) {
            var c, d, e, g = b.which || b.keyCode,
              i = B.caret();
            if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) {
              if (i.end - i.begin !== 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)), c = q(i.begin - 1), n > c && (d = String.fromCharCode(g), j[c].test(d))) {
                if (t(c), C[c] = d, z(), e = q(c), f) {
                  var k = function () {
                    a.proxy(a.fn.caret, B, e)()
                  };
                  setTimeout(k, 0)
                } else B.caret(e);
                i.begin <= m && h()
              }
              b.preventDefault()
            }
          }
        }

        function y(a, b) {
          var c;
          for (c = a; b > c && n > c; c++) j[c] && (C[c] = p(c))
        }

        function z() {
          B.val(C.join(""))
        }

        function A(a) {
          var b, c, d, e = B.val(),
            f = -1;
          for (b = 0, d = 0; n > b; b++)
            if (j[b]) {
              for (C[b] = p(b); d++ < e.length;)
                if (c = e.charAt(d - 1), j[b].test(c)) {
                  C[b] = c, f = b;
                  break
                } if (d > e.length) {
                y(b + 1, n);
                break
              }
            } else C[b] === e.charAt(d) && d++, k > b && (f = b);
          return a ? z() : k > f + 1 ? g.autoclear || C.join("") === D ? (B.val() && B.val(""), y(0, n)) : z() : (z(), B.val(B.val().substring(0, f + 1))), k ? b : l
        }
        var B = a(this),
          C = a.map(c.split(""), function (a, b) {
            return "?" != a ? i[a] ? p(b) : a : void 0
          }),
          D = C.join(""),
          E = B.val();
        B.data(a.mask.dataName, function () {
          return a.map(C, function (a, b) {
            return j[b] && a != p(b) ? a : null
          }).join("")
        }), B.one("unmask", function () {
          B.off(".mask").removeData(a.mask.dataName)
        }).on("focus.mask", function () {
          if (!B.prop("readonly")) {
            clearTimeout(b);
            var a;
            E = B.val(), a = A(), b = setTimeout(function () {
              B.get(0) === document.activeElement && (z(), a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a))
            }, 10)
          }
        }).on("blur.mask", v).on("keydown.mask", w).on("keypress.mask", x).on("input.mask paste.mask", function () {
          B.prop("readonly") || setTimeout(function () {
            var a = A(!0);
            B.caret(a), h()
          }, 0)
        }), e && f && B.off("input.mask").on("input.mask", u), A()
      })
    }
  })
});

var hc2 = 0;

function HeightCardsLC() {
  $(".description_section2").css("height", "auto");
  $(".description_section2").each(function () {
    var h_block = parseInt($(this).height());
    console.log(h_block);
    if (h_block > hc2) {
      hc2 = h_block;
    };
  });
  $(".description_section2").height(hc2);
};

//переключение вида карточки избранных
function viewCards() {
  $('.view-section a').click(function () {
    $(".view-section a").removeClass("active");
    $(this).addClass("active");
    if ($(this).hasClass("short-var")) {
      $(".block_content_short").show();
      $(".block_content_more").hide();
    } else {
      $(".block_content_short").hide();
      $(".block_content_more").show();
      HeightCardsLC();
    }
  });
}

function passShow() {
  $('.show_pass').click(function () {
    var type = $(this).prev("input").attr('type') == "text" ? "password" : 'text';
    $(this).prev("input").prop('type', type);
    $(this).toggleClass("eye")
  });
  $("#tel").mask("+7 (999) 999-9999");
  //$("[name=ORDER_PROP_3]").mask("+7 (999) 999-9999");
}

var mhLC = 0;

function HeightTxt() {
  $(".link_container .txt").each(function () {
    var h_block = parseInt($(this).height());
    if (h_block > mhLC) {
      mhLC = h_block;
    };
  });
  $(".link_container .txt").height(mhLC);
};

//слайдер последних товаров
function sliderInitLC() {
  $('.orders_container').slick({
    dots: true,
    infinite: true,
    speed: 300,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1
  });
};

var flagLC = 1;

function transform() {
  if ($(window).width() < 576) {
    if (flagLC == 1) {
      sliderInitLC();
      $('.start_auth .lc_container_loged .more_orders').insertAfter('.start_auth .orders_container');
      $('.start_auth .personal').insertBefore('.dashboard .trigger');
      flagLC = 2;
    }
  } else {
    if (flagLC == 2) {
      $(".start_auth .orders_container").slick('unslick');
      $('.start_auth .personal').insertAfter('.start_auth .breadcrumbs .holder');
      $('.start_auth .lc_container_loged .more_orders').insertAfter('.start_auth .block_heading .left_title');
      flagLC = 1;
    }
  }
};

//Страница "Мои заказы"

function linksUnav() {
  $(".completed").text('Оплачено');
  $(".link_block .not_available").attr("data-balloon", "Скоро-скоро");
  $('.not_available, .completed, .active_selection').click(function (e) {
    event.preventDefault();
  });
}

function mobileTabsLC() {
  $(document).mouseup(function (e) {
    var block = $(".current_choise");
    var block2 = $("ul.filter_nav a");
    if (!block.is(e.target) && block.has(e.target).length === 0 && !block2.is(e.target) && block2.has(e.target).length === 0 && (document.documentElement.clientWidth < 992)) {
      $(".current_choise").removeClass("active_arr").removeClass("opened");
      $(".orders-page_container ul.filter_nav").fadeOut(0);
    }
  });
  $(".current_choise").click(function () {
    if (document.documentElement.clientWidth < 992) {
      $(".orders-page_container ul.filter_nav").fadeToggle(0);
      $(this).toggleClass("active_arr").toggleClass("opened");
    }
  });
  $("ul.filter_nav a").click(function () {
    if (document.documentElement.clientWidth < 992 && !$(this).hasClass("not_available")) {
      $(".orders-page_container ul.filter_nav").fadeToggle(0);
      $(".current_choise").toggleClass("active_arr").toggleClass("opened");
      var txt = $(this).text();
      $(".current_choise").find(".txt").text(txt);
    }
  });
  $("ul.filter_nav a").click(function () {
    if (!$(this).hasClass("not_available")) {
      $("ul.filter_nav a").removeClass("active_selection");
      $(this).toggleClass("active_selection");
    }
  });

}

function filter() {

  // Затемнение
  $(".disable img").fadeIn(500);

  // Делаем копию картинки
  $('.disable img').each(function () {
    var el = $(this);
    el.css({
      "position": "absolute"
    }).clone().addClass('img_grayscale').css({
      "position": "absolute",
      "z-index": "998",
      "opacity": "0"
    }).insertBefore(el).queue(function () {
      var el = $(this);
      el.dequeue();
    });
    this.src = grayscale(this.src);
  });

  // Создаем черно-белую копию используя сanvas
  function grayscale(src) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var imgObj = new Image();
    imgObj.src = src;
    canvas.width = imgObj.width;
    canvas.height = imgObj.height;
    ctx.drawImage(imgObj, 0, 0);
    var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (var y = 0; y < imgPixels.height; y++) {
      for (var x = 0; x < imgPixels.width; x++) {
        var i = (y * 4) * imgPixels.width + x * 4;
        var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
        imgPixels.data[i] = avg;
        imgPixels.data[i + 1] = avg;
        imgPixels.data[i + 2] = avg;
      }
    }
    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
    return canvas.toDataURL();
  }
}

function orgButton() {
  $('.profile_form .checkbox_item').on('change', function () {
    if ($(this).prop('checked')) {
      $(".organization_group").fadeIn(0);
    } else {
      $(".organization_group").fadeOut(0);
    }
  });
}


function slider_init($s) {
  slider_swiper_init($s);
}

function slider_swiper_init($s) {
  if (typeof Swiper !== "undefined") {
    if (typeof $s === "undefined") $s = $(".swiper-slider").filter(":not(.slider-events-added)");
    $s.each(function () {
      var $this = $(this);
      var swiper = new Swiper($this.find('.swiper-container'), {
        direction: (typeof $this.data("slider-direction") !== "undefined") ? $this.data("slider-direction") : 'horizontal',
        loop: (typeof $this.data("slider-loop") !== "undefined") ? $this.data("slider-loop") : false,
        //loopAdditionalSlides: 13,
        autoplay: (typeof $this.data("slider-autoplay") !== "undefined") ? $this.data("slider-autoplay") : false,
        initialSlide: (typeof $this.data("slider-initial-slide") !== "undefined") ? $this.data("slider-initial-slide") : 0,
        pagination: (typeof $this.data("slider-pagination") !== "undefined") ? $this.data("slider-pagination") : $this.find('.swiper-pagination'),
        paginationType: (typeof $this.data("slider-pagination-type") !== "undefined") ? $this.data("slider-pagination-type") : 'bullets',
        paginationBulletRender: function (swiper, index, className) {
          var $slider = $(swiper.container).closest(".swiper-slider");
          var name = $(swiper.slides).filter("[data-swiper-slide-index='" + index + "']").first().attr("data-pagination-name");
          var tag = 'span';
          if ($slider.length) {
            if ($slider.data("slider-pagination-element")) {
              tag = $slider.data("slider-pagination-element");
            }
          }
          if (!name) name = "";
          return '<' + tag + ' class="' + className + '">' + name + '</' + tag + '>';
        },
        paginationElement: (typeof $this.data("slider-pagination-element") !== "undefined") ? $this.data("slider-pagination-element") : 'span',
        scrollbar: ($this.find('.swiper-scrollbar').length) ? $this.find('.swiper-scrollbar') : null,
        scrollbarHide: (typeof $this.data("slider-scrollbar-hide") !== "undefined") ? $this.data("slider-scrollbar-hide") : false,
        scrollbarDraggable: (typeof $this.data("slider-scrollbar-draggable") !== "undefined") ? $this.data("slider-scrollbar-draggable") : true,
        scrollbarSnapOnRelease: (typeof $this.data("slider-scrollbar-snap-on-release") !== "undefined") ? $this.data("slider-scrollbar-snap-on-release") : true,
        freeMode: (typeof $this.data("slider-free-mode") !== "undefined") ? $this.data("slider-free-mode") : false,
        autoHeight: (typeof $this.data("slider-auto-height") !== "undefined") ? $this.data("slider-auto-height") : false,
        centeredSlides: (typeof $this.data("slider-centered-slides") !== "undefined") ? $this.data("slider-centered-slides") : false,
        slidesPerView: (typeof $this.data("slider-slides-per-view") !== "undefined") ? $this.data("slider-slides-per-view") : 1,
        slidesPerGroup: (typeof $this.data("slider-slides-per-group") !== "undefined") ? $this.data("slider-slides-per-group") : 1,
        paginationClickable: true,
        effect: (typeof $this.data("slider-effect") !== "undefined") ? $this.data("slider-effect") : "slide",
        fade: {
          crossFade: true
        },
        grabCursor: (typeof $this.data("slider-grabcursor") !== "undefined") ? $this.data("slider-grabcursor") : false,
        simulateTouch: (typeof $this.data("slider-simulate-touch") !== "undefined") ? $this.data("slider-simulate-touch") : true,
        onlyExternal: (typeof $this.data("slider-only-external") !== "undefined") ? $this.data("slider-only-external") : false,
        spaceBetween: (typeof $this.data("slider-space-between") !== "undefined") ? $this.data("slider-space-between") : 0,
        prevButton: (typeof $this.data("slider-prev-button") !== "undefined") ? $this.data("slider-prev-button") : $this.find('.swiper-button-prev'),
        nextButton: (typeof $this.data("slider-next-button") !== "undefined") ? $this.data("slider-next-button") : $this.find('.swiper-button-next'),
        speed: (typeof $this.data("slider-speed") !== "undefined") ? $this.data("slider-speed") : 300,
        buttonDisabledClass: 'disabled',
        slidesOffsetBefore: (typeof $this.data("slider-slides-offset-before") !== "undefined") ? $this.data("slider-slides-offset-before") : 0,
        slidesOffsetAfter: (typeof $this.data("slider-slides-offset-after") !== "undefined") ? $this.data("slider-slides-offset-after") : 0,
        roundLengths: (typeof $this.data("slider-round-lengths") !== "undefined") ? $this.data("slider-round-lengths") : true,
        lazyLoading: (typeof $this.data("slider-lazy-loading") !== "undefined") ? $this.data("slider-lazy-loading") : false,
        lazyLoadingInPrevNext: (typeof $this.data("slider-lazy-loading-in-prev-next") !== "undefined") ? $this.data("slider-lazy-loading-in-prev-next") : true,
        lazyLoadingOnTransitionStart: true,
        nested: (typeof $this.data("slider-nested") !== "undefined") ? $this.data("slider-nested") : false,
        resistanceRatio: (typeof $this.data("slider-resistance-ratio") !== "undefined") ? $this.data("slider-resistance-ratio") : 0.85,
        breakpoints: (typeof $this.data("slider-breakpoints") !== "undefined") ? $this.data("slider-breakpoints") : null,
        slideToClickedSlide: (typeof $this.data("slider-slide-to-clicked-slide") !== "undefined") ? $this.data("slider-slide-to-clicked-slide") : false,
        mousewheelControl: (typeof $this.data("slider-mousewheel-control") !== "undefined") ? $this.data("slider-mousewheel-control") : false,
        mousewheelReleaseOnEdges: (typeof $this.data("slider-mousewheel-release-on-edges") !== "undefined") ? $this.data("slider-mousewheel-release-on-edges") : false
      });
    }).addClass("slider-events-added");

    $s.each(function () {
      var $this = $(this);

      if (typeof $this.data("slider-control-thumbs") !== "undefined" && typeof $this.find('.swiper-container')[0].swiper !== "undefined") {
        var $thumbs_swiper = $($this.data("slider-control-thumbs"));

        if (typeof $thumbs_swiper.find('.swiper-container')[0].swiper !== "undefined") {
          var thumbs_swiper = $thumbs_swiper.find('.swiper-container')[0].swiper;
          thumbs_swiper.thumbs_goal_swiper = $this.find('.swiper-container')[0].swiper;
          thumbs_swiper.params.onTap = function (swiper, e) {
            var clicked = swiper.clickedIndex
            swiper.activeIndex = clicked; //don't need this
            swiper.updateClasses(); //don't need this
            $(swiper.slides).removeClass('is-selected');
            $(swiper.clickedSlide).addClass('is-selected');
            $(".modal_picture-slider--control-thumbs-count").find("span").text($(swiper.clickedSlide).data("pagination-name"));
            swiper.slideTo(clicked, swiper.params.speed, false);
            swiper.thumbs_goal_swiper.slideTo(clicked, swiper.thumbs_goal_swiper.params.speed, true);
          };
        };

        $this.find('.swiper-container')[0].swiper.params.onSlideChangeEnd = function (swiper) {
          var $o = $(swiper.container.closest(".swiper-slider").data("slider-control-thumbs"));
          if (typeof $o.find('.swiper-container')[0].swiper !== "undefined") {
            var thumbs_swiper = $o.find('.swiper-container')[0].swiper;
          }
          var activeIndex = swiper.activeIndex;
          if (typeof thumbs_swiper !== "undefined") {
            $(thumbs_swiper.slides).removeClass('is-selected');
            $(thumbs_swiper.slides).eq(activeIndex).addClass('is-selected');
            $(".modal_picture-slider--control-thumbs-count").find("span").text($(thumbs_swiper.slides).eq(activeIndex).data("pagination-name"));
            thumbs_swiper.slideTo(activeIndex, thumbs_swiper.params.speed, false);
          }
        };
        $this.find('.swiper-container')[0].swiper.params.onSlideChangeStart = $this.find('.swiper-container')[0].swiper.params.onSlideChangeEnd;
        $this.find('.swiper-container')[0].swiper.params.onSlideChangeEnd($this.find('.swiper-container')[0].swiper);
      }

      $this.find('.swiper-container')[0].swiper.on('slideChangeStart', function (swiper) {
        var $activeSlide = $(swiper.slides).eq(swiper.activeIndex);
        if ($activeSlide.hasClass("home-reviews-item")) {
          var counter = $activeSlide.data("counter-name");
          $(".home-reviews-counter").text(counter);
        }
        $activeSlide.find(".swiper-lazy-preloader").css({
          top: swiper.height / 2
        });
        $(swiper.slides).find(".video-block").each(function () {
          var player = $(this).data("player");
          if (player) {
            player.pauseVideo();
          }
        });
      });

      $this.find('.swiper-container')[0].swiper.on('onLazyImageReady', function (swiper) {
        swiper.setWrapperTransition(swiper.params.speed);
        swiper.updateAutoHeight();
      });

    });

    $(window).on("resize orientationchange", function () {
      delay_slider_resize(function () {
        $(".swiper-slider.slider-events-added").each(function () {
          if ($(this).data("reinitialize-on-resize") && typeof $(this).find(".swiper-container")[0].swiper !== "undefined") {
            var swiper = $(this).find(".swiper-container")[0].swiper;
            swiper.destroy(true, true);
            slider_swiper_init($(this));
          }
        });
      }, 300);
    });

    $(window).trigger("resize-swiper-wrapper-center-if-less");
  }
}

var delay_slider_resize = (function () {
  var timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();


/* ---------------------------------------------------- НИЖЕ НОВЫЙ КОД, И ИСПРАВЛЕННЫЙ СТАРЫЙ --------------------------------------------------- */

/* HEADER */
let $header = {
  init: function() {
    this.el = $('.header');
    this.isVisible = true;
    this.isFixed = false;
    this.scroll = $(window).scrollTop();
    this.scroll_last = this.scroll;

    this.checkFixed();

    $(window).scroll(function(){
      if($(window).width()<576) {
        $header.checkVisible();
      }
    });
  },
  checkFixed: function() {
    //get line height
    let h = $('.attention_line').length ? $('.attention_line').height() : 0;
    //fix header
    if (this.scroll>h && !this.isFixed){
      this.isFixed = true;
      this.el.addClass('header_fixed');
    } else if(this.scroll<=h && this.isFixed) {
      this.isFixed = false;
      this.el.removeClass('header_fixed');
    }
  },
  checkVisible: function() {
    this.scroll = $(window).scrollTop();
    this.checkFixed();
    if (this.scroll>this.scroll_last && this.scroll>200 && this.isVisible){
      this.isVisible=false;
      this.el.addClass('header_hidden');
    } else if(this.scroll<this.scroll_last && !this.isVisible) {
      this.isVisible=true;
      this.el.removeClass('header_hidden');
    }
    this.scroll_last = this.scroll;
  }
}
/* NAV TOGGLE */
function navigation() {
  $(".button_toogle").on('click', function(event) {
    event.preventDefault();
    let $body = $(this).parents("body");
    if (scrollLock.getScrollState()) {
      $body.addClass("open_navigation");
      scrollLock.disablePageScroll(document.querySelector('.navigation_side .holder'));
    } else {
      $body.removeClass("open_navigation");
      scrollLock.enablePageScroll();
    }
  });
}
/* MOBILE SEARCH TOGGLE */
function toggleSearch() {
  let $open = $('.mobile-search-open-button'),
      $close = $('.mobile-search-close-button'),
      $search = $('.header .group.sub');
  $open.on('click', function(){
    $search.fadeIn(300);
  })
  $close.on('click', function(){
    $search.fadeOut(300);
  })
}
/* NAV CATEGORY */
function navCategories() {
  let $categories = $('.main_categories'),
      $links = $categories.find(".choice_categories"),
      $items = $categories.find('.item'),
      $toggle = $('.js-catalogue-toggle'),
      $catalogue = $('.main_ctg_other');

  $toggle.on('click', function(event) {
    event.preventDefault();
    $catalogue.stop().fadeToggle(300);
  });

  $links.on('click', function(event) {
    event.preventDefault();
    let $item = $(this).parent();
    $items.removeClass('selected');
    $item.addClass('selected');
  })
  $items.on('mouseenter mouseleave', function(event) {
    let $this = $(this);
    if(event.type=='mouseleave') {
      $this.removeClass('selected');
    } else {
      $this.addClass('selected');
    }
  });

  $categories.on('mouseleave', function(){
    $catalogue.stop().fadeOut(300);
  })
}
