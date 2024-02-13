# CalVer Action

Generates and a tags the current commit with a [CalVer](https://calver.org/) tag based on the format [YYYY.0M.0D-MICRO]

example usage:

```yaml
jobs:
  tag:
    permissions:
      contents: write
    steps:
      - name: Create git tag
        uses: Digital-Udvikling/actions-calver@v0.4.0
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
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

## Publishing

Ensure all tests pass, and then create a new release on github.