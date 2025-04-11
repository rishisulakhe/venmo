import express from "express";
import db from "@repo/db"
const app=express();

app.use(express.json());

app.post("/hdfcwebhook",async (req,res)=>{
    //Add zod validation here
    //Todo : HDFc bank should ideally send us a secret so we know this is send by them
    //Todo: check if this is onRampTxn is processing or not
    const paymentInformation={
        token:req.body.token,
        userId:req.body.user_Indentifier,
        amount:req.body.amount
    };
    await db.balance.update({
        where:{
            userId:paymentInformation.userId
        },
        data:{
            amount:{
                increment:paymentInformation.amount
            }
        }
    })

    db.onRampTransaction.update({
        where:{
            token:paymentInformation.token,
        },
        data:{
            status:"Success"
        }
    })
    res.json(200).json({
        message:"captured"
    })
})

app.listen(3003);