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

    # Build
    npm run build:all

    # Set new version to package.json
    npm --no-git-tag-version version $VERSION

    # Commit the build and new version
    git add -A
    git commit -m "[release] $VERSION"

    # Tag release
    git tag -a "v$VERSION" -m "$VERSION"

    # Push to remote
    git push origin refs/tags/v$VERSION
    git push
else
    echo "Version $VERSION was not released."
fi