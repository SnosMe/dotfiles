--[[
	Autoreconnect script for watching RTSP stream

	Example:
	```
	mpv --cache=yes --demuxer-max-back-bytes=8MiB --demuxer-donate-buffer=no
		--scripts-append=./recon.lua rtsp://admin:admin@192.168.1.100:8554/live
	```
--]]

local prev_duration = 0

function check_stream()
	local duration = mp.get_property_number('duration')
	if duration == prev_duration then
		mp.commandv('loadfile', mp.get_property('path'), 'replace')
	end
	prev_duration = duration
end

mp.add_periodic_timer(4, check_stream)
