const bookModel = require('../model/book')

const genId = "book-"+Math.floor(Math.random()*9999)+"-"+Date.now()

const addBooks = async(req,res)=>{
    try{
        const bookInfo = await bookModel.create({
            "book_id" : genId,
            "title" : req.body.title,
            "author" : req.body.author,
            "genre" : req.body.genre,
            "publishedYear" : req.body.publishedYear,
            "inStock" : req.body.inStock
        })
        if(!bookInfo) res.status(256).json({"Message" : "Book not added."})
        else res.status(200).json({"Message" : "Book added successfully."})
    }
    catch(error){
        res.status(501).json(error)
    }
}

const allBooks = async(req,res)=>{
    try{
        const bookInfo = await bookModel.find();
        if(!bookInfo){
            return res.status(501).json({"Message" : "Somthing wrong"})
        }
        else{
            return res.status(200).json(bookInfo)
        }
    }
    catch(error){
        if(error) return res.status(501).json(error)
    }
}

const getBookId = async(req,res)=>{
    try{
        const bookInfo = await bookModel.find({"book_id" : req.params.id})
        if(!bookInfo) res.status(501).json({"Message" : "Book not find"})
        else res.status(200).json(bookInfo)
    }
    catch(error){
        res.status(200).json(error)
    }
}

const updateById = async(req,res)=>{
    try{
        const updates = {}
        if(req.body.title) updates.title = req.body.title
        if(req.body.author) updates.author = req.body.author
        if(req.body.genre) updates.genre = req.body.genre
        if(req.body.publishedYear) updates.publishedYear = req.body.publishedYear
        if(req.body.inStock !== undefined) updates.inStock = req.body.inStock

        if(Object.keys(updates).length === 0) return res.status(400).json({"message" : "no field provide to update"})

        const bookInfo = await bookModel.updateOne({"book_id" : req.params.id},
            {$set : updates}
        )

        if(bookInfo.matchedCount === 0) return res.status(501).json({"Message" : "Book not found"})

        if(bookInfo.modifiedCount === 0) return res.status(400).json({"Message" : "No changes was made for update."})
        
        else res.status(200).json({"Message" : "Update successfully"})
    }
    catch(error){
        res.status(501).json(error)
    }
}

const updateSomeById = async(req,res)=>{
    try{
        const updates = {}
        if(req.body.title) updates.title = req.body.title
        if(req.body.author) updates.author = req.body.author
        if(req.body.genre) updates.genre = req.body.genre
        if(req.body.py) updates.py = req.body.py
        if(req.body.is) updates.inStock = req.body.is

        if(Object.keys(updates).length === 0) return res.status(400).json({"Message" : "no field provided for update"})
 
        const bookInfo = await bookModel.updateOne({"book_id" : req.params.id},
            {$set : updates}
        )

        if(bookInfo.matchCount === 0) return res.status(501).json({"Message" : "Book not found"})

        if(bookInfo.modifiedCount === 0) return res.status(400).json({"Message" : "no changes made yet for update."})

        else return res.status(200).json({"Message" : "Update successfully"})
    }
    catch(error){
        return res.status(501).json(error)
    }
}

const deleteById = async(req,res)=>{
    try{
        const bookInfo = await bookModel.deleteOne({"book_id" : req.params.id})
        if(!bookInfo) return res.status(501).json({"Message" : "Book not found"})
        else return res.status(200).json({"Message" : "Delete successfully."})
    }
    catch(error){
        return res.status(501).json(error)
    }
}

module.exports = {
    addBooks,
    allBooks,
    getBookId,
    updateById,
    updateSomeById,
    deleteById
}
console.log("Book controller is working")