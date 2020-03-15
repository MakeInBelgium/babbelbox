 $(document).ready(function() {
	if (location.protocol !== 'https:' && location.hostname !== "localhost" && location.hostname !== "127.0.0.1" && location.hostname !== "0.0.0.0") {
		location.replace(`https:${location.href.substring(location.protocol.length)}`);
	}
	$('[data-toggle="tooltip"]').tooltip();
});


function GenerateRoom() {

	const domain = 'meet.jit.si';
	var a = document.getElementById("a").value;
	var b = document.getElementById("b").value;
	var c = document.getElementById("c").value;

	$("#wrd_disp_a").html(document.getElementById("a").value);
	$("#wrd_disp_b").html(document.getElementById("b").value);
	$("#wrd_disp_c").html(document.getElementById("c").value);

	if( a.value != '' && b.value != '' ) {
		$("#chan").removeClass('hidden');

		const options = {
			roomName: a + b + c ,
			parentNode: document.getElementById("meet")
		};

		var api = new JitsiMeetExternalAPI(domain, options);

		$("#roomdata").hide(500);
	}

}