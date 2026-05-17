const scriptURL = 'https://script.google.com/macros/s/AKfycby8R9vzgruk3pVPrBbcn7IS7-rklZdNo6VUGP6pExhJr1W46CkIMDd4O7IQ6LhznzN0hA/exec'
const form = document.forms['ucapan-adi']
var btnKirim = $("#btn_message");

form.addEventListener('submit', e => {
    e.preventDefault()
    btnKirim.html('Mengirim Pesan...');
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        btnKirim.html('<small>Terima kasih atas doa dan ucapannya</small>');
        setTimeout(function(){
            loadMessageList();
            btnKirim.html('Kirim');
            form.reset();
        }, 3000);
    })
    .catch(error => console.error('Error!', error.message))
})

function toggleMessageGuestVisibility() {
    const messageList = document.getElementById('message_list');
    const messageGuest = document.querySelector('.message_guest');
    if (messageList && messageGuest) {
        if (messageList.children.length === 0) {
            messageGuest.style.display = 'none';
        } else {
            messageGuest.style.display = 'block';
        }
    }
}

// Check on page load
document.addEventListener('DOMContentLoaded', toggleMessageGuestVisibility);

// Also check periodically in case messages are loaded dynamically
setInterval(toggleMessageGuestVisibility, 1000);

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function titleCase(text) {
    return text
        .toLowerCase()
        .split(' ')
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

var element = document.getElementsByClassName('nama-link');
var namaValue = getParameterByName('nama');
var displayName = namaValue ? titleCase(namaValue.replace(/\+/g, ' ')) : 'Sahabat';
for (var element of element) {
    element.innerText = displayName
}

// Copy bank account number function
function copyAccountNumber() {
    const accountNumber = document.getElementById('account_number').innerText.trim();
    navigator.clipboard.writeText(accountNumber)
        .then(() => {
            showCopyAlert('success', 'Nomor Rekening Berhasil Disalin');
        })
        .catch(err => {
            console.error('Failed to copy:', err);
            showCopyAlert('error', 'Nomor Rekening Gagal Disalin');
        });
}

function showCopyAlert(type, message) {
    const alertEl = document.getElementById('copy_alert');
    const alertMessage = document.getElementById('copy_alert_message');
    if (!alertEl || !alertMessage) return;
    alertMessage.textContent = message;
    alertEl.classList.remove('success', 'error');
    alertEl.classList.add(type, 'show');
    if (window.copyAlertTimeout) {
        clearTimeout(window.copyAlertTimeout);
    }
    window.copyAlertTimeout = setTimeout(hideCopyAlert, 3000);
}

function hideCopyAlert() {
    const alertEl = document.getElementById('copy_alert');
    if (!alertEl) return;
    alertEl.classList.remove('show');
}
