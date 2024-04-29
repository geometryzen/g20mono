#!/bin/sh
npm install --force
npm update --force
npm run build
npm run lint
git status
git add --all
echo "Please enter a commit message"
read message
git commit -m "'$message'"
git push origin main
npm run release
npm run docs
npm run pages
