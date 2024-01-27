const puppeteer = require("puppeteer");
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 720, height: 2000 });
    const twitterProfileUrl = "https://twitter.com/okx";
    await page.goto(twitterProfileUrl);
    await page.waitForSelector("article[data-testid=tweet]");
    const tweet = await page.evaluate(() => {
        const tweetTexts = document.querySelectorAll("article[data-testid=tweet]");
        console.log(tweetTexts)
        return [...tweetTexts].map(tweetText => {
            const imgs = tweetText.querySelectorAll('img')
            return [tweetText.textContent.trim(), [...imgs].map(img => img.src)];
        })
    });
    console.log("First Tweet:", tweet);
    await browser.close();
})();