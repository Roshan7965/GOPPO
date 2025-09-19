import jwt from "jsonwebtoken";
const genToken=async(userID)=>{
    try{

        const token=jwt.sign({userID},process.env.JWT_SECRET,{expiresIn:'2d'});

        return token;

    }catch (error){
       console.log("gen token erro")
    }
}

export default genToken;