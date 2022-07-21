$(document).ready(function () {
  $("#state").append($("<option>").text("-State-"));
  //to show text "state" in default blank column
  $("#city").append($("<option>").text("-City-"));
  //to show text "city" in default blank column

  $.getJSON("/resume/fetchAllStates", function (data) {
    //to fetch states
    $.each(data, function (index, item) {
      $("#state").append($("<option>").text(item.statename).val(item.stateid));
      //to fill data in dropdown of states
    });
  });
  $("#state").change(function () {
    $("#city").empty();
    //to clear old record
    $("#city").append($("<option>").text("-City-"));
    //to show text "city" in default blank column

    $.getJSON(
      "/resume/fetchAllCities",
      { stateid: $("#state").val() },
      function (data) {
        //to fetch all city according to states
        $.each(data, function (index, item) {
          $("#city").append($("<option>").text(item.cityname).val(item.cityid));
          //fill city
        });
      }
    );
  });
});