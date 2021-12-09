export default function(guest = {}, action){   
    if(action.type == 'guest'){
        var guestCopy = action.guest;
        console.log('reducer');
        return guestCopy;
    } else {
        return guest;
    }
}