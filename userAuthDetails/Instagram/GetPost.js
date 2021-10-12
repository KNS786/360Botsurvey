const puppeteer=require("puppeteer");

const {UserProfile,GetPostDetails}=require("./auth");

const auth=UserProfile;
const UserDetails=GetPostDetails;

(async ()=>{
   const page=await auth();
   await page.goto("https://www.instagram.com/sundarpichai/");
   const List_PostFollowersFollowing=await UserDetails(page);
   const totalPost=Number(List_PostFollowersFollowing.Post);
   console.log(List_PostFollowersFollowing);
   
   //get Post all Information
   //Followers and Following List
   await GetAllPost(page,totalPost);
   //await GetAllFollowers(page);
   //await GetAllFollowing(page);

})();


//get post information and textcontent,total likes,date of posted information 
async function MediaContentGet(page,totalPost){
   const MediaInfomation=[];

   let next=0;
   while(next < totalPost){
   //const text=await page.$(".C4VMK");
   await page.waitForSelector("body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div.eo2As > div.EtaWk > ul > div > li > div > div > div.C4VMK");
   const Text = await page.$eval("body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div.eo2As > div.EtaWk > ul > div > li > div > div > div.C4VMK",(el)=>el.textContent);
   //await page.waitForSelector("body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div.eo2As > section.EDfFK.ygqzn > div > div");
   let Likes_views//=await page.$eval("body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div.eo2As > section.EDfFK.ygqzn > div > div",(el)=>el.textContent);
   //await page.waitForSelector("body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div.eo2As > div.k_Q0X.I0_K8.NnvRN");
   const DatePosted=await page.$eval("body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div.eo2As > div.k_Q0X.I0_K8.NnvRN",(el)=>el.textContent);

   //check if previous btn are present or not 
   //check if this is video or img to get select elements 
   let checkVideoOrImg=await page.$(".FqZhB");

   if(next > 0){
      let getLikes_Views=await page.$(".vcOH2");
      if(getLikes_Views==null){
         Likes_views=await page.$eval("body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div.eo2As > section.EDfFK.ygqzn > div > div",(el)=>el.textContent);

      }else{
         Likes_views=await page.$eval("body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div > section.EDfFK.ygqzn > div > span",(el)=>el.textContent);
      }
      console.log({Text,Likes_views,DatePosted});
      MediaInfomation.push({Likes_views,DatePosted});
    
      await page.click("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow");
   }else{
      Likes_views=await page.$eval("body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div.eo2As > section.EDfFK.ygqzn > div",(el)=>el.textContent);
      console.log({Text,Likes_views,DatePosted});
      MediaInfomation.push({Likes_views,DatePosted});
      await page.click("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a");       
   }
   next++;
   
 }



   return MediaInfomation;
 
}



async function GetAllPost(page,totalPost){
   await page.click("#react-root > section > main > div > div._2z6nI > article > div > div > div:nth-child(1) > div:nth-child(1) > a"); 
   //if present the multiple image in same container 
   //to navigate control
   let res=await MediaContentGet(page,totalPost);
   console.log(res);

}

async function GetAllFollowers(page){

}
async function GetAllFollowing(page){

}