# Instruksi Setup Google Apps Script

## Langkah-langkah Setup

### 1. Copy Kode Google Apps Script

1. Buka file `google-apps-script.js` di folder project Anda
2. Copy semua kode di dalam file tersebut

### 2. Setup di Google Apps Script

1. Buka [Google Apps Script](https://script.google.com)
2. Klik "New Project"
3. Ganti nama project menjadi "RBM Database"
4. Hapus semua kode default di editor
5. Paste kode dari file `google-apps-script.js`
6. Klik "Save" (Ctrl+S)

### 3. Deploy sebagai Web App

1. Klik tombol "Deploy" di kanan atas
2. Pilih "New deployment"
3. Pilih "Web app" sebagai type
4. Set konfigurasi:
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Klik "Deploy"
6. **Copy URL yang dihasilkan** - ini yang akan digunakan di aplikasi

### 4. Test Google Apps Script

1. Buka URL yang di-copy di browser
2. Anda akan melihat response JSON dengan status "success"
3. Jika error, cek kembali kode dan deployment

### 5. Setup Google Sheets

1. Buka [Google Sheets](https://sheets.google.com)
2. Buka spreadsheet dengan ID: `1LCtVFEpN9lT5LYCqbxo-RXF94YZPwuKm_TQbc6rxm68`
3. Buat sheet baru dengan nama "Users"
4. Set header di baris pertama:
   - Kolom A: Nama
   - Kolom B: No Telepon
   - Kolom C: Username
   - Kolom D: Password
   - Kolom E: Point

### 6. Tambahkan Data Test

Tambahkan beberapa data user di Google Sheets:

| Nama | No Telepon | Username | Password | Point |
|------|------------|----------|----------|-------|
| John Doe | 81234567890 | 81234567890 | | 1000 |
| Jane Smith | 81234567891 | 81234567891 | | 500 |

### 7. Test Aplikasi

1. Buka `index.html` di browser
2. Test login dengan nomor telepon: `81234567890`
3. Cek apakah nama dan point ditampilkan dengan benar
4. Test tukar poin di halaman tukar point

## Troubleshooting

### Error "Script function not found: doGet"
- Pastikan kode Google Apps Script sudah di-deploy dengan benar
- Cek apakah ada error di Google Apps Script editor

### Error "User tidak ditemukan"
- Pastikan data user sudah ditambahkan di Google Sheets
- Cek nama sheet harus "Users"
- Cek format nomor telepon harus sama persis

### Error "Koneksi gagal"
- Pastikan URL Google Apps Script sudah benar
- Cek apakah web app sudah di-deploy dengan akses "Anyone"
- Cek console browser untuk error detail

### Data tidak tersinkronisasi
- Pastikan Spreadsheet ID sudah benar di kode Google Apps Script
- Cek apakah sheet "Users" sudah dibuat
- Cek apakah header sudah sesuai format

## URL yang Sudah Diupdate

- **Google Apps Script URL**: `https://script.google.com/macros/s/AKfycbx5R5WxuGGcGk-i9vLqHNlKOQiGSZFBwHMjfh0w8lCe6hphoMhhu1gW5GIeTrMyxK2vsA/exec`
- **Google Apps Script URL**: `https://script.google.com/macros/s/AKfycbx5xRkvhJSsgGvq6tYeKc4VBwzTyw6bpZgexRYtIYCTgXiGtN1wahPhSijnH5h3VHez/exec`
- **Spreadsheet ID**: `1LCtVFEpN9lT5LYCqbxo-RXF94YZPwuKm_TQbc6rxm68`
- **Sheet Name**: `Users`

## File yang Sudah Diupdate

- ✅ `index.html` - URL Google Apps Script sudah diupdate
- ✅ `home.html` - URL Google Apps Script sudah diupdate  
- ✅ `tukarpoint.html` - URL Google Apps Script sudah diupdate
- ✅ `google-apps-script.js` - Spreadsheet ID sudah diupdate
