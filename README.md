# Description Project

Desarrollarás una aplicación móvil sencilla que permita a un usuario autenticarse, ver una lista de productos y acceder a los detalles de un producto. Los datos de los productos se obtendrán de una API externa (https://fakestoreapi.com/). La aplicación debe gestionar el estado usando el manejador de estado de tu elección

Requisitos Funcionales Pantalla de Login:
● Crear una pantalla de login donde el usuario ingrese su nombre de usuario y contraseña.
● El login debe realizarse contra la API de autenticación de FakeStore:
https://fakestoreapi.com/auth/login.
● En caso de éxito, guardar el token devuelto y permitir el acceso a la lista de productos.
● En caso de fallo, mostrar un mensaje de error.
● Restricción: Si el usuario no está autenticado, debe ser redirigido automáticamente a la pantalla
de login.
Pantalla de Lista de Productos:
Mostrar una lista de productos obtenida desde la API: https://fakestoreapi.com/products.
Cada elemento de la lista debe mostrar al menos:
● Imagen del producto.
● Nombre del producto.
● Precio.
● La lista debe cargarse de manera eficiente y gestionar correctamente los estados de carga, éxito
y error.
● Al hacer clic en un producto, navegar a la pantalla de detalles del producto.
Pantalla de Detalles del Producto:
Al seleccionar un producto de la lista, se debe navegar a una pantalla de detalles que muestre la siguiente información del producto:
● Imagen del producto.
● Nombre del producto.
● Descripción completa.
● Precio.

# Getting Started

## Overview

## Step 0: Set Up Your Project

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

## Step 3: Navigate to the App

## CocoaPods

```bash
pod install --project-directory=ios
```