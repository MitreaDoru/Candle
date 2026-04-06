import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Order from "../models/order";
import Product from "../models/product";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        alert: { title: "Unauthorized", message: "No token provided" },
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        alert: {
          title: "User Not Found",
          message: "The user associated with this token was not found.",
        },
      });
    }

    const cart = req.body.cart;

    for (const item of cart) {
      const productExists = await Product.findById(item._id);
      if (!productExists) {
        return res.status(400).json({
          alert: {
            title: "Produs Indisponibil",
            message: `Produsul "${item.name}" nu mai este disponibil și a fost șters din ofertă. Te rugăm să îți actualizezi coșul.`,
          },
        });
      }
    }
    const totalPrice = cart
      .map((item: any) => item.price * item.quantity)
      .reduce((total: number, value: number) => total + value, 0);

    const newOrder = new Order({
      orderItems: cart,
      totalPrice,
      email: user.email,
      status: "Trimisa",
    });

    await newOrder.save();
    user.orders.push(newOrder._id);
    await user.save();
    return res.status(201).json({
      alert: {
        title: "Order Created",
        message: "Your order was created successfully.",
      },
      order: newOrder,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      alert: {
        title: "Invalid Token",
        message: "Your token is invalid or expired.",
      },
    });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!authHeader || !authHeader.startsWith("Bearer ") || !token) {
    return res.status(401).json({
      alert: { title: "No token", message: "Te rugăm să te autentifici." },
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
      isAdmin: boolean;
    };

    const filter = decoded.isAdmin ? {} : { email: decoded.email };

    const orders = await Order.find(filter).lean();
    return res.status(200).json({
      orders: orders || [],
    });
  } catch (error) {
    console.error("GET Orders ERROR:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ message: "Sesiune expirată. Loghează-te din nou." });
    }

    return res.status(500).json({
      alert: {
        title: "Server Error",
        message: "A apărut o eroare la descărcarea comenzilor.",
      },
    });
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res
        .status(401)
        .json({ alert: { title: "Eroare", message: "Lipsă token!" } });
      return;
    }
    const token = authHeader.split(" ")[1];

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const order = await Order.findById(id);

    if (!order) {
      res.status(404).json({
        alert: { title: "Not Found", message: "Comanda nu a fost găsită." },
      });
      return;
    }
    const isOwner = order.email === decoded.email;
    const isAdmin = decoded.isAdmin === true;

    if (!isAdmin && !isOwner) {
      res.status(403).json({
        alert: {
          title: "Acces Refuzat",
          message: "Nu poți șterge comanda altui utilizator!",
        },
      });
      return;
    }

    await Order.findByIdAndDelete(id);

    res.status(200).json({
      alert: {
        title: "Succes",
        message: isAdmin
          ? "Comandă finalizată (Admin)."
          : "Comanda a fost anulată.",
      },
    });
  } catch (error) {
    console.error("DELETE Order ERROR:", error);
    res.status(401).json({
      alert: {
        title: "Sesiune expirată",
        message: "Te rugăm să te loghezi din nou.",
      },
    });
  }
};
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        alert: { title: "Unauthorized", message: "Lipseste token-ul" },
      });
    }
    const token = authHeader.split(" ")[1];

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return res.status(401).json({
        alert: {
          title: "Session Expired",
          message: "Te rugăm să te loghezi din nou.",
        },
      });
    }

    const { id } = req.body;
    const updateData = req.body.updates;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: updateData },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({
        alert: { title: "Error", message: "Comanda nu a fost găsită." },
      });
    }

    res.status(200).json({
      alert: { title: "Updated", message: "Lista modificată cu succes" },
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Eroare la update", error });
  }
};
