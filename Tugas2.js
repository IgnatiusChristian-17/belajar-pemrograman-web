// Array untuk menyimpan pilihan checkbox
let pilihanCheckbox = [
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "PHP",
    "SQL",
    "Git",
    "React"
];

// Array untuk menyimpan pilihan radio button
let pilihanRadio = [
    "Pemula",
    "Menengah",
    "Mahir"
];

// Array untuk pilihan dropdown
let pilihanStudi = [
    "Teknik Informatika",
    "Sistem Informasi",
    "Teknik Komputer",
    "Teknologi Informasi"
];


// Fungsi untuk membuat checkbox, radio button, dan dropdown
function buatPilihan() {

    // Mengambil jumlah pilihan dari input number
    let jumlah = Number(document.getElementById("jumlah").value);

    // Error handling untuk jumlah pilihan
    if (isNaN(jumlah) || jumlah < 1 || jumlah > 10) {
        alert("Jumlah pilihan harus antara 1 sampai 10!");
        return;
    }

    // Mengambil tempat untuk menampilkan pilihan
    let pilihan = document.getElementById("pilihan");

    // Mengosongkan pilihan sebelumnya
    pilihan.innerHTML = "";

    // Membuat judul checkbox
    let judulCheckbox = document.createElement("h3");
    judulCheckbox.textContent = "Pilih Teknologi yang Dikuasai:";
    pilihan.appendChild(judulCheckbox);

    // Loop untuk membuat checkbox
    for (let i = 0; i < jumlah; i++) {

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "teknologi";
        checkbox.value = pilihanCheckbox[i];
        checkbox.id = "check" + i;

        let label = document.createElement("label");
        label.htmlFor = "check" + i;
        label.textContent = pilihanCheckbox[i];

        pilihan.appendChild(checkbox);
        pilihan.appendChild(label);
        pilihan.appendChild(document.createElement("br"));
    }


    // Membuat judul radio button
    let judulRadio = document.createElement("h3");
    judulRadio.textContent = "Tingkat Kemampuan:";
    pilihan.appendChild(judulRadio);

    // Loop untuk membuat radio button
    for (let i = 0; i < pilihanRadio.length; i++) {

        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "tingkat";
        radio.value = pilihanRadio[i];
        radio.id = "radio" + i;

        let label = document.createElement("label");
        label.htmlFor = "radio" + i;
        label.textContent = pilihanRadio[i];

        pilihan.appendChild(radio);
        pilihan.appendChild(label);
        pilihan.appendChild(document.createElement("br"));
    }


    // Membuat judul dropdown
    let judulDropdown = document.createElement("h3");
    judulDropdown.textContent = "Pilih Program Studi:";
    pilihan.appendChild(judulDropdown);

    // Membuat dropdown
    let dropdown = document.createElement("select");
    dropdown.id = "studi";

    // Loop untuk membuat pilihan dropdown
    for (let i = 0; i < pilihanStudi.length; i++) {

        let option = document.createElement("option");
        option.value = pilihanStudi[i];
        option.textContent = pilihanStudi[i];

        dropdown.appendChild(option);
    }

    pilihan.appendChild(dropdown);
}


// Fungsi untuk menampilkan hasil
function tampilkanHasil() {

    // Mengambil data nama
    let nama = document.getElementById("nama").value;

    // Mengambil data email
    let email = document.getElementById("email").value;

    // Pattern untuk mengecek email
    let polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Mengecek email
    if (!polaEmail.test(email)) {
        alert("Email tidak valid! Silakan masukkan email yang benar.");
        document.getElementById("email").focus();
        return;
    }

    // Mengecek nama
    if (nama.trim() === "") {
        alert("Nama harus diisi!");
        document.getElementById("nama").focus();
        return;
    }

    // Array untuk menyimpan checkbox yang dipilih
    let teknologiDipilih = [];

    let checkboxTerpilih =
        document.querySelectorAll('input[name="teknologi"]:checked');

    // Memasukkan checkbox yang dipilih ke array
    for (let i = 0; i < checkboxTerpilih.length; i++) {
        teknologiDipilih.push(checkboxTerpilih[i].value);
    }

    // Mengambil radio button yang dipilih
    let radioTerpilih =
        document.querySelector('input[name="tingkat"]:checked');

    let tingkat = "";

    if (radioTerpilih != null) {
        tingkat = radioTerpilih.value;
    } else {
        tingkat = "Belum dipilih";
    }

    // Mengambil pilihan dropdown
    let studi = document.getElementById("studi").value;

    // Mengambil tempat output
    let output = document.getElementById("output");

    // Menampilkan hasil menggunakan DOM
    output.innerHTML =
        "<h3>Hasil Input</h3>" +
        "<p><b>Nama:</b> " + nama + "</p>" +
        "<p><b>Email:</b> " + email + "</p>" +
        "<p><b>Teknologi:</b> " +
        (teknologiDipilih.length > 0
            ? teknologiDipilih.join(", ")
            : "Belum dipilih") +
        "</p>" +
        "<p><b>Tingkat Kemampuan:</b> " + tingkat + "</p>" +
        "<p><b>Program Studi:</b> " + studi + "</p>";
}