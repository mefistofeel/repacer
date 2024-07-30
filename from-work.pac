function FindProxyForURL(url, host)
{
	var myIp = myIpAddress();
  if (
    dnsDomainIs(host, "kinozal.tv")
    || dnsDomainIs(host, "rutracker.org")
    || dnsDomainIs(host, "licdn.com")
    || dnsDomainIs(host, "linkedin.com")
    || dnsDomainIs(host, "lostfilm.tv")
    || dnsDomainIs(host, "youtube.com")
    || dnsDomainIs(host, "googlevideo.com")
    || dnsDomainIs(host, "ggpht.com")
  )
    if (isInNet(myIp, "10.100.100.0", "255.255.255.0")) 
      return "PROXY 10.100.100.41:1080";

  return "DIRECT";
}
