const ExcelJS = require('exceljs');

module.exports = {
  // GET /hello
  index: async (ctx) => {
    const { collection } = ctx.request.query;

    if (!collection) {
      ctx.response.status = 400;
      return { message: 'bad request' };
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Stock');

    sheet.columns = [
      { header: 'Producto', key: 'producto', width: 30 },
      { header: 'Espesor', key: 'espesor', width: 10 },
      { header: 'Ancho', key: 'ancho', width: 10 },
      { header: 'Largo', key: 'largo', width: 10 },
      { header: 'Calidad', key: 'calidad', width: 10 },
      { header: 'Volumen', key: 'volumen', width: 10 },
      { header: 'Cantidad', key: 'cantidad', width: 10 },
      { header: 'Especie', key: 'especie', width: 10 },
      { header: 'Usuario', key: 'usuario', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Empresa', key: 'empresa', width: 30 },
      { header: 'Fecha', key: 'fecha', width: 15 },
      { header: 'Comentarios', key: 'comentarios', width: 40 },
    ];

    const records = await strapi
      .query('Stock')
      .find({ _sort: 'createdAt:DESC' }, [
        'producto',
        'especie',
        {
          path: 'user',
          populate: {
            path: 'company',
          },
        },
      ]);

    const rows = records.map((record) => [
      record.producto ? record.producto.nombre : '-',
      record.espesor,
      record.ancho,
      record.largo,
      record.calidad,
      record.volumen_stock,
      record.cantidad,
      record.especie ? record.especie.nombre : '-',
      record.user ? `${record.user.firstName} ${record.user.lastName}` : '-',
      record.user ? record.user.email : '-',
      record.user && record.user.company ? record.user.company.name : '-',
      record.createdAt
        ? `${record.createdAt.getDay()}-${record.createdAt.getMonth()}-${record.createdAt.getFullYear()}`
        : '-',
      record.comentarios,
    ]);

    sheet.addRows(rows);

    [
      'A1',
      'B1',
      'C1',
      'D1',
      'E1',
      'F1',
      'G1',
      'H1',
      'I1',
      'J1',
      'K1',
      'L1',
      'M1',
    ].map(
      (row) =>
        (sheet.getCell(row).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '00B050' },
          bgColor: { argb: '00B050' },
        })
    );

    sheet.getRow(1).height = 20;
    sheet.getRow(1).font = { size: 14, bold: true };

    const bufferedData = await workbook.xlsx.writeBuffer();
    let excelBase64 = bufferedData.toString('base64');

    const now = new Date();
    ctx.send({
      filename: `stock_${now.getDay()}-${now.getMonth()}-${now.getFullYear()}`,
      file: excelBase64,
    });
    // ctx.body = stream;
  },
};
