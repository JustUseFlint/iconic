import sys,glob
from PIL import Image
pat,out,cols,tw=sys.argv[1],sys.argv[2],int(sys.argv[3]),int(sys.argv[4])
fs=sorted(glob.glob(pat)); ims=[]
for f in fs:
    im=Image.open(f); r=tw/im.width; ims.append(im.resize((tw,int(im.height*r))))
h=max(i.height for i in ims); rows=(len(ims)+cols-1)//cols
S=Image.new('RGB',(cols*tw+(cols-1)*8,rows*h+(rows-1)*8),'#888')
for k,im in enumerate(ims): S.paste(im,((k%cols)*(tw+8),(k//cols)*(h+8)))
S.save(out)
