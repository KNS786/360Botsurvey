const puppeteer=require('puppeteer');

async function Browser(){
  const browser=await puppeteer.launch({headless:false});
  const page=await browser.newPage();
  await page.goto("https://www.instagram.com/",{waitUntil:'networkidle2'});
  return page;

}

async function FormSubmit(username,password){
  const page=await Browser();
  await page.click("#loginForm > div > div:nth-child(1)");
  await page.type("#loginForm > div > div:nth-child(1) > div > label > input",username); 
  await page.click("#loginForm > div > div:nth-child(2)");
  await page.type("#loginForm > div > div:nth-child(2) > div > label > input",password);
  await page.click("#loginForm > div > div:nth-child(3) > button");
  return page;
}

async function UserProfile(){
  const InstagramPage=await FormSubmit("8848419258","navani.007");
  await  InstagramPage.waitForNavigation();
  //await InstagramPage.click("#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.ctQZg > div > div:nth-child(1) > div > a");
  // await InstagramPage.waitForNavigation();
  //gio To Profile page 
  await InstagramPage.click("#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.ctQZg > div > div:nth-child(5) > span");
  await InstagramPage.click("div._7UhW9.xLCgt.MMzan.KV-D4.fDxYl");
 // await  InstagramPage.waitForNavigation();
  console.log("hello ");
  //await InstagramPage.waitForSelector("#react-root > section > main > div > ul > li:nth-child(1) > span > span");
  // let element=await InstagramPage.$eval("span.g47SY.lOXF2",el=>el.textContent);
  // console.log(element);
  let element=await InstagramPage.$("span.g47SY");


}

UserProfile();

