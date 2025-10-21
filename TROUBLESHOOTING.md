# Troubleshooting - Loading Issue

## Masalah: Aplikasi Loading Terus-menerus

### Penyebab Utama:
1. **Google Apps Script belum di-deploy** - URL tidak bisa diakses
2. **Tidak ada data user di localStorage** - Aplikasi tidak tahu user mana yang login
3. **Google Sheets belum disetup** - Database kosong

## Solusi Cepat

### 1. Gunakan Debug Page
Buka `debug.html` untuk:
- ✅ Check data user di localStorage
- ✅ Test koneksi Google Apps Script
- ✅ Tambahkan data test
- ✅ Navigasi ke halaman lain

### 2. Tambahkan Data Test Manual
Buka `test-data.html` untuk menambahkan data user:
- Puji Shohibul Burhan (85173350016) - 3000 points
- John Doe (81234567890) - 1000 points
- Jane Smith (81234567891) - 500 points

### 3. Setup Google Apps Script (Penting!)

1. **Buka**: https://script.google.com
2. **New Project** → nama "RBM Database"
3. **Copy kode** dari `google-apps-script.js`
4. **Deploy** → Web app → Anyone access
5. **Copy URL** yang dihasilkan

### 4. Update URL di Aplikasi

Ganti URL di 3 file:
- `index.html` (baris 229)
- `home.html` (baris 585)  
- `tukarpoint.html` (baris 128)

## Langkah-langkah Debugging

### Step 1: Check Console
1. Buka aplikasi di browser
2. Tekan F12 → Console
3. Lihat error message

### Step 2: Test Google Apps Script
1. Buka URL Google Apps Script di browser
2. Harus muncul JSON response
3. Jika error, Google Apps Script belum di-deploy

### Step 3: Check Local Storage
1. F12 → Application → Local Storage
2. Cek apakah ada data `rbm_user`
3. Jika tidak ada, gunakan `test-data.html`

### Step 4: Check Google Sheets
1. Buka spreadsheet: https://docs.google.com/spreadsheets/d/1LCtVFEpN9lT5LYCqbxo-RXF94YZPwuKm_TQbc6rxm68/edit
2. Pastikan ada sheet "Users"
3. Pastikan ada data user

## Error Messages & Solutions

### "Script function not found: doGet"
- **Penyebab**: Google Apps Script belum di-deploy
- **Solusi**: Deploy Google Apps Script dengan benar

### "User tidak ditemukan"
- **Penyebab**: Data user tidak ada di Google Sheets
- **Solusi**: Tambahkan data user di Google Sheets

### "Koneksi gagal"
- **Penyebab**: URL Google Apps Script salah
- **Solusi**: Update URL di semua file

### "Loading..." terus-menerus
- **Penyebab**: Tidak ada data user di localStorage
- **Solusi**: Gunakan `test-data.html` atau login dulu

## File yang Perlu Diperiksa

1. **`google-apps-script.js`** - Kode backend
2. **`debug.html`** - Tool debugging
3. **`test-data.html`** - Tool tambah data test
4. **`QUICK_SETUP.md`** - Panduan setup cepat

## Testing Checklist

- [ ] Google Apps Script sudah di-deploy
- [ ] URL Google Apps Script bisa diakses
- [ ] Google Sheets sudah disetup dengan sheet "Users"
- [ ] Data user sudah ditambahkan di Google Sheets
- [ ] URL sudah diupdate di semua file aplikasi
- [ ] Data user ada di localStorage
- [ ] Console browser tidak ada error

## Fallback Solution

Jika Google Sheets belum siap, aplikasi akan menggunakan data demo:
- Nama: Demo User
- Phone: 81234567890
- Points: 1000

Ini akan menghilangkan masalah loading dan aplikasi bisa digunakan untuk testing.
