module.exports = ({ env }) => ({
  upload: {
    provider: 'mongodb',
  },
  email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: env('SENDGRID_API_KEY'),
    },
    settings: {
      defaultFrom: 'app@swallowtrade.com',
      defaultReplyTo: 'no-reply@swallowtrade.com',
    },
  },
});