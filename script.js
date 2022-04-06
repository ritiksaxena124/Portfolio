$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $("header").toggleClass("toggle");
  });
  $(window).on("scroll load", function () {
    console.log("yes");
    $("#menu").removeClass("fa-times");
    $("header").removeClass("toggle");
  });
});
