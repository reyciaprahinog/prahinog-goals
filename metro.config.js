<<<<<<< HEAD
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
=======
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('cjs');
config.resolver.unstable_enablePackageExports = false;
>>>>>>> 39e2899829d23884b84fa5f82975be06b6039c12

module.exports = config;
