$(document).ready(function (e) {
  $('.search-panel .dropdown-menu').find('a').click(function (e) {
    e.preventDefault();
    var param = $(this).attr("href").replace("#", "");
    var concept = $(this).text();
    $('.search-panel span#search_concept').text(concept);
    $('.input-group #search_param').val(param);
  });

  $(".btn-pref .btn").click(function () {
    $(".btn-pref .btn").removeClass("theme-color").addClass("btn-default");
    // $(".tab").addClass("active"); // instead of this do the below 
    $(this).removeClass("btn-default").addClass("theme-color");
  });
});