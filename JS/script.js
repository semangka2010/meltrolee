const products = [
    {
        id: 1,
        name: "Melt Roll Matcha",
        desc: "Varian rasa matcha pilihan yang manis dan lembut dengan aroma teh hijau khas.",
        image: "/assets/produk1.jpg",
        priceNumber: 10000,
        priceText: "Rp 10.000"
    },
    {
        id: 2,
        name: "Melt Roll Cokelat",
        desc: "Lelehan cokelat kaya rasa berpadu sempurna dengan kelembutan gulungan roll.",
        image: "/assets/produk2.jpg",
        priceNumber: 10000,
        priceText: "Rp 10.000"
    },
    {
        id: 3,
        name: "Melt Roll Taro",
        desc: "Sensasi rasa taro yang unik, creamy, dan menggugah selera di setiap gigitan.",
        image: "/assets/produk3.jpg",
        priceNumber: 10000,
        priceText: "Rp 10.000"
    }
];

/* =========================================
   RENDER PRODUK
========================================= */

function renderProducts() {
    const productGrid = document.getElementById("productGrid");

    if (!productGrid) return;

    productGrid.innerHTML = products.map(product => `
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="product-card">

                <div class="product-img-wrapper">
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                        onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80';"
                    >

                    <div class="price-badge">
                        ${product.priceText} / pcs
                    </div>
                </div>

                <div class="card-body p-3 d-flex flex-column justify-content-between flex-grow-1">

                    <div>
                        <h5 class="fw-bold mb-1 fs-6">
                            ${product.name}
                        </h5>

                        <p class="text-muted small mb-3"
                           style="font-size:0.82rem;line-height:1.5;">
                            ${product.desc}
                        </p>
                    </div>

                    <div>
                        <div class="quantity-box mb-2">
                            <label
                                for="qty-${product.id}"
                                class="small fw-bold text-success mb-0"
                                style="font-size:0.78rem;"
                            >
                                Jumlah (Pcs):
                            </label>

                            <input
                                type="number"
                                id="qty-${product.id}"
                                class="form-control form-control-sm text-center fw-bold border-0 bg-white rounded-2"
                                style="width:65px;height:30px;padding:0;"
                                value="1"
                                min="1"
                                max="100"
                                step="1"
                                inputmode="numeric"
                            >
                        </div>

                        <button
                            type="button"
                            class="btn btn-success rounded-pill w-100 fw-bold py-2 shadow-sm"
                            style="font-size:0.82rem;"
                            onclick="orderWhatsApp(${product.id})"
                        >
                            <i class="bi bi-whatsapp me-1"></i>
                            Pesan Sekarang
                        </button>
                    </div>

                </div>
            </div>
        </div>
    `).join("");
}

/* =========================================
   PESAN MELALUI WHATSAPP
========================================= */

function orderWhatsApp(productId) {
    const product = products.find(item => item.id === productId);
    const qtyInput = document.getElementById(`qty-${productId}`);

    if (!product || !qtyInput) return;

    const quantity = Number(qtyInput.value);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
        alert("Jumlah pesanan harus antara 1 sampai 100 pcs.");
        qtyInput.focus();
        return;
    }

    const total = product.priceNumber * quantity;
    const formattedTotal = total.toLocaleString("id-ID");

    const phone = "6281262895243";

    const message =
        `Halo Kak, saya ingin memesan:\n\n` +
        `*${product.name}*\n` +
        `Harga satuan: ${product.priceText}\n` +
        `Jumlah: ${quantity} pcs\n` +
        `Total Harga: Rp ${formattedTotal}\n\n` +
        `Mohon informasi ketersediaan dan cara pembayarannya. Terima kasih!`;

    const whatsappUrl =
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

/* =========================================
   FUNGSI AMAN UNTUK MENAMPILKAN TEKS
========================================= */

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (char) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[char];
    });
}

/* =========================================
   FORM ULASAN PELANGGAN
========================================= */

function setupCommentForm() {
    const commentForm = document.getElementById("commentForm");
    const commentsContainer = document.getElementById("commentsContainer");

    if (!commentForm || !commentsContainer) return;

    commentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameInput = document.getElementById("commenterName");
        const textInput = document.getElementById("commentText");

        if (!nameInput || !textInput) return;

        const name = nameInput.value.trim();
        const text = textInput.value.trim();

        if (!name || !text) {
            alert("Nama dan ulasan harus diisi.");
            return;
        }

        if (name.length > 80 || text.length > 1000) {
            alert("Nama maksimal 80 karakter dan ulasan maksimal 1000 karakter.");
            return;
        }

        const newComment = document.createElement("div");
        newComment.className = "card p-3 mb-3 custom-box";

        newComment.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="fw-bold mb-0 text-dark small">
                    ${escapeHtml(name)}
                </h6>
                <span class="text-warning small">★★★★★</span>
            </div>

            <p class="text-muted small mb-0"></p>
        `;

        // Masukkan teks sebagai teks biasa agar HTML tidak dieksekusi.
        newComment.querySelector("p").textContent = `"${text}"`;

        commentsContainer.prepend(newComment);
        commentForm.reset();

        alert("Terima kasih! Ulasan berhasil ditambahkan.");
    });
}

/* =========================================
   JALANKAN SETELAH HTML SIAP
========================================= */

function initMeltRoll() {
    renderProducts();
    setupCommentForm();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMeltRoll);
} else {
    initMeltRoll();
}