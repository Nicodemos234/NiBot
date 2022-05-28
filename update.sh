#!/bin/sh
git pull
yarn
yarn build
pm2 restart 1
