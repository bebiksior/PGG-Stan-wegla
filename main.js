const BACKEND_URL = "https://www.wegiel-dostepnosc.ovh/api";

const genExtToken = () => {
    const date = new Date();
    const numbers = Math.floor(date.getMinutes() + date.getHours() + 100 / date.getMonth());
    const token = numbers + String.fromCharCode(numbers + 1) + ":" + (date.getMinutes() + date.getHours());
    return token;
}

const token = genExtToken();

const initExtension = () => {
    if (document.querySelector(`meta[name="csrf-token"]`) == undefined) return;

    const payload = [];
    const rows = document.querySelectorAll(".row.mt-4");
    for (const row of rows) {
        let anchorElement = row.querySelector(`div.col-8.col-md-2.text-4.pt-3.text-center > a`);
        let coalStatusElement = row.querySelector(`div.col-4.col-md-2.pt-3.text-center > span:nth-child(3)`)

        let productId = anchorElement.href.split("/")[4];

        if (coalStatusElement == null) continue;
        let isAvailable = coalStatusElement.textContent == "Brak towaru" ? false : true;

        payload.push({ productId: productId, isAvailable: isAvailable })
    }
    postData(payload);
}

const postData = async payload => {
    fetch(`${BACKEND_URL}/coal/report`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ext_token: token, coalList: payload})
    });
}


initExtension();