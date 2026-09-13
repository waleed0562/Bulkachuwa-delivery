const WHATSAPP_NUMBER = "2348146107740";
const deliveryForm = document.getElementById("delivery-form");

const getFieldValue = (name) => {
  if (!deliveryForm || !deliveryForm.elements[name]) {
    return "";
  }
  return deliveryForm.elements[name].value.trim();
};

const buildMessageTemplate = () => {
  return `Hello Gidan Sauki Delivery, I want to request a pickup.\n\nSECTION 1: CUSTOMER DETAILS\nFull Name: ${getFieldValue("fullName")}\nPhone Number: ${getFieldValue("phone")}\n\nSECTION 2: PICKUP DETAILS\nPickup Address: ${getFieldValue("pickupAddress")}\nPickup Contact Name: ${getFieldValue("pickupContactName")}\nPickup Contact Number: ${getFieldValue("pickupContactNumber")}\n\nSECTION 3: DELIVERY DETAILS\nDelivery Address: ${getFieldValue("deliveryAddress")}\nDelivery Contact Name: ${getFieldValue("deliveryContactName")}\nDelivery Contact Number: ${getFieldValue("deliveryContactNumber")}\nDelivery Instructions / Landmark: ${getFieldValue("deliveryInstructions")}\n\nSECTION 4: PACKAGE DETAILS\nWhat are we picking up?: ${getFieldValue("itemType")}\nPreferred Time (ASAP/Scheduled): ${getFieldValue("preferredTime")}\nAny special note: ${getFieldValue("notes")}`;
};

const whatsappLink = document.getElementById("whatsapp-link");
const heroWhatsappBtn = document.getElementById("hero-whatsapp-btn");
const headerWhatsappBtn = document.getElementById("header-whatsapp-btn");

if (whatsappLink) {
  whatsappLink.href = "#";
}

if (heroWhatsappBtn) {
  heroWhatsappBtn.href = "#";
}

if (headerWhatsappBtn) {
  headerWhatsappBtn.href = "#";
}

const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const updateWhatsappLinks = () => {
  const encodedMessage = encodeURIComponent(buildMessageTemplate());
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  if (whatsappLink) {
    whatsappLink.href = whatsappUrl;
  }
  if (heroWhatsappBtn) {
    heroWhatsappBtn.href = whatsappUrl;
  }
  if (headerWhatsappBtn) {
    headerWhatsappBtn.href = whatsappUrl;
  }
};

updateWhatsappLinks();

if (deliveryForm) {
  deliveryForm.addEventListener("input", updateWhatsappLinks);
  deliveryForm.addEventListener("change", updateWhatsappLinks);
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
    updateWhatsappLinks();
  });
}

if (fillPickupContactNumberBtn && phoneInput && pickupContactNumberInput) {
  fillPickupContactNumberBtn.addEventListener("click", () => {
    pickupContactNumberInput.value = phoneInput.value.trim();
    if (quickFillStatus) {
      quickFillStatus.textContent = "Pickup contact number filled from phone number.";
    }
    updateWhatsappLinks();
  });
}
