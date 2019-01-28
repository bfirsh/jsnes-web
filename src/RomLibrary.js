const pFileReader = function(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = resolve
    reader.readAsBinaryString(file);
  })
}

const hashFile = function(byteString) {
  const asHex = (buffer) => {
      return Array.from(new Uint8Array (buffer))
        .map (b => b.toString (16).padStart (2, "0"))
        .join ("")
    }

  const ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return crypto.subtle.digest('SHA-1', ab).then(asHex)
}

const RomLibrary = {
  save: function(file) {
    return pFileReader(file).then(function(readFile) {
      const byteString = readFile.target.result;
      return hashFile(byteString).then((hash) =>{ return {hash, byteString} })
    }).then(({hash, byteString}) => {
      const savedRomInfo = localStorage.getItem('savedRomInfo')
      const existingLibrary = savedRomInfo ? JSON.parse(savedRomInfo) : []

      const newRomInfo = JSON.stringify(existingLibrary.concat([{
        name: file.name,
        hash: hash,
        added: Date.now()
      }]))

      localStorage.setItem('savedRomInfo', newRomInfo)
      localStorage.setItem('blob-'+hash, byteString)
    })
  },
  load: function() {
    const localData = localStorage.getItem('savedRomInfo')
    if (!localData) return []
    const savedRomInfo = JSON.parse(localStorage.getItem('savedRomInfo'))
    return savedRomInfo || []
  }
}

export default RomLibrary;