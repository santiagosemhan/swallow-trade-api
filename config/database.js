module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    //   default: {
    //     connector: 'mongoose',
    //     settings: {
    //       host: env('DATABASE_HOST', 'docker.for.mac.host.internal'),
    //       srv: env.bool('DATABASE_SRV', false),
    //       port: env.int('DATABASE_PORT', 27017),
    //       database: env('DATABASE_NAME', 'swallow'),
    //       username: env('DATABASE_USERNAME', 'root'),
    //       password: env('DATABASE_PASSWORD', 'root'),
    //     },
    //     options: {
    //       authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
    //       ssl: env.bool('DATABASE_SSL', false),
    //     },
    //   },
    // },
    default: {
      connector: 'mongoose',
      settings: {
        uri: env('MONGO_DSN', ''),
      },
      options: {
        ssl: env.bool('DATABASE_SSL', false),
      },
    },
  },
});
