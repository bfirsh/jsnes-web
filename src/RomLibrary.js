const pFileReader = function(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = resolve;
    reader.readAsBinaryString(file);
  });
};

const hashFile = function(byteString) {
  const asHex = buffer => {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return crypto.subtle.digest("SHA-1", ab).then(asHex);
};

const RomLibrary = {
  getRomInfoByHash: function(hash) {
    return this.load().find(rom => rom.hash === hash);
  },
  save: function(file) {
    return pFileReader(file)
      .then(function(readFile) {
        const byteString = readFile.target.result;
        return hashFile(byteString).then(hash => {
          return { hash, byteString };
        });
      })
      .then(({ hash, byteString }) => {
        const savedRomInfo = localStorage.getItem("savedRomInfo");
        const existingLibrary = savedRomInfo ? JSON.parse(savedRomInfo) : [];

        const rom = {
          name: file.name,
          hash: hash,
          added: Date.now()
        };

        const newRomInfo = JSON.stringify(existingLibrary.concat([rom]));

        localStorage.setItem("savedRomInfo", newRomInfo);
        localStorage.setItem("blob-" + hash, byteString);

        return rom;
      });
  },
  load: function() {
    const localData = localStorage.getItem("savedRomInfo");
    if (!localData) return [];
    const savedRomInfo = JSON.parse(localStorage.getItem("savedRomInfo"));
    return savedRomInfo || [];
  },
  delete: function(hash) {
    const existingLibrary = this.load();
    localStorage.removeItem("blob-" + hash);
    localStorage.setItem(
      "savedRomInfo",
      JSON.stringify(existingLibrary.filter(rom => rom.hash !== hash))
    );
  }
};

export default RomLibrary;
