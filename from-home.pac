var directConnection = "DIRECT"; 
var proxy = "PROXY 10.100.100.202:1080";
var myIp = myIpAddress();

var unblockServices = {
    youtube: {
        domains: [
            "youtube.com", "ytimg.com", "youtu.be"
        ],
        patterns: [
            "*youtube.com/get_video_info*",
            "*youtube.com/api/timedtext*",
            "*youtube.com/watch*",
            "*redirector.googlevideo.com*",
            "*googlevideo.com*"
        ],
        allowedIPs: []
    },
    kinozal: {
        domains: [
            "kinozal.tv"
        ],
        patterns: [],
        allowedIPs: []        
    },
    rutracker: {
        domains: [
            "rutracker.org",
            "rutracker.cc"
        ],
        patterns: [],
        allowedIPs: []
    },    
    lostfilm: {
        domains: [
            "lostfilm.tv"
        ],
        patterns: [],
        allowedIPs: []
    },        
    // name: {
    //     domains: [],
    //     patterns: [],
    //     allowedIPs: []
    // },    
};

function matchesServicePatterns(url, host) {
    for (var service in unblockServices) {
        var serviceData = unblockServices[service];
        
        for (var i = 0; i < serviceData.domains.length; i++) {
            if (dnsDomainIs(host, serviceData.domains[i]) || shExpMatch(host, "*." + serviceData.domains[i])) {
                return true;
            }
        }
        
        for (var j = 0; j < serviceData.patterns.length; j++) {
            if (shExpMatch(url, serviceData.patterns[j])) {
                return true;
            }
        }
    }
    return false;
}



function FindProxyForURL(url, host) {
    if (
        matchesServicePatterns(url, host) && 
        (
            isInNet(myIp, "10.100.100.0", "255.255.255.0") || 
            isInNet(myIp, "192.168.1.0", "255.255.255.0")
        )
    ) {
        return proxy;
    }
    return directConnection;
}
