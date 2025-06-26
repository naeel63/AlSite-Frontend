function renderCart(data) {
	const cartTbody = document.getElementById('cart');
    cartTbody.innerHTML = '';
	let resCart = [];
    data.forEach((item, index) => {
        const itemRow = document.createElement('tr');
        itemRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td><button onclick="addToCart(${item.id})">Удалить из корзины</button></td>
        `;
        cartTbody.appendChild(itemRow);
    });
}