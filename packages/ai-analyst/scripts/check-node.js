#!/usr/bin/env node

const semver = require('semver');

const REQUIRED_NODE_VERSION = '16.0.0';
const REQUIRED_NPM_VERSION = '8.0.0';

function checkVersions() {
    console.log('🔍 Checking Node.js environment...
');

    // Check Node.js version
    const nodeVersion = process.version;
    console.log('Node.js version:', nodeVersion);
    if (!semver.gte(nodeVersion, REQUIRED_NODE_VERSION)) {
        console.error('❌ Error: Node.js version must be', REQUIRED_NODE_VERSION, 'or higher');
        process.exit(1);
    }
    console.log('✅ Node.js version check passed
');

    // Check npm version
    const npmVersion = require('child_process')
        .execSync('npm --version')
        .toString()
        .trim();
    console.log('npm version:', npmVersion);
    if (!semver.gte(npmVersion, REQUIRED_NPM_VERSION)) {
        console.error('❌ Error: npm version must be', REQUIRED_NPM_VERSION, 'or higher');
        process.exit(1);
    }
    console.log('✅ npm version check passed
');

    // Check if essential npm packages can be required
    try {
        require.resolve('next');
        console.log('✅ Next.js is installed');
    } catch (e) {
        console.log('⚠️  Next.js is not installed. Run: npm install');
    }

    console.log('
✨ All checks passed! Your environment is ready for development.');
}

checkVersions();
