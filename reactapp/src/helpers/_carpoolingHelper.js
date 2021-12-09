
export function canSaveFunction(seat, departure, phoneNumber) {
    var seatError;
    var canSaveSeat = true;
    if (seat == "") {
        seatError = 'Réponse exigée';
        canSaveSeat = false;
    } else if (seat <= 0 || seat > 20) {
        seatError = 'Tu dois choisir un nombre entre 1 et 20';
        canSaveSeat = false;
    } else {
        seatError = '';
    }

    var departureError;
    var canSaveDeparture = true;
    if (departure == '') {
        departureError = 'Réponse exigée';
        canSaveDeparture = false;
    } else if (/^\d+$/.test(departure) != false) {
        departureError = "Tu dois renseigner une ville ou une adresse";
        canSaveDeparture = false;
    } else {
        departureError = ''; 
    }

    var phoneNumberError;
    var canSavePhone = true;
    if (phoneNumber == '') {
        phoneNumberError = 'Réponse exigée';
        canSavePhone = false;
    } else if (/^\d+$/.test(phoneNumber) == false) {
        phoneNumberError = 'Ton numéro doit contenir des chiffres uniquement';
        canSavePhone = false;
    } else {
        phoneNumberError = '';
    }

    var canSave = true;
    if (canSaveSeat == false || canSaveDeparture == false || canSavePhone == false) {
        canSave = false;
    }

    return {canSave: canSave, seatError: seatError, departureError: departureError, phoneNumberError: phoneNumberError}
    
}

export function saveType(seat, type) {
    var offerSeats = null;
    var searchSeats = null;
    if (type == 'offer') {
        offerSeats = seat
    } else {
        searchSeats = seat;
    }

    return {offerSeats: offerSeats, searchSeats: searchSeats}
}
