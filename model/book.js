const mongoose = require('mongoose')

const mongoSchema = mongoose.Schema({
    "book_id" : {
        type : String,
        required : true
    },
    "title" : {
        type : String,
        required : [true,"Title is required."],
        validate : {
            validator : (titleValue)=>{
                var titleRegex = /^[\p{L}\p{N} .,'"!?:;\-()&]+$/u;
                if(titleRegex.test(titleValue)) return true; return false;
            },
            message :(props)=> {
                return `${props.value} Enter valid title.`
            }
        }
    },
    "author" : {
        type : String,
        required : [true,"Author is required."],
        validate : {
            validator : (authorValue)=>{
                var authorRegex =  /^[\p{L} .'-]+$/u;
                if(authorRegex.test(authorValue)) return true; return false;
            },
            message : (props)=>{
                return `${props.value} Enter valid author name.`
            }
        }
    },
    "genre" : {
        type : String,
        required : false,
        validate : {
            validator : (genreValue)=>{
                if(genreValue != ""){
                    var genreRegex = /^[\p{L}0-9 &/\-]+$/u;
                if(genreRegex.test(genreValue)) return true; return false;
                }
                
            },
            message : (props)=>{
                return `${props.value} Enter valid genre.`
            }
        }
    },
    "publishedYear" : {
        type : Number,
        required : [true,"Published year is required."],
        validate : {
            validator : (yearValue)=>{
                var yearRegex = /^(1[0-9]{3}|20[0-9]{2})$/
                if(yearRegex.test(yearValue)) return true; return false;
            },
            message : (props)=>{
                return `${props.value} Enter valid published year.`
            }
        }
    },
    "inStock" : {
        type : Boolean,
        default : true
    }
},
{versionKey : false})

module.exports = mongoose.model("bookModel",mongoSchema,"books")
console.log("Book model is working.")