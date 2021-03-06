## Take Home Test - Backend

## Setup
> 1. Masuk ke folder server
> 2. Pada file config/config.json bagian development, masukkan informasi postgresql dan nama untuk database yang diinginkan
> 3. Di terminal, jalankan _**npm i**_
> 4. Setelah instalasi selesai, jalankan _**npm run setup**_ di terminal
> 5. Lalu, jalankan node app.js

## Asumsi

> 1. Nama siswa dari murid yang mendaftarkan diasumsikan unik satu sama lainnya, hal ini bertujuan untuk membuat lebih simpel api sehingga tidak perlu memakai relasi tabel
> 2. Saat menembak api dengan parameter id kelas, id kelas yang dimasukkan selalu valid atau ada di database, karena list kelas yang ditampilan dibagian frontend berdasarkan yang telah diquery dari db
> 3. Seat yang diperoleh siswa diatur otomatis berurutan oleh sistem

Seeding user yang telah dilakukan yaitu sebagai berikut
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

### Untuk endpoint selanjutnya, login terlebih dahulu untuk memperoleh token lalu set header berdasarkan token yang diperoleh

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
