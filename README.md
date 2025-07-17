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

## Inputs

* **github_token** (required): GitHub token with repo write scope
* **prefix-tag** (optional): Prefix to add to the git tag (not included in output)

## Usage with prefix

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
          prefix-tag: 'v'
```

This will create a git tag like `v2023.01.15-01` but the output will still be `2023.01.15-01`.

### Output
* **tag**: The generated CalVer tag (without prefix)

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