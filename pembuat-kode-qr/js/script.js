var QRCodeSection = document.getElementById("QRCodeSection");
QRCodeSection.style.visibility = "hidden";

function ResetButton() {
    window.location.reload();
}

function TextSizeQR(value) {
    var TextSizeQR = document.getElementById("TextSizeQR");
    TextSizeQR.innerHTML = `${value} x ${value} px`;
}

function GenerateQRCode() {
    event.preventDefault();

    var QRCodeContainer = document.getElementById("QRCode");
    var sizeQR = document.getElementById("sizeQR").value;
    var textQR = document.getElementById("textQR").value;
    var showTextQR = document.getElementById("showTextQR");

    if (textQR != "") {
        var fillColor = document.getElementById("fillColor").value;
        var boxColor = document.getElementById("boxColor").value;

        QRCodeContainer.innerHTML = "";

        new QRCode(QRCodeContainer, {
            text: textQR,
            width: sizeQR,
            height: sizeQR,
            colorDark: fillColor,
            colorLight: boxColor,
            correctLevel: QRCode.CorrectLevel.L
        });

        showTextQR.innerHTML = `<p>Kata/Kalimat yang ditulis<br><strong>${textQR}</strong></p>`;
        QRCodeSection.style.visibility = "visible";
        QRCodeContainer.children[0].remove();
        
        if(window.screen.width < 768){
            var QRCodeSections = document.getElementById("QRCodeSections");
            QRCodeSections.scrollIntoView(true);
        }
    } else {
        alert("Masukkan Kalimatnya dulu ya...");
    }
}

function DownloadQRCode() {
    var QRCodeContainer = document.getElementById("QRCode");
    var textQR = document.getElementById("textQR").value;
    var image = QRCodeContainer.children[0].src;
    var downloadButton = document.getElementById("downloadButton");

    var linkDownloadButton = document.getElementById("linkDownloadButton");
    linkDownloadButton.setAttribute("href", image);
    linkDownloadButton.setAttribute("download", `${textQR}` + " QRCode by Adhitya Bagus Wicaksono");
    linkDownloadButton.appendChild(downloadButton);
}