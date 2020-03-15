 $(document).ready(function() {
	if (location.protocol !== 'https:' && location.hostname !== "localhost" && location.hostname !== "127.0.0.1" && location.hostname !== "0.0.0.0") {
		location.replace(`https:${location.href.substring(location.protocol.length)}`);
	 }
	 const domain = 'meet.jit.si';
	var room = getParameterByName("kamer");
	 if (room) {
		 $(".roomdata").hide(500);
		const options = {
			roomName: room,
			parentNode: document.getElementById("meet")
		};

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

	if( firstInputField !== null && secondInputField !== null && thirdInputField!== null ) {
		window.location = "?kamer=" + firstInputField + secondInputField + thirdInputField;
		$(".roomdata").hide(500);
	}

}