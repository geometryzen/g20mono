#!/bin/sh
echo "Please enter a commit message"
read message
npm install
npm update
npm run build
#npm run lint
#npm run test
git status
git add --all
git commit -m "'$message'"
git push origin main
npm run version
npm run publish
#npm run docs
#npm run pages
