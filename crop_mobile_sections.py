from pathlib import Path
from PIL import Image

source = Path('/home/ubuntu/blue-tape-sites/mobile-fullpage.png')
out_dir = Path('/home/ubuntu/blue-tape-sites/mobile-crops')
out_dir.mkdir(exist_ok=True)

image = Image.open(source)
width, height = image.size
slice_height = 900
step = 850
index = 1
for top in range(0, height, step):
    bottom = min(top + slice_height, height)
    crop = image.crop((0, top, width, bottom))
    crop.save(out_dir / f'section-{index:02d}.png')
    if bottom >= height:
        break
    index += 1
