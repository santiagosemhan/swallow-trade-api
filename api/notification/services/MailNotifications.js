const stockTemplate = {
  subject: 'Nuevo Stock de <%= company %> <%= fecha %>',
  text: `Nuevo stock de <%= company %>!
  Se ha recibido una nueva carga de stock perteneciente a: <%= company %>.\n
  Usuario: <%= usuario %> \n
  Fecha: <%= fecha %> \n
  Producto: <%= producto %> \n
  Espesor: <%= espesor %> \n
  Ancho: <%= ancho %> \n
  Largo: <%= largo %> \n
  Calidad: <%= calidad %> \n
  Volumen: <%= volumen %> \n
  Cantidad: <%= cantidad %> \n
  Especie: <%= especie %> \n
  Comentarios: <%= comentarios %> \n`,
  html: `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    </head>
    <body>
        <h1>Nuevo stock de <%= company %>!</h1>
        <p>Se ha recibido una nueva carga de stock perteneciente a <%= usuario %> de <b><%= company %></b>.<br></p>
        <p>
          <b>Fecha:</b> <%= fecha %> <br>
          <b>Producto:</b> <%= producto %> <br>
          <b>Espesor:</b> <%= espesor %> <br>
          <b>Ancho:</b> <%= ancho %> <br>
          <b>Largo:</b> <%= largo %> <br>
          <b>Calidad:</b> <%= calidad %> <br>
          <b>Volumen:</b> <%= volumen %> <br>
          <b>Cantidad:</b> <%= cantidad %> <br>
          <b>Especie:</b> <%= especie %> <br>
          <b>Comentarios:</b> <%= comentarios %> <br>      
        </p>
        <p>Usted está recibiendo este email porque figura como administrador dentro de Swallow Trade.</p>
    </body>
  </html>
  `,
};

const sendStock = async (stock, users) => {
  // console.log(stock);
  const empresa = await strapi.services.company.findOne({
    id: stock.user.company,
  });
  const d = new Date(stock.createdAt);
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  const h = d.getHours();
  const m = d.getMinutes();
  const s = d.getSeconds();

  const fecha = `${da}-${mo}-${ye} ${h}:${m}:${s}`;

  const data = {
    company: empresa.name,
    usuario: stock.user.email,
    fecha: fecha,
    producto: stock.producto.nombre,
    espesor: stock.espesor || '-',
    ancho: stock.ancho || '-',
    largo: stock.largo || '-',
    calidad: stock.calidad || '-',
    volumen: stock.volumen_stock || '-',
    cantidad: stock.cantidad || '-',
    especie: stock.especie.nombre,
    comentarios: stock.comentarios || '-',
  };

  await strapi.plugins.email.services.email.sendTemplatedEmail(
    {
      to: users.map(u => u.email)
      // from: is not specified, so it's the defaultFrom that will be used instead
    },
    stockTemplate,
    data
  );
};

module.exports = {
  async notifyNewStock(stock, users) {
    if (users.length) {
      sendStock(stock, users);
    }
  },
};
