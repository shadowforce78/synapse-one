const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    // Ajouter des options pour une meilleure apparence
    minWidth: 800,
    minHeight: 600,
    show: false // Ne pas afficher immédiatement pour éviter de voir le redimensionnement
  });

  // En mode dev, charge l'URL de dev de Vite
  if (process.argv.includes('--dev')) {
    win.loadURL('http://localhost:5173');
    // win.webContents.openDevTools();
  } else {
    // En prod, charge le build
    win.loadFile(path.join(__dirname, '../client/dist/index.html'));
  }

  // Maximiser la fenêtre lorsque le contenu est prêt
  win.once('ready-to-show', () => {
    win.maximize(); // Maximise la fenêtre
    win.show(); // Affiche la fenêtre une fois maximisée
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
