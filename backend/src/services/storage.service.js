import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({

  privateKey: "private_pmoNTD10A6sJaNB8zIB7kTU6H+Q=",
  publicKey:"public_eRuSOxBLBY9JK9JeExf+lKaYNh4=",

});

async function uploadFile(buffer) {

    const result = await imagekit.files.upload({
      file: buffer.toString("base64"),
      fileName: "image.jpg",
    });

    return result;
  }


export default uploadFile;