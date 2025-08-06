import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'style/no-tabs': ['off'],
  },
  overrides: {
    vue: {
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
    },
  },
})
