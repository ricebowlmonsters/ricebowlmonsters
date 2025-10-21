# 🎁 Exchange System - Rice Bowl Monster

## Fitur Baru: Tukar Point dengan Voucher/Merchandise

### ✅ **Perbaikan yang Telah Dibuat:**

1. **Google Apps Script Updated** - Menambahkan kolom F untuk voucher/merchandise
2. **Exchange Function** - Fungsi baru untuk menangani tukar point
3. **Auto Classification** - Otomatis menentukan jenis item (voucher/merchandise)
4. **Google Sheets Integration** - Data tersimpan di kolom F

## 📊 Struktur Database Baru

| A (Nama) | B (No Telepon) | C (Username) | D (Password) | E (Point) | F (Voucher/Merchandise) |
|----------|----------------|--------------|--------------|-----------|-------------------------|
| Puji | 85173350016 | Burhan | | 3000 | Gantungan Kunci RBM (merchandise) - 11/10/2025 |
| John | 81234567890 | 81234567890 | | 1000 | Voucher Diskon 10% (voucher) - 11/10/2025 |

## 🔧 Cara Kerja Sistem

### 1. **User Klik Tukar Point**
- User memilih item (voucher/merchandise)
- Sistem cek poin cukup
- Konfirmasi tukar

### 2. **Exchange Process**
- Kurangi poin di kolom E
- Tambahkan item ke kolom F
- Format: "Item Name (type) - Date"

### 3. **Auto Classification**
- **Voucher**: Item yang mengandung "Voucher", "Gratis", "Potongan"
- **Merchandise**: Item lainnya (Gantungan Kunci, Tote Bag, dll)

## 🚀 Cara Menggunakan

### Opsi 1: Test Exchange (Paling Mudah)
1. **Buka `test-exchange.html`** di browser
2. **Klik "Add Test User"** untuk menambah data user
3. **Klik "Test Exchange"** untuk item yang diinginkan
4. **Cek Google Sheets** - data akan masuk ke kolom F

### Opsi 2: Tukar Point Normal
1. **Buka `tukarpoint.html`** di browser
2. **Pilih item** yang ingin ditukar
3. **Klik "Tukar"** - akan otomatis masuk ke kolom F
4. **Cek Google Sheets** - data tersimpan

## 📁 File yang Dibuat/Diupdate

### 1. **Google Apps Script**
- `google-apps-script-updated.js` - Script dengan fungsi exchangePoints
- Menambahkan kolom F untuk voucher/merchandise
- Fungsi handleExchangePoints untuk tukar point

### 2. **Tukar Point Page**
- `tukarpoint.html` - Diupdate dengan fungsi exchangePoints
- Auto classification untuk jenis item
- Integration dengan Google Sheets

### 3. **Test Tools**
- `test-exchange.html` - Tool untuk test tukar point
- Test berbagai jenis item
- Check hasil di Google Sheets

## 🎯 Hasil yang Diharapkan

Setelah menggunakan sistem tukar point:
- ✅ Poin berkurang di kolom E
- ✅ Item ditambahkan ke kolom F
- ✅ Format: "Item Name (type) - Date"
- ✅ Data tersimpan di Google Sheets
- ✅ User bisa lihat history tukar point

## 🔍 Testing Checklist

- [ ] Buka `test-exchange.html`
- [ ] Klik "Add Test User"
- [ ] Klik "Test Exchange" untuk item apapun
- [ ] Cek Google Sheets - kolom F berisi item yang ditukar
- [ ] Cek kolom E - poin berkurang sesuai cost

## 📋 Item yang Tersedia

### Merchandise:
- Gantungan Kunci RBM (150 poin)
- Tote Bag Monster (400 poin)

### Voucher:
- Voucher Diskon 10% (100 poin)
- Gratis Es Teh (50 poin)
- Potongan Rp 5.000 (250 poin)

## 🚀 Quick Start

**Paling Cepat:**
1. Buka `test-exchange.html`
2. Klik "Add Test User"
3. Klik "Test Exchange" untuk item apapun
4. Cek Google Sheets - data masuk ke kolom F

**Normal:**
1. Buka `tukarpoint.html`
2. Pilih item yang ingin ditukar
3. Klik "Tukar"
4. Data otomatis masuk ke kolom F

## 🔧 Setup Google Apps Script

1. **Copy kode** dari `google-apps-script-updated.js`
2. **Paste di Google Apps Script**
3. **Deploy** sebagai web app
4. **Update URL** di aplikasi

## 📊 Format Data di Kolom F

```
Gantungan Kunci RBM (merchandise) - 11/10/2025; Voucher Diskon 10% (voucher) - 11/10/2025
```

- Multiple items dipisahkan dengan ";"
- Format: "Item Name (type) - Date"
- Type: "voucher" atau "merchandise"
- Date: Tanggal tukar point
