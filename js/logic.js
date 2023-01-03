let mainWrapper = document.querySelector(".wrapper")
let uploadBox = mainWrapper.querySelector(".upload__box");
let fileInput = uploadBox.querySelector("input");
let previewImage = uploadBox.querySelector("img");
let widthInput = mainWrapper.querySelector(".width input");
let heightInput = mainWrapper.querySelector(".height input");
let ratioInput = mainWrapper.querySelector(".ratio input");
let qualityInput = mainWrapper.querySelector(".quality input");
let downloadBTN = mainWrapper.querySelector(".download__btn")
let ogImageRatio;
fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0]
    if (!file) return;
    previewImage.src = URL.createObjectURL(file);
    previewImage.addEventListener("load", () => {
        widthInput.value = previewImage.naturalWidth;
        heightInput.value = previewImage.naturalHeight;
        ogImageRatio = previewImage.naturalWidth / previewImage.naturalHeight;
        mainWrapper.classList.add("active");
    })
})

widthInput.addEventListener("keyup", () => {
    // getting height according to the ratio checkbox status
    let height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
})

heightInput.addEventListener("keyup", () => {
    // getting width according to the ratio checkbox status
    let width = ratioInput.checked ? heightInput.value / ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
})

let resizeAndDownload = () => {
    let canvas = document.createElement("canvas");
    let anchor = document.createElement("a")
    let ctx = canvas.getContext("2d")
    // setting canvas width & height according to the input values
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;
    //drawing user selected image onto the canvas
    ctx.drawImage(previewImage, 0, 0, canvas.width, canvas.height);
    let imgQuality = qualityInput.checked ? 0.7 : 1.0;
    anchor.href = canvas.toDataURL("image/jpeg", imgQuality)
    anchor.download = new Date().getTime();
    anchor.click();
}

downloadBTN.addEventListener("click", resizeAndDownload)

uploadBox.addEventListener("click", () => { fileInput.click() });