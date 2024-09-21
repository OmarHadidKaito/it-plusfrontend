import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      address: "Address",
      email: "Email Address (Optional)",
      submit: "Submit",
      geolocation: "Geolocation",
      geolocation_form: "Enter Address to Get Geolocation",
      noResults: "No Results Found",
      error: "Error:",
    },
  },
  nl: {
    translation: {
      address: "Adres",
      email: "E-mailadres (Optioneel)",
      submit: "Indienen",
      geolocation: "Geolocatie",
      geolocation_form: "Vul adres in om geolocatie te krijgen",
      noResults: "Geen resultaten gevonden",
      error: "Fout:",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
