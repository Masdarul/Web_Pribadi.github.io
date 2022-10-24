$(document).ready(function () {
  $("#searchBookTitle").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".book_list").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
