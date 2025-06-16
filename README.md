
# 📦 Rintek Backend

Backend API untuk aplikasi **RINTEK** (Ruang Interaktif Teknologi), dibangun dengan:
- Express.js + TypeScript
- Supabase (PostgreSQL) sebagai database
- bcrypt untuk enkripsi password
- express-validator untuk validasi
- Supabase JS Client untuk query ke database

---

## 🛠️ Setup Proyek

### 1. Clone Project

```bash
git clone https://github.com/username/rintek-backend.git
cd rintek-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Buat File `.env`

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-service-role-key
PORT=3000
```

### 4. Jalankan Server Development

```bash
npm run dev
```

---

## 📚 Struktur Folder

```
src/
├── controllers/     // Logic untuk user & kategori
├── routes/          // Routing endpoint
├── services/        // Supabase client
├── types/           // TypeScript types (user, kategori, general)
├── middlewares/     // Middleware validasi dan error
├── utils/           // Fungsi umum seperti sendResponse
└── index.ts         // Entry point aplikasi
```

---

## 🧪 API Endpoint

### 🔐 Auth
| Method | Endpoint         | Deskripsi         |
|--------|------------------|-------------------|
| POST   | /api/users/login | Login user        |

### 👤 User
| Method | Endpoint         | Deskripsi               |
|--------|------------------|-------------------------|
| GET    | /api/users       | Ambil semua user        |
| GET    | /api/users/:id   | Ambil user berdasarkan ID |
| POST   | /api/users       | Register user baru      |
| PUT    | /api/users/:id   | Update user             |
| DELETE | /api/users/:id   | Hapus user              |

### 🏷️ Kategori
| Method | Endpoint             | Deskripsi                   |
|--------|----------------------|-----------------------------|
| GET    | /api/kategori        | Ambil semua kategori        |
| GET    | /api/kategori/:id    | Ambil kategori berdasarkan ID |
| POST   | /api/kategori        | Tambah kategori baru        |
| PUT    | /api/kategori/:id    | Update kategori             |
| DELETE | /api/kategori/:id    | Hapus kategori              |

---

## 🧾 Contoh Request Body

### 🔐 Login
```json
{
  "name": "deris",
  "password": "rahasia123"
}
```

### 🧍‍♂️ Register User
```json
{
  "name": "deris",
  "password": "rahasia123"
}
```

### 🏷️ Tambah Kategori
#### KOMUNITAS:
```json
{
  "name": "Bisnis",
  "room_name": "Ruang Bisnis",
  "room_desc": "Diskusi seputar bisnis",
  "slug": "bisnis",
  "type": "KOMUNITAS"
}
```

#### PRIBADI:
```json
{
  "name": "Catatan Pribadi",
  "room_name": "Ruang Pribadi",
  "room_desc": "Refleksi dan pemikiran pribadi",
  "slug": "pribadi",
  "type": "PRIBADI"
}
```

---

## ⚙️ Fitur Tambahan

- Validasi input menggunakan `express-validator`
- Response konsisten via `sendResponse.ts`
- Password dienkripsi dengan `bcrypt`
- Global error handling dan keamanan (`helmet`, `compression`, `cors`)

---

## 📌 Catatan

- Kolom `type` pada kategori menggunakan enum PostgreSQL (`PRIBADI`, `KOMUNITAS`)
- `slug` pada kategori wajib unik
- Gunakan Supabase SQL editor untuk setup awal database (`CREATE TABLE` & `ENUM`)

---
