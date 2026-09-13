const WHATSAPP_NUMBER = "2348146107740";

const messageTemplate = `Hello Gidan Sauki Delivery, I want to request a pickup.\n\nName:\nPhone Number:\nPickup Address:\nPickup Address Phone Number:\nDelivery Address:\nItem Type:\nPreferred Time (ASAP/Scheduled):\nAdditional Notes:`;

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
