import * as Yup from "yup";
import Category from "../models/Category";

class CategoryController {
  async store(request, response) {
    // determinando como front deve enviar dados de logout para api
    const schema = Yup.object({
      name: Yup.string().required(),
    });
    // na validação foi colocado abortEarly para não intenrromper e mostra todos os erros
    try {
      schema.validateSync(request.body);
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name } = request.body;

    const category = await Category.create({
      name,
    });

    return response.status(201).json(category);
  }

  async index(request, response) {
    const category = await Category.findAll();

    return response.json(category);
  }
}

export default new CategoryController();
