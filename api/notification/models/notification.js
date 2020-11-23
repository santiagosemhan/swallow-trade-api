'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(results, data) {
      const { broadcast, message } = results;
      if (broadcast) {
        strapi.services.pushnotifications.broadcast(message);
      }
    },
  },
};
