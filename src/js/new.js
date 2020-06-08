$(document).ready(function(){
  additionalSalesTab();
})

/* С ЭТИМ ТОВАРОМ ПОКУПАЮТ ТАБЫ */

function additionalSalesTab() {
  let $navlinks = $('.additional-sales-navlist__link'),
      $tabs = $('.additional-sales-tab'),
      current, old, 
      $current;

  if(!$navlinks.closest('.active').length) {
    $navlinks.eq(0).addClass('active');
  }

  tabToggle();
  $(document).on('click', '.additional-sales-navlist__link', function(){
    $navlinks.removeClass('active');
    $(this).addClass('active');
    tabToggle();
  })

  function tabToggle() {
    current = $navlinks.closest('.active').parent().index();
    $current = $tabs.eq(current);
    
    if(old>=0) $tabs.eq(old).hide();
    if($current.length) $current.fadeIn(500);
    old=current;
  }

}