import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './declarations/backend/backend.did.js';

const agent = new HttpAgent();
const canisterId = process.env.BACKEND_CANISTER_ID;

if (!canisterId) {
  console.error('Backend canister ID is not set. Please check your environment variables.');
}

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
      const uint8Array = new Uint8Array(arrayBuffer);
      const result = await backend.uploadImage(Array.from(uint8Array));
      if ('ok' in result) {
        uploadStatus.textContent = 'Upload successful!';
        imageInput.value = '';
        await loadImages();
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
      const imgContainer = document.createElement('div');
      imgContainer.className = 'image-container';

      const img = document.createElement('img');
      img.src = URL.createObjectURL(new Blob([new Uint8Array(image.content)]));
      img.alt = `Image ${image.id}`;
      
      const timestamp = document.createElement('p');
      timestamp.textContent = new Date(Number(image.timestamp) / 1000000).toLocaleString();

      imgContainer.appendChild(img);
      imgContainer.appendChild(timestamp);
      gallery.appendChild(imgContainer);
    });
  } catch (error) {
    console.error('Error loading images:', error);
    gallery.innerHTML = `<p>Error loading images: ${error.message}</p>`;
  }
}

// Load images when the page loads
loadImages();
