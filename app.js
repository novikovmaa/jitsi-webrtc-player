var config = require('./config.js');

JitsiMeetJS.init(config);

var connections=[];

var rooms=[];

var noTracks=0;

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
	setTimeout(nextConnection, 5000);

}

function onRemoteTrack() {
	console.log("got remote track "+noTracks);
	noTracks++;
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