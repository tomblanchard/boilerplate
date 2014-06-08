cd "$(dirname "$0")"
find . -name "*.emptydir" or -name ".gitignore" or -name "README.md" -delete
if [ ! -d node_modules ];then
  sudo npm install
fi
grunt