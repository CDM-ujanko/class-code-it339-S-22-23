export function parseCsvString(str) {
    let data = [];

    let rows = str.split('\r\n');

    rows.forEach(row => {
        row.split(',').forEach(item => {
            data.push(parseInt(item));
        })
    });

    return data;
}