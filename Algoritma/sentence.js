function longest(sentence) {
    // Pisahkan kalimat menjadi array kata-kata
    let words = sentence.split(' ');

    // Inisialisasi variabel untuk menyimpan kata terpanjang
    let longestWord = '';

    // Iterasi melalui setiap kata dalam array
    for (let word of words) {
        // Jika panjang kata saat ini lebih panjang dari kata terpanjang yang disimpan
        if (word.length > longestWord.length) {
            longestWord = word; // Perbarui kata terpanjang
        }
    }

    // Kembalikan kata terpanjang dan panjangnya
    return `${longestWord}: ${longestWord.length} character`;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
console.log(longest(sentence));