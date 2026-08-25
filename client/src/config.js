// Centralized configuration for contact details
export const CONTACT_INFO = {
    phone: '+447561311211',
    phoneDisplay: '+44 7561 311211',
    whatsappNumber: '447561311211', // Without + and spaces
    email: 'contact.samedayinduscourier@gmail.com', // Updated email
    address: {
        line1: '18 High Terrace 128',
        city: 'Birmingham',
        postcode: 'B17 9HL',
        country: 'United Kingdom'
    },
    companyName: 'Same Day Indus Couriers Ltd.'
};

// WhatsApp helper function
export const getWhatsAppLink = (message = 'Hello, I would like to get a quote for courier services') => {
    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

// Call helper function
export const getCallLink = () => {
    return `tel:${CONTACT_INFO.phone}`;
};

// Email helper function
export const getEmailLink = (subject = 'Courier Service Enquiry') => {
    return `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}`;
};