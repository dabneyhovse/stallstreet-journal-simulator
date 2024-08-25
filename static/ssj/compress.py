import os
from PIL import Image

def convert_and_compress_images(root_folder, max_size_kb=1000, max_dimension=1500):
    # Iterate through all files in the directory
    for subdir, _, files in os.walk(root_folder):
        for file in files:
            file_path = os.path.join(subdir, file)

            # Skip hidden files (optional)
            if file.startswith('.'):
                continue

            # Check if the file is an image
            try:
                img = Image.open(file_path)
            except IOError:
                continue

            # Convert non-JPEG images to JPEG
            if img.format != 'JPEG':
                new_file_path = os.path.splitext(file_path)[0] + '.jpeg'
                img.convert('RGB').save(new_file_path, 'JPEG')
                print(f"Converted {file_path} to JPEG.")
                os.remove(file_path)
                file_path = new_file_path
                img = Image.open(file_path)  # Reopen the new JPEG file

            # Resize if dimensions exceed max_dimension
            width, height = img.size
            if width > max_dimension or height > max_dimension:
                scaling_factor = min(max_dimension / width, max_dimension / height)
                new_size = (int(width * scaling_factor), int(height * scaling_factor))
                img = img.resize(new_size, Image.ANTIALIAS)
                img.save(file_path, 'JPEG')
                print(f"Resized {file_path} to {new_size}.")

            # Check and compress if JPEG is larger than max_size_kb
            if os.path.getsize(file_path) > max_size_kb * 1024:
                quality = 95  # Start with high quality
                while os.path.getsize(file_path) > max_size_kb * 1024 and quality > 10:
                    img = Image.open(file_path)
                    img.save(file_path, 'JPEG', quality=quality)
                    print(f"Compressed {file_path} to quality {quality}.")
                    quality -= 5

                # Further resize if still larger than max_size_kb
                width, height = img.size
                while os.path.getsize(file_path) > max_size_kb * 1024 and width > 100 and height > 100:
                    width = int(width * 0.9)  # Reduce width by 10%
                    height = int(height * 0.9)  # Reduce height by 10%
                    img = img.resize((width, height), Image.ANTIALIAS)
                    img.save(file_path, 'JPEG', quality=quality)
                    print(f"Resized {file_path} to {width}x{height} and quality {quality}.")

if __name__ == "__main__":
    # Specify the root folder you want to start the search from
    root_folder = './'
    convert_and_compress_images(root_folder)