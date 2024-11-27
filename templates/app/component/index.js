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
    },
    {
      type: 'list',
      name: 'existingDir',
      message: 'Select the existing component directory:',
      choices: function (answers) {
        // Ensure destinationPath exists in answers
        if (!answers.destinationPath) {
          console.error('destinationPath is undefined in answers:', answers)
          return ['(Error: destination path not found)']
        }

        let componentsPath

        if (answers.animated) {
          componentsPath = path.join(answers.destinationPath, 'src', 'components', 'animated')
        } else if (answers.ui) {
          componentsPath = path.join(answers.destinationPath, 'src', 'components', 'ui')
        } else {
          componentsPath = path.join(answers.destinationPath, 'src', 'components')
        }

        // Check if directory exists before trying to read it
        if (!fs.existsSync(componentsPath)) {
          return ['(No existing directories found)']
        }

        try {
          const directories = fs
            .readdirSync(componentsPath)
            .filter((file) => fs.statSync(path.join(componentsPath, file)).isDirectory())

          if (directories.length === 0) {
            return ['(No existing directories found)']
          }

          return directories.map((dir) => ({
            name: dir,
            value: dir,
          }))
        } catch (err) {
          console.error('Error reading directories:', err)
          return ['(Error reading directories)']
        }
      },
      when: function (answers) {
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
    // Validate destinationPath exists
    if (!data.destinationPath) {
      throw new Error('destinationPath is required but was not provided')
    }

    // Determine the base path
    let basePath
    if (data.addToExisting && data.existingDir) {
      // If adding to an existing directory, append the existingDir to the appropriate subdirectory
      if (data.animated) {
        basePath = path.join(data.destinationPath, 'src/components/animated', data.existingDir)
      } else if (data.ui) {
        basePath = path.join(data.destinationPath, 'src/components/ui', data.existingDir)
      } else {
        basePath = path.join(data.destinationPath, 'src/components', data.existingDir)
      }
    } else {
      // If not adding to existing, determine subdirectory based on animated or ui
      const subDir = data.animated ? 'animated' : data.ui ? 'ui' : ''
      basePath = path.join(data.destinationPath, 'src/components', subDir)
    }

    const componentPath = path.join(basePath, '{{dashCase name}}')

    const actions = [
      {
        type: 'add',
        path: path.join(componentPath, 'index.tsx'),
        templateFile: './templates/component/index.hbs',
      },
      {
        type: 'add',
        path: path.join(componentPath, '{{properCase name}}.tsx'),
        templateFile: './templates/component/component.hbs',
      },
    ]

    // Conditionally add CSS file
    if (data.includeCss) {
      actions.push({
        type: 'add',
        path: path.join(componentPath, '{{properCase name}}.css'),
        templateFile: './templates/component/component.css.hbs',
      })
    }

    // Conditionally add Stories file
    if (data.includeStories) {
      actions.push({
        type: 'add',
        path: path.join(
          data.destinationPath,
          'src/stories/{{dashCase name}}/{{properCase name}}.stories.ts'
        ),
        templateFile: './templates/component/component.stories.hbs',
      })
    }

    return actions
  },
}
