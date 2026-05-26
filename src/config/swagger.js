import swaggerJsdoc from "swagger-jsdoc";

const options = {

   definition: {
      openapi: "3.0.0",

      info: {
         title: "FinAdvisor API",
         version: "1.0.0",
         description: "Backend API for FinAdvisor platform"
      },

      servers: [
         {
            url: "https://finconnect-backend-qgc0.onrender.com"
         }
      ],
      tags: [
   {
      name: "Auth"
   },
   {
      name: "Blogs"
   },
   {
      name: "Bookings"
   },
   {
      name: "Notifications"
   }
]
   },

   apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;