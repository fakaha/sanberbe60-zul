import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json"; // File output untuk dokumentasi
const endpointsFiles = ["../routes/api.ts"]; // File yang berisi endpoint API

const doc = {
  info: {
    version: "v0.0.1",
    title: "Dokumentasi API Zhopee",
    description: "Dokumentasi API Zhopee",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local Server",
    },
    {
      url: "https://sanberbe60-zul.vercel.app/",
      description: "Vercel Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      ProductCreateRequest: {
        name: "Kemeja",
        description: "Kemeja keren murah",
        images: "",
        price: 100000,
        qty: 100,
        categoryId: "670e1d37642fd7e7aed9f4d0",
      },
      CategoryCreateRequest: {
        name: "Pakaian",
      },
      LoginRequest: {
        email: "zul@yopmail.com",
        password: "zul123",
      },
      RegisterRequest: {
        fullName: "zul",
        username: "zul",
        email: "zul@yopmail.com",
        password: "zul123",
        confirmPassword: "zul123",
      },
      UpdateProfileRequest: {
        fullName: "zul",
        username: "zul",
        email: "zul@yopmail.com",
        password: "zul123",
        confirmPassword: "zul123",
      },
      OrderCreateRequest: {
        grandTotal: 200000,
        status: "completed",
        createdBy: "6713a5850a346addcc0420ec",
        orderItems: [
          {
            productId: "670e1e2a642fd7e7aed9f4db",
            qty: 1,
            price: 200000,
          },
        ],
      },
    },
  },
};

// Menghasilkan file dokumentasi
swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);

// Membuat server Express
const app = express();

// Menyajikan Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require(outputFile)));

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
