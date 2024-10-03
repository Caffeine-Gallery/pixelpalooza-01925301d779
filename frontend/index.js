import { backend } from 'declarations/backend';

const uploadForm = document.getElementById('uploadForm');
const imageInput = document.getElementById('imageInput');
const gallery = document.getElementById('gallery');

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const arrayBuffer = reader.result;
      const blob = new Blob([arrayBuffer]);
      try {
        await backend.uploadImage(blob);
        imageInput.value = '';
        loadImages();
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
    reader.readAsArrayBuffer(file);
  }
});

async function loadImages() {
  try {
    const images = await backend.getImages();
    gallery.innerHTML = '';
    images.forEach((image) => {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(new Blob([image.content]));
      img.alt = `Image ${image.id}`;
      gallery.appendChild(img);
    });
  } catch (error) {
    console.error('Error loading images:', error);
  }
}

loadImages();
