const env = process.env.NODE_ENV ?? 'development'
const configs = {
  development: {
    secret: '3d470ea3afa83b6d13e9b727febf83f2414d5d27bd6723a8a4d852768d26498f96a182c220c0b5a47f4c9fea398046bcf900e24037fbd974b7ca4c1f57ce919b'
  },
  test: {
  },
  production: {
  }
}
module.exports = configs.hasOwnProperty(env) ? configs[env] : configs['development']
