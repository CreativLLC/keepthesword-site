"""Generate the 9-slice frame and button PNGs the site uses, with the brand's own generators.
Frames come from ui.frame() and buttons from kit.button(), drawn at 1x; CSS shows them at 3x
with border-image (edges are uniform, so the browser repeats them instead of stretching art).

Usage: python3 tools/make-slices.py <brand/system dir> <round2/hd-pixel/src dir> <out dir>
"""
import sys
sysdir, r2src, out = sys.argv[1:4]
sys.path[:0] = [sysdir + '/src', r2src]
from ui import frame          # noqa: E402  approved window frame (round2 src; system/build.sh calls it too)
from kit import button        # noqa: E402

frame(13, 13, 'steel').save(f'{out}/frame-steel.png')   # 17 x 17 incl. 2 px rivet pad; slice 6
frame(13, 13, 'teal').save(f'{out}/frame-teal.png')
for st in ('primary', 'primary-pressed', 'secondary', 'secondary-pressed', 'disabled'):
    button(9, 15, st).save(f'{out}/btn-{st}.png')          # slice 3, height stays 15 art px
print('ok')
