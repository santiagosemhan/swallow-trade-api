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
    console.log(ctx.state.user)
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.usuario = ctx.state.user.username;
      entity = await strapi.services.productos.create(data, { files });
    } else {
      ctx.request.body.usuario = ctx.state.user.username;
      entity = await strapi.services.productos.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.productos });
  },
};
