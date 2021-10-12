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


//get post and followers and following information
async function GetPostDetails(InstagramPage){
  await InstagramPage.waitForSelector("#react-root > section > main > div > header > section > ul > li:nth-child(1) > span > span");
  let TotalPost=await InstagramPage.$eval("#react-root > section > main > div > header > section > ul > li:nth-child(1) > span > span",(el)=>el.textContent);
  let Followers=await InstagramPage.$eval("#react-root > section > main > div > header > section > ul > li:nth-child(2) > a > span",(el)=>el.textContent);
  let Following=await InstagramPage.$eval("#react-root > section > main > div > header > section > ul > li:nth-child(3) > a > span",(el)=>el.textContent);
  
  let user={
    Post:TotalPost,
    followers:Followers,
    following:Following
  }
  return user;

}

async function UserProfile(){
  const InstagramPage=await FormSubmit("dsrty981","navani.007");
  await  InstagramPage.waitForNavigation();

  //gio To Profile page 
  await InstagramPage.click("#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.ctQZg > div > div:nth-child(5) > span");
  await InstagramPage.click("div._7UhW9.xLCgt.MMzan.KV-D4.fDxYl");
 // await  InstagramPage.waitForNavigation();

  //get user Information post,Followers and following list
  const userInfo=await GetPostDetails(InstagramPage);
  console.log(userInfo);

  return InstagramPage;

}

//UserProfile();
//get My Post all and navigate to followers and following post 


module.exports={UserProfile,GetPostDetails}

