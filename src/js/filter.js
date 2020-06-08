$(document).ready(function() {
  count();
  brands();
  filter();
  diap();
});

var timer = setTimeout(function() {
  $('.found_amount').fadeOut();
}, 3000);
var $range1 = $(".r-slider1"),
  $input_from1 = $(".input_s1"),
  $input_to1 = $(".input_e1"),
  min = 0,
  max = 100000;

// Диапазоны
function diap() {
  $(".r-slider1").ionRangeSlider({
      type: "double",
      min: min,
      max: max,
      from: min,
      to: max,
      hide_min_max: true,
      hide_from_to: true,
      grid: false,
      onStart: function(data) {
          $input_from1.prop("value", data.from);
          $input_to1.prop("value", data.to);

      },
      onChange: function(data) {
          $input_from1.prop("value", data.from);
          $input_to1.prop("value", data.to);
      },
      onFinish: function(data) {
          $(".found_amount").removeClass('a_eddited');
          $(".range .item").fadeIn();
          $(".r-slider1").parents(".range").find(".select_indicator").fadeIn();
          var width = $(".r-slider1").parents(".range-slider").width();
          var posTop = $(".r-slider1").parents(".range-slider").offset().top + 13;
          var posLeft = $(".r-slider1").parents(".range-slider").offset().left + width + 24;
          $('.found_amount').css("top", posTop).css("left", posLeft).show();
          clearTimeout(timer);
          timer = setTimeout(function() {
              $('.found_amount').fadeOut();
          }, 3000);
      }
  });
  $input_from1.on("change keyup", function() {
      var val = $(this).prop("value");

      if (val < min) {
          val = min;
      } else if (val > max) {
          val = max;
      }

      instance1.update({
          from: val
      });
  });
  $input_to1.on("change keyup", function() {
      var val = $(this).prop("value");

      if (val < min) {
          val = min;
      } else if (val > max) {
          val = max;
      }

      instance1.update({
          to: val
      });
  });

  instance1 = $range1.data("ionRangeSlider");
}

//бренды и серии
function brands() {
  $('.brands .checkbox_item').on('change', function() {
      var chk = $(".brands").find('input[type=checkbox]:checked').length;
      if (chk == 1) {
          $('.filter .series').addClass("section_stab");
      } else {
          $('.filter .series').removeClass("section_stab");
      }
  });
  $('.brands .reset').click(function() {
      $('.filter .series').removeClass("section_stab");
      $('.filter .series .checkbox_item').prop('checked', false).removeClass('active');
      $('.filter .series .item').fadeOut();
      $(".filter .series .select_indicator").fadeOut();
      $(".filter .series .tab_title").siblings().slideUp(300);
      $(".filter .series .tab_title").removeClass("title_active");
  });

  $('.input_end, .input_start').on('input keyup', function(e) {
      $(this).addClass('active');
  });
}

//табы и кнопки
function filter() {
  $(".filter .tab_title .open_button, .filter .tab_title .section_title").on('click', function() {
      $(this).parents(".tab_title").toggleClass("title_active");
      if ($(this).parents(".tab_title").hasClass("title_active")) {
          $(this).parents(".tab_title").siblings().slideDown(300);
      } else {
          $(this).parents(".tab_title").siblings().slideUp(300);
      }
  });
  $(".filter .param_more").on('click', function() {
      $(this).siblings(".drop_down_list").slideToggle(300);
      $(this).toggleClass("param_more_active");
      if ($(this).hasClass("param_more_active")) {
          $(this).text("Свернуть");
      } else {
          $(this).text("Показать все");
      }
  });
  $(".filter_show_btn").on('click', function() {
      console.log('++')
      $(".left-sidebar").slideToggle(300).toggleClass("f_active");
      if ($(".left-sidebar").hasClass("f_active")) {
          $(this).text("Скрыть фильтр");
      } else {
          $(this).text("Фильтр");
      }
  });
}

//сброс, вывод товаров
function count() {
  $('.checkbox_item, .input_end, .input_start').on('change', function() {
      var pos = $(this).parent().offset();
      var withContent = $(".section").width();
      var countTop = pos.top;
       var posL = $(this).parents(".section").offset();
      var posLeft = posL.left + withContent + 4;
      clearTimeout(timer);
      timer = setTimeout(function() {
      $('.found_amount').fadeOut();
      }, 3000);
      $('.found_amount').css("top", countTop).css("left", posLeft).show();
      if ($(this).prop('checked')) {
          $(this).addClass('active');
      } else {
          $(this).removeClass('active');
      }
  });

  $('.input_end, .input_start').on('change', function() {
           $(this).parents(".section").find(".item").fadeIn();
          $(this).parents(".section").find(".select_indicator").fadeIn();
  });

  $('.checkbox_item').on('change', function() {
      if ($(this).parents(".tab_content").find(".active").length) {
          $(this).parents(".section").find(".item").fadeIn();
           $(this).parents(".section").find(".select_indicator").fadeIn();
      } else {
          $(this).parents(".section").find(".item").fadeOut();
          $(this).parents(".section").find(".select_indicator").fadeOut();
      }
  });

  $('.filter .reset').on('click', function() {
      $('.found_amount, .found_amount_all').fadeOut();
      $(this).parents(".tab_title").siblings(".tab_content").find(".checkbox_item").prop('checked', false).removeClass('active');
      $(this).parents(".tab_title").siblings(".tab_content").find(".input_end").val(max).removeClass('active');
      $(this).parents(".tab_title").siblings(".tab_content").find(".input_start").val(min).removeClass('active');
      $(".r-slider1").data("ionRangeSlider").update({
          from: min,
          to: max
      });
      $(this).parents(".section").find(".item").fadeOut();
      $(this).parents(".section").find(".select_indicator").fadeOut();
      $(this).parents(".tab_title").siblings().slideUp(300);
      $(this).parents(".tab_title").removeClass("title_active");
  });

}