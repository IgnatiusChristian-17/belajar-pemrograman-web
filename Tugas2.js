// Array untuk menyimpan pilihan mata kuliah
let mataKuliah = [];

// Array untuk menyimpan pilihan penilaian
let pilihanPenilaian = [];

// Array untuk menyimpan pilihan semester
let pilihanSemester = [];


// Membuat input mata kuliah sesuai jumlah yang dimasukkan
function buatInputMataKuliah() {

    let jumlah = document.getElementById("jumlah").value;
    let tempatInput = document.getElementById("inputMataKuliah");

    // Mengosongkan input sebelumnya
    tempatInput.innerHTML = "";

    // Mengecek jumlah
    if (jumlah < 1) {
        alert("Jumlah mata kuliah harus minimal 1!");
        return;
    }

    // Loop membuat input sebanyak jumlah
    for (let i = 1; i <= jumlah; i++) {

        tempatInput.innerHTML += `
            <label>Mata Kuliah ${i}:</label><br>
            <input type="text" id="matkul${i}" 
                   placeholder="Masukkan nama mata kuliah">
            <br><br>
        `;
    }
}


// Membuat pilihan checkbox mata kuliah
function buatPilihanMataKuliah() {

    let jumlah = document.getElementById("jumlah").value;
    let tempatPilihan = document.getElementById("pilihanMataKuliah");

    // Mengosongkan array
    mataKuliah = [];

    // Mengambil data dari input
    for (let i = 1; i <= jumlah; i++) {

        let namaMatkul = document.getElementById("matkul" + i).value.trim();

        if (namaMatkul === "") {
            alert("Mata kuliah ke-" + i + " belum diisi!");
            return;
        }

        // Menyimpan ke array
        mataKuliah.push(namaMatkul);
    }

    // Membuat checkbox menggunakan loop
    let hasil = "<h3>Pilih Mata Kuliah yang Ingin Dinilai:</h3>";

    for (let i = 0; i < mataKuliah.length; i++) {

        hasil += `
            <input type="checkbox" name="mataKuliah" 
                   value="${mataKuliah[i]}">
            ${mataKuliah[i]}
            <br>
        `;
    }

    tempatPilihan.innerHTML = hasil;

    // Membuat input untuk pilihan penilaian
    tempatPilihan.innerHTML += `
        <br>
        <label>Masukkan pilihan penilaian:</label><br>
        <input type="text" id="inputPenilaian"
               placeholder="Contoh: Sangat Baik, Baik, Cukup, Kurang">
        <br><br>

        <label>Masukkan pilihan semester:</label><br>
        <input type="text" id="inputSemester"
               placeholder="Contoh: Semester 1, Semester 2, Semester 3">
        <br><br>

        <button type="button" onclick="buatPenilaian()">
            Buat Penilaian dan Semester
        </button>

        <div id="hasilPenilaian"></div>
    `;
}


// Membuat radio button dan dropdown
function buatPenilaian() {

    let inputPenilaian = document.getElementById("inputPenilaian").value;
    let inputSemester = document.getElementById("inputSemester").value;

    // Mengecek input penilaian
    if (inputPenilaian.trim() === "") {
        alert("Pilihan penilaian belum diisi!");
        return;
    }

    // Mengecek input semester
    if (inputSemester.trim() === "") {
        alert("Pilihan semester belum diisi!");
        return;
    }

    // Memasukkan pilihan ke dalam array
    pilihanPenilaian = inputPenilaian.split(",").map(function(item) {
        return item.trim();
    });

    pilihanSemester = inputSemester.split(",").map(function(item) {
        return item.trim();
    });


    let hasil = `
        <h3>Penilaian Mata Kuliah</h3>
    `;

    // Membuat radio button menggunakan loop
    for (let i = 0; i < pilihanPenilaian.length; i++) {

        hasil += `
            <input type="radio" name="penilaian"
                   value="${pilihanPenilaian[i]}">
            ${pilihanPenilaian[i]}
            <br>
        `;
    }


    hasil += `
        <br>
        <label>Pilih Semester:</label><br>
        <select id="semester">
    `;

    // Membuat dropdown menggunakan loop
    for (let i = 0; i < pilihanSemester.length; i++) {

        hasil += `
            <option value="${pilihanSemester[i]}">
                ${pilihanSemester[i]}
            </option>
        `;
    }

    hasil += `
        </select>

        <br><br>

        <button type="button" onclick="tampilkanHasil()">
            Tampilkan Hasil
        </button>

        <div id="output"></div>
    `;

    document.getElementById("hasilPenilaian").innerHTML = hasil;
}


// Menampilkan hasil menggunakan DOM
function tampilkanHasil() {

    let nama = document.getElementById("nama").value.trim();
    let email = document.getElementById("email").value.trim();

    // Mengecek nama
    if (nama === "") {
        alert("Nama mahasiswa harus diisi!");
        document.getElementById("nama").focus();
        return;
    }

    // Mengecek email dengan pattern matching
    let polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!polaEmail.test(email)) {
        alert("Email tidak valid! Silakan masukkan email yang benar.");
        document.getElementById("email").focus();
        return;
    }


    // Mengambil checkbox yang dipilih
    let checkbox = document.querySelectorAll(
        'input[name="mataKuliah"]:checked'
    );

    let matkulDipilih = [];

    for (let i = 0; i < checkbox.length; i++) {
        matkulDipilih.push(checkbox[i].value);
    }


    // Mengecek apakah ada mata kuliah yang dipilih
    if (matkulDipilih.length === 0) {
        alert("Pilih mata kuliah terlebih dahulu!");
        return;
    }


    // Mengambil radio button
    let radio = document.querySelector(
        'input[name="penilaian"]:checked'
    );

    if (radio === null) {
        alert("Pilih penilaian terlebih dahulu!");
        return;
    }


    // Mengambil semester
    let semester = document.getElementById("semester").value;


    // Mengambil tempat output
    let output = document.getElementById("output");


    // Jika output masih kosong, tampilkan judul dan identitas
    if (output.innerHTML === "") {

        output.innerHTML = `
            <h3>Hasil Evaluasi Mata Kuliah</h3>

            <p>
                <b>Nama:</b> ${nama}
            </p>

            <p>
                <b>Email:</b> ${email}
            </p>

            <p>
                <b>Mata Kuliah:</b>
            </p>

            <ul id="daftarHasil"></ul>
        `;
    }


    // Menambahkan setiap mata kuliah ke hasil
    let daftarHasil = document.getElementById("daftarHasil");

    for (let i = 0; i < matkulDipilih.length; i++) {

        daftarHasil.innerHTML += `
            <li>
                ${matkulDipilih[i]}
                <br>
                <b>Penilaian:</b> ${radio.value}
                <br>
                <b>Semester:</b> ${semester}
            </li>
            <br>
        `;
    }


    // Menghapus centang setelah disimpan
    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = false;
    }
}