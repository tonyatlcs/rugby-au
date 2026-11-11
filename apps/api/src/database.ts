import type { FastifyInstance } from "fastify";
import mongoose from "mongoose";

export const registerDatabase = (app: FastifyInstance) => {
  const onDatabaseError = (error: Error) => {
    app.log.error({ err: error }, "MongoDB connection error");
  };

  app.addHook("onReady", async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri?.trim()) {
      throw new Error("MONGODB_URI must be set before starting the API");
    }

    mongoose.connection.on("error", onDatabaseError);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      autoCreate: false,
      autoIndex: false,
    });
    app.log.info("Connected to MongoDB");
  });

  app.addHook("onClose", async () => {
    try {
      await mongoose.disconnect();
    } finally {
      mongoose.connection.off("error", onDatabaseError);
    }
  });
};
