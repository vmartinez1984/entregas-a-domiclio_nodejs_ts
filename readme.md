# Todo
- [ ] Generar el docker
- [ ] Crud de productos
- [ ] Productos con store files
- [ ] Implementar swagger
- [ ] Clientes
- [ ] Usuarios
- [ ] Agregar los productos completos
- [ ] .env para las configuraciones

## Para celular
Hacer lo más simple

- [x] get     api/categorias
- [x] get     api/productos
- [x] get     api/productos/categorias/:categoriaId
- [x] get     imagenes/nombreDeImages.jpg   (ruta statica)
- [x] post    api/clientes
- [x] post    api/clientes/inicioDeSesiones
- [x] post    api/ordenes
- [ ] get     api/ordenes/:idEncodedkey
- [ ] get     api/ordenes/clientes/:clienteId
- [ ] post    api/usuarios/inicioDeSesiones

# Admin
- [x] post api/productos
- [ ] put  api/productos/:productoId

# Producto con imagen
```
curl --location 'http://localhost:3001/api/productos' \
--form 'imagen=@"/C:/Users/ahal_/OneDrive/Imágenes/LuckySushi/edamame-lucky.png"' \
--form 'nombre="test"' \
--form 'descripcion="descripcion de prueba"' \
--form 'precio="90"' \
--form 'categoriaId="1"'
```

# Para consumir la Imagenes
```
curl --location 'http://localhost:3001/images/16fa6b62-cd53-45d6-a238-e1673a7420ca.jpg'
```

