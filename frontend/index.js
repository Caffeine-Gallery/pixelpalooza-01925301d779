import { Actor, HttpAgent } from '@dfinity/agent';

const agent = new HttpAgent();
const canisterId = process.env.BACKEND_CANISTER_ID;

// Placeholder for the actual interface
const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'uploadImage': IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Variant({ 'ok': IDL.Nat, 'err': IDL.Text })], []),
    'getImages': IDL.Func([], [IDL.Vec(IDL.Record({
      'id': IDL.Nat,
      'content': IDL.Vec(IDL.Nat8),
      'timestamp': IDL.Int
    }))], ['query']),
  });
};

const backend = Actor.createActor(idlFactory, { agent, canisterId });

const uploadForm = document.getElementById('uploadForm');
const imageInput = document.getElementById('imageInput');
const gallery = document.getElementById('gallery');
const uploadStatus = document.getElementById('uploadStatus');

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = imageInput.files[0];
  if (file) {
    uploadStatus.textContent = 'Uploading...';
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await backend.uploadImage(Array.from(new Uint8Array(arrayBuffer)));
      if ('ok' in result) {
        uploadStatus.textContent = 'Upload successful!';
        imageInput.value = '';
        loadImages();
      } else {
        uploadStatus.textContent = `Upload failed: ${result.err}`;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      uploadStatus.textContent = `Error uploading image: ${error.message}`;
    }
  }
});

async function loadImages() {
  try {
    const images = await backend.getImages();
    gallery.innerHTML = '';
    images.forEach((image) => {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(new Blob([new Uint8Array(image.content)]));
      img.alt = `Image ${image.id}`;
      gallery.appendChild(img);
    });
  } catch (error) {
    console.error('Error loading images:', error);
    gallery.innerHTML = `<p>Error loading images: ${error.message}</p>`;
  }
}

loadImages();
