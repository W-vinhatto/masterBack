import * as Yup from "yup";

class ProductController {
  async store(request, response) {
    // determinando como front deve enviar dados de logout para api
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required()
    });
    // na validação foi colocado abortEarly para não intenrromper e mostra todos os erros
    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    return response.status(201).json({message: request.file})
  }
}

export default new ProductController();
