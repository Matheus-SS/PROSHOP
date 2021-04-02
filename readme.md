<p align="center">
  <img src="screens/mern.jpeg"/>
</p>

![Badge](https://img.shields.io/github/issues/Matheus-SS/PROSHOP)
![Badge](https://img.shields.io/github/forks/Matheus-SS/PROSHOP)
![Badge](https://img.shields.io/github/stars/Matheus-SS/PROSHOP)
![GitHub license](https://img.shields.io/github/license/Matheus-SS/PROSHOP)

# ProShop

Aplicação de um e-commerce utilizando a stack MERN (Mongo, Express, React e Node) integrando o método de pagamento do paypal.
Deploy da aplicação feita no heroku.

[PROSHOP](https://proshop43.herokuapp.com/)

Bibliotecas utilizadas até o momento:

- [x] React-bootstrap
- [x] Typescript
- [x] React router dom
- [x] React router bootstrap
- [x] Axios
- [x] Express
- [x] Concurrently
- [x] Ts node dev
- [x] Mongoose
- [x] Colorts
- [x] Redux
- [x] Jason Web Token
- [x] Jest
- [x] Handlebars
- [x] Sendgrid
- [x] BCrypt

## Em desenvolvimento

### Front-end:

- [x] Navbar
- [x] Footer
- [x] Listagem de produtos
- [x] Cart
- [x] Routes
- [x] Login
- [x] Logout
- [x] Register a user
- [x] User Profile
- [x] Update User Profile
- [x] Handling when the token session expires

### Back-end:

- [x] Connection to Database
- [x] Seeders
- [x] Controllers
- [x] Models
- [x] Error Middleware
- [x] Authentication Middleware
- [ ] Admin Middleware
- [x] Routes
- [ ] Services
- [ ] Testing

#### Models

- [x] Order
- [x] Product
- [x] Review
- [x] User
- [x] Shipping Address
- [x] User Token

#### Routes

##### Products

- [x] GET `/api/products` Return all products (public)
- [x] GET `/api/products/:id` Return a specific product by id (public)

##### User

- [x] POST `/api/users/login` Login a user (public)
- [x] GET `/api/users/profile` Get logged in user info (private)
- [x] GET `/api/users` Register a user (public)
- [x] PUT `/api/users/profile` update a user (private)

##### Shipping Address

- [x] POST `/api/address` Create a shipping address (private)
- [x] GET `/api/address` Get shipping address info (private)
- [x] PUT `/api/address` update a shipping address (private)

<!-- Caso deseje rodar na sua máquina, digite:

```
git clone https://github.com/Matheus-SS/PROSHOP.git
``` -->

<!-- Instale todas a dependencias tanto da pasta frontend como backend e na pasta raiz chamada, PROSHOP, digite `yarn dev` que irá rodar tanto o backend e frontend ao mesmo tempo. -->

<p align="center">
  <img src="screens/home.png"/>
  <img src="screens/product.jpg"/>
  <img src="screens/cart.png"/>
</p>
