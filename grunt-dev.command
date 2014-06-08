cd "$(dirname "$0")"
\rm -rf .gitignore README.md .emptydir
if [ ! -d node_modules ];then
  sudo npm install
fi
grunt