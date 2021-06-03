let num = '128357147'

if (num[0] === '0') {
  num = `+62${num.substr(1)}`
} else if (num.substr(0, 2) !== '+62') {
  num = `+62${num}`
}

console.log(num)
