var config = require('./config.js');

JitsiMeetJS.init(config);

var connections=[];

var rooms=[];

var noTracks=0;

var remoteTracks={};

function nextConnection() {
	var connection= new JitsiMeetJS.JitsiConnection(null, null, config);
	connections.push(connection);
	connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
	connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
	connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, onDisconnected);
	connection.connect();
}


function onConferenceJoined() {
	console.log("joined conference");
	if (connections.length==10) {
		return;
	}
}

function onRemoteTrack(track) {
	console.log("got remote track "+noTracks+" track type: "+track.type+" track peer id: "+track.peerjid);
	noTracks++;

	if(track.isLocal() || !track.stream)
		return;
	var participant = track.getParticipantId();
	if(!remoteTracks[participant])
		remoteTracks[participant] = [];
	var idx = remoteTracks[participant].push(track);
	var id = participant + track.getType() + idx;
	console.log("Track TYPE = "+track.getType());
	if(track.getType() == "video") {
		presenterId = room.getParticipantById(participant)._id;
		var videoid = participant + "video" + noTracks + "idx" + idx;
		$("body").append("<video width='192' height='108' autoplay='1' id='" + videoid + "' />");
		track.attach($("#" + videoid)[0]);
	}
}

function onConnectionSuccess() {
	console.log("connection successful "+connections.length);
	room = connections[connections.length-1].initJitsiConference("demio_stress_test", {
      openSctp: true
  });
	rooms.push(room);
	room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
	room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
	room.join();
}

function onConnectionFailed() {
	console.log("connection failed");
}

function onDisconnected() {
	console.log("disconnected");
}

nextConnection();