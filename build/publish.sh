cp package.json dist
cp LICENSE dist
cp README.md dist
cd dist
ls -al
nrm use npm
npm publish --registry=https://registry.npmjs.org
