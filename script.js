var currentTime = dayjs();

// add current time on header
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
    // auto sort am or pm as the i are given for 24-clock
    if (i < 12) {
      amPm = "AM";
    } else {
      amPm = "PM";
    }
    {
      // get the time shown as 12-clock
      var pmTime;
      if (i <= 12) {
        pmTime = i;
      } else {
        pmTime = i - 12;
      }
    }
    // let the current hour compare against hour on each boxes
    var currentHourIn24clock = dayjs().format("H");
    var pastPresentFuture;
    if (i < currentHourIn24clock) {
      pastPresentFuture = "past";
    } else if (i == currentHourIn24clock) {
      pastPresentFuture = "present";
    } else {
      pastPresentFuture = "future";
    }
    // backtips are so useful when needed to mix texts and variables in a single variable.
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

// save events to localStorage
// inspired by chatGPT
var boxesContainer = document.getElementById("boxes-container");

boxesContainer.addEventListener("click", function (event) {
  event.preventDefault();
  if (
    // when the click event occur on "boxes-container", it will look for elements that have class of "saveBtn" or "fa-save" and target it
    event.target.classList.contains("saveBtn") ||
    event.target.classList.contains("fa-save")
  ) {
    // from targeted event, which are the save buttons or icon, look for the closest element that class of "time-block"
    var timeBlock = event.target.closest(".time-block");
    // find above var target and change it id number
    var hour = timeBlock.id.replace("hour-", "");
    // from class time-block and find class of textarea using querySelectore and get its value
    var text = timeBlock.querySelector("textarea").value;
    // store it with key of event-" "
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
timeBoxGenerator();
loadFromLocalStorage();
updateTimeRightNow();
setInterval(updateTimeRightNow, 1000);
