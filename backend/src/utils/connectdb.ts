import mongoose from "mongoose";

export const connectDb = () => {
  mongoose
    .connect("mongodb://localhost:27017", {
      dbName: "Ecom24",
    })
    .then((c) =>
      console.log(`mongodb is connected successfully to ${c.connection.host}`)
    )
    .catch((err) => console.log(err));
};
