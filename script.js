function dropHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    var file = ev.dataTransfer.files[0] // only process the first file dropped in case multiple are dropped
    allowedFileTypes = ["image/png", "image/jpeg", "image/bmp"];
    if (allowedFileTypes.indexOf(file.type) > -1){
        openCropper();
        cropperStart(file);
    }
    else{
        alert("Please upload an image file in the png or jpeg or bmp format")
    }
}
function cropperStart(file) {
    var fileURL = URL.createObjectURL(file)
    var cropfile = document.getElementsByClassName("cropfile")[0]
    cropfile.src = fileURL
    cropper = new Cropper(cropfile, { //global
        aspectRatio: 21/27,
        viewMode: 1,
        dragMode: "move",
    });
}
function getResult() {
    result = cropper.getCroppedCanvas({
        width: 42,
        height: 58
    });
    cropper.destroy();
}
function showResult() {
    closeCropper();
    ctx.drawImage(result, 220, 60, 420, 580)
}
function openCropper() {
    document.getElementsByClassName("cropperBackground")[0].style.display = "block";
}
function closeCropper() {
    document.getElementsByClassName("cropperBackground")[0].style.display = "none";
}
function download() {
    var x = document.createElement("CANVAS");
    x.width = 64
    x.height = 64
    xtx = x.getContext("2d");
    xtx.imageSmoothingEnabled = false;
    xtx.drawImage(c, 0, 0, 64, 64);
    dllink = x.toDataURL();
    var link = document.createElement("a");
    link.download = "canvasshield";
    link.href = dllink;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}
window.onload = function() {
    c = document.getElementById("shield");
    ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false //disable smoothing to potray how the image looks in image editing software
    var img = new Image();
    img.addEventListener('load', function() {
        ctx.drawImage(img, 0, 0, 640, 640);
      }, false);    //wait until the image has loaded to draw the image
    img.src = "assets/canvas.png";
}