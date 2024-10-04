import Int "mo:base/Int";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Result "mo:base/Result";

actor {
  type Image = {
    id: Nat;
    content: Blob;
    timestamp: Int;
  };

  type UploadResult = Result.Result<Nat, Text>;

  stable var imageId: Nat = 0;
  stable var images: [Image] = [];

  public func uploadImage(imageBlob: Blob) : async UploadResult {
    if (Blob.toArray(imageBlob).size() == 0) {
      return #err("Empty file");
    };

    let newImage: Image = {
      id = imageId;
      content = imageBlob;
      timestamp = Time.now();
    };
    images := Array.append(images, [newImage]);
    imageId += 1;
    #ok(imageId - 1)
  };

  public query func getImages() : async [Image] {
    images
  };
}
