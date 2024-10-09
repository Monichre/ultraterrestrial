const fs = require('fs')
const path = require('path')

module.exports = {
  description: 'Component Generator',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Component name:',
      validate: function (value) {
        if (/.+/.test(value)) {
          return true
        }
        return 'Component name is required'
      },
    },
    {
      type: 'confirm',
      name: 'animated',
      message: 'Is this an animated component?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'ui',
      message: 'Is this a core UI component? (e.g., button, input, etc.)',
      default: false,
      when: function (answers) {
        // Only ask if it's not animated
        return !answers.animated
      },
    },
    {
      type: 'confirm',
      name: 'addToExisting',
      message: 'Would you like to add this component to an existing directory?',
      default: false,
      // Removed the 'when' condition to always prompt
    },
    {
      type: 'list',
      name: 'existingDir',
      message: 'Select the existing component directory:',
      choices: function (answers) {
        let componentsPath

        if (answers.animated) {
          componentsPath = path.join(
            __dirname,
            '../../src',
            'components',
            'animated'
          )
        } else if (answers.ui) {
          componentsPath = path.join(__dirname, '../../src', 'components', 'ui')
        } else {
          componentsPath = path.join(__dirname, '../../src', 'components')
        }

        if (!fs.existsSync(componentsPath)) {
          return ['(No existing directories found)']
        }

        const directories = fs
          .readdirSync(componentsPath)
          .filter((file) =>
            fs.statSync(path.join(componentsPath, file)).isDirectory()
          )

        if (directories.length === 0) {
          return ['(No existing directories found)']
        }

        return directories.map((dir) => ({
          name: dir,
          value: dir,
        }))
      },
      when: function (answers) {
        // Only prompt if addToExisting is true
        return answers.addToExisting
      },
    },
    {
      type: 'confirm',
      name: 'includeCss',
      message: 'Would you like to include a CSS file?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'includeStories',
      message: 'Would you like to include a Storybook stories file?',
      default: true,
    },
  ],
  actions: function (data) {
    // Determine the base path
    let basePath
    if (data.addToExisting && data.existingDir) {
      // If adding to an existing directory, append the existingDir to the appropriate subdirectory
      if (data.animated) {
        basePath = `src/components/animated/${data.existingDir}`
      } else if (data.ui) {
        basePath = `src/components/ui/${data.existingDir}`
      } else {
        basePath = `src/components/${data.existingDir}`
      }
    } else {
      // If not adding to existing, determine subdirectory based on animated or ui
      const subDir = data.animated ? 'animated' : data.ui ? 'ui' : ''
      basePath = subDir ? `src/components/${subDir}` : 'src/components'
    }

    const componentPath = `${basePath}/{{dashCase name}}`

    const actions = [
      {
        type: 'add',
        path: `${componentPath}/index.tsx`,
        templateFile: './templates/component/index.hbs',
      },
      {
        type: 'add',
        path: `${componentPath}/{{properCase name}}.tsx`,
        templateFile: './templates/component/component.hbs',
      },
    ]

    // Conditionally add CSS file
    if (data.includeCss) {
      actions.push({
        type: 'add',
        path: `${componentPath}/{{properCase name}}.css`,
        templateFile: './templates/component/component.css.hbs', // Ensure this template exists
      })
    }

    // Conditionally add Stories file
    if (data.includeStories) {
      actions.push({
        type: 'add',
        path: `src/stories/{{dashCase name}}/{{properCase name}}.stories.ts`,
        templateFile: './templates/component/component.stories.hbs',
      })
    }

    return actions
  },
}
