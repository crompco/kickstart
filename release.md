# Release

## NPM Login
Before release, you will need to make sure to log into npm

```bash 
npm login
# For WSL try
npm login --auth-type=legacy
``` 

## Build and release

```bash
./build/release/sh
```

You will be prompted for a version number, do not add any prefix (v) to that number. 

For Example, v2.0.0 should be entered as 2.0.0.

## Publishing  

> This should only be used if the publishing fails during the build.

If the build runs but the publishing fails you can re-run the publishing.

```bash 
npm publish
# For WSL try
npm publish --auth-type=legacy
```
