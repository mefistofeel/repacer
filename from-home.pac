var directConnection = "DIRECT"; 
var proxy = "PROXY 10.100.100.41:1080";
var myIp = myIpAddress();

// Настройки для разблокировки сервисов
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
            "rutracker.org"
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

// Проверка доменов и шаблонов
function matchesServicePatterns(url, host) {
    for (var service in unblockServices) {
        var serviceData = unblockServices[service];
        
        // Проверка доменов
        for (var i = 0; i < serviceData.domains.length; i++) {
            if (dnsDomainIs(host, serviceData.domains[i]) || shExpMatch(host, "*." + serviceData.domains[i])) {
                return true;
            }
        }
        
        // Проверка URL-шаблонов
        for (var j = 0; j < serviceData.patterns.length; j++) {
            if (shExpMatch(url, serviceData.patterns[j])) {
                return true;
            }
        }
    }
    return false;
}



// Основная функция для определения прокси
function FindProxyForURL(url, host) {
    // Проверка доменов и шаблонов
    if (
        matchesServicePatterns(url, host) && 
        (
            isInNet(myIp, "10.100.100.0", "255.255.255.0") || 
            isInNet(myIp, "192.168.1.0.0", "255.255.255.0")
        )
    ) {
        return proxy;
    }

    // Если ни одно условие не подошло - прямое соединение
    return directConnection;
}
