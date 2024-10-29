#!/bin/sh
pnpm run clean
pnpm --registry=http://localhost:4873 install
pnpm run format:write
pnpm run lint
pnpm run build
pnpm run test
# pnpm --registry=http://localhost:4873 update
git status
echo "Please enter a commit message"
read message
git add --all
git commit -m "'$message'"
git push origin main
pnpm run version
pnpm run publish
# pnpm run docs
# pnpm run pages
