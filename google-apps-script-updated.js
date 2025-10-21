/**
 * Google Apps Script untuk Rice Bowl Monster App
 * Database: Google Sheets dengan struktur:
 * Kolom A: Nama
 * Kolom B: No Telepon
 * Kolom C: Username
 * Kolom D: Password (jika ada)
 * Kolom E: Jumlah Point
 * Kolom F: Voucher/Merchandise yang ditukar
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
  // Untuk testing, return info sheet
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Google Apps Script berjalan',
    data: data.slice(0, 5) // Ambil 5 baris pertama untuk testing
  })).setMimeType(ContentService.MimeType.JSON);
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
    sheet.getRange(1, 1, 1, 7).setValues([
      ['Nama', 'No Telepon', 'Username', 'Password', 'Point', 'Point Ditukar', 'Nama Voucher/Merchandise']
    ]);
    // Format header
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
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
        user: userData
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
  const newRow = [nama, phoneNumber, phoneNumber, '', 0, '']; // Password kosong, point 0, voucher kosong
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
        user: {
          nama: row[0],
          phone: row[1],
          username: row[2],
          points: row[4] || 0
        }
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

function handleAddPoints(data) {
  const phoneNumber = data.phone;
  const pointsToAdd = data.points;
  
  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();
  
  // Cari user dan tambahkan points
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (row[1] === phoneNumber) {
      const currentPoints = row[4] || 0;
      const newPoints = currentPoints + pointsToAdd;
      sheet.getRange(i + 1, 5).setValue(newPoints); // Update kolom E
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Points berhasil ditambahkan',
        addedPoints: pointsToAdd,
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
