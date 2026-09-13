const WHATSAPP_NUMBER = "2348146107740";
const deliveryForm = document.getElementById("delivery-form");

const getFieldValue = (name) => {
  if (!deliveryForm || !deliveryForm.elements[name]) {
    return "";
  }
  return deliveryForm.elements[name].value.trim();
};

const buildMessageTemplate = () => {
  return `Hello Gidan Sauki Delivery, I'd like to request a pickup.\n\nCUSTOMER\nFull name: ${getFieldValue("fullName")}\nPhone: ${getFieldValue("phone")}\n\nPICKUP\nPickup address: ${getFieldValue("pickupAddress")}\nPickup contact: ${getFieldValue("pickupContactName")}\nPickup phone: ${getFieldValue("pickupAddressPhone")}\n\nDROPOFF\nDropoff address: ${getFieldValue("deliveryAddress")}\nDropoff contact: ${getFieldValue("deliveryContactName")}\nDropoff phone: ${getFieldValue("deliveryContactNumber")}\nLandmark / directions: ${getFieldValue("deliveryInstructions")}\n\nPACKAGE\nItem type: ${getFieldValue("itemType")}\nTiming: ${getFieldValue("preferredTime")}\nExtra note: ${getFieldValue("notes")}`;
};

const whatsappLink = document.getElementById("whatsapp-link");
const heroWhatsappBtn = document.getElementById("hero-whatsapp-btn");
const headerWhatsappBtn = document.getElementById("header-whatsapp-btn");

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
const pickupContactNumberInput = document.getElementById("pickupAddressPhone");
const fillPickupContactNameBtn = document.getElementById("fillPickupContactNameBtn");
const fillPickupContactNumberBtn = document.getElementById("fillPickupContactNumberBtn");
const quickFillStatus = document.getElementById("quickFillStatus");
const pickupContactNumberMirrorInput = document.getElementById("pickupContactNumberMirror");

const syncLegacyPickupPhone = () => {
  if (pickupContactNumberMirrorInput && pickupContactNumberInput) {
    pickupContactNumberMirrorInput.value = pickupContactNumberInput.value.trim();
  }
};

syncLegacyPickupPhone();

if (fillPickupContactNameBtn && fullNameInput && pickupContactNameInput) {
  fillPickupContactNameBtn.addEventListener("click", () => {
    pickupContactNameInput.value = fullNameInput.value.trim();
    if (quickFillStatus) {
      quickFillStatus.textContent = "Pickup contact filled from your name.";
    }
    updateWhatsappLinks();
  });
}

if (fillPickupContactNumberBtn && phoneInput && pickupContactNumberInput) {
  fillPickupContactNumberBtn.addEventListener("click", () => {
    pickupContactNumberInput.value = phoneInput.value.trim();
    if (quickFillStatus) {
      quickFillStatus.textContent = "Pickup phone filled from your phone.";
    }
    syncLegacyPickupPhone();
    updateWhatsappLinks();
  });
}

if (pickupContactNumberInput) {
  pickupContactNumberInput.addEventListener("input", syncLegacyPickupPhone);
  pickupContactNumberInput.addEventListener("change", syncLegacyPickupPhone);
}
