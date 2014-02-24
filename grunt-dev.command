cd "$(dirname "$0")"
find . -name "*.emptydir" -delete
if [ ! -d node_modules ];then
  sudo npm install
fi
grunt