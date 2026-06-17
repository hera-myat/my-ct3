// Define cart as an array of objects with product names and prices
const cart = [];

// Define the product details for each item
const products = [
    { name: 'HI-542D53484952540A', price: 29.99 },
    { name: 'HI-424F4F4B0A0A', price: 12.99 },
    { name: 'HI-4241470A0A', price: 39.99 },
    { name: 'HI-4245414E49450A0A', price: 25.99 }
];

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        cart.push(products[index]);
        alert(`${products[index].name} has been added to your cart!`);
    });
});

document.getElementById('view-cart').addEventListener('click', () => {
    if (cart.length > 0) {
        const cartItemsList = document.getElementById('cart-items-list');
        const totalCostElement = document.getElementById('total-cost');
        
        cartItemsList.innerHTML = ''; 
        let totalCost = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsList.appendChild(li);
            totalCost += item.price;
        });

        // Update total cost display
        totalCostElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;

        // Display the cart popup
        document.getElementById('cart-popup').style.display = 'flex';
    } else {
        alert('Your cart is empty.');
    }
});

// Handle closing the cart popup
document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('cart-popup').style.display = 'none';
});

// Handle clearing the cart
document.getElementById('clear-cart').addEventListener('click', () => {
    if (cart.length > 0) {
        cart.length = 0; // Clear the cart array
        alert('Your cart has been cleared.');
        
        // Update the cart display
        document.getElementById('cart-items-list').innerHTML = '';
        document.getElementById('total-cost').textContent = 'Total Cost: $0.00';
    } else {
        alert('Your cart is already empty.');
    }
});

// Handle closing the cart popup with the DONE button
document.getElementById('done-btn').addEventListener('click', () => {
    document.getElementById('cart-popup').style.display = 'none';
});

// Handle subscription email pop-up
document.getElementById('close-email-popup').addEventListener('click', () => {
    document.getElementById('email-popup').style.display = 'none';
});

document.getElementById('subscribe-btn').addEventListener('click', () => {
    const emailInput = document.getElementById('email-input').value.trim();

    // Updated email validation logic
    const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(com|edu)$/;

    if (emailPattern.test(emailInput)) {
        alert(`Thanks for subscribing with ${emailInput}!`);
        document.getElementById('email-popup').style.display = 'none';
    } else {
        alert('Hmm... that\'s not a valid email address.');
    }
});

// Show the email subscription pop-up when the page loads
window.onload = () => {
    document.getElementById('email-popup').style.display = 'flex';
};
