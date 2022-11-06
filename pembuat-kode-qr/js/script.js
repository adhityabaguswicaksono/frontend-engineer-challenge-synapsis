document.addEventListener("DOMContentLoaded", function(){
    let QRCodeSection = document.getElementById("QRCodeSection");
    QRCodeSection.style.visibility = "hidden";
});

function AutoExpand(element) {
    element.style.height = "0";
    element.style.height = (element.scrollHeight) + "px";
}

function ResetButton() {
    window.location.reload();
}

function TextSizeQR(value) {
    let TextSizeQR = document.getElementById("TextSizeQR");
    TextSizeQR.innerHTML = `${value} x ${value} px`;
}

function GenerateQRCode() {
    event.preventDefault();

    let QRCodeContainer = document.getElementById("QRCode");
    let sizeQR = document.getElementById("sizeQR").value;
    let textQR = document.getElementById("textQR").value;
    let fillColor = document.getElementById("fillColor").value;
    let boxColor = document.getElementById("boxColor").value;
    let QRCodeSections = document.getElementById("QRCodeSections");

    if (textQR != "") {
        QRCodeContainer.innerHTML = "";

        new QRCode(QRCodeContainer, {
            text: textQR,
            width: sizeQR,
            height: sizeQR,
            colorDark: fillColor,
            colorLight: boxColor,
            correctLevel: QRCode.CorrectLevel.L
        });

        QRCodeSection.style.visibility = "visible";
        
        if(window.screen.width < 768){
            QRCodeSections.scrollIntoView(true);
        }
    } else {
        alert("Masukkan Kalimatnya dulu ya...");
    }
}

function DownloadQRCode() {
    let QRCodeContainer = document.getElementById("QRCode");
    let textQR = document.getElementById("textQR").value;
    let image = QRCodeContainer.children[1].src;
    let downloadButton = document.getElementById("downloadButton");

    let linkDownloadButton = document.getElementById("linkDownloadButton");
    linkDownloadButton.setAttribute("href", image);
    linkDownloadButton.setAttribute("download", `${textQR}` + " QRCode by Adhitya Bagus Wicaksono");
    linkDownloadButton.appendChild(downloadButton);
}