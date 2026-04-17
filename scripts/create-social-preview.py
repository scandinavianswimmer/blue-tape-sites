from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUTPUT_DIR = Path('/home/ubuntu/webdev-static-assets')
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_PATH = OUTPUT_DIR / 'blue-tape-sites-social-preview.png'

WIDTH, HEIGHT = 1200, 630
BACKGROUND = '#F7F5F1'
INK = '#111111'
MUTED = '#5F6875'
BLUE = '#0066FF'
PAPER = '#FFFFFF'
BORDER = '#D8D3CB'

image = Image.new('RGB', (WIDTH, HEIGHT), BACKGROUND)
draw = ImageDraw.Draw(image)

# Soft background glow
for bbox, color in [((720, -60, 1280, 420), (0, 102, 255, 28)), ((820, 260, 1320, 760), (17, 17, 17, 20))]:
    glow = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse(bbox, fill=color)
    glow = glow.filter(ImageFilter.GaussianBlur(70))
    image = Image.alpha_composite(image.convert('RGBA'), glow).convert('RGB')
    draw = ImageDraw.Draw(image)

font_paths = [
    '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
]
regular = ImageFont.truetype(font_paths[0], 28)
small = ImageFont.truetype(font_paths[0], 22)
headline = ImageFont.truetype(font_paths[1], 86)
subhead = ImageFont.truetype(font_paths[0], 34)
card_title = ImageFont.truetype(font_paths[1], 30)
card_copy = ImageFont.truetype(font_paths[0], 24)
brand = ImageFont.truetype(font_paths[1], 26)

# Logo tile
logo_x, logo_y = 74, 58
logo_box = (logo_x, logo_y, logo_x + 54, logo_y + 54)
draw.rounded_rectangle(logo_box, radius=12, fill=PAPER, outline=BORDER, width=2)
draw.rounded_rectangle((logo_x + 8, logo_y + 8, logo_x + 46, logo_y + 46), radius=10, fill=BACKGROUND, outline=BORDER, width=1)
draw.rounded_rectangle((logo_x + 12, logo_y + 25, logo_x + 41, logo_y + 33), radius=2, fill=BLUE)
draw.rectangle((logo_x + 36, logo_y + 13, logo_x + 43, logo_y + 20), fill=(0, 102, 255, 45), outline=(0, 102, 255, 110), width=1)
image = image.rotate(0)
draw = ImageDraw.Draw(image)

draw.text((146, 64), 'BLUE TAPE SITES', fill=MUTED, font=brand)
draw.text((146, 96), 'Precision web design for home-service companies', fill=INK, font=small)

draw.rounded_rectangle((74, 156, 448, 194), radius=0, fill=PAPER, outline=BORDER, width=1)
draw.text((96, 166), 'SOUTHERN CALIFORNIA WEB DESIGN FOR SERIOUS CONTRACTORS', fill=MUTED, font=small)

headline_text = 'See the tape. Fix\nthe flaws. Launch\nwith confidence.'
draw.multiline_text((74, 224), headline_text, fill=INK, font=headline, spacing=0)

draw.multiline_text(
    (74, 500),
    'Clearer offers, sharper proof, and stronger\nlocal trust for plumbers, electricians, cleaners,\nand contractor-led teams.',
    fill=MUTED,
    font=subhead,
    spacing=12,
)

# Right-side card composition inspired by hero
card_x, card_y = 720, 178
card_w, card_h = 400, 236
draw.rounded_rectangle((card_x, card_y, card_x + card_w, card_y + card_h), radius=10, fill=PAPER, outline=BORDER, width=2)
draw.text((card_x + 26, card_y + 28), 'BLUE TAPE STANDARD', fill=MUTED, font=small)
draw.rounded_rectangle((card_x + 26, card_y + 72, card_x + 31, card_y + 136), radius=2, fill=BLUE)
draw.text((card_x + 50, card_y + 76), 'Clear offer. Tighter proof. Better local trust.', fill=INK, font=card_title)
draw.multiline_text((card_x + 26, card_y + 138), 'Designed to feel like a real, high-conviction\nwebsite for serious home-service operators.', fill=MUTED, font=card_copy, spacing=10)

for idx, (title, body) in enumerate([
    ('Local', 'Grounded in a\nreal service market.'),
    ('Clear', 'Written for owners\nwho need fast trust.'),
    ('Built', 'Structured to turn\ntraffic into leads.'),
]):
    box_x = 720 + idx * 134
    box_y = 434
    draw.rectangle((box_x, box_y, box_x + 132, box_y + 122), fill=PAPER, outline=BORDER, width=2)
    draw.text((box_x + 18, box_y + 18), title, fill=INK, font=card_title)
    draw.multiline_text((box_x + 18, box_y + 58), body, fill=MUTED, font=card_copy, spacing=8)

image.save(OUTPUT_PATH)
print(OUTPUT_PATH)
