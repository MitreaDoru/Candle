import { Request, Response } from "express";
import Product from "../models/product";
import Ingredients from "../models/ingredients";

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    let { name, category, items, ingredients } = req.body;

    if (typeof items === "string") items = JSON.parse(items);
    if (typeof ingredients === "string") ingredients = JSON.parse(ingredients);
    const file = (req as any).file;
    if (!name || !file) {
      res.status(400).json({
        alert: {
          title: "Validation Error",
          message: "Product name and image are required.",
        },
      });
      return;
    }

    const price = items.reduce(
      (sum: number, item: any) => sum + (item.value * item.multiplier || 0),
      0,
    );
    const newProduct = new Product({
      name,
      image: file.path,
      category,
      price,
      quantity: 0,
      ingredients: items,
    });

    const allIngredients = ingredients.map((item: any) => ({
      ...item,
      multiplier: 0,
    }));

    await Ingredients.findOneAndUpdate(
      {},
      { $set: { ingredients: allIngredients } },
      { upsert: true, returnDocument: "after" },
    );

    await newProduct.save();

    res.status(201).json({
      alert: {
        title: "Product Created",
        message: "The product has been created successfully.",
      },
      product: newProduct,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({
      alert: {
        title: "Server Error",
        message: "An error occurred while creating the product.",
      },
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getData = async (req: Request, res: Response): Promise<void> => {
  try {
    const [products, ingredientsData] = await Promise.all([
      Product.find().lean(),
      Ingredients.findOne().lean(),
    ]);
    res.status(200).json({
      products: products || [],
      ingredients: ingredientsData || { ingredients: [] },
    });
  } catch (error) {
    console.error("GET DATA ERROR:", error);
    res.status(500).json({
      alert: {
        title: "Server Error",
        message: "An error occurred while fetching data.",
      },
      error: error instanceof Error ? error.message : error,
    });
  }
};
export const deleteProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      res.status(404).json({
        alert: { title: "Eroare", message: "Produsul nu a fost găsit." },
      });
      return;
    }

    res.status(200).json({
      alert: { title: "Șters", message: "Produsul a fost eliminat cu succes." },
      id: id,
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({
      alert: {
        title: "Server Error",
        message: "Eroare la ștergerea produsului.",
      },
    });
  }
};
