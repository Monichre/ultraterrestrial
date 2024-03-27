module.exports = {
  description: 'Component Generator',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'component name',
    },
  ],
  actions: [
    {
      type: 'add',
      path: 'src/components/{{name}}/index.tsx',
      templateFile: './templates/component/index.hbs',
    },
    {
      type: 'add',
      path: 'src/components/{{name}}/{{name}}.tsx',
      templateFile: './templates/component/Component.hbs',
    },
  ],
}
