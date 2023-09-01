// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var currentTime = dayjs();

// add current time on header
// $("#currentDay").text(currentTime.format("MMM D, YYYY, HH:mm:ss A"));
function updateTimeRightNow() {
  var timeRightNow = dayjs().format("MMM D, YYYY, HH:mm:ss A");
  $("#currentDay").text(timeRightNow);
}

// function idea/codes from instructor in office hour, and did a little modification
function timeBoxGenerator() {
  var newTimeBox = [];
  var timeBoxContainer = $("#boxes-container");
  timeBoxContainer.empty();
  var amPm;
  for (var i = 8; i <= 17; i++) {
    newTimeBox.push(i);
    if (i < 12) {
      amPm = "AM";
    } else {
      amPm = "PM";
    }
    {
      var pmTime;
      if (i <= 12) {
        pmTime = i;
      } else {
        pmTime = i - 12;
      }
    }
    var currentHourIn24clock = dayjs().format("H");
    console.log(currentHourIn24clock);
    var pastPresentFuture;
    if (i < currentHourIn24clock) {
      pastPresentFuture = "past";
    } else if (i == currentHourIn24clock) {
      pastPresentFuture = "present";
    } else {
      pastPresentFuture = "future";
    }

    var timeBoxStructure = `<div id="hour-${i}" class="row time-block ${pastPresentFuture}">
  <div class="col-2 col-md-1 hour text-center py-3">${pmTime}${amPm}</div>
  <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
  <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
  </button>
</div>`;

    timeBoxContainer.append(timeBoxStructure);
  }
}

timeBoxGenerator();

// save events to localStorage
// inspired by chatGPT
var boxesContainer = document.getElementById("boxes-container");

boxesContainer.addEventListener("click", function (event) {
  event.preventDefault();
  if (
    event.target.classList.contains("saveBtn") ||
    event.target.classList.contains("fa-save")
  ) {
    var timeBlock = event.target.closest(".time-block");
    var hour = timeBlock.id.replace("hour-", "");
    var text = timeBlock.querySelector("textarea").value;
    localStorage.setItem("event-" + hour, text);
  }
});

// load saved events when page load or refresh
function loadFromLocalStorage() {
  for (var i = 8; i <= 17; i++) {
    // genereate key pair from event-8 to 17
    var hour = "event-" + i;
    // get info from each hour
    var textStored = localStorage.getItem(hour);
    // place for the stored infor
    var textDisplay = document.querySelector(`#hour-${i} .description`);

    textDisplay.value = textStored;
  }
}

// INITIALIZATION
loadFromLocalStorage();
updateTimeRightNow();
setInterval(updateTimeRightNow, 1000);
