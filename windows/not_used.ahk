; Prevent dying mouse doubleclick

; LButton:: {
; 	If (A_PriorHotkey = "LButton" and A_TimeSincePriorHotkey < 120)
; 		Return
; 	Click("Down")
; 	KeyWait("LButton")
; 	Click("Up")
; 	Return
; }
