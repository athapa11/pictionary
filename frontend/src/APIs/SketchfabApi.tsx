import axios from 'axios';

// function: serach for model based on a query
const apiUrl = 'https://api.sketchfab.com/';
export const searchModels = async(query: string) => {
  try
  {
    const data = await axios.get(`${apiUrl}v3/search?type=models&q=${query}&archives_flavours=false`, {
      headers: {
        Authorization: `Bearer ${process.env.SKETCHFAB_API_KEY}`
      },
    });
    return data;
  } 
  catch(error){
    if(axios.isAxiosError(error)){
      console.log("error message: ", error.message);
      return error.message;
    } 
    else {
      console.log("unexpected error: ", error);
      return "unexpected error has occured";
    }
  }
};