function countOccurrences(INPUT, QUERY) {
    // Buat array untuk menyimpan hasil
    let result = [];

    // Iterasi melalui setiap kata dalam QUERY
    for (let queryWord of QUERY) {
        // Hitung jumlah kemunculan queryWord dalam INPUT
        let count = INPUT.filter(word => word === queryWord).length;
        // Tambahkan hasil ke array result
        result.push(count);
    }

    return result;
}

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

console.log(countOccurrences(INPUT, QUERY));