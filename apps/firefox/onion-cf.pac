function FindProxyForURL(url, host) {
  if (isPlainHostName(host) || dnsDomainIs(host, ".localhost")) {
    return "DIRECT";
  }
  if (dnsDomainIs(host, ".onion")) {
    return "SOCKS5 127.0.0.1:9050";
  }
  return "SOCKS5 127.0.0.1:1111";
}
