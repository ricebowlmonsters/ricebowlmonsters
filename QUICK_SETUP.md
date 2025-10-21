# Quick Setup - Perbaiki Loading Issue

## Masalah: Loading Terus-menerus

Aplikasi menampilkan "Loading..." karena Google Apps Script belum di-deploy dengan benar.

## Solusi Cepat

### 1. Setup Google Apps Script (WAJIB)

1. **Buka Google Apps Script**: https://script.google.com
2. **Buat Project Baru**:
   - Klik "New Project"
   - Ganti nama menjadi "RBM Database"
3. **Copy Kode**:
   - Buka file `google-apps-script.js` di folder project
   - Copy semua kode
   - Paste di Google Apps Script editor
4. **Deploy**:
   - Klik "Deploy" > "New deployment"
   - Pilih "Web app"
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Klik "Deploy"
   - **COPY URL YANG DIHASILKAN**

### 2. Update URL di Aplikasi

Ganti URL di file-file berikut dengan URL dari Google Apps Script:

**File: `index.html` (baris 229)**
```javascript
const SCRIPT_URL = 'URL_DARI_GOOGLE_APPS_SCRIPT';
```

**File: `home.html` (baris 572)**
```javascript
const SCRIPT_URL = 'URL_DARI_GOOGLE_APPS_SCRIPT';
```

**File: `tukarpoint.html` (baris 128)**
```javascript
const SCRIPT_URL = 'URL_DARI_GOOGLE_APPS_SCRIPT';
```

### 3. Setup Google Sheets

1. **Buka Google Sheets**: https://docs.google.com/spreadsheets/d/1LCtVFEpN9lT5LYCqbxo-RXF94YZPwuKm_TQbc6rxm68/edit
2. **Buat Sheet "Users"**:
   - Klik "+" untuk sheet baru
   - Rename menjadi "Users"
3. **Set Header (baris 1)**:
   - A1: Nama
   - B1: No Telepon
   - C1: Username
   - D1: Password
   - E1: Point
4. **Tambahkan Data Test**:
   - A2: Puji Shohibul Burhan
   - B2: 85173350016
   - C2: Burhan
   - D2: 123
   - E2: 3000

### 4. Test Aplikasi

1. **Buka `index.html`**
2. **Login dengan nomor**: `85173350016`
3. **Cek apakah nama dan point muncul**

## Troubleshooting

### Jika Masih Loading:
1. **Cek Console Browser** (F12 > Console):
   - Lihat error message
   - Pastikan URL Google Apps Script benar
2. **Test Google Apps Script**:
   - Buka URL Google Apps Script di browser
   - Harus muncul JSON response
3. **Cek Google Sheets**:
   - Pastikan sheet "Users" sudah dibuat
   - Pastikan data user sudah ada

### Error "Script function not found":
- Google Apps Script belum di-deploy
- Kode belum di-save di Google Apps Script

### Error "User tidak ditemukan":
- Data user belum ditambahkan di Google Sheets
- Nomor telepon tidak sesuai

## Data Demo (Jika Google Sheets Belum Siap)

Aplikasi sekarang sudah memiliki data demo yang akan muncul jika tidak ada data user:
- Nama: Demo User
- Phone: 81234567890
- Points: 1000

Ini akan menghilangkan masalah "Loading..." dan aplikasi bisa digunakan untuk testing.
