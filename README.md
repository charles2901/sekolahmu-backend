## Take Home Test - Backend

## Setup

> 1. Pada file config/config.json, masukkan informasi postgresql dan nama untuk database yang diinginkan
> 2. Di terminal, jalankan _**npm i**_
> 3. Setelah instalasi selesai, jalankan _**npm run setup**_ di terminal
> 4. Lalu, jalankan node app.js

## Asumsi

> 1. Nama siswa dari murid yang mendaftarkan diasumsikan unik satu sama lainnya
> 2. Saat menembak api dengan parameter id kelas, id kelas yang dimasukkan selalu valid atau ada di database

Sebelum mengakses API, dapat login terlebih dahulu untuk memperoleh akses token. 
Seeding user yang ada yaitu 
```
{
    "email" : "admin@mail.com",
    "password": "12345"
},
{
    "email" : "pengajar@mail.com",
    "password": "12345"
},
{
    "email" : "murid1@mail.com",
    "password": "12345"
},
{
    "email" : "murid2@mail.com",
    "password": "12345"
}
```

## API


### POST /login

_Request Body_
```
{
  "email" : string,
  "password" : string
}

```

_Response (200 - OK)_
```
{
    "access_token": string
}
```

### Untuk endpoint selanjutnya, login terlebih dahulu untuk memperoleh token lalu set header untuk tiap api

_Request Header_
```
{
    "access_token" : string
}
```

### POST /class

_Request Body_
```
{
  "rows" : 2,
  "columns" : 3
}

```

_Response (201 - Created)_
```
{
    "id": Integer,
    "rows": Integer,
    "columns": Integer,
    "teacher": String,
    "available_seats": Array,
    "occupied_seats": Array,
    "createdAt": Date,
    "updatedAt": Date,
    "message": String 
}
```

### GET /class/:id

_Request Params_
```
id
```

_Response (200 - OK)_
```
Object Class
```

### GET /class

_Request Body_
```
none
```

_Response (200 - OK)_
```
Array of Class
```

### PUT /checkin/:id

_Request Params_
```
id ( class_id )
```

_Response (200 - OK)_
```
{
    "id": Integer,
    "rows": Integer,
    "columns": Integer,
    "teacher": String,
    "available_seats": Array,
    "occupied_seats": Array,
    "createdAt": Date,
    "updatedAt": Date,
    "message": String 
}
```

### PUT /checkout/:id

_Request Params_
```
id ( class_id )
```

_Response (200 - OK)_
```
{
    "id": Integer,
    "rows": Integer,
    "columns": Integer,
    "teacher": String,
    "available_seats": Array,
    "occupied_seats": Array,
    "createdAt": Date,
    "updatedAt": Date,
    "message": String 
}
```
