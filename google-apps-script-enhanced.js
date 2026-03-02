/**
 * Google Apps Script Enhanced untuk Rice Bowl Monster App
 * Mendukung Input Point dan Klaim VCR dengan QR Code
 * 
 * Database: Google Sheets dengan struktur:
 * Kolom A: Nama
 * Kolom B: No Telepon
 * Kolom C: Username
 * Kolom D: Password (jika ada)
 * Kolom E: Jumlah Point
 * Kolom F: Point yang Ditukar
 * Kolom G: Nama Voucher/Merchandise
 * Kolom H: Riwayat Point (JSON)
 * Kolom I: Riwayat Voucher (JSON)
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    switch(action) {
      case 'login':
        return handleLogin(data);
      case 'register':
        return handleRegister(data);
      case 'getUserData':
        return handleGetUserData(data);
      case 'updatePoints':
        return handleUpdatePoints(data);
      case 'addPoints':
        return handleAddPoints(data);
      case 'exchangePoints':
        return handleExchangePoints(data);
      case 'claimVoucher':
        return handleClaimVoucher(data);
      case 'getPointsHistory':
        return handleGetPointsHistory(data);
      case 'getVouchersHistory':
        return handleGetVouchersHistory(data);
      case 'validateClaimVoucher':
        return handleValidateClaimVoucher(data);
      case 'generateClaimCode':
        return handleGenerateClaimCode(data);
      case 'validateClaimCode':
        return handleValidateClaimCode(data);
      default:
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Action tidak dikenali'
        })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Terjadi kesalahan: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const phone = e.parameter.phone;
    if (phone) {
      return handleGetUserData({ phone: phone });
    }
    
    // Untuk testing, return info sheet
    const sheet = getSheet();
    const data = sheet.getDataRange().getValues();
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Google Apps Script berjalan',
      data: data.slice(0, 5) // Ambil 5 baris pertama untuk testing
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Terjadi kesalahan: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getSheet() {
  // Spreadsheet ID Anda
  const SPREADSHEET_ID = '1LCtVFEpN9lT5LYCqbxo-RXF94YZPwuKm_TQbc6rxm68';
  const SHEET_NAME = 'Users';
  
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  // Jika sheet tidak ada, buat sheet baru
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    // Set header
    sheet.getRange(1, 1, 1, 9).setValues([[
      'Nama', 'No Telepon', 'Username', 'Password', 'Point', 
      'Point Ditukar', 'Nama Voucher/Merchandise', 'Riwayat Point', 'Riwayat Voucher'
    ]]);
    // Format header
    sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
  }
  
  return sheet;
}

function handleLogin(data) {
  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();
  
  const phoneNumber = data.username;
  
  // Cari user berdasarkan nomor telepon (kolom B)
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const storedPhone = row[1]; // Kolom B (No Telepon)
    
    if (storedPhone === phoneNumber) {
      // User ditemukan, simpan session
      const userData = {
        nama: row[0], // Kolom A
        phone: row[1], // Kolom B
        username: row[2], // Kolom C
        points: row[4] || 0 // Kolom E
      };
      
      // Simpan ke PropertiesService untuk session
      PropertiesService.getScriptProperties().setProperty('current_user', JSON.stringify(userData));
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Login berhasil',
        data: userData
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: 'Nomor telepon tidak terdaftar'
  })).setMimeType(ContentService.MimeType.JSON);
}

function handleRegister(data) {
  const sheet = getSheet();
  
  const nama = data.nama;
  const phoneNumber = data.username;
  
  // Cek apakah nomor telepon sudah terdaftar
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (values[i][1] === phoneNumber) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Nomor telepon sudah terdaftar'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  // Tambahkan user baru
  const newRow = [
    nama, 
    phoneNumber, 
    phoneNumber, 
    '', // Password kosong
    0,  // Point awal
    0,  // Point ditukar
    '', // Voucher kosong
    '[]', // Riwayat point kosong
    '[]'  // Riwayat voucher kosong
  ];
  sheet.appendRow(newRow);
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Registrasi berhasil'
  })).setMimeType(ContentService.MimeType.JSON);
}

function handleGetUserData(data) {
  const phoneNumber = data.phone;
  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();
  
  // Cari user berdasarkan nomor telepon
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (row[1] === phoneNumber) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        data: {
          nama: row[0],
          phone: row[1],
          username: row[2],
          points: row[4] || 0,
          points_sisa: row[4] || 0
        }
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: 'User tidak ditemukan'
  })).setMimeType(ContentService.MimeType.JSON);
}

function handleAddPoints(data) {
  const phoneNumber = data.phone;
  const amount = data.amount;
  const source = data.source || 'qr_scan';
  
  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();
  
  // Cari user dan tambahkan points
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (row[1] === phoneNumber) {
      const currentPoints = row[4] || 0;
      const newPoints = currentPoints + amount;
      
      // Update points di kolom E
      sheet.getRange(i + 1, 5).setValue(newPoints);
      
      // Update riwayat point di kolom H
      const pointsHistory = JSON.parse(row[7] || '[]');
      const newEntry = {
        id: Date.now(),
        amount: amount,
        source: source,
        timestamp: new Date().toISOString(),
        userId: phoneNumber
      };
      pointsHistory.unshift(newEntry);
      sheet.getRange(i + 1, 8).setValue(JSON.stringify(pointsHistory));
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Points berhasil ditambahkan',
        data: {
          addedPoints: amount,
          newPoints: newPoints,
          pointsHistory: pointsHistory.slice(0, 10) // Return last 10 entries
        }
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: 'User tidak ditemukan'
  })).setMimeType(ContentService.MimeType.JSON);
}

function handleClaimVoucher(data) {
  const phoneNumber = data.phone;
  const voucherCode = data.voucherCode;
  
  // Parse voucher code
  const voucherData = parseVoucherCode(voucherCode);
  if (!voucherData) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Format kode voucher tidak valid'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();
  
  // Cari user
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (row[1] === phoneNumber) {
      // Simpan voucher ke riwayat
      const vouchersHistory = JSON.parse(row[8] || '[]');
      const newVoucher = {
        id: Date.now(),
        code: voucherCode,
        voucherId: voucherData.voucherId,
        name: getVoucherName(voucherData.voucherId),
        description: getVoucherDescription(voucherData.voucherId),
        value: getVoucherValue(voucherData.voucherId),
        timestamp: new Date().toISOString(),
        status: 'active'
      };
      vouchersHistory.unshift(newVoucher);
      sheet.getRange(i + 1, 9).setValue(JSON.stringify(vouchersHistory));
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Voucher berhasil diklaim',
        data: {
          voucher: newVoucher,
          vouchersHistory: vouchersHistory.slice(0, 10) // Return last 10 entries
        }
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: 'User tidak ditemukan'
  })).setMimeType(ContentService.MimeType.JSON);
}

function handleGetPointsHistory(data) {
  const phoneNumber = data.phone;
  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();
  
  // Cari user
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (row[1] === phoneNumber) {
      const pointsHistory = JSON.parse(row[7] || '[]');
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        data: pointsHistory
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: 'User tidak ditemukan'
  })).setMimeType(ContentService.MimeType.JSON);
}

function handleGetVouchersHistory(data) {
  const phoneNumber = data.phone;
  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();
  
  // Cari user
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (row[1] === phoneNumber) {
      const vouchersHistory = JSON.parse(row[8] || '[]');
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        data: vouchersHistory
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: 'User tidak ditemukan'
  })).setMimeType(ContentService.MimeType.JSON);
}

function handleUpdatePoints(data) {
  const phoneNumber = data.phone;
  const newPoints = data.points;
  
  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();
  
  // Cari user dan update points
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (row[1] === phoneNumber) {
      sheet.getRange(i + 1, 5).setValue(newPoints); // Update kolom E
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Points berhasil diupdate',
        newPoints: newPoints
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: 'User tidak ditemukan'
  })).setMimeType(ContentService.MimeType.JSON);
}

function handleExchangePoints(data) {
  const phoneNumber = data.phone;
  const pointsToExchange = data.points;
  const itemName = data.itemName;
  const itemType = data.itemType; // 'voucher' atau 'merchandise'
  
  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();
  
  // Cari user dan update points serta voucher/merchandise
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (row[1] === phoneNumber) {
      const currentPoints = row[4] || 0;
      const newPoints = currentPoints - pointsToExchange;
      
      // Update points di kolom E
      sheet.getRange(i + 1, 5).setValue(newPoints);
      
      // Update point ditukar di kolom F
      const currentExchangedPoints = row[5] || 0;
      const newExchangedPoints = currentExchangedPoints + pointsToExchange;
      sheet.getRange(i + 1, 6).setValue(newExchangedPoints);
      
      // Update nama voucher/merchandise di kolom G
      const currentItems = row[6] || '';
      const newItem = `${itemName} (${itemType}) - ${new Date().toLocaleDateString()}`;
      const updatedItems = currentItems ? `${currentItems}; ${newItem}` : newItem;
      sheet.getRange(i + 1, 7).setValue(updatedItems);
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Points berhasil ditukar',
        newPoints: newPoints,
        exchangedPoints: newExchangedPoints,
        exchangedItem: newItem
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: 'User tidak ditemukan'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Helper functions
function parseVoucherCode(code) {
  const parts = code.split('_');
  if (parts.length !== 4 || parts[0] !== 'VCR') {
    return null;
  }

  return {
    type: 'voucher',
    timestamp: parseInt(parts[1]),
    voucherId: parts[2],
    userId: parts[3]
  };
}

function getVoucherName(voucherId) {
  // Mapping voucher ID ke nama voucher
  const voucherNames = {
    'VOUCHER123': 'Voucher Diskon 10%',
    'VOUCHER456': 'Gratis Es Teh',
    'VOUCHER789': 'Potongan Rp 5.000',
    'VOUCHER101': 'Gantungan Kunci RBM',
    'VOUCHER102': 'Tote Bag Monster'
  };
  
  return voucherNames[voucherId] || 'Voucher ' + voucherId;
}

function getVoucherDescription(voucherId) {
  // Mapping voucher ID ke deskripsi
  const voucherDescriptions = {
    'VOUCHER123': 'Dapatkan diskon 10% untuk pembelian minimal Rp 50.000',
    'VOUCHER456': 'Gratis 1 es teh untuk pembelian apapun',
    'VOUCHER789': 'Potongan harga Rp 5.000 untuk pembelian minimal Rp 25.000',
    'VOUCHER101': 'Gantungan kunci eksklusif Rice Bowl Monster',
    'VOUCHER102': 'Tote bag keren dengan logo Rice Bowl Monster'
  };
  
  return voucherDescriptions[voucherId] || 'Voucher hadiah dari Rice Bowl Monster';
}

function getVoucherValue(voucherId) {
  // Mapping voucher ID ke nilai voucher
  const voucherValues = {
    'VOUCHER123': 10000,
    'VOUCHER456': 5000,
    'VOUCHER789': 5000,
    'VOUCHER101': 15000,
    'VOUCHER102': 25000
  };
  
  return voucherValues[voucherId] || 0;
}

/**
 * Generate kode unik 5 karakter untuk klaim voucher
 */
