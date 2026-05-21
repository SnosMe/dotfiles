var extraDirect = [".twitch.tv", ".ttvnw.net", ".jtvnw.net"];

function FindProxyForURL(url, host) {
  if (isPlainHostName(host) || dnsDomainIs(host, ".localhost")) {
    return "DIRECT";
  }
  if (dnsDomainIs(host, ".onion")) {
    return "SOCKS5 127.0.0.1:9050";
  }
  if (dnsDomainIs(host, "mitm.it")) {
    return "HTTP 127.0.0.1:1171";
  }
  for (var i = 0; i < extraDirect.length; i++) {
    if (dnsDomainIs(host, extraDirect[i])) {
      return "DIRECT";
    }
  }
  return "SOCKS5 127.0.0.1:1111";
}
