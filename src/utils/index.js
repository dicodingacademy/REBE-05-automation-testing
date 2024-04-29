function formatToRupiah(number) {
  if (Number.isNaN(number)) return 'Invalid number';

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
  }).format(number);
}

function wait(millis = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), millis);
  });
}

export { formatToRupiah, wait };
