document.addEventListener('DOMContentLoaded', () => {
    fetchData();

    document.getElementById('barangForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addBarang();
    });
});

function fetchData() {
    fetch('http://localhost:3000/api/barang')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#barangTable tbody');
            tableBody.innerHTML = '';
            data.forEach(barang => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${barang.nama_barang}</td>
                    <td>${barang.jumlah}</td>
                    <td>${barang.harga}</td>
                    <td>
                        <button onclick="deleteBarang(${barang.id})">Hapus</button>
                        <button onclick="editBarang(${barang.id})">Edit</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        });
}

function addBarang() {
    const nama_barang = document.getElementById('nama_barang').value;
    const jumlah = document.getElementById('jumlah').value;
    const harga = document.getElementById('harga').value;

    fetch('http://localhost:3000/api/barang', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama_barang, jumlah, harga })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            document.getElementById('barangForm').reset();
            fetchData();
        });
}

function deleteBarang(id) {
    fetch(`http://localhost:3000/api/barang/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchData();
        });
}

function editBarang(id) {
    const nama_barang = prompt('Masukkan nama barang baru:');
    const jumlah = prompt('Masukkan jumlah baru:');
    const harga = prompt('Masukkan harga baru:');

    fetch(`http://localhost:3000/api/barang/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama_barang, jumlah, harga })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchData();
        });
}