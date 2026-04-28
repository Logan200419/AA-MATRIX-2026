const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../../');
const rootNodeModules = path.resolve(workspaceRoot, 'node_modules');

const config = getDefaultConfig(projectRoot);

// Watch both app and packages directories
config.watchFolders = [
  path.resolve(projectRoot, 'app'),
  path.resolve(workspaceRoot, 'packages/types'),
  path.resolve(workspaceRoot, 'packages/mocks'),
  rootNodeModules,
];

// Configure resolver to find workspace packages and root node_modules
config.resolver.extraNodeModules = {
  '@deepfake-demo/types': path.resolve(workspaceRoot, 'packages/types'),
  '@deepfake-demo/mocks': path.resolve(workspaceRoot, 'packages/mocks'),
};

// Allow resolution from parent node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  rootNodeModules,
];

// Ensure we can resolve upward for monorepo structure
config.resolver.disableHierarchicalLookup = false;

module.exports = config;



