import asyncio, sys, json
from playwright.async_api import async_playwright
BASE=sys.argv[1]; OUT=sys.argv[2]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        c=await b.new_context(viewport={'width':393,'height':852},device_scale_factor=3,is_mobile=True,has_touch=True)
        errs=[]; res={}
        pg=await c.new_page()
        pg.on('console',lambda m: errs.append(f'{m.type}:{m.text}') if m.type in('error','warning') else None)
        pg.on('pageerror',lambda e: errs.append(f'pageerror:{e}'))
        # Flow 1: Campaign
        await pg.goto(BASE+'contact/',wait_until='networkidle'); await pg.wait_for_timeout(1800)
        await pg.screenshot(path=OUT+'contact-m-01-service.png')
        await pg.click('label.opt:has-text("Campaign")'); await pg.wait_for_timeout(1200)
        await pg.click('button[data-next]'); await pg.wait_for_timeout(700)  # should show errors
        res['errors_shown']=await pg.locator('.fld.err').count()
        await pg.screenshot(path=OUT+'contact-m-02-details-errors.png')
        await pg.click('.tchip:has-text("Product launch")'); await pg.click('.tchip:has-text("Out-of-home")'); await pg.click('.tchip:has-text("Social")'); await pg.click('.tchip:has-text("$5–20M")')
        await pg.wait_for_timeout(300); await pg.screenshot(path=OUT+'contact-m-03-details.png')
        await pg.click('button[data-next]'); await pg.wait_for_timeout(1000)
        await pg.click('.tchip:has-text("$500k–1M")'); await pg.click('.tchip:has-text("In 1–3 months")'); await pg.click('.tchip:has-text("London")')
        await pg.click('button[data-next]'); await pg.wait_for_timeout(1000)
        await pg.fill('#f-name','Jordan Avery'); await pg.fill('#f-email','jordan@northwind.example'); await pg.fill('#f-company','Northwind Outdoor'); await pg.fill('#f-title','VP Marketing')
        await pg.select_option('#f-source','Award show or press')
        await pg.screenshot(path=OUT+'contact-m-04-about.png')
        await pg.click('button[data-next]'); await pg.wait_for_timeout(1000)
        await pg.screenshot(path=OUT+'contact-m-05-review.png')
        res['review_text']=(await pg.locator('.rev').inner_text())[:300]
        await pg.click('button[data-next]'); await pg.wait_for_timeout(1500)
        await pg.screenshot(path=OUT+'contact-m-06-done.png')
        res['flow1_done']=await pg.locator('.done .ct-q').inner_text()
        # Flow 2: Careers via deep link
        await pg.goto(BASE+'contact/?service=careers&role=Art%20Director',wait_until='networkidle'); await pg.wait_for_timeout(1600)
        res['careers_step']=await pg.locator('.ct-k').first.inner_text()
        res['role_value']=await pg.locator('#f-role').input_value()
        await pg.fill('#f-portfolio','https://portfolio.example.com/sam')
        await pg.click('button[data-next]'); await pg.wait_for_timeout(1000)
        res['careers_step2']=await pg.locator('.ct-k').first.inner_text()
        await pg.fill('#f-name','Sam Lee'); await pg.fill('#f-email','sam@example.com')
        await pg.click('button[data-next]'); await pg.wait_for_timeout(1000)
        await pg.click('button[data-next]'); await pg.wait_for_timeout(1500)
        res['flow2_done']=await pg.locator('.done .ct-q').inner_text()
        await pg.screenshot(path=OUT+'contact-m-07-careers-done.png')
        # Flow 3: Digital product from start, with back button + edit
        await pg.goto(BASE+'contact/',wait_until='networkidle'); await pg.wait_for_timeout(1500)
        await pg.click('label.opt:has-text("Digital product")'); await pg.wait_for_timeout(1100)
        await pg.click('.tchip:has-text("E-commerce")'); await pg.click('.tchip:has-text("Live and growing")')
        await pg.click('button[data-next]'); await pg.wait_for_timeout(900)
        await pg.click('button[data-back]'); await pg.wait_for_timeout(900)
        res['back_kept']=await pg.locator('.tchip input[value="E-commerce"]').is_checked()
        await pg.click('button[data-next]'); await pg.wait_for_timeout(900)
        await pg.click('.tchip:has-text("Not sure yet")'); await pg.click('.tchip:has-text("Just exploring")')
        await pg.click('button[data-next]'); await pg.wait_for_timeout(900)
        await pg.fill('#f-name','Ana Ruiz'); await pg.fill('#f-email','bad-email'); await pg.fill('#f-company','Fennick')
        await pg.click('button[data-next]'); await pg.wait_for_timeout(600)
        res['bad_email_blocked']=await pg.locator('.fld[data-k=email].err').count()==1
        await pg.fill('#f-email','ana@fennick.example'); await pg.click('button[data-next]'); await pg.wait_for_timeout(900)
        await pg.click('button[data-next]'); await pg.wait_for_timeout(1300)
        res['flow3_done']=await pg.locator('.done .ct-q').inner_text()
        print(json.dumps({'res':res,'errs':errs},indent=1,ensure_ascii=False))
        await b.close()
asyncio.run(main())
