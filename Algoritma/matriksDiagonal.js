function diagonalDifference(matrix) {
    let n = matrix.length;
    let primaryDiagonalSum = 0;
    let secondaryDiagonalSum = 0;

    for (let i = 0; i < n; i++) {
        primaryDiagonalSum += matrix[i][i]; // Menambahkan elemen diagonal utama
        secondaryDiagonalSum += matrix[i][n - 1 - i]; // Menambahkan elemen diagonal sekunder
    }

    return Math.abs(primaryDiagonalSum - secondaryDiagonalSum); // Mengembalikan selisih absolut
}

const matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(diagonalDifference(matrix));