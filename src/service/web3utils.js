
/**
 * Checks if the given string is strictly an address
 *
 * @method isStrictAddress
 * @param {String} address the given HEX address
 * @return {Boolean}
*/

class Web3utils {
 isStrictAddress(address) {
    let rags = /^0x[0-9a-f]{40}$/;
    return rags.test(address);
};

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX address
 * @return {Boolean}
*/
isAddress(address) {
    let ragb = /^0x[0-9a-fA-F]{40}$/;
    let rags = /^[0-9a-fA-F]{40}$/;
    if (ragb.test(address) || rags.test(address)) {
        // check if it has the basic requirements of an address
        return true;
    } else {
        // Otherwise check each case
        return false;
    }
};

isAccount(acc){
    if(acc && acc.length && isNaN(acc)> 0 && acc.length < 44){
        return true;
    }
    return false;
}

isTransaction(tx) {
    let rags= /^[0-9a-zA-Z]{44}$/
    // let ragb = /^0x[0-9a-fA-F]{64}$/;
    if (rags.test(tx)) {
        // check if it has the basic requirements of an address
        return true;
    } else {
        // Otherwise check each case
        return false;
    }
};
// isTransaction(tx) {
//     let rags = /^[0-9a-fA-F]{64}$/;
//     let ragb = /^0x[0-9a-fA-F]{64}$/;
//     if (rags.test(tx) || ragb.test(tx)) {
//         // check if it has the basic requirements of an address
//         return true;
//     } else {
//         // Otherwise check each case
//         return false;
//     }
// };
}
export default new Web3utils();
