const WHATSAPP_NUMBER = "2348146107740";

const messageTemplate = `Hello Gidan Sauki Delivery, I want to request a pickup.\n\nSECTION 1: CUSTOMER DETAILS\n1. Full Name:\n2. Phone Number:\n\nSECTION 2: PICKUP DETAILS\n3. Pickup Address:\n4. Pickup Contact Name:\n5. Pickup Contact Number:\n\nSECTION 3: DELIVERY DETAILS\n6. Delivery Address:\n7. Delivery Contact Name:\n8. Delivery Contact Number:\n9. Delivery Instructions / Landmark:\n\nSECTION 4: PACKAGE DETAILS\n10. What are we picking up?:\n11. Any special note:`;

const encodedMessage = encodeURIComponent(messageTemplate);
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

const whatsappLink = document.getElementById("whatsapp-link");
const heroWhatsappBtn = document.getElementById("hero-whatsapp-btn");
const headerWhatsappBtn = document.getElementById("header-whatsapp-btn");

if (whatsappLink) {
  whatsappLink.href = whatsappUrl;
}

if (heroWhatsappBtn) {
  heroWhatsappBtn.href = whatsappUrl;
}

if (headerWhatsappBtn) {
  headerWhatsappBtn.href = whatsappUrl;
}

const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const fullNameInput = document.getElementById("fullName");
const phoneInput = document.getElementById("phone");
const pickupContactNameInput = document.getElementById("pickupContactName");
const pickupContactNumberInput = document.getElementById("pickupContactNumber");
const fillPickupContactNameBtn = document.getElementById("fillPickupContactNameBtn");
const fillPickupContactNumberBtn = document.getElementById("fillPickupContactNumberBtn");

if (fillPickupContactNameBtn && fullNameInput && pickupContactNameInput) {
  fillPickupContactNameBtn.addEventListener("click", () => {
    pickupContactNameInput.value = fullNameInput.value.trim();
  });
}

if (fillPickupContactNumberBtn && phoneInput && pickupContactNumberInput) {
  fillPickupContactNumberBtn.addEventListener("click", () => {
    pickupContactNumberInput.value = phoneInput.value.trim();
  });
}
