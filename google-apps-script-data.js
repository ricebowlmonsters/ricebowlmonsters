/**
 * Google Apps Script untuk Rice Bowl Monster App - Data Management
 * Database: Google Sheets dengan multiple sheets
 * - Users: Data user
 * - Data Promo: Gambar promo untuk home
 * - Tukar Poin: Data merchandise dan voucher
 * - Menu: Data menu dengan kategori
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
      case 'getPromoImages':
        return handleGetPromoImages(data);
      case 'getMerchandiseData':
        return handleGetMerchandiseData(data);
      case 'getVoucherData':
        return handleGetVoucherData(data);
      case 'getMenuData':
        return handleGetMenuData(data);
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
  const spreadsheet = getSpreadsheet();
  const sheets = spreadsheet.getSheets();
  const sheetNames = sheets.map(sheet => sheet.getName());
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Google Apps Script berjalan',
    availableSheets: sheetNames
  })).setMimeType(ContentService.MimeType.JSON);
}

function getSpreadsheet() {
  const SPREADSHEET_ID = '1LCtVFEpN9lT5LYCqbxo-RXF94YZPwuKm_TQbc6rxm68';
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getSheet(sheetName) {
  const spreadsheet = getSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    // Buat sheet jika tidak ada
    sheet = spreadsheet.insertSheet(sheetName);
    
    if (sheetName === 'Users') {
      sheet.getRange(1, 1, 1, 7).setValues([
        ['Nama', 'No Telepon', 'Username', 'Password', 'Point', 'Point Ditukar', 'Nama Voucher/Merchandise']
      ]);
    } else if (sheetName === 'Data Promo') {
      sheet.getRange(1, 1, 1, 1).setValues([['Gambar Promo']]);
    } else if (sheetName === 'Tukar Poin') {
      sheet.getRange(1, 1, 1, 4).setValues([
        ['Nama', 'Foto', 'Point', 'Deskripsi']
      ]);
    } else if (sheetName === 'Menu') {
      // Set header untuk menu sesuai struktur yang diminta
      sheet.getRange(1, 1, 2, 21).setValues([
        ['', 'Rice Bowl', '', '', '', 'Mie', '', '', '', 'Minuman', '', '', '', 'Es Campur', '', '', '', 'Gorengan', '', '', ''],
        ['', 'Nama', 'Foto', 'Harga', 'Deskripsi', 'Nama', 'Foto', 'Harga', 'Deskripsi', 'Nama', 'Foto', 'Harga', 'Deskripsi', 'Nama', 'Foto', 'Harga', 'Deskripsi', 'Nama', 'Foto', 'Harga', 'Deskripsi']
      ]);
    }
    
    // Format header
    sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontWeight('bold');
  }
  
  return sheet;
}

// Fungsi untuk mengambil gambar promo
function handleGetPromoImages(data) {
  try {
    const sheet = getSheet('Data Promo');
    const values = sheet.getDataRange().getValues();
    
    // Ambil data dari kolom A (Gambar Promo)
    const promoImages = [];
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] && values[i][0].trim() !== '') {
        promoImages.push({
          image: values[i][0].trim(),
          index: i
        });
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data promo berhasil diambil',
      data: promoImages
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Error mengambil data promo: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Fungsi untuk mengambil data merchandise
function handleGetMerchandiseData(data) {
  try {
    const sheet = getSheet('Tukar Poin');
    const values = sheet.getDataRange().getValues();
    
    // Ambil data merchandise (kolom A, B, C, D)
    const merchandiseData = [];
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] && values[i][0].trim() !== '') {
        merchandiseData.push({
          nama: values[i][0] || '',
          foto: values[i][1] || '',
          point: values[i][2] || 0,
          deskripsi: values[i][3] || '',
          type: 'merchandise'
        });
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data merchandise berhasil diambil',
      data: merchandiseData
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Error mengambil data merchandise: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Fungsi untuk mengambil data voucher
function handleGetVoucherData(data) {
  try {
    const sheet = getSheet('Tukar Poin');
    const values = sheet.getDataRange().getValues();
    
    // Ambil data voucher (kolom F, G, H, I)
    const voucherData = [];
    for (let i = 1; i < values.length; i++) {
      if (values[i][5] && values[i][5].trim() !== '') {
        voucherData.push({
          nama: values[i][5] || '',
          foto: values[i][6] || '',
          point: values[i][7] || 0,
          deskripsi: values[i][8] || '',
          type: 'voucher'
        });
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data voucher berhasil diambil',
      data: voucherData
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Error mengambil data voucher: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Fungsi untuk mengambil data menu
function handleGetMenuData(data) {
  try {
    const sheet = getSheet('Menu');
    const values = sheet.getDataRange().getValues();
    
    const categories = {
      riceBowl: { startCol: 1, data: [] },
      mie: { startCol: 5, data: [] },
      minuman: { startCol: 9, data: [] },
      esCampur: { startCol: 13, data: [] },
      gorengan: { startCol: 17, data: [] }
    };

    for (let i = 2; i < values.length; i++) {
      const row = values[i];

      for (const category in categories) {
        const { startCol } = categories[category];
        if (row[startCol] && row[startCol].trim() !== '') {
          categories[category].data.push({
            nama: row[startCol] || '',
            foto: row[startCol + 1] || '',
            harga: row[startCol + 2] || '',
            deskripsi: row[startCol + 3] || ''
          });
        }
      }
    }

    const menuData = Object.keys(categories).reduce((acc, key) => {
      acc[key] = categories[key].data;
      return acc;
    }, {});
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data menu berhasil diambil',
      data: menuData
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Error mengambil data menu: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Fungsi-fungsi yang sudah ada untuk user management
function handleLogin(data) {
  const sheet = getSheet('Users');
  const values = sheet.getDataRange().getValues();
  
  const phoneNumber = data.username;
  
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const storedPhone = row[1];
    
    if (storedPhone === phoneNumber) {
      const userData = {
        nama: row[0],
        phone: row[1],
        username: row[2],
        points: row[4] || 0
      };
      
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
  const sheet = getSheet('Users');
  
  const nama = data.nama;
  const phoneNumber = data.username;
  
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (values[i][1] === phoneNumber) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Nomor telepon sudah terdaftar'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  const newRow = [nama, phoneNumber, phoneNumber, '', 0, 0, ''];
  sheet.appendRow(newRow);
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Registrasi berhasil'
  })).setMimeType(ContentService.MimeType.JSON);
}

function handleGetUserData(data) {
  const phoneNumber = data.phone;
  const sheet = getSheet('Users');
  const values = sheet.getDataRange().getValues();
  
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
  
  const sheet = getSheet('Users');
  const values = sheet.getDataRange().getValues();
  
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (row[1] === phoneNumber) {
      sheet.getRange(i + 1, 5).setValue(newPoints);
      
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
  
  const sheet = getSheet('Users');
  const values = sheet.getDataRange().getValues();
  
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (row[1] === phoneNumber) {
      const currentPoints = row[4] || 0;
      const newPoints = currentPoints + pointsToAdd;
      sheet.getRange(i + 1, 5).setValue(newPoints);
      
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
  const itemType = data.itemType;
  
  const sheet = getSheet('Users');
  const values = sheet.getDataRange().getValues();
  
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (row[1] === phoneNumber) {
      const currentPoints = row[4] || 0;
      const newPoints = currentPoints - pointsToExchange;
      
      sheet.getRange(i + 1, 5).setValue(newPoints);
      
      const currentExchangedPoints = row[5] || 0;
      const newExchangedPoints = currentExchangedPoints + pointsToExchange;
      sheet.getRange(i + 1, 6).setValue(newExchangedPoints);
      
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
