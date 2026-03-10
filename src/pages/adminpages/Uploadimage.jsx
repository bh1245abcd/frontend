import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { uploadProductImage } from "../../api/auth";

const UploadProductImage = () => {
  const { productId } = useParams(); // ✅ works now
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  console.log("Product ID:", productId);

  const handleUpload = async () => {
    if (!productId) {
      setMessage("❌ Product ID missing");
      return;
    }

    if (!image) {
      setMessage("❌ Please select an image");
      return;
    }

    try {
      await uploadProductImage(productId, image);
      setMessage("✅ Image uploaded successfully!");
    } catch {
      setMessage("❌ Image upload failed");
    }
  };

  return (
    <div className="p-4 max-w-md">
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button
        onClick={handleUpload}
        className="ml-2 px-4 py-2 bg-[#b88f5b] text-white rounded"
      >
        Upload
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default UploadProductImage;
