const {app, BrowserWindow} = require("electron");

let appWindow;

function crearVentana() {
    appWindow = new BrowserWindow({
        width:1200,
        height: 800,
        //resizable: false,
        minHeight: 600,
        minWidth: 800,
        center: true,
        //show: false
        icon:'icon.png'
    });

    // Cuando la aplicacion es cerrada
    appWindow.on("closed", () => {
        appWindow = null;
    });

    // Cargar HTML
    appWindow.loadFile("./index.html");

    // Cuando la app este lista mostrar la ventana
    appWindow.once("reeady-to-show", () => {
        appWindow.show();
    });
}

app.on("ready", crearVentana);