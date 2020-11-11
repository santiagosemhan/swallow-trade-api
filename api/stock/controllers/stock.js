'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

/**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      // console.log(ctx.query);
      entities = await strapi.services.stock.search(ctx.query);
    } else {
      // console.log(ctx.state.user)
      const query = { ...ctx.query, user: ctx.state.user.id };
      entities = await strapi.services.stock.find(query);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.stock }));
  },

 /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { id } = ctx.params;
    const user = ctx.state.user.id;
    const entity = await strapi.services.stock.findOne({ id, user });
    return sanitizeEntity(entity, { model: strapi.models.stock });
  },

  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.user = ctx.state.user.id;
      entity = await strapi.services.stock.create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user.id;
      entity = await strapi.services.stock.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.stock });
  },
};
