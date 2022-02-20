

function makeEffect(start, end, effect, cursor) {
	print cursor " watch timeEnter " start " " end " (  /ITL/scene event " effect ");";
	print cursor " watch timeLeave " start " " end " (  /ITL/scene event NO" effect ");";
	print "\n"
}

BEGIN {
	FS = ":";
}

END {
	print "/ITL/scene event EFFECTREADY;"
}


################# 
/^[0-9]/ {
	makeEffect($1, $2, $3, cursor);
}

/^fin/ {
	print cursor " watch timeEnter " $2 " " ($2 + 100) " ( /ITL/scene event STOP );" ;
}
