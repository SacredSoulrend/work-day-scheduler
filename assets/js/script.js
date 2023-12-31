// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  $(".saveBtn").on("click", function () {
    var key = $(this).closest(".time-block").attr("id"); 
    var description = $(this).siblings(".description").val();
    
    localStorage.setItem(key, description);

    showNotification("Appointment added to local storage");

    updateBlockStatus();
  });

  // Function to show the notification
  function showNotification(message) {
    const notification = $("<div class='notification'></div>").text(message);
    $("#currentDay").after(notification);

    setTimeout(function () {
      notification.fadeOut("slow", function () {
        $(this).remove();
      });
    }, 3000);
  }  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  function updateBlockStatus() {
    var currentTime = dayjs();
    var currentHour = currentTime.hour(); 

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      $(this).removeClass("past present future");

      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  $(".time-block").each(function () {
    const timeBlockId = $(this).attr("id");
    const savedInput = localStorage.getItem(timeBlockId);

    if (savedInput) {
      $(this).find(".description").val(savedInput);
    }
  });
  // TODO: Add code to display the current date in the header of the page.
  var currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);

    updateBlockStatus();

    setInterval(updateBlockStatus, 60000);
});

