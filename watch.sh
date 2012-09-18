
echo '--- start watching'
cd `dirname $0`

jade -O page/ -wP tmpl/index.jade &
stylus -o page/ -w tmpl/page.styl &
coffee -o page/ -wb tmpl/handle.coffee &
coffee -o lib/ -wb src/willow.coffee &
doodle page/ lib/willow.js &

read

pkill -f 'jade -O page/ -wP tmpl/index.jade'
pkill -f 'stylus -o page/ -w tmpl/page.styl'
pkill -f 'coffee -o page/ -wb tmpl/handle.coffee'
pkill -f 'coffee -o lib/ -wb src/willow.coffee'
pkill -f 'doodle page/ lib/willow.js'

echo '--- stop watching'