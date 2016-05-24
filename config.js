var config = {

  // configLocation: './config.json', // see ./modules/HttpConfigFetch.js
  CONF_OPTIONS: {
      openSctp: true
  },
  hosts: {
      domain: '147.75.197.183',
      muc: 'conference.147.75.197.183',
      bridge: 'jitsi-videobridge.147.75.197.183', // FIXME: use XEP-0030
  },
  useNicks: false,
  bosh: 'http://147.75.197.183/http-bind', // FIXME: use xep-0156 for that
  clientNode: 'http://jitsi.org/jitsimeet', // The name of client node advertised in XEP-0115 'c' stanza
  desktopSharingChromeMethod: 'webrtc',
  desktopSharingChromeExtId: 'diibjkoicjeejcmhdnailmkgecihlobk',
  desktopSharingChromeSources: ['screen', 'window'],
  desktopSharingChromeMinExtVersion: '0.1',

  desktopSharingFirefoxExtId: null,
  desktopSharingFirefoxDisabled: true,
  desktopSharingFirefoxMaxVersionExtRequired: -1,
  desktopSharingFirefoxExtensionURL: null,

  webrtcIceUdpDisable: false,
  webrtcIceTcpDisable: false,

  openSctp: true, // Toggle to enable/disable SCTP channels
  disableStats: false,
  disableAudioLevels: false,
  channelLastN: -1, // The default value of the channel attribute last-n.
  adaptiveLastN: false,
  enableRecording: false,
  enableWelcomePage: true,
  disableSimulcast: false,
  logStats: false, // Enable logging of PeerConnection stats via the focus
  startVideoMuted: 0, // every participant after the Nth will start video muted
  disableThirdPartyRequests: false,
  minHDHeight: 540
}

module.exports = config;