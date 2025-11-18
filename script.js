/* ------------------------
   SLIDER AUTO CHANGE SYSTEM
------------------------- */

let slideIndex = 0;
autoSlider();

function autoSlider() {
    const slides = document.querySelectorAll(".slide");

    slides.forEach((slide) => {
        slide.style.display = "none";
    });

    slideIndex++;

    if (slideIndex > slides.length) { slideIndex = 1; }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(autoSlider, 4000); // 4 seconds per slide
}



/* ------------------------
   SHOW SELECTED IMAGE PREVIEW
------------------------- */

document.querySelectorAll(".file-input").forEach((input) => {
    input.addEventListener("change", function () {
        if (this.files && this.files[0]) {
            let imgPreview = document.createElement("img");
            imgPreview.src = URL.createObjectURL(this.files[0]);
            imgPreview.style.width = "100%";
            imgPreview.style.marginTop = "10px";
            imgPreview.style.borderRadius = "6px";

            // Remove previous preview if exists
            if (this.nextSibling) {
                this.parentNode.removeChild(this.nextSibling);
            }

            this.parentNode.appendChild(imgPreview);
        }
    });
});
