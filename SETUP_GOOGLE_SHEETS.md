# Setup Google Sheets untuk Rice Bowl Monster App

## Langkah-langkah Setup

### 1. Buat Google Spreadsheet Baru

1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru dengan nama "RBM Users Database"
3. Buat sheet baru dengan nama "Users"
4. Set header di baris pertama:
   - Kolom A: Nama
   - Kolom B: No Telepon  
   - Kolom C: Username
   - Kolom D: Password
   - Kolom E: Point

### 2. Setup Google Apps Script

1. Buka [Google Apps Script](https://script.google.com)
2. Buat project baru dengan nama "RBM Database"
3. Ganti kode default dengan kode dari file `google-apps-script.js`
4. Spreadsheet ID sudah diupdate: `1LCtVFEpN9lT5LYCqbxo-RXF94YZPwuKm_TQbc6rxm68`
5. Deploy sebagai web app:
   - Klik "Deploy" > "New deployment"
   - Pilih "Web app"
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Klik "Deploy"
   - Copy URL yang dihasilkan

### 3. Update URL di Aplikasi

URL Google Apps Script sudah diupdate di file-file berikut:

- `index.html` (baris 229)
- `home.html` (baris 572)  
- `tukarpoint.html` (baris 128)

### 4. Struktur Database

Google Sheets akan memiliki struktur sebagai berikut:

| A (Nama) | B (No Telepon) | C (Username) | D (Password) | E (Point) |
|----------|----------------|--------------|--------------|-----------|
| John Doe | 81234567890   | 81234567890  |              | 1000      |
| Jane Smith| 81234567891  | 81234567891  |              | 500       |

### 5. Fitur yang Tersedia

#### Login
- Menggunakan nomor telepon sebagai username
- Mencari data di kolom B (No Telepon)
- Mengembalikan data user (nama, phone, points)

#### Registrasi  
- Menambah user baru ke spreadsheet
- Cek duplikasi nomor telepon
- Set point awal = 0

#### Get User Data
- Mengambil data user berdasarkan nomor telepon
- Mengembalikan nama, phone, username, points

#### Update Points
- Mengupdate jumlah point di kolom E
- Berdasarkan nomor telepon di kolom B

#### Add Points
- Menambahkan point ke user yang ada
- Berguna untuk sistem reward

### 6. Testing

1. Tambahkan beberapa user manual di Google Sheets
2. Test login dengan nomor telepon yang ada
3. Test registrasi dengan nomor telepon baru
4. Test tukar poin untuk mengurangi point user

### 7. Troubleshooting

- Pastikan Google Apps Script sudah di-deploy
- Pastikan URL sudah benar di semua file
- Cek console browser untuk error
- Pastikan spreadsheet ID sudah benar
- Pastikan sheet "Users" sudah dibuat

### 8. Security Notes

- Google Apps Script URL bersifat public
- Pertimbangkan untuk menambahkan autentikasi jika diperlukan
- Backup data spreadsheet secara berkala
- Monitor penggunaan untuk mencegah abuse
