document.addEventListener("DOMContentLoaded", () => {
    
    const searchInput = document.getElementById("search-input");
    const priceFilter = document.getElementById("price-filter");
    const toursList = document.querySelector(".tours-list");

    if (searchInput && priceFilter && toursList) {
        const tourCards = toursList.querySelectorAll(".tour");
        const noResultsMsg = document.getElementById("no-results");

        function filterTours() {
            const searchText = searchInput.value.toLowerCase().trim();
            const maxPrice = priceFilter.value !== "" ? Number(priceFilter.value) : null;

            let visibleCount = 0;

            tourCards.forEach(card => {
                const title = card.getAttribute("data-title").toLowerCase();
                const price = Number(card.getAttribute("data-price"));

                const matchesSearch = title.includes(searchText);
                const matchesPrice = (maxPrice === null || price <= maxPrice);

                if (matchesSearch && matchesPrice) {
                    card.classList.remove("hidden");
                    visibleCount++;
                } else {
                    card.classList.add("hidden");
                }
            });

            if (noResultsMsg) {
                if (visibleCount === 0) {
                    noResultsMsg.classList.remove("hidden");
                } else {
                    noResultsMsg.classList.add("hidden");
                }
            }
        }
        searchInput.addEventListener("input", filterTours);
        priceFilter.addEventListener("input", filterTours);
    }

    const addTourForm = document.getElementById("add-tour-form");
    const formError = document.getElementById("form-error");

    if (addTourForm && formError) {
        addTourForm.addEventListener("submit", (event) => {
            const titleInput = document.getElementById("title");
            const priceInput = document.getElementById("price");

            const title = titleInput.value.trim();
            const price = Number(priceInput.value);

            let errorMessage = "";

            if (title === "") {
                errorMessage = "Назва туру не може бути порожньою.";
            } else if (isNaN(price) || price <= 0) {
                errorMessage = "Ціна має бути додатним числом.";
            }

            if (errorMessage !== "") {
                event.preventDefault();
                formError.textContent = errorMessage;
            } else {
                formError.textContent = "";
            }
        });
    }


    const galleryImages = document.querySelectorAll(".gallery-img");
    let lightbox = document.getElementById("lightbox");

    document.body.appendChild(lightbox);
    if (lightbox) {
        const lightboxImg = document.getElementById("lightbox-img");
        const closeBtn = lightbox.querySelector(".lightbox-close");

        galleryImages.forEach(img => {
            img.addEventListener("click", () => {
                lightboxImg.src = img.src;
                lightbox.style.display = "flex";
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = "none";
            lightboxImg.src = "";
        };

        if (closeBtn) {
            closeBtn.addEventListener("click", closeLightbox);
        }

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && lightbox.style.display === "flex") {
                closeLightbox();
            }
        });
    }

});