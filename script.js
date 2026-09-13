const WHATSAPP_NUMBER = "2348146107740";

const messageTemplate = `Hello Gidan Sauki Delivery, I want to request a pickup.\n\nSECTION 1: CUSTOMER DETAILS\nFull Name:\nPhone Number:\n\nSECTION 2: PICKUP DETAILS\nPickup Address:\nPickup Contact Name:\nPickup Contact Number:\n\nSECTION 3: DELIVERY DETAILS\nDelivery Address:\nDelivery Contact Name:\nDelivery Contact Number:\nDelivery Instructions / Landmark:\n\nSECTION 4: PACKAGE DETAILS\nWhat are we picking up?:\nPreferred Time (ASAP/Scheduled):\nAny special note:`;

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
const quickFillStatus = document.getElementById("quickFillStatus");

if (fillPickupContactNameBtn && fullNameInput && pickupContactNameInput) {
  fillPickupContactNameBtn.addEventListener("click", () => {
    pickupContactNameInput.value = fullNameInput.value.trim();
    if (quickFillStatus) {
      quickFillStatus.textContent = "Pickup contact name filled from full name.";
    }
  });
}

if (fillPickupContactNumberBtn && phoneInput && pickupContactNumberInput) {
  fillPickupContactNumberBtn.addEventListener("click", () => {
    pickupContactNumberInput.value = phoneInput.value.trim();
    if (quickFillStatus) {
      quickFillStatus.textContent = "Pickup contact number filled from phone number.";
    }
  });
}
