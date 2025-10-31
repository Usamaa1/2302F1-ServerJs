import { ObjectId } from "mongodb";
import { db } from "../connection/connection.mjs";



export const addProducts = async (req, res) => {

    try {

        const { prodName, prodPrice, prodDesc } = req.body;

        await db.collection('products').insertOne({ prodName, prodPrice, prodDesc });

        res.send({
            message: "Product Inserted Successfully!"
        })

    } catch (error) {
        console.log(error)
        res.send({
            errorMessage: "Product Insertion Failed!"
        })
    }

}


export const getProducts = async (req, res) => {

    try {

        const products = await db.collection('products').find().toArray();

        if (products) {
            res.send(products);
        }
        else {

            res.send({ message: "Data not found!" })
        }




    } catch (error) {
        console.log(error)
        res.send({ errorMessage: error })
    }


}



export const updateProuduct = async (req, res) => {

    try {

        const { id } = req.params;

        console.log(id);

        const product = await db.collection('products').findOne({ _id: ObjectId(id) }).toArray();

        // const {prodName, prodPrice, prodDesc} = product;
        console.log("Product: ",product)

        res.send(product)





    } catch (error) {
        res.send(error)
    }



}

