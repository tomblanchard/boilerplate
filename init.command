cd "$(dirname "$0")"
rm -rf .git .gitignore README.md
find . -name "*.emptydir" -delete
npm install
exit