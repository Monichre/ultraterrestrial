module.exports = {
  description: 'Component Generator',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'component name',
    },
    {
      type: 'confirm',
      name: 'animation',
      message: 'is this an animated component?',
    },
    {
      type: 'confirm',
      name: 'ui',
      message: 'is this a UI component?',
    },
  ],
  actions: function (data) {
    const subDir = data.animation
      ? 'components/animations'
      : data?.ui
        ? 'components/ui'
        : 'components'
    const basePath = `src/${subDir}`
    const actions = [
      {
        type: 'add',
        path: `${basePath}/{{dashCase name}}/index.tsx`,
        templateFile: './templates/component/index.hbs',
      },
      {
        type: 'add',
        path: `${basePath}/{{dashCase name}}/{{properCase name}}.tsx`,
        templateFile: './templates/component/component.hbs',
      },
      {
        type: 'add',
        path: 'src/stories/{{dashCase name}}/{{properCase name}}.stories.ts',
        templateFile: './templates/component/component.stories.hbs',
      },
      {
        type: 'add',
        path: `${basePath}/{{dashCase name}}/{{properCase name}}.css`,
      },
    ]
    return actions
  },
}
