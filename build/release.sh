#!/usr/bin/env bash

set -e

if [[ -z $1 ]]; then
    echo "Enter new version: "
    read VERSION
else
    VERSION=$1
fi

read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ [Yy]$ ]]; then
    echo "Releasing $VERSION ..."

    npm run build:all

else
    echo "Version $VERSION was not released."
fi