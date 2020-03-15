$(document).ready(function() {
  if (
    location.protocol !== "https:" &&
    location.hostname !== "localhost" &&
    location.hostname !== "127.0.0.1" &&
    location.hostname !== "0.0.0.0"
  ) {
    location.replace(
      `https:${location.href.substring(location.protocol.length)}`
    );
  }
  const domain = "meet.jit.si";
  var room = getParameterByName("kamer");
  if (room) {
	$("#chan").removeClass("hidden");
    $("#roomdata").hide(500);
    const options = {
      roomName: room,
      parentNode: document.getElementById("meet")
    };

	$("#wrd_disp_a").html(getParameterByName("wrd_a"));
	$("#wrd_disp_b").html(getParameterByName("wrd_b"));
	$("#wrd_disp_c").html(getParameterByName("wrd_c"));

    var api = new JitsiMeetExternalAPI(domain, options);
  }

  $('[data-toggle="tooltip"]').tooltip();
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function redirectToRoom() {
  var firstInputField = document.getElementById("a").value;
  var secondInputField = document.getElementById("b").value;
  var thirdInputField = document.getElementById("c").value;

  if (
    firstInputField !== null &&
    secondInputField !== null &&
    thirdInputField !== null
  ) {
		const roomName = generateName(firstInputField, secondInputField, thirdInputField);
    window.location = "?kamer=" + roomName + "&wrd_a="+firstInputField+"&wrd_b="+firstInputField+"&wrd_c="+thirdInputField;;
   
	$("#chan").removeClass("hidden");
    $("#roomdata").hide(500);
  }
  function generateName(firstInputField, secondInputField, thirdInputField) {
	  removeCharacters(firstInputField);
	  removeCharacters(secondInputField);
	  removeCharacters(thirdInputField);
	  return firstInputField.trim() + secondInputField.trim() + thirdInputField.trim();
  }
  function removeCharacters(inputField) {
	  const invalidChars = ['?', '&', ':', '\'', '%', '#'];
	  invalidChars.forEach(element => {
		  inputField.replace(element, '');
	  });

  }
}
