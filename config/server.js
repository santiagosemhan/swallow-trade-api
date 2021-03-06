module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env.int('URL'),
  admin: {
    url: env('ADMIN_URL'),
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'b0686d0ccca28c8683dfd9294f4cff19'),
    },
  },
});
