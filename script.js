 
    <script>
    let qrcode = null;

    function generateQRCode() {
        const text = document.getElementById('qrText').value;
        const size = parseInt(document.getElementById('qrSize').value);
        const color = document.getElementById('qrColor').value;

        const qrcodeElement = document.getElementById('qrcode');
        qrcodeElement.innerHTML = '';

        qrcode = new QRCode(qrcodeElement, {
            text: text,
            width: size,
            height: size,
            colorDark: color,
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    document.getElementById('qrSize').addEventListener('input', (e) => {
        document.getElementById('sizeValue').textContent = `${e.target.value}x${e.target.value}`;
    });

    document.getElementById('qrColor').addEventListener('input', (e) => {
        document.getElementById('colorPreview').style.backgroundColor = e.target.value;
    });

    document.getElementById('generateQRBtn').addEventListener('click', generateQRCode);

    document.getElementById('downloadSvgBtn').addEventListener('click', () => {
        const svgElement = document.querySelector('#qrcode svg');
        if (svgElement) {
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
            const svgUrl = URL.createObjectURL(svgBlob);
            const downloadLink = document.createElement('a');
            downloadLink.href = svgUrl;
            downloadLink.download = 'qrcode.svg';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    });

    document.getElementById('downloadPngBtn').addEventListener('click', () => {
        html2canvas(document.getElementById('qrcode')).then(canvas => {
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });

    document.getElementById('printBtn').addEventListener('click', () => {
        window.print();
    });

   
</script>