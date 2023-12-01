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

      if (updatedSelectedImages.length <= 6) {
        const promisesImages = updatedSelectedImages.map((file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const result = reader.result as string;
              resolve(result);
            };
            reader.readAsDataURL(file);
          });
        });

        Promise.all(promisesImages).then((base64Images) => {
          setEncodedImages(base64Images);
        });

        setSelectedImages(updatedSelectedImages);
      } else {
        alert("Please select only six images or fewer.");
      }
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

  const handleSubmit = async () => {
    try {
      // Create FormData object
      const formData = new FormData();

      // Append each selected image to the FormData object
      selectedImages.forEach((image) => {
        formData.append(`document`, image);
      });

      // Send FormData to the API using Axios
      const response = await axios.post(
        `${API_URL}/file/upload/multiple`,
        formData
      );

      // Handle the response data
      setImageUrls(response.data.result);
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
      productStatus: "live",
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
                          <a className="btn btn-primary" onClick={handleSubmit}>
                            Upload Asset
                          </a>
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
                  <div className="card-body flexdiv">
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
                          <input
                            className="file-input"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                          />
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
                        {selectedImages.map((file, index) => (
                          <>
                            {![".jpg", ".jpeg", ".png", ".gif"].some((imgExt) =>
                              file.name.toLowerCase().endsWith(imgExt)
                            ) && (
                              <div className="input-group mb-3" key={index}>
                                <input
                                  type="text"
                                  className="form-control border_radius4"
                                  defaultValue={file.name}
                                  value={file.name}
                                />
                                <div className="input-group-append">
                                  <span className="input-group-text bgred cursor_pntr">
                                    <span
                                      className="material-icons material-symbols-outlined md-18 fred"
                                      onClick={() => handleRemoveImage(index)}
                                    >
                                      close
                                    </span>
                                  </span>
                                </div>
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                      <div className="form-group mt-2">
                        <label>Product Photo</label>
                        <div className="flexdiv mt-2">
                          {selectedImages.map((file, index) => (
                            <>
                              {(file.type === "image/jpeg" ||
                                file.type === "image/png") && (
                                <div className="prod_photo_item" key={index}>
                                  <div className="prod_photoimg">
                                    <img
                                      src={encodedImages[index]}
                                      className="border_radius4"
                                    />
                                  </div>
                                  <div className="allclose">
                                    <span
                                      className="material-icons material-symbols-outlined md-16"
                                      onClick={() => handleRemoveImage(index)}
                                    >
                                      close
                                    </span>
                                  </div>
                                </div>
                              )}
                            </>
                          ))}
                          {selectedImages.length == 0 && (
                            <>
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
                            </>
                          )}
                          {selectedImages.length == 1 && (
                            <>
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
                            </>
                          )}
                          {selectedImages.length == 2 && (
                            <>
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
                            </>
                          )}
                          {selectedImages.length == 3 && (
                            <>
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
                              <div className="prod_photo_item">
                                <span className="material-icons material-symbols-outlined md-24 fgrey2">
                                  image
                                </span>
                              </div>
                            </>
                          )}
                          {selectedImages.length == 4 && (
                            <>
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
                            </>
                          )}
                          {selectedImages.length == 5 && (
                            <>
                              <div className="prod_photo_item active">
                                <span className="material-icons material-symbols-outlined md-24 fgrey2">
                                  image
                                </span>
                              </div>
                            </>
                          )}
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
                    <div className="col-12 col-md-6">
                      <h5 className="card-title">Details</h5>
                      <div className="inlineblockdiv pt-3">
                        <div className="border-bottom pb-2">
                          Status: {userId}
                        </div>
                        <div className="form-group mt-3">
                          <label>Title</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Title File"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label>Description</label>
                          <textarea
                            className="form-control txtarea_resizenone textarea_hgt110"
                            value={productDescription}
                            onChange={(e) =>
                              setProductDescription(e.target.value)
                            }
                          />
                        </div>
                        <div className="form-group mt-4">
                          <label>Asset Category</label>
                          <select
                            className="form-control"
                            value={assetCategory}
                            onChange={(e) => setAssetCategory(e.target.value)}
                          >
                            <option>Asset Category</option>
                            <option>option 2</option>
                            <option>option 3</option>
                            <option>option 4</option>
                            <option>option 5</option>
                          </select>
                        </div>
                        <div className="form-group mt-4">
                          <label>Product Keyword</label>
                          <div className="flexdiv">
                            <div className="col-10 col-md-11 pl-0">
                              <div className="dropdown">
                                <div
                                  className="input-group mb-3 position-relative"
                                  data-toggle="dropdown"
                                >
                                  <div className="input-group-prepend">
                                    <span className="input-group-text bggrey">
                                      <span className="material-icons material-symbols-outlined md-18 fwhite">
                                        search
                                      </span>
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="product keyword"
                                    value={newKeyword}
                                    onChange={(e) =>
                                      setNewKeyword(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="dropdown-menu dropdown-menu-fullwidth dropdown-menu-right">
                                  <div className="dropdown-item">Keyword 1</div>
                                  <div className="dropdown-item">Keyword 2</div>
                                  <div className="dropdown-item">Keyword 3</div>
                                </div>
                              </div>
                              <div className="fgrey3">
                                These keywords will help shoppers find this
                                asset.
                              </div>
                            </div>
                            <div className="col-2 col-md-1">
                              <a
                                className="btn btn-light py-2"
                                onClick={handleAddKeyword}
                              >
                                Add
                              </a>
                            </div>
                          </div>
                          <div className="flexdiv">
                            {productKeywords.map((keyword, index) => (
                              <div
                                className="keyword_item border_radius8"
                                key={index}
                              >
                                <span className="px-2">{keyword}</span>{" "}
                                <span
                                  className="close_sm bgred border_radius8_rgt cursor_pntr"
                                  onClick={() => handleRemoveKeyword(index)}
                                >
                                  <span className="material-icons material-symbols-outlined md-16 pt-1 fred">
                                    close
                                  </span>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="form-group mt-4">
                          <label>Game</label>
                          <div className="flexdiv">
                            <div
                              className="inlineblockdiv dropdown"
                              onClick={handleAddGameClick}
                            >
                              <div className="flexdiv" data-toggle="dropdown">
                                <span className="d-flex align-items-center fpurple cursor_pntr">
                                  <span className="material-icons material-symbols-outlined md-18 mr-1">
                                    add
                                  </span>
                                  Add game
                                </span>
                              </div>
                              {showPopup && (
                                <div className="dropdown-menu dropdown-menu-fullwidth dropdown-menu-right">
                                  <div
                                    className="dropdown-item"
                                    onClick={() => handleGameSelect("Game 1")}
                                  >
                                    Game 1
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    onClick={() => handleGameSelect("Game 2")}
                                  >
                                    Game 2
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    onClick={() => handleGameSelect("Game 3")}
                                  >
                                    Game 3
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="fgrey3 py-2">
                              Select your asset and game compatibility
                            </div>
                          </div>
                          <div className="flexdiv">
                            {gameNames.map((game, index) => (
                              <div
                                className="keyword_item border_radius8"
                                key={index}
                              >
                                <span className="px-2">{game}</span>{" "}
                                <span
                                  className="close_sm bgred border_radius8_rgt cursor_pntr"
                                  onClick={() => handleRemoveGame(index)}
                                >
                                  <span className="material-icons material-symbols-outlined md-16 pt-1 fred">
                                    close
                                  </span>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="form-group mt-4">
                          <label>Price</label>
                          <div className="flexdiv">
                            <div className="col-3 col-md-2 pl-0">
                              <select
                                className="form-control"
                                value={currencyType}
                                onChange={(e) =>
                                  setCurrencyType(e.target.value)
                                }
                              >
                                <option defaultValue="USD">USD</option>
                                <option value="UND">UND</option>
                              </select>
                            </div>
                            <div className="col-9 col-md-10 pr-0">
                              <input
                                type="text"
                                className="form-control"
                                value={priceValue}
                                onChange={(e) => setPriceValue(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="f_sz16 mt-2">Stock</div>
                        <div className="form-group mt-2">
                          <label>Available Stock</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={"1"}
                            value={
                              availableStock !== undefined ? availableStock : ""
                            }
                            onChange={handleMinimumStockChange}
                          />
                        </div>
                        <div className="form-group mt-2">
                          <label>Minimum Order</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={"1"}
                            value={
                              minimumOrder !== undefined ? minimumOrder : ""
                            }
                            onChange={handleMinimumOrder}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    <div className="dropdown-menu dropdown-menu-fullwidth dropdown-menu-right">
      <div className="dropdown-item" onClick={() => onSelect("Game 1")}>
        Game 1
      </div>
      <div className="dropdown-item" onClick={() => onSelect("Game 2")}>
        Game 2
      </div>
      <div className="dropdown-item" onClick={() => onSelect("Game 3")}>
        Game 3
      </div>
    </div>
  );
};

export default Assets;
