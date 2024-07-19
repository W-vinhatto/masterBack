import * as Yup from "yup";
import Product from "../models/Products";
import Category from "../models/Category";

class ProductController {
  async store(request, response) {
    // determinando como front deve enviar dados de logout para api
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
    });
    // na validação foi colocado abortEarly para não intenrromper e mostra todos os erros
    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { filename: path } = request.file;
    const { name, price, category_id } = request.body;

    const product = await Product.create({
      name,
      price,
      category_id,
      path,
    });

    return response.status(201).json(product);
  }

  async index(request, response) {
    const products = await Product.findAll({
      // criando esse campo para que no findeall vá ate a model product onde está sendo relacionado tabelas
      // indo la trás somentes atributos aolicitados id/name
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });

    return response.json(products);
  }
}

export default new ProductController();
