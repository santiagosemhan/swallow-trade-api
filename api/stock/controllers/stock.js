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
    const isAdministrator = ctx.state.user && ctx.state.user.role.name === "Administrator";
    const query = isAdministrator ? ctx.query : { ...ctx.query, user: ctx.state.user.id };
    if (ctx.query._q) {
      // console.log(ctx.query);
      entities = await strapi.services.stock.search(query);
    } else {
      entities = await strapi.services.stock.find(query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.stock })
    );
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
    const user = ctx.state.user;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.user = user;
      entity = await strapi.services.stock.create(data, { files });
    } else {
      ctx.request.body.user = user;
      entity = await strapi.services.stock.create(ctx.request.body);
    }

    const users = await strapi
      .query('user', 'users-permissions')
      .find({ 'role.name': 'Administrator' });


    if (users.length) {
      const message = `Ha recibido una nueva carga de stock de ${user.firstName} ${user.lastName}.`
      strapi.services.pushnotifications.sendToUsers(message, users, { stock_id: entity.id })
    }
    return sanitizeEntity(entity, { model: strapi.models.stock });
  },
};
