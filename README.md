# Rest API - Desafio Novel/Flex

## Descrição

Rest API criada para atender os critérios do desafio da Novel/Flex para a vaga de desenvolvedor de software backend.
"version": "1.0.0"
A respostas são dadas com StatusCode e um JSON

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev
```

## Running test

```bash
# unit tests
$ npm run test
```

## Tecnologias utilizadas e suas versões

<pre>
    JavaScript
    NodeJS
    "bcrypt": "^5.1.0",
    "cloudinary": "^1.34.0",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-jwt": "^8.4.1",
    "express-rate-limit": "^6.7.0",
    "ioredis": "^5.3.1",
    "jest": "^29.4.3",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.0.0",
    "multer": "^1.4.5-lts.1",
    "multer-storage-cloudinary": "^4.0.0",
    "sinon": "^15.0.1",
    "vitest": "^0.29.2"
    "chai": "^4.3.7",
    "nodemon": "^2.0.20",
    "sinon-chai": "^3.7.0"
</pre>

## Instalação

```bash
# utilize o comando abaixo para installar as bibliotecas necessárias
$ npm install <nome-do-package>@<version> <nome-do-package>@<version> ...
```

# Entidades

USER

<pre>
User = {
  name: { type: String, required: true, unique: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  products: [{ type: Types.ObjectId, ref: "Product" }],
}</pre>

PRODUCT

<pre>
Product = {
  name: { type: String, require: true, trim: true, uppercase: true },
  description: { type: String, require: true, trim: true },
  price: { type: Number, require: true },
  createdBy: { type: Types.ObjectId, ref: "User", require: true },
  createdAt: { type: Date, default: Date.now() },
  updatedBy: [{ type: Types.ObjectId, ref: "User", require: true }],
  photo: { type: String },
}</pre>

# ROTAS

## User

Path: /users/signup

<pre>
{
## method: POST
summary: Create a new user,
description: Rota responsável por recber os dados de um usuário e cadastra-lo no BD,
requestBody: {
	"name": "USER1010",
	"password": "USER123",
	"role": "USER"
},
responses: {
      201: {
      description: user created,
      return: {
	      "name": "USER1010",
	      "role": "USER",
            "products": [],
            "_id": "6400593103d68a810fd7bd03",
            "__v": 0
            }
      },
      500: {
      description: Error
      return: Error via console
      }
}
</pre>

Path: /users/login

<pre>
{
## method: POST
summary: loggin user,
description: Rota responsável por os dados de login do usuário e retornar sua informações e um token 
      jwt válido com sua role,
requestBody: {
	"name": "USER1010",
	"password": "USER123",
},
responses: {
      200: {
      description: user created,
      return: {
	"user": {
		"id": "63ffd99430a62941b961d343",
		"name": "ADMIN",
		"role": "ADMIN"
	},
	"token": "token-jwt-exemplo"
}
      },
      404: {
      description: name e/ou password incorretos
      return: { msg: "invalid email or password " }
      },
      500: {
      description: Error
      return: Error via console
      }
}
</pre>

Path: /users/list

<pre>
{
## method: GET
summary: list users,
description: Rota responsável por retornar um Array com todos os usuário cadastrados no BD
requestBody: {},
responses: {
      200: {
      description: users data,
      return: [
      {
		"_id": "6400593103d68a810fd7bd03",
		"name": "USER1010",
		"passwordHash": "$2b$10$mkSmPjoRURz9bMIKwrj3H.coEv2AkykyK2/IuFZYZExa1.nNfNtq.",
		"role": "USER",
		"products": [],
		"__v": 0
	},	
      {
		"_id": "6400593103d68a810fd7bd03",
		"name": "USER1010",
		"passwordHash": "$2b$10$mkSmPjoRURz9bMIKwrj3H.coEv2AkykyK2/IuFZYZExa1.nNfNtq.",
		"role": "USER",
		"products": [],
		"__v": 0
	},
      ...
      ]
      },
      500: {
      description: Error
      return: Error via console
      }
}
</pre>

##Path:/users/profile

<pre>
{
## method: GET
summary: list users,
description: Rota responsável por retornar um Array com todos os usuário cadastrados no BD
requestBody: {},
responses: {
      200: {
      description: profile data,
      return: [
      {
		"_id": "1",
		"name": "USER1010",
		"passwordHash": "$2b$10$mkSmPjoRURz9bMIKwrj3H.coEv2AkykyK2/IuFZYZExa1.nNfNtq.",
		"role": "USER",
		"products": [],
		"__v": 0
	},
      {
		"_id": "2",
		"name": "ADMIN",
		"passwordHash": "$2b$10$mkSmPjoRURz9bMIKwrj3H.coEv2AkykyK2/IuFZYZExa1.nNfNtq.",
		"role": "ADMIN",
		"products": [],
		"__v": 0
	}
      ]
}
</pre>

## Product

Path: /product/create_product

<pre>
{
## method: POST
summary: Create Product,
description: Rota responsável por recber os dados de um produto e cadastra-lo no BD,
security: [{ "bearerAuth": [] }],
reqAuth: accessToken ADMIN válido
requestBody: {
	"name": "Product 2",
	"description": "This is product number 2",
	"price": 20
      "photo": "src-img"
},
responses: {
      200: {
      description: Product created,
      return: {
	      "name": "PRODUCT 2",
	      "description": "This is product number 2",
	      "price": 20,
	      "createdBy": "63ffd99430a62941b961d343",
	      "createdAt": "2023-03-05T00:27:19.625Z",
	      "updatedBy": [],
	      "_id": "6403e1f169c7851f7390cb2b",
	      "__v": 0      
            "photo": "src-img"
      },
      401: {
            description: invalid token
            return: {msg: invalid token}
      },
      500: {
      description: Error
      return: Error via console
      }
}
</pre>

##Path: /product/filter_name

<pre>
{
## method: POST
summary: Filter Product by name,
description: Rota responsável por recber o nome de um produto e retornar os dados dele,
security: [{ "bearerAuth": [] }],
reqAuth: accessToken ADMIN/USER válido
requestBody: {
	"inputName": "Product 1"
},
responses: {
      200: {
      description: Product found,
      return: {
	      "_id": "6402f12694e605cdce38293d",
	      "name": "PRODUCT 1",
	      "description": "This is product number 1",
            "price": 10,
            "createdBy": "63ffd99430a62941b961d343",
            "createdAt": "2023-03-04T07:18:38.069Z",
            "updatedBy": [],
            "updatedAt": [],
            "__v": 0
      },
      401: {
            description: invalid token
            return: {msg: invalid token}
      },
      404: {
      description: Product not found
      return: {} 
      },
      500: {
      description: Error
      return: Error via console
      }
}
</pre>

Path: /product/filter_description

<pre>
{
## method: POST
summary: Filter Product by description,
description: Rota responsável por recber a descrição de um produto e retornar todos os produtos que 
      contém a descrição,
security: [{ "bearerAuth": [] }],
reqAuth: accessToken ADMIN/USER válido
requestBody: {
	"inputDescription": "number"
},
responses: {
      200: {
      description: Product found,
      return: [
            {
                  "_id": "6402f12694e605cdce38293d",
                  "name": "PRODUCT 1",
                  "description": "This is product number 1",
                  "price": 10,
                  "createdBy": "63ffd99430a62941b961d343",
                  "createdAt": "2023-03-04T07:18:38.069Z",
                  "updatedBy": [],
                  "updatedAt": [],
                  "__v": 0
            },
            {
                  "_id": "6402f12694e605cdce38293dd",
                  "name": "PRODUCT 1",
                  "description": "This is product number 2",
                  "price": 20,
                  "createdBy": "63ffd99430a62941b961d343",
                  "createdAt": "2023-03-04T07:18:38.069Z",
                  "updatedBy": [],
                  "updatedAt": [],
                  "__v": 0
            },
      ],
      401: {
      description: invalid token
      return: {msg: invalid token}
      },
      404: {
      description: Product not found
      return: {} 
      },
      500: {
      description: Error
      return: Error via console
      }
}
</pre>

Path: /product/list

<pre>
{
## method: GET
summary: list users,
description: Rota responsável por retornar um Array com todos os usuário cadastrados no BD
security: [{ "bearerAuth": [] }],
reqAuth: accessToken ADMIN/USER válido
requestBody: {},
responses: {
      200: {
      description: list of products,
      return: [
	{
		"_id": "6400ef12b911b0fbb1650cc5",
		"name": "A",
		"description": "a",
		"price": 9999,
		"createdBy": "63ffd99430a62941b961d343",
		"createdAt": "2023-03-02T18:45:23.061Z",
		"updatedBy": [
			"63ffd99430a62941b961d343"
		],
		"updatedAt": [
			"2023-03-04T13:58:36.754Z"
		],
		"__v": 0
	},
	{
		"_id": "6402f12694e605cdce38293d",
		"name": "PRODUCT 1",
		"description": "This is product number 1",
		"price": 10,
		"createdBy": "63ffd99430a62941b961d343",
		"createdAt": "2023-03-04T07:18:38.069Z",
		"updatedBy": [],
		"updatedAt": [],
		"__v": 0
	},
      ],
      401: {
      description: invalid token
      return: {msg: invalid token}
      },
      404: {
      description: Product not found
      return: {} 
      },
      500: {
      description: Error
      return: Error via console
      }
}
</pre>

Path: /product/list_name

<pre>
{
## method: GET
summary: list users,
description: Rota responsável por retornar um Array ordenado alfabeticamente pelo campo "name" com 
      todos os usuário cadastrados no BD
security: [{ "bearerAuth": [] }],
reqAuth: accessToken ADMIN/USER válido
requestBody: {},
responses: {
      200: {
      description: list of products,
      return: [
	{
		"_id": "6400ef12b911b0fbb1650cc5",
		"name": "A",
		"description": "lalala",
		"price": 9999,
		"createdBy": "63ffd99430a62941b961d343",
		"createdAt": "2023-03-02T18:45:23.061Z",
		"updatedBy": [
			"63ffd99430a62941b961d343"
		],
		"updatedAt": [
			"2023-03-04T13:58:36.754Z"
		],
		"__v": 0
	},
	{
		"_id": "6400ef12b911b0fbb1650cc5",
		"name": "B",
		"description": "lalala",
		"price": 19999,
		"createdBy": "63ffd99430a62941b961d343",
		"createdAt": "2023-03-02T18:45:23.061Z",
		"updatedBy": [
			"63ffd99430a62941b961d343"
		],
		"updatedAt": [
			"2023-03-04T13:58:36.754Z"
		],
		"__v": 0
	},
      ],
      401: {
      description: invalid token
      return: {msg: invalid token}
      },
      404: {
      description: Product not found
      return: {} 
      },
      500: {
      description: Error
      return: Error via console
      }
}
</pre>

Path: /product/list_price

<pre>
{
## method: GET
summary: list users,
description: Rota responsável por retornar um Array ordenado crescentemente pelo campo "price" com 
      todos os usuário cadastrados no BD
security: [{ "bearerAuth": [] }],
reqAuth: accessToken ADMIN/USER válido
requestBody: {},
responses: {
      200: {
      description: list of products,
      return: [
	{
		"_id": "6400ef12b911b0fbb1650cc5",
		"name": "A",
		"description": "lalala",
		"price": 1,
		"createdBy": "63ffd99430a62941b961d343",
		"createdAt": "2023-03-02T18:45:23.061Z",
		"updatedBy": [
			"63ffd99430a62941b961d343"
		],
		"updatedAt": [
			"2023-03-04T13:58:36.754Z"
		],
		"__v": 0
	},
	{
		"_id": "6400ef12b911b0fbb1650cc5",
		"name": "B",
		"description": "lalala",
		"price": 2,
		"createdBy": "63ffd99430a62941b961d343",
		"createdAt": "2023-03-02T18:45:23.061Z",
		"updatedBy": [
			"63ffd99430a62941b961d343"
		],
		"updatedAt": [
			"2023-03-04T13:58:36.754Z"
		],
		"__v": 0
	},
      ],
      401: {
      description: invalid token
      return: {msg: invalid token}
      },
      404: {
      description: Product not found
      return: {} 
      },
      500: {
      description: Error
      return: Error via console
      }
}
</pre>

Path: /product/show/:id

<pre>
{
## method: GET
summary: list users,
description: Rota responsável por retornar um produto ordenado crescentemente pelo campo "price" com 
      todos os usuário cadastrados no BD
security: [{ "bearerAuth": [] }],
reqAuth: accessToken ADMIN/USER válido
reqParams: req.params.id = {ID DO PRODUTO}
requestBody: {},
responses: {
      200: {
      description: Product Found,
      return: {
		"_id": ID DO PRODUTO,
		"name": "A",
		"description": "lalala",
		"price": 1,
		"createdBy": "63ffd99430a62941b961d343",
		"createdAt": "2023-03-02T18:45:23.061Z",
		"updatedBy": [
			"63ffd99430a62941b961d343"
		],
		"updatedAt": [
			"2023-03-04T13:58:36.754Z"
		],
		"__v": 0
	}
      401: {
      description: invalid token
      return: {msg: invalid token}
      },
      404: {
      description: Product not found
      return: {} 
      },
      500: {
      description: Error
      return: Error via console
      }
}
</pre>

Path: /product/update/:id

<pre>
{
## method: PUT
summary: updated Product,
description: Rota responsável por recber o id de um produto já existente e o dados a serem atualizados 
      do mesmo,
Observação: Todos os campos required que não são preenchidos pelo BD devem ser fornecidos no body da 
      requisição
security: [{ "bearerAuth": [] }],
reqAuth: accessToken ADMIN válido
reqParams: req.params.id = {ID DO PRODUTO}
requestBody: {
	"name": "New Name",
	"description": "new description",
	"price": 200
      "photo": "src-img"
},
responses: {
      200: {
      description: Product created,
      return: {
	      "name": "NEW NAME",
	      "description": "new description",
	      "price": 200,
	      "createdBy": "63ffd99430a62941b961d343",
	      "createdAt": "2023-03-05T00:27:19.625Z",
	      "updatedBy": [loggadeInUser.id],
	      "_id": "6403e1f169c7851f7390cb2b",
	      "__v": 0      
            "photo": "src-img"
      },
      400: {
      description: Bad request
      return: {msg: `Missing required fields: ${field}`}
      },
      401: {
      description: invalid token
      return: {msg: invalid token}
      },
      404: {
      description: product not found
      return: {msg: product not found}
      },
      500: {
      description: Error
      return: Error via console
      }
}
</pre>

Path: /product/update_partial/:id

<pre>
{
## method: PATCH
summary: Update Partial Product,
description: Rota responsável por recber o id de um produto já existente e o dados a serem atualizados  
      do mesmo,
Observação: o body da requisição deverá ter somente os campos que se deseja atualizar como novo valor
security: [{ "bearerAuth": [] }],
reqAuth: accessToken ADMIN válido
reqParams: req.params.id = {ID DO PRODUTO}
requestBody: {
	"description": "new description 2",
},
responses: {
      200: {
      description: Product created,
      return: {
	      "name": "NEW NAME",
	      "description": "new description 2",
	      "price": 200,
	      "createdBy": "63ffd99430a62941b961d343",
	      "createdAt": "2023-03-05T00:27:19.625Z",
	      "updatedBy": [loggadeInUser.id],
	      "_id": "6403e1f169c7851f7390cb2b",
	      "__v": 0      
            "photo": "src-img"
      },
      401: {
      description: invalid token
      return: {msg: invalid token}
      },
      404: {
      description: product not found
      return: {msg: product not found}
      },
      500: {
      description: Error
      return: Error via console
      }
}
</pre>

Path: /product/delete/:id

<pre>
{
## method: DELETE
summary: delete Product,
description: Rota responsável por recber o id de um produto já existente e exclui-lo,
security: [{ "bearerAuth": [] }],
reqAuth: accessToken ADMIN válido
reqParams: req.params.id = {ID DO PRODUTO}
requestBody: {}
responses: {
      200: {
      description: Product created,
      return: {
            "acknowledged": true,
            "deletedCount": 1
      },
      404: {
      description: product not found
      return: {msg: product not found}
      },
      500: {
      description: Error
      return: Error via console
      }
}
</pre>

## Upload File

Path: /upload_image

<pre>
{
## method: POST
summary: loggin user,
description: rota responsável por receber uma imagem ".png" e armazena-la no cloudinary via multer
requestBody: {
      "picture": "url-img"
},
responses: {
      200: {
	"url": "url-img-cloudinary"
      }
      },
      400: {
      description: Upload fail
      return: { msg: "Upload fail" }
      },
      500: {
      description: Error
      return: Error via console
      }
}
</pre>

## Observações

<pre>
- Todas as rotas possuem um MiddleWare "apiLimiter" que limita as requisções da API à 40 por minuto.
- As Rotas {"/product/list", "/product/list_name", "/product/list_price" e /product/show/:id } 
      possuem o uso de Redis para armazenamento em Cache do resultado das requisções. 
      O cache é válido por apenas 10 segundos
</pre>
