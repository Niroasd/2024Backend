const alphabet = {
    input: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    output: "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm"
};
  
export function encode(text) {
    if (text != null) {
        return Array.from(text).map(char => {
        const index = alphabet.input.indexOf(char);
        return index >= 0 ? alphabet.output[index] : char;
        }).join('');
    } else {
        return '';
    }
}
  
export function decode(text) {
    if (text != null) {
        return Array.from(text).map(char => {
            const index = alphabet.output.indexOf(char);
            return index >= 0 ? alphabet.input[index] : char;
        }).join('');
    } else {
        return '';
    }
}