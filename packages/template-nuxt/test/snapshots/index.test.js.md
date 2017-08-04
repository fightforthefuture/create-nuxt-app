# Snapshot report for `test/index.test.js`

The actual snapshot is saved in `index.test.js.snap`.

Generated by [AVA](https://ava.li).

## defaults

> Generated files

    [
      '.editorconfig',
      '.eslintrc.js',
      '.gitignore',
      'README.md',
      'assets/README.md',
      'components/Logo.vue',
      'components/README.md',
      'layouts/README.md',
      'layouts/default.vue',
      'middleware/README.md',
      'nuxt.config.js',
      'package.json',
      'pages/README.md',
      'pages/index.vue',
      'plugins/README.md',
      'static/README.md',
      'static/favicon.ico',
      'store/README.md',
    ]

> package.json

    {
      dependencies: {
        nuxt: '^1.0.0-rc3',
      },
      devDependencies: {
        'babel-eslint': '^7.2.3',
        eslint: '^4.3.0',
        'eslint-config-standard': '^10.2.1',
        'eslint-loader': '^1.9.0',
        'eslint-plugin-html': '^3.1.1',
        'eslint-plugin-import': '^2.7.0',
        'eslint-plugin-node': '^5.1.1',
        'eslint-plugin-promise': '^3.5.0',
        'eslint-plugin-standard': '^3.0.1',
      },
      private: true,
      scripts: {
        build: 'nuxt build',
        dev: 'nuxt',
        generate: 'nuxt generate',
        lint: 'eslint --ext .js,.vue --ignore-path .gitignore .',
        precommit: 'npm run lint',
        start: 'nuxt start',
      },
    }

## use express

> Generated files

    [
      '.editorconfig',
      '.eslintrc.js',
      '.gitignore',
      'README.md',
      'assets/README.md',
      'components/Logo.vue',
      'components/README.md',
      'layouts/README.md',
      'layouts/default.vue',
      'middleware/README.md',
      'nuxt.config.js',
      'package.json',
      'pages/README.md',
      'pages/index.vue',
      'plugins/README.md',
      'server/index.js',
      'static/README.md',
      'static/favicon.ico',
      'store/README.md',
    ]

> package.json

    {
      dependencies: {
        'cross-env': '^5.0.1',
        express: '^4.15.3',
        nuxt: '^1.0.0-rc3',
      },
      devDependencies: {
        'babel-eslint': '^7.2.3',
        eslint: '^4.3.0',
        'eslint-config-standard': '^10.2.1',
        'eslint-loader': '^1.9.0',
        'eslint-plugin-html': '^3.1.1',
        'eslint-plugin-import': '^2.7.0',
        'eslint-plugin-node': '^5.1.1',
        'eslint-plugin-promise': '^3.5.0',
        'eslint-plugin-standard': '^3.0.1',
        nodemon: '^1.11.0',
      },
      private: true,
      scripts: {
        build: 'nuxt build',
        dev: 'cross-env NODE_ENV=development nodemon server/index.js --watch server',
        generate: 'nuxt generate',
        lint: 'eslint --ext .js,.vue --ignore-path .gitignore .',
        precommit: 'npm run lint',
        start: 'cross-env NODE_ENV=production node server/index.js',
      },
    }

## use koa

> Generated files

    [
      '.editorconfig',
      '.eslintrc.js',
      '.gitignore',
      'README.md',
      'assets/README.md',
      'components/Logo.vue',
      'components/README.md',
      'layouts/README.md',
      'layouts/default.vue',
      'middleware/README.md',
      'nuxt.config.js',
      'package.json',
      'pages/README.md',
      'pages/index.vue',
      'plugins/README.md',
      'server/index.js',
      'static/README.md',
      'static/favicon.ico',
      'store/README.md',
    ]

> package.json

    {
      dependencies: {
        'cross-env': '^5.0.1',
        koa: '^2.3.0',
        nuxt: '^1.0.0-rc3',
      },
      devDependencies: {
        'babel-eslint': '^7.2.3',
        eslint: '^4.3.0',
        'eslint-config-standard': '^10.2.1',
        'eslint-loader': '^1.9.0',
        'eslint-plugin-html': '^3.1.1',
        'eslint-plugin-import': '^2.7.0',
        'eslint-plugin-node': '^5.1.1',
        'eslint-plugin-promise': '^3.5.0',
        'eslint-plugin-standard': '^3.0.1',
        nodemon: '^1.11.0',
      },
      private: true,
      scripts: {
        build: 'nuxt build',
        dev: 'cross-env NODE_ENV=development nodemon server/index.js --watch server',
        generate: 'nuxt generate',
        lint: 'eslint --ext .js,.vue --ignore-path .gitignore .',
        precommit: 'npm run lint',
        start: 'cross-env NODE_ENV=production node server/index.js',
      },
    }