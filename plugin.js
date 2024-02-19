const path = require('path');

const mainModule = global.process.mainModule;
const absPath = mainModule.filename.split(path.sep).slice(0, -1).join(path.sep);
const toolsRequire = function (filePath) {
  return mainModule.require(path.resolve(absPath, filePath));
};

const { PackageSourceBatch } = toolsRequire('isobuild/compiler-plugin');
const { optimisticReadJsonOrNull } = toolsRequire('fs/optimistic');

// Based on implementation in Meteor 2.14 (though it hasn't changed since Meteor 1.4)
PackageSourceBatch.prototype.addImportExtension = function (extension) {
  extension = extension.toLowerCase();

  if (!extension.startsWith(".")) {
    extension = "." + extension;
  }

  if (this.importExtensions.indexOf(extension) < 0) {
    this.importExtensions.push(extension);

    let isApp = !this.unibuild.pkg.name;
    if (isApp) {
      sortExtensionOrder(this.importExtensions, this.sourceRoot, extension);
    }
  }
}

function sortExtensionOrder(importExtensions, sourceRoot, newExtension) {
  let configOrder = getExtensionOrderConfig(sourceRoot);

  if (configOrder.indexOf(newExtension) === -1) {
    console.log(`zodern:import-extension-order: ${newExtension} missing in meteor.extensions config`);
  }

  importExtensions.sort((a, b) => {
    let aIndex = configOrder.indexOf(a) ?? 0;
    let bIndex = configOrder.indexOf(b) ?? 0;
    return aIndex - bIndex;
  });
}

function getExtensionOrderConfig(sourceRoot) {
  let packageJson = optimisticReadJsonOrNull(
    Plugin.path.resolve(sourceRoot, 'package.json')
  );
  let config = packageJson?.meteor?.extensions;

  if (!config) {
    console.log('');
    console.log('zodern:import-extension-order: meteor.extensions config not found in package.json');
  }

  return config || [];
}
