

echo '--- start watching'
cd `dirname $0`

coffee -o lib/ -wb src/* &

read

pkill -f 'coffee -o lib/ -wb src/*'

echo '--- stop watching'