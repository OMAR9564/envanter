const inventoryData = [
    { id: 1, name: "Ofis Masası", image: "img/ofis-masa.jpg", quantity: 4 },
    { id: 2, name: "Monitör", image: "img/monitor.jpg", quantity: 5 },
    { id: 3, name: "Ofis Sandalye", image: "img/ofis-sandalye.jpg", quantity: 4 },
    { id: 4, name: "Yapay Cennet Kuş Ağacı", image: "img/cennet-agaci.jpg", quantity: 1 },
    { id: 5, name: "Askılık", image: "img/askilik.jpg", quantity: 1 },
];

let currentItem;

document.addEventListener("DOMContentLoaded", () => {
    const inventoryList = document.getElementById("inventory-list");
    inventoryData.forEach(item => {
        const listItem = document.createElement("div");
        listItem.className = "list-group-item";

        listItem.innerHTML = `
            <div class="row">
                <div class="col-md-3">
                    <img src="${item.image}" class="img-thumbnail" alt="${item.name}" onclick="enlargeImage('${item.image}')">
                </div>
                <div class="col-md-9">
                    <h5>${item.name}</h5>
                    <button class="btn btn-success" onclick="showDetails(${item.id}, true)">Var</button>
                    <button class="btn btn-danger" onclick="showDetails(${item.id}, false)">Yok</button>
                </div>
            </div>
        `;
        inventoryList.appendChild(listItem);
    });
});

function showDetails(id, available) {
    currentItem = inventoryData.find(i => i.id === id);
    if (available) {
        document.getElementById("quantityInput").value = currentItem.quantity;
        $('#quantityModal').modal('show');
    } else {
        $('#confirmationModal').modal('show');

    }
}

function updateQuantity() {
    const newQuantity = document.getElementById("quantityInput").value;
    if (newQuantity !== null) {
        currentItem.quantity = parseInt(newQuantity);
        alert("Yeni miktar: " + currentItem.quantity);
    }
    $('#quantityModal').modal('hide');
}
function confirmReset() {
    currentItem.quantity = 0;
    alert("Mevcut miktar sıfırlandı.");
    $('#confirmationModal').modal('hide');
}


function enlargeImage(imageSrc) {
    const modalImage = document.getElementById("modalImage");
    modalImage.src = imageSrc;
    $('#imageModal').modal('show');
}



let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prompt olayını iptal et
    e.preventDefault();
    deferredPrompt = e;
    // Bir düğme veya başka bir UI elemanı ekleyerek kullanıcıya yükleme bildirimi gösterin
    const installButton = document.createElement('button');
    installButton.innerText = 'Uygulamayı Yükle';
    installButton.classList.add('btn', 'btn-primary', 'mt-3');
    document.body.appendChild(installButton);

    installButton.addEventListener('click', () => {
        // Kullanıcıya yükleme bildirimi göster
        deferredPrompt.prompt();
        // Kullanıcı bildirimi yanıtladıktan sonra sonucu kontrol et
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Kullanıcı uygulamayı yüklemeyi kabul etti');
            } else {
                console.log('Kullanıcı uygulamayı yüklemeyi reddetti');
            }
            deferredPrompt = null;
        });
    });
});
