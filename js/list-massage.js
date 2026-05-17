function loadMessageList() {
    var url = "https://sheets.googleapis.com/v4/spreadsheets/" + "1m-ihWNqz1-ccqqQM1H3QIRVj79U0hy7-Jwl2krDBzlo" + "/values/" + "Sheet1!A2:Z986" + "?alt=json&key=" + "AIzaSyD6Ib0YVwylVGu2n8_rQAPPFkF0b9R_JGQ";

    $("#message_list").empty();
    $.getJSON(url, "callback=?", function (result) {
        let value = result.values;

        $.each(value, function (i, data) {
            $("#message_list").append(
              `<li>
              <p class="guest_name" style="font-family:Times New Roman; font-size:17px;text-align:left;font-weight:bold;">`+ data[1] +`</p>
              <p style="font-family:Times New Roman; font-size:15px;text-align:left;padding-top:7px;">`+ data[0] +`</p>
              <p style="font-family:third-font;font-size:20px;text-align:left;padding-top:11px">`+ data[2] +`</p>
              </li>` 
            );
          });
    });
}

// Load messages on page load
loadMessageList();
