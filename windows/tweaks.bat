:: Disable file indexing
sc config "WSearch" start=disabled

:: Disable wake timers (i.e. Windows Update at 4am)
powercfg /SETACVALUEINDEX SCHEME_CURRENT SUB_SLEEP RTCWAKE 0
:: Don't turn off display (before sleep)
powercfg /SETACVALUEINDEX SCHEME_CURRENT SUB_VIDEO VIDEOIDLE 0
