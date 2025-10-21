# Integrasi Google Sheets untuk Rice Bowl Monster App

## Perubahan yang Telah Dibuat

### 1. Google Apps Script (`google-apps-script.js`)
- **Fungsi**: Backend API untuk menangani operasi database
- **Fitur**:
  - Login dengan nomor telepon
  - Registrasi user baru
  - Get user data
  - Update points
  - Add points
- **Struktur Database**:
  - Kolom A: Nama
  - Kolom B: No Telepon
  - Kolom C: Username  
  - Kolom D: Password
  - Kolom E: Point

### 2. Update Login System (`index.html`)
- **Perubahan**: Menggunakan Google Sheets sebagai database
- **Fitur Baru**:
  - Login dengan nomor telepon
  - Simpan data user ke localStorage setelah login berhasil
  - Auto-login setelah registrasi

### 3. Update Home Display (`home.html`)
- **Perubahan**: Menampilkan data user dari localStorage dan sinkronisasi dengan Google Sheets
- **Fitur Baru**:
  - Load data user dari localStorage
  - Sinkronisasi dengan Google Sheets untuk data terbaru
  - Redirect ke login jika tidak ada data user
  - Tampilkan nama dan point user yang sebenarnya

### 4. Update Point System (`tukarpoint.html`)
- **Perubahan**: Integrasi tukar poin dengan Google Sheets
- **Fitur Baru**:
  - Load point user yang sebenarnya
  - Validasi point sebelum tukar
  - Update point di Google Sheets saat tukar
  - Konfirmasi sebelum tukar poin

## Alur Sistem

### Login Flow
1. User input nomor telepon
2. Aplikasi cari data di Google Sheets (kolom B)
3. Jika ditemukan, simpan data ke localStorage
4. Redirect ke home.html

### Home Display Flow  
1. Load data user dari localStorage
2. Sinkronisasi dengan Google Sheets untuk data terbaru
3. Tampilkan nama dan point user
4. Jika tidak ada data user, redirect ke login

### Tukar Point Flow
1. Load point user dari localStorage
2. User pilih item untuk ditukar
3. Validasi point cukup
4. Konfirmasi tukar
5. Update point di Google Sheets
6. Update localStorage dan tampilan

## File yang Diperlukan

### Setup Files
- `google-apps-script.js` - Kode Google Apps Script
- `SETUP_GOOGLE_SHEETS.md` - Panduan setup
- `sample_data.csv` - Data contoh untuk testing

### Updated Files
- `index.html` - Login system dengan Google Sheets
- `home.html` - Display user data dari Sheets
- `tukarpoint.html` - Point system dengan Sheets integration

## Cara Setup

1. **Buat Google Spreadsheet**:
   - Sheet name: "Users"
   - Header: Nama, No Telepon, Username, Password, Point

2. **Setup Google Apps Script**:
   - Copy kode dari `google-apps-script.js`
   - Ganti `1LCtVFEpN9lT5LYCqbxo-RXF94YZPwuKm_TQbc6rxm68` dengan ID spreadsheet
   - Deploy sebagai web app

3. **Update URL di Aplikasi**:
   - URL Google Apps Script sudah diupdate di semua file
   - URL: `https://script.google.com/macros/s/AKfycbx5R5WxuGGcGk-i9vLqHNlKOQiGSZFBwHMjfh0w8lCe6hphoMhhu1gW5GIeTrMyxK2vsA/exec`
   - URL: `https://script.google.com/macros/s/AKfycbx5xRkvhJSsgGvq6tYeKc4VBwzTyw6bpZgexRYtIYCTgXiGtN1wahPhSijnH5h3VHez/exec`

4. **Test Aplikasi**:
   - Tambahkan data user di Google Sheets
   - Test login dengan nomor telepon
   - Test tukar poin

## Keuntungan Sistem Baru

1. **Database Terpusat**: Semua data tersimpan di Google Sheets
2. **Real-time Sync**: Data selalu terupdate
3. **Scalable**: Mudah menambah fitur baru
4. **Backup Otomatis**: Google Sheets memiliki backup otomatis
5. **Multi-device**: Data tersinkronisasi di semua device

## Security Considerations

- Google Apps Script URL bersifat public
- Pertimbangkan autentikasi tambahan untuk production
- Monitor penggunaan untuk mencegah abuse
- Backup data secara berkala

## Troubleshooting

- Pastikan Google Apps Script sudah di-deploy
- Cek URL di semua file sudah benar
- Monitor console browser untuk error
- Pastikan spreadsheet ID dan sheet name benar
