#!/bin/sh
echo "Please enter a commit message"
read message
npm install
npm update
lerna run build
lerna run lint
lerna run test
git status
git add --all
git commit -m "'$message'"
git push origin main
lerna version --no-private --force-publish
lerna publish from-package
lerna run docs
lerna run pages --concurrency=1
