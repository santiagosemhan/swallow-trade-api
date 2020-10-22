module.exports = {
  // GET /hello
  index: async ctx => {
    const { collection } = ctx.request.query;
    
    if (!collection) {
      ctx.response.status = 400;
      return { message: "bad request"};
    }
    const data = {
      message: 'Export to excel!',
    }
    ctx.send(data);
  },
};