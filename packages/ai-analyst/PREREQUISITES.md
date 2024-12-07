# Prerequisites

## Node.js Installation

This project requires Node.js to be installed on your machine. Here's how to verify and install it:

### 1. Check if Node.js is installed

```bash
node --version
npm --version
```

If you see version numbers (like v20.x.x), Node.js is already installed. If not, proceed with installation.

### 2. Install Node.js

#### On macOS:
```bash
# Using Homebrew
brew install node

# Or download the installer from:
# https://nodejs.org/
```

#### On Windows:
- Download and run the installer from [Node.js official website](https://nodejs.org/)
- Choose the LTS (Long Term Support) version

#### On Linux:
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Fedora
sudo dnf install nodejs

# Other distributions:
# Visit https://nodejs.org/
```

### 3. Verify Installation

After installation, verify that Node.js and npm are properly installed:

```bash
node --version  # Should show v16.x.x or higher
npm --version   # Should show 8.x.x or higher
```

### 4. Recommended Versions

- Node.js: 16.x or higher (Current system: v20.11.1)
- npm: 8.x or higher (Current system: 10.2.4)

### Troubleshooting

If you encounter any issues:

1. **Wrong version installed:**
   - Use [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) to manage multiple Node.js versions
   ```bash
   # Install nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   
   # Install specific Node.js version
   nvm install 20
   nvm use 20
   ```

2. **Permission errors:**
   - On Unix-based systems, never use `sudo` with npm
   - Fix npm permissions following [npm's guide](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

3. **Path issues:**
   - Ensure Node.js is added to your system's PATH
   - Restart your terminal after installation

### Next Steps

Once Node.js is properly installed, you can proceed with:

1. Cloning the repository
2. Installing project dependencies
3. Running the development server

For any installation issues, consult the [official Node.js documentation](https://nodejs.org/en/docs/).
