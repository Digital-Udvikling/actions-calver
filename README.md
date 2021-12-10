# CalVer Action

Generates and a tags the current commit with a [CalVer](https://calver.org/) tag based on the format [YYYY.0M.0D-MICRO]

example usage:

```yaml
jobs:
  tag:
    steps:
      - name: Create git tag
        uses: Digital-Udvikling/actions-calver@v0.1.0
```

### Output
* **tag**: The generated CalVer tag

## Developing

Install dependencies  
```bash
$ npm install
```


Run tests :heavy_check_mark:  
```bash
$ npm test
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
