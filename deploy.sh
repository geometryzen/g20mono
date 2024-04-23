#!/bin/sh
npm install --force
npm update --force
lerna run build
lerna run lint
lerna run test
git status
git add --all
echo "Please enter a commit message"
read message
git commit -m "'$message'"
git push origin main
lerna version --no-private --force-publish
lerna publish from-package
#lerna run docs
#lerna run pages
