const cloudinary = require("cloudinary");

cloudinary.config({ 
  cloud_name: 'djb1wqvdx', 
  api_key: '646535279163184', 
  api_secret: 'N9VuFduorIioNuB1KBhpccJCyOk' 
});

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};

module.exports = cloudinary;