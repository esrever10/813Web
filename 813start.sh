#! /bin/sh

NODE_ENV=production
DAEMON="node http.js"
NAME=813
DESC=813
PIDFILE="813.pid"

case "$1" in
	start)
		echo "Starting $DESC: "
			nohup $DAEMON > /dev/null &
		echo $! > $PIDFILE
		echo "$NAME."
			;;
	stop)
		echo "Stopping $DESC:  "
			pid='cat $PIDFILE'
		kill $pid
			rm $PIDFILE
		echo "$NAME."
			;;
	esac

	exit 0
