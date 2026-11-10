# Source images -> responsive webp set + manifest (_build/img.json). Run: python3 _build/images.py
import json, os
from PIL import Image
S='/workspace/src-img/'; O='assets/img/'
MAP={'aerial-hunter-hero':'ah-hero.jpg','aerial-hunter-deer':'ah-deer.jpg','aerial-hunter-palettes':'ah-palettes.jpg','aerial-hunter-map':'ah-map.jpg','aerial-hunter-site':'ah-laptop.jpg','aerial-hunter-2':'ah-phone.jpg','aerial-hunter-area-m':'ah-area-phone.jpg',
 'casa-fresca-hero':'cf-hero.png','casa-fresca-how':'cf-how.png','casa-fresca-catering':'cf-catering.png','casa-fresca-product':'cf-product.png','casa-fresca-events':'cf-events.png','casa-fresca-macro':'cf-macro.png','casa-fresca-2':'cf-phone.png','casa-fresca-cart-m':'cf-phone-cart.png',
 'aerial-hunter-plate-scan':'ah-plate-scan.png','aerial-hunter-plate-tools':'ah-plate-tools.png','aerial-hunter-plate-call':'ah-plate-call.png',
 'casa-fresca-plate-menu':'cf-plate-menu.png','casa-fresca-plate-week':'cf-plate-week.png','casa-fresca-plate-extras':'cf-plate-extras.png',
 'conexus-design-hero':'cx-hero.png','conexus-design-2':'cx-phone.png','conexus-design-plate-first':'cx-plate-first.png','conexus-design-plate-portfolio':'cx-plate-portfolio.png','conexus-design-plate-practice':'cx-plate-practice.png',
 'conexus-design-map':'cx-map.png','conexus-design-project':'cx-project.png','conexus-design-services':'cx-services.png','conexus-design-states':'cx-states.png','conexus-design-projects-m':'cx-phone-projects.png','conexus-design-project-m':'cx-phone-project.png',
 'bertrams-hero':'bt-hero.png','bertrams-2':'bt-phone.png','bertrams-plate-services':'bt-plate-services.png','bertrams-plate-work':'bt-plate-work.png','bertrams-plate-quote':'bt-plate-quote.png',
 'bertrams-marine':'bt-marine.png','bertrams-ceramic':'bt-ceramic.png','bertrams-mega':'bt-mega.png','bertrams-reviews':'bt-reviews.png','bertrams-services-m':'bt-phone-services.png','bertrams-quote-m':'bt-phone-quote.png',
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
