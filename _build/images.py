# Source images -> responsive webp set + manifest (_build/img.json). Run: python3 _build/images.py
import json, os
from PIL import Image
S='/workspace/src-img/'; O='assets/img/'
MAP={'aerial-hunter-hero':'ah-hero.jpg','aerial-hunter-deer':'ah-deer.jpg','aerial-hunter-palettes':'ah-palettes.jpg','aerial-hunter-map':'ah-map.jpg','aerial-hunter-site':'ah-laptop.jpg','aerial-hunter-2':'ah-phone.jpg','aerial-hunter-area-m':'ah-area-phone.jpg',
 'casa-fresca-hero':'cf-hero.png','casa-fresca-how':'cf-how.png','casa-fresca-catering':'cf-catering.png','casa-fresca-product':'cf-product.png','casa-fresca-events':'cf-events.png','casa-fresca-macro':'cf-macro.png','casa-fresca-2':'cf-phone.png','casa-fresca-cart-m':'cf-phone-cart.png',
 'aerial-hunter-plate-scan':'ah-plate-scan.png','aerial-hunter-plate-tools':'ah-plate-tools.png','aerial-hunter-plate-call':'ah-plate-call.png',
 'casa-fresca-plate-menu':'cf-plate-menu.png','casa-fresca-plate-week':'cf-plate-week.png','casa-fresca-plate-extras':'cf-plate-extras.png',
 'hero-pill':'hero-pill.webp'}
man={}
for n,src in MAP.items():
    p=S+src
    im=Image.open(p).convert('RGB'); W,H=im.size
    land=W>H
    steps=[640,1024,1280,1600,2048] if land else [480,768,1152,1536]
    ws=[w for w in steps if w<=W]
    if W not in ws and W-ws[-1]>120: ws.append(W)
    if n=='hero-pill': ws=[640]  # tiny inline pill
    for w in ws:
        h=round(H*w/W); im.resize((w,h),Image.LANCZOS).save(f'{O}{n}-{w}.webp','WEBP',quality=82,method=6)
    d=max(w for w in ws if w<=(1280 if land else 768))
    im.resize((d,round(H*d/W)),Image.LANCZOS).save(f'{O}{n}.webp','WEBP',quality=82,method=6)
    man[n]={'w':d,'h':round(H*d/W),'ws':ws}
json.dump(man,open('_build/img.json','w'),indent=1)
print(json.dumps(man))
