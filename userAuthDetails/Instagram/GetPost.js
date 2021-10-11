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


async function GetAllPost(page){
   await page.click("#react-root > section > main > div > div._2z6nI > article > div > div > div:nth-child(1) > div:nth-child(1) > a"); 
   //if present the multiple image in same container 
   //to navigate control
   const IfPresentManyImgInOneContainer=await page.evaluate(()=>{
       let btnNext=document.querySelector("._6CZji");
       if(btnNext!=null){
           btnNext.click();
       }
       else{
           //move next column 
       }
       

   })
}

async function GetAllFollowers(page){

}
async function GetAllFollowing(page){

}