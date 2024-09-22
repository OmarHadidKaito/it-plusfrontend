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
      geolocation_results: "Geolocation Results:",
      recent_searches: "Recent Searches",
      geolocation_success: "Geolocation retrieved successfully!",
      geolocation_error: "Error retrieving geolocation",
      address_required: "Address is required",
      invalid_email: "Invalid email address",
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
      geolocation_results: "Geolocatie resultaten:",
      recent_searches: "Recente zoekopdrachten",
      geolocation_success: "Geolocatie succesvol opgehaald!",
      geolocation_error: "Fout bij het ophalen van geolocatie",
      address_required: "Adres is verplicht",
      invalid_email: "Ongeldig e-mailadres",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
