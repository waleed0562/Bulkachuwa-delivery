const WHATSAPP_NUMBER = "2348146107740";
const deliveryForm = document.getElementById("delivery-form");

const getFieldValue = (name) => {
  if (!deliveryForm || !deliveryForm.elements[name]) {
    return "";
  }
  return deliveryForm.elements[name].value.trim();
};

const formatScheduledTime = (value) => {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value.replace("T", " ");
  return parsed.toLocaleString("en-NG", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const buildMessageTemplate = () => {
  const timing = getFieldValue("preferredTime");
  const scheduled =
    timing === "Scheduled" ? formatScheduledTime(getFieldValue("scheduledTime")) : "";

  return `Hello Bulkachuwa Delivery, I'd like to request a pickup.\n\nCUSTOMER\nFull name: ${getFieldValue("fullName")}\nPhone: ${getFieldValue("phone")}\n\nPICKUP\nPickup address: ${getFieldValue("pickupAddress")}\nPickup contact: ${getFieldValue("pickupContactName")}\nPickup phone: ${getFieldValue("pickupAddressPhone")}\n\nDROPOFF\nDropoff address: ${getFieldValue("deliveryAddress")}\nDropoff contact: ${getFieldValue("deliveryContactName")}\nDropoff phone: ${getFieldValue("deliveryContactNumber")}\nLandmark / directions: ${getFieldValue("deliveryInstructions")}\n\nPACKAGE\nItem type: ${getFieldValue("itemType")}\nTiming: ${timing}${scheduled ? `\nScheduled for: ${scheduled}` : ""}\nExtra note: ${getFieldValue("notes")}`;
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
const preferredTimeSelect = document.getElementById("preferredTime");
const scheduledTimeInput = document.getElementById("scheduledTime");
const scheduledTimeWrap = document.getElementById("scheduledTimeWrap");
const formStatus = document.getElementById("form-status");
const submitBtn = document.getElementById("submitBtn");

const setStatus = (message, kind) => {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.classList.remove("is-success", "is-error");
  if (kind) {
    formStatus.classList.add(kind === "success" ? "is-success" : "is-error");
  }
};

const syncLegacyPickupPhone = () => {
  if (pickupContactNumberMirrorInput && pickupContactNumberInput) {
    pickupContactNumberMirrorInput.value = pickupContactNumberInput.value.trim();
  }
};

const applyPickupNameFromCustomer = () => {
  if (!fillPickupContactNameBtn?.checked || !fullNameInput || !pickupContactNameInput) {
    return;
  }
  pickupContactNameInput.value = fullNameInput.value.trim();
  updateWhatsappLinks();
};

const applyPickupPhoneFromCustomer = () => {
  if (!fillPickupContactNumberBtn?.checked || !phoneInput || !pickupContactNumberInput) {
    return;
  }
  pickupContactNumberInput.value = phoneInput.value.trim();
  syncLegacyPickupPhone();
  updateWhatsappLinks();
};

syncLegacyPickupPhone();

if (fillPickupContactNameBtn && fullNameInput && pickupContactNameInput) {
  fillPickupContactNameBtn.addEventListener("change", () => {
    if (fillPickupContactNameBtn.checked) {
      applyPickupNameFromCustomer();
      if (quickFillStatus) {
        quickFillStatus.textContent = "Pickup contact filled from your name.";
      }
    } else if (quickFillStatus) {
      quickFillStatus.textContent = "Pickup contact name is now editable.";
    }
  });

  fullNameInput.addEventListener("input", applyPickupNameFromCustomer);

  pickupContactNameInput.addEventListener("input", () => {
    if (
      fillPickupContactNameBtn.checked &&
      pickupContactNameInput.value.trim() !== fullNameInput.value.trim()
    ) {
      fillPickupContactNameBtn.checked = false;
    }
  });
}

if (fillPickupContactNumberBtn && phoneInput && pickupContactNumberInput) {
  fillPickupContactNumberBtn.addEventListener("change", () => {
    if (fillPickupContactNumberBtn.checked) {
      applyPickupPhoneFromCustomer();
      if (quickFillStatus) {
        quickFillStatus.textContent = "Pickup phone filled from your phone.";
      }
    } else if (quickFillStatus) {
      quickFillStatus.textContent = "Pickup phone is now editable.";
    }
  });

  phoneInput.addEventListener("input", applyPickupPhoneFromCustomer);

  pickupContactNumberInput.addEventListener("input", () => {
    if (
      fillPickupContactNumberBtn.checked &&
      pickupContactNumberInput.value.trim() !== phoneInput.value.trim()
    ) {
      fillPickupContactNumberBtn.checked = false;
    }
    syncLegacyPickupPhone();
  });

  pickupContactNumberInput.addEventListener("change", syncLegacyPickupPhone);
}

const pad = (n) => String(n).padStart(2, "0");

const toDateTimeLocal = (date) => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const updateScheduledField = () => {
  if (!preferredTimeSelect || !scheduledTimeWrap || !scheduledTimeInput) {
    return;
  }

  const isScheduled = preferredTimeSelect.value === "Scheduled";
  scheduledTimeWrap.hidden = !isScheduled;
  scheduledTimeInput.required = isScheduled;

  if (isScheduled) {
    const minValue = toDateTimeLocal(new Date());
    scheduledTimeInput.min = minValue;
    if (!scheduledTimeInput.value) {
      const defaultTime = new Date(Date.now() + 60 * 60 * 1000);
      scheduledTimeInput.value = toDateTimeLocal(defaultTime);
    }
  } else {
    scheduledTimeInput.required = false;
    scheduledTimeInput.value = "";
  }

  updateWhatsappLinks();
};

if (preferredTimeSelect) {
  preferredTimeSelect.addEventListener("change", updateScheduledField);
  updateScheduledField();
}

if (deliveryForm) {
  deliveryForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!deliveryForm.reportValidity()) {
      return;
    }

    syncLegacyPickupPhone();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }
    setStatus("Sending your request...", "");

    try {
      const response = await fetch(deliveryForm.action, {
        method: "POST",
        body: new FormData(deliveryForm),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("Request sent. We will confirm shortly on WhatsApp or phone.", "success");
        deliveryForm.reset();
        updateScheduledField();
        syncLegacyPickupPhone();
        updateWhatsappLinks();
      } else {
        setStatus("Could not send the form. Use WhatsApp below and we will take it from there.", "error");
      }
    } catch (error) {
      setStatus("Could not send the form. Use WhatsApp below and we will take it from there.", "error");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Request";
      }
    }
  });
}
