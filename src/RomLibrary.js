const RomLibrary = {
  save: function() {

  },
  load: function() {
    const localData = localStorage.getItem('savedRomInfo')
    if (!localData) return []
    const savedRomInfo = JSON.parse(localStorage.getItem('savedRomInfo'))
    return savedRomInfo || []
  }
}

export default RomLibrary;