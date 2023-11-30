import React, { useState, ChangeEvent, FormEvent, DragEvent } from "react";
import axios from "axios";
import { API_URL } from "../helper/constants";
import { useUser } from "../helper/userContext";

const Assets: React.FC = () => {
  const { userId } = useUser();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [encodedImages, setEncodedImages] = useState<string[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<File[]>([]);
  const [encodedVideos, setEncodedVideos] = useState<string[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [currencyType, setCurrencyType] = useState<string>("");
  const [priceValue, setPriceValue] = useState<string>("");
  const [availableStock, setAvailableStock] = useState<number>();
  const [minimumOrder, setMinimumOrder] = useState<number>();
  const [videoLink, setVideoLink] = useState<string>("");
  const [productKeywords, setProductKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState<string>("");
  const [assetCategory, setAssetCategory] = useState<string>("");
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [gameNames, setGameNames] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleMinimumStockChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);

    if (!isNaN(value)) {
      // Update the state only if the input is a valid number
      setAvailableStock(value);
    }
  };

  const handleMinimumOrder = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);

    if (!isNaN(value)) {
      // Update the state only if the input is a valid number
      setMinimumOrder(value);
    }
  };

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
      });
      setSelectedImages(updatedSelectedImages);
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create FormData object
    const formData = new FormData();

    // Append each selected image to the FormData object
    selectedImages.forEach((image) => {
      formData.append(`document`, image);
    });

    try {
      // Send FormData to the API using Axios
      const response = await axios.post(
        `${API_URL}/file/upload/multiple`,
        formData
      );
      setImageUrls(response.data.result);
      // Handle the response data
      console.log(response.data.result);
      assetCreate(response.data.result);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  const assetCreate = async (ImageUrl: string | string[]) => {
    // Replace this with your actual API endpoint
    const apiUrl = `${API_URL}/product/create`;

    // Data to be sent in the request body
    const data = {
      userId: userId,
      productName: productName,
      productCategory: assetCategory,
      productKeywords: productKeywords,
      productImages: ImageUrl,
      productVideos: ["video1.mp4", "video2.mp4"],
      price: priceValue,
      currencyType: currencyType,
      availableStock: availableStock,
      minimumOrder: minimumOrder,
      description: productDescription,
      variation: gameNames,
    };
    console.log(`data:${data}`);
    // Axios POST request
    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <div className="content-wrapper">
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
                        <label htmlFor="productName">stock:</label>
                        <input
                          type="text"
                          id="availablestock"
                          name="availablestock"
                          className="form-control"
                          value={
                            availableStock !== undefined ? availableStock : ""
                          }
                          onChange={handleMinimumStockChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="productName">minimumorder:</label>
                        <input
                          type="text"
                          id="minimumorder"
                          name="minimumorder"
                          className="form-control"
                          value={minimumOrder !== undefined ? minimumOrder : ""}
                          onChange={handleMinimumOrder}
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
                          value={currencyType}
                          onChange={(e) => setCurrencyType(e.target.value)}
                        >
                          <option>Select Currency Type</option>
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

      <div className="content-wrapper">
        {/* Main content */}
        <div className="content pt-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="w-100 d-flex flex-row flex-wrap">
                      <div className="col-12 col-md-8">
                        <h5 className="card-title pt-2">Upload New Asset</h5>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="txt_right mt-2 mt-md-0">
                          <a className="btn btn-outline-primary">Draft</a>
                          <a className="btn btn-primary">Upload Asset</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="col-12 col-md-6">
                      <h5 className="card-title">Upload Files</h5>
                      <div className="w-100 d-inline-block my-3">
                        <div
                          className="file-drop-area"
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                        >
                          <div className="d-block w-100 text-center">
                            <span className="material-icons material-symbols-outlined md-64 fgrey2">
                              upload
                            </span>{" "}
                          </div>
                          <span className="file-message mr-2">
                            Drag &amp; Drop files here or
                          </span>
                          <span className="btn btn-primary">Browse</span>
                          <input className="file-input" type="file" multiple />
                        </div>
                        <div className="w-100 d-flex flex-row flex-wrap pt-2">
                          <div className="col-12 col-md-6">
                            <span className="f_sz12">
                              FBX, OBJ, DAE, BLEND, STL
                            </span>
                          </div>
                          <div className="col-12 col-md-6">
                            <a href="#">
                              <div className="d-flex align-items-center float-right f_sz12 fpurple">
                                <span className="material-icons material-symbols-outlined md-18 mr-1">
                                  article
                                </span>{" "}
                                Guidelines
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>
                          <span className="f_sz14">Files</span>
                        </label>
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control border_radius4"
                            defaultValue="name file.fbx"
                          />
                          <div className="input-group-append">
                            <span className="input-group-text bgred cursor_pntr">
                              <span className="material-icons material-symbols-outlined md-18 fred">
                                close
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group mt-2">
                        <label>Product Photo</label>
                        <div className="flexdiv mt-2">
                          <div className="prod_photo_item active">
                            <span className="material-icons material-symbols-outlined md-24 fgrey2">
                              image
                            </span>
                          </div>
                          <div className="prod_photo_item">
                            <span className="material-icons material-symbols-outlined md-24 fgrey2">
                              image
                            </span>
                          </div>
                          <div className="prod_photo_item error">
                            <span className="material-icons material-symbols-outlined md-24 fgrey2">
                              image
                            </span>
                          </div>
                          <div className="prod_photo_item">
                            <span className="material-icons material-symbols-outlined md-24 fgrey2">
                              image
                            </span>
                          </div>
                          <div className="prod_photo_item">
                            <span className="material-icons material-symbols-outlined md-24 fgrey2">
                              image
                            </span>
                          </div>
                          <div className="prod_photo_item">
                            <span className="material-icons material-symbols-outlined md-24 fgrey2">
                              image
                            </span>
                          </div>
                          <div className="prod_photo_item">
                            <span className="material-icons material-symbols-outlined md-24 fgrey2">
                              image
                            </span>
                          </div>
                          <div className="prod_photo_item">
                            <div className="prod_photoimg">
                              <img
                                src="dist/img/sample.png"
                                className="border_radius4"
                              />
                            </div>
                            <div className="allclose">
                              <span className="material-icons material-symbols-outlined md-16">
                                close
                              </span>
                            </div>
                          </div>
                          <div className="prod_photo_item">
                            <div className="prod_photoimg">
                              <img
                                src="dist/img/sample.png"
                                className="border_radius4"
                              />
                            </div>
                            <div className="allclose">
                              <span className="material-icons material-symbols-outlined md-16">
                                close
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>
                          Video <span className="fgrey2">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="https://"
                        />
                        <div className="mt-2 position-relative">
                          <span className="d-flex align-items-center fpurple">
                            <span className="material-icons material-symbols-outlined md-18 mr-1">
                              add
                            </span>
                            Add video
                          </span>
                          <input className="file-input" type="file" multiple />
                        </div>
                        <div className="flexdiv mt-2">
                          <div className="prod_video_item">
                            <div className="videoWrapper">
                              <video width={400} controls>
                                <source
                                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                                  type="video/mp4"
                                />
                                <source
                                  src="https://www.w3schools.com/html/mov_bbb.ogg"
                                  type="video/ogg"
                                />
                                Your browser does not support HTML video.
                              </video>
                            </div>
                            <div className="allclose">
                              <span className="material-icons material-symbols-outlined md-16">
                                close
                              </span>
                            </div>
                          </div>
                          <div className="prod_video_item">
                            <div className="videoWrapper">
                              <video width={400} controls>
                                <source
                                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                                  type="video/mp4"
                                />
                                <source
                                  src="https://www.w3schools.com/html/mov_bbb.ogg"
                                  type="video/ogg"
                                />
                                Your browser does not support HTML video.
                              </video>
                            </div>
                            <div className="allclose">
                              <span className="material-icons material-symbols-outlined md-16">
                                close
                              </span>
                            </div>
                          </div>
                          <div className="prod_video_item">
                            <div className="videoWrapper">
                              <video width={400} controls>
                                <source
                                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                                  type="video/mp4"
                                />
                                <source
                                  src="https://www.w3schools.com/html/mov_bbb.ogg"
                                  type="video/ogg"
                                />
                                Your browser does not support HTML video.
                              </video>
                            </div>
                            <div className="allclose">
                              <span className="material-icons material-symbols-outlined md-16">
                                close
                              </span>
                            </div>
                          </div>
                          <div className="prod_video_item">
                            <div className="videoWrapper">
                              <video width={400} controls>
                                <source
                                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                                  type="video/mp4"
                                />
                                <source
                                  src="https://www.w3schools.com/html/mov_bbb.ogg"
                                  type="video/ogg"
                                />
                                Your browser does not support HTML video.
                              </video>
                            </div>
                            <div className="allclose">
                              <span className="material-icons material-symbols-outlined md-16">
                                close
                              </span>
                            </div>
                          </div>
                          <div className="prod_video_item">
                            <div className="videoWrapper">
                              <video width={400} controls>
                                <source
                                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                                  type="video/mp4"
                                />
                                <source
                                  src="https://www.w3schools.com/html/mov_bbb.ogg"
                                  type="video/ogg"
                                />
                                Your browser does not support HTML video.
                              </video>
                            </div>
                            <div className="allclose">
                              <span className="material-icons material-symbols-outlined md-16">
                                close
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          {/* /.content */}
        </div>
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
