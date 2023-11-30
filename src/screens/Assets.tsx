import React, { useState, ChangeEvent, FormEvent, DragEvent } from "react";

const Assets: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [encodedImages, setEncodedImages] = useState<string[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<File[]>([]);
  const [encodedVideos, setEncodedVideos] = useState<string[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [priceCategory, setpPriceCategory] = useState<string>("");
  const [priceValue, setPriceValue] = useState<string>("");
  const [availableStock, setAvailableStock] = useState<string>("");
  const [minimumOrder, setMinimumOrder] = useState<string>("");
  const [videoLink, setVideoLink] = useState<string>("");
  const [productKeywords, setProductKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState<string>("");
  const [assetCategory, setAssetCategory] = useState<string>("");
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [gameNames, setGameNames] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    handleFiles(files);
  };

  const handleFiles = (files: FileList | null) => {
    if (files) {
      const newImageArray = Array.from(files);
      const updatedSelectedImages = [...selectedImages, ...newImageArray];

      // Convert selected images to base64 and update the state
      const promisesImages = updatedSelectedImages.map((image) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            resolve(result);
          };
          reader.readAsDataURL(image);
        });
      });

      Promise.all(promisesImages).then((base64Images) => {
        setEncodedImages(base64Images);
        setSelectedImages(updatedSelectedImages);
      });
    }
  };

  const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    handleVideoFiles(files);
  };

  const handleVideoFiles = (files: FileList | null) => {
    if (files) {
      const newVideoArray = Array.from(files);
      const updatedSelectedVideos = [...selectedVideos, ...newVideoArray];

      // Convert selected videos to base64 and update the state
      const promisesVideos = updatedSelectedVideos.map((video) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            resolve(result);
          };
          reader.readAsDataURL(video);
        });
      });

      Promise.all(promisesVideos).then((base64Videos) => {
        setEncodedVideos(base64Videos);
        setSelectedVideos(updatedSelectedVideos);
      });
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRemoveImage = (index: number) => {
    const updatedSelectedImages = [...selectedImages];
    const updatedEncodedImages = [...encodedImages];

    updatedSelectedImages.splice(index, 1);
    updatedEncodedImages.splice(index, 1);

    setSelectedImages(updatedSelectedImages);
    setEncodedImages(updatedEncodedImages);
  };

  const handleRemoveVideo = (index: number) => {
    const updatedSelectedVideos = [...selectedVideos];
    const updatedEncodedVideos = [...encodedVideos];

    updatedSelectedVideos.splice(index, 1);
    updatedEncodedVideos.splice(index, 1);

    setSelectedVideos(updatedSelectedVideos);
    setEncodedVideos(updatedEncodedVideos);
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() !== "") {
      setProductKeywords([...productKeywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (index: number) => {
    const updatedKeywords = [...productKeywords];
    updatedKeywords.splice(index, 1);
    setProductKeywords(updatedKeywords);
  };

  const handleAddGameClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleGameSelect = (selectedGame: string) => {
    // Add the selected game to the list
    setGameNames([...gameNames, selectedGame]);
  };

  const handleRemoveGame = (index: number) => {
    // Remove the selected game from the list
    const updatedGameNames = [...gameNames];
    updatedGameNames.splice(index, 1);
    setGameNames(updatedGameNames);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Send the encoded images and videos to the API or perform other actions
    console.log("Encoded Images:", encodedImages);
    console.log("Encoded Videos:", encodedVideos);

    fetch("https://dev-tilted.ephrontech.com/file/upload/multiple", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ images: encodedImages, videos: encodedVideos }),
      body: JSON.stringify({ document: encodedImages }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // sendUrlsToAnotherApi({
        //   images: imageUrls,
        //   // videos: videoUrls,
        //   productName: productName,
        //   productKeywords: productKeywords,
        // });
      })
      .catch((error) => console.error("Error:", error));
  };

  const sendUrlsToAnotherApi = (data: {
    images: string[];
    productName: string;
    productKeywords: string[];
  }) => {
    // Replace this with your actual API endpoint and method
    return fetch("https://example.com/api/another-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  };
  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Assets</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Assets</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">
                      Quick Example <small>jQuery Validation</small>
                    </h3>
                  </div>
                  {/* form start */}
                  <form id="quickForm" onSubmit={handleSubmit}>
                    <div className="card-body">
                      {/* Choose Files field with drag-and-drop */}
                      <div
                        className="form-group"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        style={{
                          border: "2px dashed #ccc",
                          borderRadius: "5px",
                          padding: "20px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        <label htmlFor="imageUpload">
                          Choose Files or Drag and Drop
                        </label>
                        <input
                          type="file"
                          id="imageUpload"
                          name="images"
                          className="form-control"
                          accept="image/*"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>

                      {/* Display selected images */}
                      <div className="form-group">
                        <label>Selected Images:</label>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                          {selectedImages.map((image, index) => (
                            <li key={index} style={{ marginBottom: "10px" }}>
                              <img
                                src={encodedImages[index]}
                                alt={`Selected Image ${index + 1}`}
                                style={{
                                  maxWidth: "100px",
                                  maxHeight: "100px",
                                  marginRight: "10px",
                                }}
                              />
                              {image.name}
                              <span
                                style={{
                                  cursor: "pointer",
                                  marginLeft: "10px",
                                  fontSize: "18px",
                                }}
                                onClick={() => handleRemoveImage(index)}
                              >
                                &#10006;
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="form-group">
                        <input
                          type="file"
                          id="imageUpload"
                          name="images"
                          className="form-control"
                          accept="video/*"
                          multiple
                          onChange={handleVideoChange}
                        />
                        <label>Selected Videos:</label>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                          {selectedVideos.map((video, index) => (
                            <li key={index} style={{ marginBottom: "10px" }}>
                              <video
                                src={encodedVideos[index]}
                                // alt={`Selected Video ${index + 1}`}
                                style={{
                                  maxWidth: "100px",
                                  maxHeight: "100px",
                                  marginRight: "10px",
                                }}
                                controls
                              />
                              {video.name}
                              <span
                                style={{
                                  cursor: "pointer",
                                  marginLeft: "10px",
                                  fontSize: "18px",
                                }}
                                onClick={() => handleRemoveVideo(index)}
                              >
                                &#10006;
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="form-group">
                        <label htmlFor="productName">Title:</label>
                        <input
                          type="text"
                          id="productName"
                          name="productName"
                          className="form-control"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="productName">Video URL:</label>
                        <input
                          type="text"
                          id="videolink"
                          name="videolink"
                          className="form-control"
                          value={videoLink}
                          onChange={(e) => setVideoLink(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="productName">Description:</label>
                        <input
                          type="text"
                          id="description"
                          name="description"
                          className="form-control"
                          value={productDescription}
                          onChange={(e) =>
                            setProductDescription(e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="productName">Description:</label>
                        <input
                          type="text"
                          id="availablestock"
                          name="availablestock"
                          className="form-control"
                          value={availableStock}
                          onChange={(e) => setAvailableStock(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="productName">Description:</label>
                        <input
                          type="text"
                          id="minimumorder"
                          name="minimumorder"
                          className="form-control"
                          value={minimumOrder}
                          onChange={(e) => setMinimumOrder(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="productKeyword">Product Keyword:</label>
                        <div className="input-group">
                          <input
                            type="text"
                            id="productKeyword"
                            name="productKeyword"
                            className="form-control"
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                          />
                          <div className="input-group-append">
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={handleAddKeyword}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Display selected keywords */}
                      <div className="form-group">
                        <label>Selected Keywords:</label>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                          {productKeywords.map((keyword, index) => (
                            <li key={index} style={{ marginBottom: "10px" }}>
                              {keyword}
                              <span
                                style={{
                                  cursor: "pointer",
                                  marginLeft: "10px",
                                  fontSize: "18px",
                                }}
                                onClick={() => handleRemoveKeyword(index)}
                              >
                                &#10006;
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="form-group">
                        <label htmlFor="productKeyword">Asset category:</label>
                        <select
                          id="productKeyword"
                          name="productKeyword"
                          className="form-control"
                          value={assetCategory}
                          onChange={(e) => setAssetCategory(e.target.value)}
                        >
                          <option value="">Select a keyword</option>
                          <option value="keyword1">Keyword 1</option>
                          <option value="keyword2">Keyword 2</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="productKeyword">Price category:</label>
                        <select
                          id="productKeyword"
                          name="productKeyword"
                          className="form-control"
                          value={priceCategory}
                          onChange={(e) => setpPriceCategory(e.target.value)}
                        >
                          <option value="USD">USD</option>
                          <option value="UND">UND</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="productName">price:</label>
                        <input
                          type="text"
                          id="pricevalue"
                          name="pricevalue"
                          className="form-control"
                          value={priceValue}
                          onChange={(e) => setPriceValue(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="gameNames">Game Names:</label>
                        <div>
                          {/* Display selected game names */}
                          {gameNames.map((game, index) => (
                            <span key={index} className="selected-game">
                              {game}
                              <span
                                className="remove-game"
                                onClick={() => handleRemoveGame(index)}
                              >
                                &times;
                              </span>
                            </span>
                          ))}
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleAddGameClick}
                        >
                          + Add Game Name
                        </button>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                  {showPopup && (
                    <Popup
                      onClose={handlePopupClose}
                      onSelect={handleGameSelect}
                    />
                  )}
                </div>
              </div>
              <div className="col-md-6"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

interface PopupProps {
  onClose: () => void;
  onSelect: (selectedGame: string) => void;
}

const Popup: React.FC<PopupProps> = ({ onClose, onSelect }) => {
  // Add your popup logic here
  // ...

  return (
    <div className="popup">
      {/* Popup content */}

      <ul>
        <li onClick={() => onSelect("Game 1")}>Game 1</li>
        <li onClick={() => onSelect("Game 2")}>Game 2</li>
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Assets;
