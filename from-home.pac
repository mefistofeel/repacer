function FindProxyForURL(url, host)
{
  // var privateIP = /^(0|10|127|192\.168|172\.1[6789]|172\.2[0-9]|172\.3[01]|169\.254|192\.88\.99)\.[0-9.]+$/;
	var myIp = myIpAddress();
  if (
    dnsDomainIs(host, "kinozal.tv")
    || dnsDomainIs(host, "rutracker.org")
    || dnsDomainIs(host, "licdn.com")
    || dnsDomainIs(host, "linkedin.com")
    || dnsDomainIs(host, "lostfilm.tv")
  )
//    if (isInNet(myIp, "10.100.100.0", "255.255.255.0")) 
//      return "PROXY 10.100.100.41:1080";
//    else
//      return "PROXY 127.0.0.1:10809";

  return "DIRECT";
}
