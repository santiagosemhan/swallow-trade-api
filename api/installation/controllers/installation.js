'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.installation.create(data, { files });
    } else {
      entity = await strapi.services.installation.create(ctx.request.body);
    }


    if (entity) {
      // delete previous installations on the same device
      await strapi.services.installation.delete({
        id_ne: entity.id,
        pushToken: entity.pushToken,
      });
    }
    return sanitizeEntity(entity, { model: strapi.models.installation });
  },
};
