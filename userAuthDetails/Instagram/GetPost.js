const puppeteer=require("puppeteer");

const {UserProfile,GetPostDetails}=require("./auth");

const auth=UserProfile;
const UserDetails=GetPostDetails;

(async ()=>{
   const page=await auth();
   await page.goto("https://www.instagram.com/sundarpichai/");
   const List_PostFollowersFollowing=await UserDetails(page);
   console.log(List_PostFollowersFollowing);
   
   //get Post all Information
   //Followers and Following List
   await GetAllPost(page);
   //await GetAllFollowers(page);
   //await GetAllFollowing(page);

})();


//get post information and textcontent,total likes,date of posted information 
async function MediaContentGet(page){

    const MediaInfomation=[];
   while(true){
     
    let btnNext=await page.$("._6CZji");
    if(btnNext!=null){
        btnNext.click();
        console.log("true ");
    }
    else{
        //move next column 
            await page.waitForSelector("body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div.eo2As > div.EtaWk > ul > div > li > div > div > div.C4VMK > span");
            let TextContent=await page.$eval("body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div.eo2As > div.EtaWk > ul > div > li > div > div > div.C4VMK > span",(el)=>el.textContent);
            await page.waitForSelector("body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div.eo2As > section.EDfFK.ygqzn > div > span");
            let LikedORViews=await page.$eval("body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div.eo2As > section.EDfFK.ygqzn > div > span",(el)=>el.textContent);
            await page.waitForSelector("body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div.eo2As > div.k_Q0X.I0_K8.NnvRN > a > time");
            let datposted=await page.$eval("body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div.eo2As > div.k_Q0X.I0_K8.NnvRN > a > time",(el)=>el.textContent);
            MediaInfomation.push({
                TextContent,LikedORViews,datposted
            })    
        
    await page.waitForSelector("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow");
    let Nextbtn=await page.$eval("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow",(el)=>el.textContent) ;
    if(Nextbtn==null) break;
    //else 
    await page.waitForSelector("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow");
    
    await page.$eval("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow",(el)=>el.click()); 
    //await page.click("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow");
   }
  }
    return MediaInfomation;
}



async function GetAllPost(page){
   await page.click("#react-root > section > main > div > div._2z6nI > article > div > div > div:nth-child(1) > div:nth-child(1) > a"); 
   //if present the multiple image in same container 
   //to navigate control
   let res=await MediaContentGet(page);
   console.log(res);

}

async function GetAllFollowers(page){

}
async function GetAllFollowing(page){

}