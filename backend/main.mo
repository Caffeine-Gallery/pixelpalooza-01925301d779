import Int "mo:base/Int";

import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Nat "mo:base/Nat";
import Time "mo:base/Time";

actor {
  type Image = {
    id: Nat;
    content: Blob;
    timestamp: Int;
  };

  stable var imageId: Nat = 0;
  stable var images: [Image] = [];

  public func uploadImage(imageBlob: Blob) : async Nat {
    let newImage: Image = {
      id = imageId;
      content = imageBlob;
      timestamp = Time.now();
    };
    images := Array.append(images, [newImage]);
    imageId += 1;
    imageId - 1
  };

  public query func getImages() : async [Image] {
    images
  };
}
