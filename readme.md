# zodern:import-extension-order

Configure the order extensions are tried by Meteor when resolving an imported file without an extension.
Compatible with Meteor 2 and newer.

For example:
```
import '/imports/ui/button';
```

Normally, Meteor would first check for a `button.js`, `button.json`, then a `button.html` file, and so on.
If there are both `button.html` and `button.ts` files, Meteor would import the html file.
This package allows changing the order Meteor tries extensions, so you can prioritize `.ts` or other extensions.

## Usage

1. Add the package with `meteor add zodern:import-extension-order`
2. Configure the extension order. Update the `meteor` object in your package.json file:

```json
{
  "meteor": {
    "mainModule": {
      "client": "client/main.tsx",
      "server": "server/main.ts"
    },
    "testModule": "tests/main.js",
    "extensions": [".js", ".ts", ".jsx", ".tsx", ".html", ".css"]
  }
}
```

If Meteor finds an extension that is not listed in the config, the package will log a message to let you know.
