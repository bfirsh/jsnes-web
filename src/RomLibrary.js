const RomLibrary = {
  save: function(file) {
    const reader = new FileReader();

    const asHex = (buffer) => {
      return Array.from(new Uint8Array (buffer))
        .map (b => b.toString (16).padStart (2, "0"))
        .join ("")
    }

    reader.onload = function(readFile) {
      const byteString = readFile.target.result;
      const ab = new ArrayBuffer(byteString.length)
      var ia = new Uint8Array(ab)

      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const digest = crypto.subtle.digest('SHA-1', ab)
      digest.then((buffer) => {
        const hash = asHex(buffer)
        const savedRomInfo = localStorage.getItem('savedRomInfo')
        const existingLibrary = savedRomInfo ? JSON.parse(savedRomInfo) : []

        const newRomInfo = JSON.stringify(existingLibrary.concat([{
          name: file.name,
          hash: hash,
          added: Date.now()
        }]))

        localStorage.setItem('savedRomInfo', newRomInfo)
        localStorage.setItem('blob-'+hash, readFile.target.result)
      })
    }

    reader.readAsBinaryString(file);
  },
  load: function() {
    const localData = localStorage.getItem('savedRomInfo')
    if (!localData) return []
    const savedRomInfo = JSON.parse(localStorage.getItem('savedRomInfo'))
    return savedRomInfo || []
  }
}

export default RomLibrary;