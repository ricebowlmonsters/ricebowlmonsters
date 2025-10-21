# 📊 Data Sheets System - Rice Bowl Monster

## Sistem Data dari Google Sheets

Sistem ini mengambil data dari Google Sheets untuk:
- **Gambar Promo** (home.html)
- **Data Merchandise** (tukarpoint.html)
- **Data Voucher** (tukarpoint.html)
- **Data Menu** (menu.html)

## 📋 Struktur Google Sheets

### 1. **Sheet "Data Promo"**
| A (Gambar Promo) |
|------------------|
| https://drive.google.com/file/d/1ABC... |
| https://drive.google.com/file/d/1DEF... |
| https://drive.google.com/file/d/1GHI... |

### 2. **Sheet "Tukar Poin"**
| A (Nama) | B (Foto) | C (Point) | D (Deskripsi) | E | F (Nama) | G (Foto) | H (Point) | I (Deskripsi) |
|----------|----------|-----------|---------------|---|----------|----------|-----------|---------------|
| Gantungan Kunci | https://drive.google.com/... | 150 | Merchandise keren | | Voucher Diskon | https://drive.google.com/... | 100 | Diskon 10% |

### 3. **Sheet "Menu"**
| A | B (Rice Bowl) | C (Foto) | D (Harga) | E (Deskripsi) | F (Mie) | G (Foto) | H (Harga) | I (Deskripsi) | ... |
|---|----------------|----------|----------|---------------|---------|----------|-----------|---------------|-----|
| | RBM Chicken Bowl | https://drive.google.com/... | Rp 25.000 | Nasi pulen dengan ayam katsu | Mie Ayam | https://drive.google.com/... | Rp 15.000 | Mie dengan ayam | ... |

## 🔧 Google Apps Script Functions

### 1. **getPromoImages**
- Mengambil data dari kolom A sheet "Data Promo"
- Return: Array gambar promo

### 2. **getMerchandiseData**
- Mengambil data dari kolom A, B, C, D sheet "Tukar Poin"
- Return: Array merchandise

### 3. **getVoucherData**
- Mengambil data dari kolom F, G, H, I sheet "Tukar Poin"
- Return: Array voucher

### 4. **getMenuData**
- Mengambil data dari sheet "Menu" sesuai struktur
- Return: Object dengan kategori (riceBowl, mie, minuman, esCampur, gorengan)

## 🚀 Cara Menggunakan

### 1. **Setup Google Apps Script**
1. Copy kode dari `google-apps-script-data.js`
2. Paste di Google Apps Script
3. Deploy sebagai web app
4. Update URL di aplikasi

### 2. **Setup Google Sheets**
1. **Data Promo**: Masukkan link gambar di kolom A
2. **Tukar Poin**: 
   - Merchandise: kolom A, B, C, D
   - Voucher: kolom F, G, H, I
3. **Menu**: Sesuai struktur yang sudah ada

### 3. **Testing**
1. Buka `test-data-sheets.html`
2. Klik tombol untuk test setiap fungsi
3. Lihat data yang diambil dari Google Sheets

## 📁 File yang Dibuat/Diupdate

### 1. **Google Apps Script**
- `google-apps-script-data.js` - Script lengkap dengan fungsi data

### 2. **Frontend Updates**
- `home.html` - Menambahkan loadPromoImages()
- `tukarpoint.html` - Menambahkan loadMerchandiseData() dan loadVoucherData()
- `menu.html` - Menambahkan loadMenuData()

### 3. **Test Tools**
- `test-data-sheets.html` - Tool untuk test semua fungsi data

## 🎯 Hasil yang Diharapkan

### 1. **Home Page**
- Gambar promo berjalan di slider atas
- Data diambil dari sheet "Data Promo" kolom A

### 2. **Tukar Point Page**
- Merchandise dari sheet "Tukar Poin" kolom A-D
- Voucher dari sheet "Tukar Poin" kolom F-I

### 3. **Menu Page**
- Menu dari sheet "Menu" sesuai struktur
- Kategori: Rice Bowl, Mie, Minuman, Es Campur, Gorengan

## 🔍 Testing Checklist

- [ ] Buka `test-data-sheets.html`
- [ ] Klik "Load Promo Images" - cek gambar promo
- [ ] Klik "Load Merchandise Data" - cek merchandise
- [ ] Klik "Load Voucher Data" - cek voucher
- [ ] Klik "Load Menu Data" - cek menu
- [ ] Buka `home.html` - cek slider promo
- [ ] Buka `tukarpoint.html` - cek merchandise dan voucher
- [ ] Buka `menu.html` - cek menu items

## 📊 Format Data

### Promo Images
```json
{
  "status": "success",
  "data": [
    {
      "image": "https://drive.google.com/file/d/1ABC...",
      "index": 1
    }
  ]
}
```

### Merchandise Data
```json
{
  "status": "success",
  "data": [
    {
      "nama": "Gantungan Kunci RBM",
      "foto": "https://drive.google.com/file/d/1ABC...",
      "point": 150,
      "deskripsi": "Merchandise keren",
      "type": "merchandise"
    }
  ]
}
```

### Menu Data
```json
{
  "status": "success",
  "data": {
    "riceBowl": [
      {
        "nama": "RBM Chicken Bowl",
        "foto": "https://drive.google.com/file/d/1ABC...",
        "harga": "Rp 25.000",
        "deskripsi": "Nasi pulen dengan ayam katsu"
      }
    ],
    "mie": [...],
    "minuman": [...],
    "esCampur": [...],
    "gorengan": [...]
  }
}
```

## 🚀 Quick Start

1. **Copy kode** dari `google-apps-script-data.js`
2. **Paste di Google Apps Script**
3. **Deploy** sebagai web app
4. **Update URL** di aplikasi
5. **Buka `test-data-sheets.html`** untuk testing
6. **Cek aplikasi** - data otomatis terupdate

## 🔧 Troubleshooting

### Error: "Action tidak dikenali"
- Pastikan Google Apps Script sudah di-deploy
- Cek URL di aplikasi sudah benar

### Error: "Sheet tidak ditemukan"
- Pastikan sheet sudah dibuat di Google Sheets
- Cek nama sheet sesuai (Data Promo, Tukar Poin, Menu)

### Error: "Data kosong"
- Pastikan data sudah diisi di Google Sheets
- Cek format data sesuai struktur

## ✅ Perbaikan yang Telah Dibuat

1. **Google Apps Script** - Fungsi lengkap untuk semua data
2. **Frontend Integration** - Semua halaman terintegrasi
3. **Test Tools** - Tool untuk testing semua fungsi
4. **Documentation** - Dokumentasi lengkap
5. **Error Handling** - Error handling yang baik
