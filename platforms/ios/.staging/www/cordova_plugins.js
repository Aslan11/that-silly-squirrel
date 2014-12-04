cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/uk.co.ilee.gamecenter/www/gamecenter.js",
        "id": "uk.co.ilee.gamecenter.GameCenter",
        "clobbers": [
            "gamecenter"
        ]
    },
    {
        "file": "plugins/com.rjfun.cordova.plugin.iad/www/iAd.js",
        "id": "com.rjfun.cordova.plugin.iad.iAd",
        "clobbers": [
            "window.plugins.iAd"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugin.statusbar/www/statusbar.js",
        "id": "com.phonegap.plugin.statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "uk.co.ilee.gamecenter": "0.3.0",
    "com.rjfun.cordova.plugin.iad": "0.1.8",
    "com.phonegap.plugin.statusbar": "1.1.0"
}
// BOTTOM OF METADATA
});