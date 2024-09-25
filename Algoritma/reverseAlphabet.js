function reverseAlphabet(str) {
    // Pisahkan huruf dan angka dengan regex
    let letters = str.match(/[A-Za-z]/g);
    let numbers = str.match(/\d+/g);

    // Balikkan urutan huruf
    let reversedLetters = letters.reverse().join('');

    // Gabungkan huruf yang sudah dibalik dengan angka
    return reversedLetters + (numbers ? numbers.join('') : '');
}

let data = "NEGIE1";
let result = reverseAlphabet(data);
console.log(data);
console.log(result);