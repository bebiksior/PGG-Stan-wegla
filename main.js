const BACKEND_URL = 'http://localhost:3000';

const init = () => {
    if(document.querySelector(`meta[name="csrf-token"]`) == undefined) return;

    const payload = [];
    for (let i = 3; i <= 73; i += 2) {
        const PREFIX = `#main > div > div:nth-child(${i})`;

        let anchorElement = document.querySelector(`${PREFIX} > div.col-8.col-md-2.text-4.pt-3.text-center > a`);
        let coalStatusElement = document.querySelector(`${PREFIX} > div.col-4.col-md-2.pt-3.text-center > span.text-4.text-red`)

        let productId = anchorElement.href.split("/")[4];
        let isAvaliable = coalStatusElement.textContent == "Brak towaru" ? false : true;

        payload.push({ productId: productId, isAvaliable: isAvaliable })
    }
    postData(payload);
}

const postData = async payload => {
    fetch(`${BACKEND_URL}/coal/report`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

init();