function generateUniqueCode(length = 5) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Hapus I, O, 0, 1 untuk menghindari kebingungan
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Generate dan simpan kode klaim unik
 */
function handleGenerateClaimCode(data) {
  try {
    const phoneNumber = data.phone;
    const itemId = data.itemId;
    const itemName = data.itemName;
    
    if (!phoneNumber || !itemId || !itemName) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Data tidak lengkap. Phone, itemId, dan itemName wajib diisi.'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const sheet = getSheet();
    const values = sheet.getDataRange().getValues();
    
    // Cari atau buat sheet untuk menyimpan kode klaim
    const spreadsheet = SpreadsheetApp.openById('1LCtVFEpN9lT5LYCqbxo-RXF94YZPwuKm_TQbc6rxm68');
    let claimCodesSheet = spreadsheet.getSheetByName('ClaimCodes');
    
    if (!claimCodesSheet) {
      claimCodesSheet = spreadsheet.insertSheet('ClaimCodes');
      claimCodesSheet.getRange(1, 1, 1, 7).setValues([[
        'Kode', 'Phone', 'ItemId', 'ItemName', 'ClaimTime', 'Status', 'ValidatedAt'
      ]]);
      claimCodesSheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    }
    
    // Generate kode unik (cek duplikasi)
    let code = generateUniqueCode(5);
    let codeValues = claimCodesSheet.getDataRange().getValues();
    let attempts = 0;
    const maxAttempts = 50;
    
    while (attempts < maxAttempts) {
      let isDuplicate = false;
      for (let i = 1; i < codeValues.length; i++) {
        if (codeValues[i][0] === code && codeValues[i][5] !== 'used') {
          isDuplicate = true;
          break;
        }
      }
      if (!isDuplicate) break;
      code = generateUniqueCode(5);
      attempts++;
    }
    
    if (attempts >= maxAttempts) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Gagal generate kode unik. Silakan coba lagi.'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Simpan kode ke sheet
    const claimTime = new Date().toISOString();
    claimCodesSheet.appendRow([
      code,           // Kolom A: Kode
      phoneNumber,    // Kolom B: Phone
      itemId,         // Kolom C: ItemId
      itemName,       // Kolom D: ItemName
      claimTime,      // Kolom E: ClaimTime
      'active',       // Kolom F: Status
      ''              // Kolom G: ValidatedAt
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Kode berhasil digenerate',
      data: {
        code: code,
        phone: phoneNumber,
        itemId: itemId,
        itemName: itemName,
        claimTime: claimTime
      }
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Terjadi kesalahan: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Validasi kode klaim 5 karakter
 */
function handleValidateClaimCode(data) {
  try {
    const code = (data.code || '').trim().toUpperCase();
    const operator = data.operator || 'unknown';
    
    if (!code || code.length !== 5) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Kode harus 5 karakter',
        code: 'INVALID_LENGTH'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Akses sheet ClaimCodes
    const spreadsheet = SpreadsheetApp.openById('1LCtVFEpN9lT5LYCqbxo-RXF94YZPwuKm_TQbc6rxm68');
    let claimCodesSheet = spreadsheet.getSheetByName('ClaimCodes');
    
    if (!claimCodesSheet) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Kode tidak ditemukan',
        code: 'CODE_NOT_FOUND'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const values = claimCodesSheet.getDataRange().getValues();
    
    // Cari kode
    let foundRow = null;
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === code) { // Kolom A: Kode
        foundRow = i;
        break;
      }
    }
    
    if (!foundRow) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Kode tidak ditemukan atau tidak valid',
        code: 'CODE_NOT_FOUND'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const row = values[foundRow];
    const status = row[5]; // Kolom F: Status
    const claimTime = row[4]; // Kolom E: ClaimTime
    
    // Cek apakah sudah digunakan
    if (status === 'used') {
      const validatedAt = row[6]; // Kolom G: ValidatedAt
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Kode sudah pernah digunakan',
        code: 'ALREADY_USED',
        firstValidation: validatedAt
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Cek apakah sudah kadaluarsa (30 hari)
    if (claimTime) {
      const claimDate = new Date(claimTime);
      const now = new Date();
      const daysDiff = (now - claimDate) / (1000 * 60 * 60 * 24);
      
      if (daysDiff > 30) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: `Kode sudah kadaluarsa. Diklaim ${Math.floor(daysDiff)} hari yang lalu.`,
          code: 'EXPIRED',
          daysExpired: Math.floor(daysDiff)
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Cari data user
    const phoneNumber = row[1]; // Kolom B: Phone
    const sheet = getSheet();
    const userValues = sheet.getDataRange().getValues();
    let userData = null;
    
    for (let i = 1; i < userValues.length; i++) {
      if (userValues[i][1] === phoneNumber) {
        userData = {
          nama: userValues[i][0],
          phone: userValues[i][1],
          points: userValues[i][4] || 0
        };
        break;
      }
    }
    
    // Update status menjadi 'used' dan simpan waktu validasi
    const validatedAt = new Date().toISOString();
    claimCodesSheet.getRange(foundRow + 1, 6).setValue('used'); // Status
    claimCodesSheet.getRange(foundRow + 1, 7).setValue(validatedAt); // ValidatedAt
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Kode valid. Voucher dapat digunakan.',
      code: 'VALID',
      data: {
        code: code,
        itemId: row[2], // Kolom C: ItemId
        itemName: row[3], // Kolom D: ItemName
        userPhone: phoneNumber,
        userName: userData ? userData.nama : null,
        claimTime: claimTime,
        validatedAt: validatedAt,
        validatedBy: operator
      }
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Terjadi kesalahan: ' + error.toString(),
      code: 'SYSTEM_ERROR'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Validasi Claim Voucher (untuk kasir)
 * Validasi QR code klaim hadiah dari pelanggan (legacy - untuk backward compatibility)
 */
function handleValidateClaimVoucher(data) {
  try {
    const claimData = data.claimData; // Data dari QR code (JSON string atau object)
    const operator = data.operator || 'unknown'; // Nama kasir yang melakukan validasi
    
    // Parse claimData jika berupa string
    let claim;
    if (typeof claimData === 'string') {
      try {
        claim = JSON.parse(claimData);
      } catch (e) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Format QR Code tidak valid (bukan JSON)',
          code: 'INVALID_FORMAT'
        })).setMimeType(ContentService.MimeType.JSON);
      }
    } else {
      claim = claimData;
    }
    
    // 1. Validasi format data wajib
    if (!claim.claimId || !claim.itemName) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Data QR Code tidak lengkap. Pastikan claimId dan itemName tersedia.',
        code: 'INCOMPLETE_DATA'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 2. Validasi timestamp (cek apakah voucher sudah kadaluarsa - 30 hari)
    if (claim.claimTime) {
      const claimDate = new Date(claim.claimTime);
      const now = new Date();
      const daysDiff = (now - claimDate) / (1000 * 60 * 60 * 24);
      
      if (daysDiff > 30) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: `Voucher sudah kadaluarsa. Diklaim ${Math.floor(daysDiff)} hari yang lalu.`,
          code: 'EXPIRED',
          daysExpired: Math.floor(daysDiff)
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // 3. Validasi dengan database - cek apakah claimId sudah pernah digunakan
    const sheet = getSheet();
    const values = sheet.getDataRange().getValues();
    
    // Cek di semua user apakah claimId sudah pernah digunakan
    let isClaimed = false;
    let firstClaimInfo = null;
    
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const vouchersHistory = JSON.parse(row[8] || '[]'); // Kolom I: Riwayat Voucher
      
      // Cek di riwayat voucher
      for (let voucher of vouchersHistory) {
        if (voucher.claimedVoucherId === claim.claimId || voucher.claimId === claim.claimId) {
          isClaimed = true;
          firstClaimInfo = {
            claimedAt: voucher.validatedAt || voucher.timestamp,
            validatedBy: voucher.validatedBy || 'Sistem',
            userPhone: row[1] // Nomor telepon user yang mengklaim
          };
          break;
        }
      }
      
      // Cek di kolom Claimed Vouchers (jika ada kolom tambahan)
      // Kita akan menambahkan sheet terpisah untuk claimed vouchers atau menggunakan kolom baru
    }
    
    if (isClaimed) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'QR Code ini sudah pernah digunakan sebelumnya.',
        code: 'ALREADY_USED',
        firstClaim: firstClaimInfo
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 4. Validasi user phone (jika ada)
    let userData = null;
    if (claim.userPhone) {
      for (let i = 1; i < values.length; i++) {
        const row = values[i];
        if (row[1] === claim.userPhone || 
            row[1] === claim.userPhone.replace(/^\+62/, '0') ||
            row[1] === claim.userPhone.replace(/^62/, '0')) {
          userData = {
            nama: row[0],
            phone: row[1],
            points: row[4] || 0
          };
          break;
        }
      }
      
      // Jika userPhone ada di QR tapi tidak ditemukan di database
      // Ini bukan error fatal, bisa jadi user sudah dihapus, tapi tetap warning
    }
    
    // 5. Simpan ke riwayat validasi (kolom baru atau sheet terpisah)
    // Untuk saat ini, kita simpan di kolom I (Riwayat Voucher) dengan format khusus
    // Jika userPhone ditemukan, update riwayat user tersebut
    if (userData && claim.userPhone) {
      for (let i = 1; i < values.length; i++) {
        const row = values[i];
        if (row[1] === userData.phone) {
          const vouchersHistory = JSON.parse(row[8] || '[]');
          const validationRecord = {
            id: Date.now(),
            claimId: claim.claimId,
            itemName: claim.itemName,
            validatedAt: new Date().toISOString(),
            validatedBy: operator,
            status: 'validated',
            userPhone: claim.userPhone
          };
          vouchersHistory.unshift(validationRecord);
          sheet.getRange(i + 1, 9).setValue(JSON.stringify(vouchersHistory));
          break;
        }
      }
    }
    
    // 6. Validasi berhasil
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Validasi berhasil. Voucher dapat digunakan.',
      code: 'VALID',
      data: {
        claimId: claim.claimId,
        itemName: claim.itemName,
        userPhone: claim.userPhone || null,
        userName: userData ? userData.nama : null,
        validatedAt: new Date().toISOString(),
        validatedBy: operator
      }
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Terjadi kesalahan saat validasi: ' + error.toString(),
      code: 'SYSTEM_ERROR'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

