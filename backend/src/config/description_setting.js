import mongoose from "mongoose";

mongoose.connect("mongodb+srv://miyuratatsu:aIvZCNhy55KjvDGz@column.10xhzov.mongodb.net/Column?retryWrites=true&w=majority&appName=Column") // o'zingizning URL bo'yicha
  .then(async () => {
    console.log("MongoDB ulanishi muvaffaqiyatli");

    try {
      const result = await mongoose.connection.collection("todos").dropIndex("description_1");
      console.log("Index o'chirildi:", result);
    } catch (err) {
      console.error("Indexni o'chirishda xatolik:", err.message);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch(err => {
    console.error("Ulanishda xatolik:", err.message);
  });
